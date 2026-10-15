/**
 * ─────────────────────────────────────────────────────────────
 *  GPOA  ·  General Plan of Activities
 *  Each activity is a Trello-style card. Dates are ISO strings
 *  (YYYY-MM-DD). `status` controls which column it lands in.
 *  Optionally embed a live Trello / Google Calendar below.
 * ─────────────────────────────────────────────────────────────
 */
export type GpoaStatus = "planned" | "ongoing" | "done";

export type GpoaActivity = {
  id: string;
  title: string;
  committee: string;
  start: string;
  end?: string;
  venue?: string;
  status: GpoaStatus;
  objective: string;
  budget?: string;
  tags?: string[];
  link?: string;
};

/** Set to a public Trello board embed URL or Google Calendar embed URL to show it inline. Leave "" to hide. */
export const externalBoardEmbed = {
  label: "Live Trello Board",
  url: "",
};

export const gpoaActivities: GpoaActivity[] = [
  {
    id: "ga-1",
    title: "1st Semester General Assembly",
    committee: "Executive Board",
    start: "2025-09-12",
    venue: "RTU Gymnasium",
    status: "done",
    objective: "Present the GPOA, introduce officers, and orient members on IECES programs.",
    budget: "₱ 4,500",
    tags: ["assembly"],
  },
  {
    id: "membership-drive",
    title: "Membership Drive & Welcome Week",
    committee: "Membership Committee",
    start: "2025-09-15",
    end: "2025-09-26",
    venue: "ECE Hallway Booth",
    status: "done",
    objective: "Register new and renewing members; distribute membership kits.",
    budget: "₱ 6,200",
    tags: ["membership"],
  },
  {
    id: "ecetss-1",
    title: "ECETSS Talk 1 · Embedded Systems in Industry",
    committee: "Academics Committee",
    start: "2025-10-24",
    venue: "AVR, CEIT Building",
    status: "done",
    objective: "Expose students to industry practices through a practitioner-led seminar.",
    budget: "₱ 3,000",
    tags: ["seminar", "ECETSS"],
  },
  {
    id: "midterm-review",
    title: "Midterm Review Sessions",
    committee: "Academics Committee",
    start: "2025-11-03",
    end: "2025-11-07",
    venue: "Room 402, CEIT",
    status: "done",
    objective: "Peer-led review for Electronics 1, Signals & Systems, and Communications 1.",
    tags: ["academics"],
  },
  {
    id: "financial-report-1",
    title: "Publication of 1st Semester Financial Report",
    committee: "Treasurer & Auditor",
    start: "2026-01-20",
    status: "done",
    objective: "Publish audited collections and disbursements on the Transparency Board.",
    tags: ["transparency"],
  },
  {
    id: "ece-week",
    title: "ECE Week 2026",
    committee: "Events Committee",
    start: "2026-03-09",
    end: "2026-03-13",
    venue: "RTU Boni Campus",
    status: "ongoing",
    objective: "Week-long celebration: exhibits, quiz bee, circuit design challenge, and sportsfest.",
    budget: "₱ 25,000",
    tags: ["flagship", "events"],
  },
  {
    id: "ecetss-2026",
    title: "ECETSS 2026 · Technical Symposium",
    committee: "Academics Committee",
    start: "2026-03-20",
    venue: "RTU Auditorium",
    status: "planned",
    objective: "Full-day symposium with industry speakers, workshops, and a design challenge.",
    budget: "₱ 18,000",
    tags: ["seminar", "ECETSS", "flagship"],
    link: "https://forms.gle/",
  },
  {
    id: "outreach",
    title: "Community Outreach · Basic Electronics for Kids",
    committee: "External Affairs",
    start: "2026-04-11",
    venue: "Brgy. Addition Hills, Mandaluyong",
    status: "planned",
    objective: "Teach basic circuits to grade-school students using donated kits.",
    budget: "₱ 8,000",
    tags: ["outreach", "CSR"],
  },
  {
    id: "board-review-kickoff",
    title: "Board Exam Review Kick-off for Graduating Students",
    committee: "Academics Committee",
    start: "2026-04-25",
    venue: "AVR, CEIT Building",
    status: "planned",
    objective: "Orientation on review centers, timelines, and IECES alumni mentoring.",
    tags: ["academics", "4th year"],
  },
  {
    id: "elections",
    title: "IECES Officers' Election",
    committee: "COMELEC",
    start: "2026-05-08",
    venue: "Online & On-site",
    status: "planned",
    objective: "Elect the Executive Board for A.Y. 2026–2027 per Constitution Article VI.",
    tags: ["governance"],
  },
  {
    id: "ga-2",
    title: "Year-End General Assembly & Turnover",
    committee: "Executive Board",
    start: "2026-05-22",
    venue: "RTU Gymnasium",
    status: "planned",
    objective: "Present the accomplishment report, final financial statement, and officer turnover.",
    budget: "₱ 5,000",
    tags: ["assembly", "transparency"],
  },
];
