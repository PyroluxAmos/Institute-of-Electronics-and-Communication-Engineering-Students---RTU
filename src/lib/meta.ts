/**
 * Client-safe presentational metadata (no DB imports).
 * Imported by both server and client components.
 */
import type { GrievanceStatus, GrievanceType, PostCategory } from "@/db/schema";

export const categoryMeta: Record<PostCategory, { label: string; color: string; description: string }> = {
  announcement: { label: "Announcement", color: "bg-blue-100 text-blue-800 ring-blue-200", description: "General notices" },
  pubmat: { label: "Pubmat", color: "bg-cyan-100 text-cyan-800 ring-cyan-200", description: "Publication materials" },
  financial: { label: "Financial", color: "bg-emerald-100 text-emerald-800 ring-emerald-200", description: "Reports & statements" },
  gpoa: { label: "GPOA", color: "bg-violet-100 text-violet-800 ring-violet-200", description: "Plan of activities" },
  executive: { label: "Executive", color: "bg-amber-100 text-amber-800 ring-amber-200", description: "Board matters" },
  academic: { label: "Academic", color: "bg-rose-100 text-rose-800 ring-rose-200", description: "Academics & reviewers" },
};

export const grievanceTypeMeta: Record<GrievanceType, { label: string; hint: string; emoji: string }> = {
  suggestion: { label: "Suggestion", hint: "Ideas to improve programs, events, or services", emoji: "💡" },
  concern: { label: "Concern", hint: "Issues that need the board's attention", emoji: "⚠️" },
  question: { label: "Question", hint: "Anything you want clarified", emoji: "❓" },
  commendation: { label: "Commendation", hint: "Recognize someone or something done well", emoji: "🏅" },
};

export const grievanceStatusMeta: Record<GrievanceStatus, { label: string; color: string }> = {
  new: { label: "Received", color: "bg-blue-100 text-blue-800" },
  reviewing: { label: "Under Review", color: "bg-amber-100 text-amber-800" },
  resolved: { label: "Resolved", color: "bg-emerald-100 text-emerald-800" },
};
