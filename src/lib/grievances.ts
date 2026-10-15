import { db } from "@/db";
import { grievances, grievanceStatuses, grievanceTypes, type GrievanceStatus, type GrievanceType } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export function isGrievanceType(v: unknown): v is GrievanceType {
  return typeof v === "string" && (grievanceTypes as readonly string[]).includes(v);
}
export function isGrievanceStatus(v: unknown): v is GrievanceStatus {
  return typeof v === "string" && (grievanceStatuses as readonly string[]).includes(v);
}

function makeTicket() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `IECES-${year}-${rand}`;
}

export type GrievanceInput = {
  type: GrievanceType;
  subject: string;
  message: string;
  anonymous: boolean;
  name?: string;
  studentNumber?: string;
  email?: string;
  yearSection?: string;
};

export async function createGrievance(input: GrievanceInput) {
  const ticket = makeTicket();
  const [created] = await db
    .insert(grievances)
    .values({
      ticket,
      type: input.type,
      subject: input.subject.trim(),
      message: input.message.trim(),
      anonymous: input.anonymous,
      name: input.anonymous ? null : input.name?.trim() || null,
      studentNumber: input.anonymous ? null : input.studentNumber?.trim() || null,
      email: input.anonymous ? null : input.email?.trim() || null,
      yearSection: input.yearSection?.trim() || null,
    })
    .returning({ id: grievances.id, ticket: grievances.ticket, createdAt: grievances.createdAt });
  return created;
}

export async function getGrievanceByTicket(ticket: string) {
  const [row] = await db
    .select({
      ticket: grievances.ticket,
      type: grievances.type,
      subject: grievances.subject,
      status: grievances.status,
      createdAt: grievances.createdAt,
      updatedAt: grievances.updatedAt,
    })
    .from(grievances)
    .where(eq(grievances.ticket, ticket.trim().toUpperCase()))
    .limit(1);
  return row ?? null;
}

export async function listGrievances() {
  return db.select().from(grievances).orderBy(desc(grievances.createdAt));
}

export async function updateGrievanceStatus(id: number, status: GrievanceStatus, adminNotes?: string) {
  await db
    .update(grievances)
    .set({ status, adminNotes: adminNotes ?? undefined, updatedAt: new Date() })
    .where(eq(grievances.id, id));
}

export async function grievanceStats() {
  const rows = await db
    .select({ status: grievances.status, count: sql<number>`count(*)::int` })
    .from(grievances)
    .groupBy(grievances.status);
  const stats: Record<string, number> = { new: 0, reviewing: 0, resolved: 0 };
  for (const r of rows) stats[r.status] = r.count;
  return stats;
}
