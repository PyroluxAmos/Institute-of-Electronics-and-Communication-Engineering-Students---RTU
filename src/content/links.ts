/**
 * ─────────────────────────────────────────────────────────────
 *  LINKS & CONTACT  ·  community chats, official links, forms
 *  Add / remove entries freely. Icons are keys from LinkIcon.tsx
 * ─────────────────────────────────────────────────────────────
 */
export type LinkIconKey =
  | "facebook"
  | "messenger"
  | "instagram"
  | "tiktok"
  | "discord"
  | "mail"
  | "drive"
  | "form"
  | "globe"
  | "calendar"
  | "book"
  | "chat";

export type LinkItem = {
  label: string;
  description?: string;
  href: string;
  icon: LinkIconKey;
  badge?: string;
};

export type LinkGroup = {
  id: string;
  title: string;
  blurb: string;
  items: LinkItem[];
};

export const linkGroups: LinkGroup[] = [
  {
    id: "community",
    title: "Community Chats",
    blurb: "Join your year-level group chats and the official IECES community spaces.",
    items: [
      { label: "IECES Official Community (Messenger)", description: "All ECE students · announcements & Q&A", href: "https://m.me/j/", icon: "messenger", badge: "All years" },
      { label: "1st Year ECE · Group Chat", description: "Freshmen orientation, schedules, and buddies", href: "https://m.me/j/", icon: "chat", badge: "1st Year" },
      { label: "2nd Year ECE · Group Chat", description: "Electronics 1, Logic Circuits & more", href: "https://m.me/j/", icon: "chat", badge: "2nd Year" },
      { label: "3rd Year ECE · Group Chat", description: "Signals, Communications, Microprocessors", href: "https://m.me/j/", icon: "chat", badge: "3rd Year" },
      { label: "4th Year ECE · Group Chat", description: "Design project, OJT, board review", href: "https://m.me/j/", icon: "chat", badge: "4th Year" },
      { label: "IECES Discord Server", description: "Voice study rooms & resource channels", href: "https://discord.gg/", icon: "discord" },
    ],
  },
  {
    id: "official",
    title: "Official Pages",
    blurb: "Follow IECES – RTU on every platform for real-time updates.",
    items: [
      { label: "Facebook Page", description: "facebook.com/RTUIECES", href: "https://www.facebook.com/RTUIECES", icon: "facebook" },
      { label: "Instagram", description: "@rtuieces", href: "https://www.instagram.com/rtuieces", icon: "instagram" },
      { label: "TikTok", description: "@rtuieces", href: "https://www.tiktok.com/@rtuieces", icon: "tiktok" },
      { label: "ECETSS_RTU", description: "Technical Seminar Series page", href: "https://www.facebook.com/", icon: "globe" },
    ],
  },
  {
    id: "forms",
    title: "Forms & Registrations",
    blurb: "Membership, event registration, and feedback forms.",
    items: [
      { label: "Membership Registration Form", description: "Register or renew your IECES membership", href: "https://forms.gle/", icon: "form", badge: "Open" },
      { label: "Event Registration · ECETSS 2026", description: "Reserve your slot", href: "https://forms.gle/", icon: "form", badge: "Open" },
      { label: "Grievance & Suggestion Form", description: "Hosted on this website — anonymous allowed", href: "/grievance", icon: "form" },
      { label: "Merch Order Form", description: "Org shirt, lanyard & lab coat orders", href: "https://forms.gle/", icon: "form" },
    ],
  },
  {
    id: "resources",
    title: "Useful Information",
    blurb: "University links every ECE student needs.",
    items: [
      { label: "RTU Official Website", description: "rtu.edu.ph", href: "https://rtu.edu.ph", icon: "globe" },
      { label: "RTU Student Portal", description: "Grades, enrollment & schedules", href: "https://rtu.edu.ph", icon: "globe" },
      { label: "IECES Google Drive", description: "Shared academic drive", href: "https://drive.google.com/", icon: "drive" },
      { label: "GPOA Calendar", description: "Live board of activities", href: "/calendar", icon: "calendar" },
      { label: "IECES Library", description: "Reviewers, records & designs", href: "/library", icon: "book" },
    ],
  },
];
