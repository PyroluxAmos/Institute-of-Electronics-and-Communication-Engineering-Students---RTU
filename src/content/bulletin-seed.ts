import type { PostCategory } from "@/db/schema";

/**
 * ─────────────────────────────────────────────────────────────
 *  BULLETIN SEED POSTS
 *  Used only when the `posts` table is empty (first deploy).
 *  After that, create posts from /admin.
 *  Drop images into /public/materials/bulletin and reference them.
 * ─────────────────────────────────────────────────────────────
 */
export type SeedPost = {
  slug: string;
  title: string;
  body: string;
  category: PostCategory;
  imageUrl?: string;
  attachmentUrl?: string;
  attachmentLabel?: string;
  pinned?: boolean;
  daysAgo: number;
};

export const seedPosts: SeedPost[] = [
  {
    slug: "welcome-to-the-transparency-board",
    title: "Welcome to the IECES Transparency Bulletin Board",
    body:
      "This is the official digital bulletin board of the Institute of Electronics Engineering Students – RTU. Every announcement, publication material, financial statement, GPOA update, and executive matter will be posted here so every ECE student stays informed.\n\nEasy for you, ECE for us.",
    category: "announcement",
    imageUrl: "/materials/bulletin/pubmat-genassembly.jpg",
    pinned: true,
    daysAgo: 1,
  },
  {
    slug: "ecetss-2026-call-for-participants",
    title: "ECETSS 2026 · Call for Participants",
    body:
      "The Electronics and Communications Engineering Technical Seminar Series returns this semester! Expect talks from industry practitioners, hands-on workshops on embedded systems, and a design challenge with prizes.\n\nRegistration link will be posted on our Links page. Slots are limited per year level.",
    category: "pubmat",
    imageUrl: "/materials/bulletin/pubmat-ecetss.jpg",
    daysAgo: 3,
  },
  {
    slug: "financial-report-first-semester",
    title: "Financial Report · 1st Semester A.Y. 2025–2026",
    body:
      "In the spirit of full transparency, here is the summary of the organization's finances for the first semester.\n\n• Beginning balance: ₱ 18,450.00\n• Collections (membership & merch): ₱ 42,300.00\n• Disbursements (events, materials, printing): ₱ 36,780.50\n• Ending balance: ₱ 23,969.50\n\nThe full audited statement is available in Library → Records.",
    category: "financial",
    imageUrl: "/materials/bulletin/pubmat-finance.jpg",
    attachmentUrl: "/materials/records/financial-report-1st-sem.pdf",
    attachmentLabel: "Download full financial statement (PDF)",
    daysAgo: 6,
  },
  {
    slug: "gpoa-second-semester-approved",
    title: "GPOA for 2nd Semester Approved",
    body:
      "The General Plan of Activities for the second semester has been approved by the Office of Student Affairs. Highlights include the ECE Week, Outreach Program, Review Sessions for board subjects, and the Year-End General Assembly.\n\nView the live board on the GPOA Calendar page.",
    category: "gpoa",
    daysAgo: 9,
  },
  {
    slug: "executive-board-resolution-003",
    title: "Executive Board Resolution No. 003 · Grievance Mechanism",
    body:
      "The Executive Board has resolved to formalize the student grievance mechanism. All suggestions, concerns, and questions submitted through the website are reviewed weekly by the Internal Affairs committee and summarized during General Assemblies.\n\nYou may submit anonymously.",
    category: "executive",
    daysAgo: 14,
  },
  {
    slug: "review-materials-uploaded",
    title: "New Review Materials in the Library",
    body:
      "Reviewers for Electronics 1, Signals & Systems, and Communications 1 have been uploaded to the Library. Huge thanks to the Academics Committee and our volunteer contributors.",
    category: "academic",
    daysAgo: 20,
  },
];
