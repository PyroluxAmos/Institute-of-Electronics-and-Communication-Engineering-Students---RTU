import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * ─────────────────────────────────────────────────────────────
 *  IECES – RTU  ·  Database schema
 *  Dynamic content lives here (bulletin posts + grievances).
 *  Static "drag-and-drop" content lives in /src/content.
 * ─────────────────────────────────────────────────────────────
 */

export const postCategories = [
  "announcement",
  "pubmat",
  "financial",
  "gpoa",
  "executive",
  "academic",
] as const;
export type PostCategory = (typeof postCategories)[number];

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  body: text("body").notNull(),
  category: varchar("category", { length: 32 }).notNull().default("announcement"),
  imageUrl: text("image_url"),
  attachmentUrl: text("attachment_url"),
  attachmentLabel: varchar("attachment_label", { length: 120 }),
  author: varchar("author", { length: 120 }).notNull().default("IECES – RTU"),
  pinned: boolean("pinned").notNull().default(false),
  published: boolean("published").notNull().default(true),
  reactions: integer("reactions").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const grievanceTypes = ["suggestion", "concern", "question", "commendation"] as const;
export type GrievanceType = (typeof grievanceTypes)[number];

export const grievanceStatuses = ["new", "reviewing", "resolved"] as const;
export type GrievanceStatus = (typeof grievanceStatuses)[number];

export const grievances = pgTable("grievances", {
  id: serial("id").primaryKey(),
  ticket: varchar("ticket", { length: 24 }).notNull().unique(),
  type: varchar("type", { length: 24 }).notNull().default("concern"),
  subject: varchar("subject", { length: 160 }).notNull(),
  message: text("message").notNull(),
  name: varchar("name", { length: 120 }),
  studentNumber: varchar("student_number", { length: 40 }),
  email: varchar("email", { length: 160 }),
  yearSection: varchar("year_section", { length: 40 }),
  anonymous: boolean("anonymous").notNull().default(false),
  status: varchar("status", { length: 16 }).notNull().default("new"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Grievance = typeof grievances.$inferSelect;
export type NewGrievance = typeof grievances.$inferInsert;
