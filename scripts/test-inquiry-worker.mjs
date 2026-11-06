import assert from "node:assert/strict";
import worker from "../worker/static-export.js";

class MockStatement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async run() {
    if (this.sql.includes("INSERT INTO inquiries")) {
      this.database.inserts.push(this.values);
    }
    return { success: true };
  }
}

class MockDatabase {
  inserts = [];

  prepare(sql) {
    return new MockStatement(this, sql);
  }

  async batch(statements) {
    return Promise.all(statements.map((statement) => statement.run()));
  }
}

function inquiryRequest(body, origin = "https://cse.example") {
  return new Request("https://cse.example/api/inquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body)
  });
}

const database = new MockDatabase();
const assets = { fetch: () => new Response("asset") };
const validPartnerInquiry = {
  type: "partner",
  lang: "en",
  contactUrl: "",
  fields: {
    name: "Ayu",
    company: "Example Manufacturing",
    email: "ayu@example.com",
    country: "Japan",
    website: "https://example.com",
    category: "Industrial tooling",
    markets: "Southeast Asia",
    support: "Distribution partner",
    message: "We would like to discuss the Indonesian market."
  },
  attribution: {
    landingPath: "/en/brands/tohnichi/products/ql-qle2",
    referrer: "https://www.google.com/search?q=torque#result",
    channel: "organic",
    utmSource: "google",
    utmMedium: "organic",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "torque wrench indonesia"
  }
};

const successResponse = await worker.fetch(inquiryRequest(validPartnerInquiry), { DB: database, ASSETS: assets });
const successBody = await successResponse.json();
assert.equal(successResponse.status, 201);
assert.equal(successBody.ok, true);
assert.match(successBody.reference, /^CSE-\d{8}-[A-F0-9]{8}$/);
assert.equal(database.inserts.length, 1);
assert.equal(database.inserts[0][3], "Ayu");
const storedPayload = JSON.parse(database.inserts[0][8]);
assert.equal(storedPayload.category, "Industrial tooling");
assert.equal(storedPayload._attribution.channel, "organic");
assert.equal(storedPayload._attribution.landingPath, "/en/brands/tohnichi/products/ql-qle2");
assert.equal(storedPayload._attribution.referrer, "https://www.google.com/search");

const invalidResponse = await worker.fetch(
  inquiryRequest({ ...validPartnerInquiry, fields: { ...validPartnerInquiry.fields, email: "invalid" } }),
  { DB: database, ASSETS: assets }
);
assert.equal(invalidResponse.status, 400);
assert.equal(database.inserts.length, 1);

const invalidAttributionResponse = await worker.fetch(
  inquiryRequest({ ...validPartnerInquiry, attribution: { ...validPartnerInquiry.attribution, channel: "forged" } }),
  { DB: database, ASSETS: assets }
);
assert.equal(invalidAttributionResponse.status, 400);
assert.equal(database.inserts.length, 1);

const queryBearingLandingResponse = await worker.fetch(
  inquiryRequest({
    ...validPartnerInquiry,
    attribution: { ...validPartnerInquiry.attribution, landingPath: "/contact?email=private@example.com" }
  }),
  { DB: database, ASSETS: assets }
);
assert.equal(queryBearingLandingResponse.status, 400);
assert.equal(database.inserts.length, 1);

const crossOriginResponse = await worker.fetch(inquiryRequest(validPartnerInquiry, "https://attacker.example"), {
  DB: database,
  ASSETS: assets
});
assert.equal(crossOriginResponse.status, 403);
assert.equal(database.inserts.length, 1);

const spamResponse = await worker.fetch(
  inquiryRequest({ ...validPartnerInquiry, contactUrl: "https://spam.example" }),
  { DB: database, ASSETS: assets }
);
assert.equal(spamResponse.status, 201);
assert.equal(database.inserts.length, 1);

const removedRfqResponse = await worker.fetch(
  inquiryRequest({ ...validPartnerInquiry, type: "rfq" }),
  { DB: database, ASSETS: assets }
);
assert.equal(removedRfqResponse.status, 400);
assert.equal(database.inserts.length, 1);

console.log("Inquiry worker checks passed.");
