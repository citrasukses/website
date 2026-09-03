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
const validRfq = {
  type: "rfq",
  lang: "en",
  contactUrl: "",
  fields: {
    name: "Ayu",
    company: "Example Manufacturing",
    email: "ayu@example.com",
    phone: "+62 812 0000 0000",
    brand: "Tohnichi",
    product: "QL100N4",
    quantity: "2",
    application: "Assembly line",
    message: "Please quote this model."
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

const successResponse = await worker.fetch(inquiryRequest(validRfq), { DB: database, ASSETS: assets });
const successBody = await successResponse.json();
assert.equal(successResponse.status, 201);
assert.equal(successBody.ok, true);
assert.match(successBody.reference, /^CSE-\d{8}-[A-F0-9]{8}$/);
assert.equal(database.inserts.length, 1);
assert.equal(database.inserts[0][3], "Ayu");
const storedPayload = JSON.parse(database.inserts[0][8]);
assert.equal(storedPayload.product, "QL100N4");
assert.equal(storedPayload._attribution.channel, "organic");
assert.equal(storedPayload._attribution.landingPath, "/en/brands/tohnichi/products/ql-qle2");
assert.equal(storedPayload._attribution.referrer, "https://www.google.com/search");

const invalidResponse = await worker.fetch(
  inquiryRequest({ ...validRfq, fields: { ...validRfq.fields, email: "invalid" } }),
  { DB: database, ASSETS: assets }
);
assert.equal(invalidResponse.status, 400);
assert.equal(database.inserts.length, 1);

const invalidAttributionResponse = await worker.fetch(
  inquiryRequest({ ...validRfq, attribution: { ...validRfq.attribution, channel: "forged" } }),
  { DB: database, ASSETS: assets }
);
assert.equal(invalidAttributionResponse.status, 400);
assert.equal(database.inserts.length, 1);

const queryBearingLandingResponse = await worker.fetch(
  inquiryRequest({
    ...validRfq,
    attribution: { ...validRfq.attribution, landingPath: "/contact?email=private@example.com" }
  }),
  { DB: database, ASSETS: assets }
);
assert.equal(queryBearingLandingResponse.status, 400);
assert.equal(database.inserts.length, 1);

const crossOriginResponse = await worker.fetch(inquiryRequest(validRfq, "https://attacker.example"), {
  DB: database,
  ASSETS: assets
});
assert.equal(crossOriginResponse.status, 403);
assert.equal(database.inserts.length, 1);

const spamResponse = await worker.fetch(
  inquiryRequest({ ...validRfq, contactUrl: "https://spam.example" }),
  { DB: database, ASSETS: assets }
);
assert.equal(spamResponse.status, 201);
assert.equal(database.inserts.length, 1);

console.log("Inquiry worker checks passed.");
