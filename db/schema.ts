import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    referenceId: text("reference_id").notNull().unique(),
    inquiryType: text("inquiry_type", { enum: ["rfq", "partner"] }).notNull(),
    language: text("language", { enum: ["id", "en"] }).notNull(),
    name: text("name").notNull(),
    company: text("company").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject").notNull(),
    payloadJson: text("payload_json").notNull(),
    status: text("status", { enum: ["new", "in_progress", "closed", "spam"] })
      .notNull()
      .default("new"),
    createdAt: text("created_at").notNull()
  },
  (table) => [
    index("inquiries_created_at_idx").on(table.createdAt),
    index("inquiries_status_idx").on(table.status)
  ]
);
