/**
 * ─────────────────────────────────────────────────────────────
 *  LIBRARY  ·  Academic & organization materials
 *
 *  HOW TO ADD A BOOK
 *  1. Drop the file into  /public/materials/library/
 *  2. Add an entry below. `href` is the public path (or an
 *     external Google Drive / Notion link).
 *  3. Pick a `spine` color key (see SPINE_COLORS in BookBanner).
 * ─────────────────────────────────────────────────────────────
 */
export type Shelf = "academic" | "record" | "design";

export type LibraryItem = {
  id: string;
  shelf: Shelf;
  title: string;
  subtitle?: string;
  description: string;
  /** e.g. "Electronics 1", "Constitution", "Pubmat Templates" */
  category: string;
  author?: string;
  year?: string | number;
  /** PDF / DOCX / PPTX / ZIP / FIGMA / LINK / IMAGE */
  format: string;
  size?: string;
  pages?: number;
  href: string;
  cover?: string;
  tags?: string[];
  spine?: "navy" | "blue" | "cyan" | "cream" | "slate" | "indigo";
  featured?: boolean;
  updatedAt?: string;
};

export const academicShelf: LibraryItem[] = [
  {
    id: "electronics-1-reviewer",
    shelf: "academic",
    title: "Electronics 1 Reviewer",
    subtitle: "Diodes, BJTs, FETs & Biasing",
    description:
      "Compiled lecture notes, solved problems, and board-exam style questions covering semiconductor fundamentals through small-signal analysis.",
    category: "Electronics",
    author: "Academics Committee",
    year: 2025,
    format: "PDF",
    size: "6.4 MB",
    pages: 148,
    href: "/materials/library/electronics-1-reviewer.pdf",
    tags: ["reviewer", "2nd year", "board subject"],
    spine: "navy",
    featured: true,
    updatedAt: "2026-01-12",
  },
  {
    id: "signals-systems-notes",
    shelf: "academic",
    title: "Signals & Systems Handbook",
    subtitle: "Fourier, Laplace & Z-Transform cheat sheets",
    description:
      "A condensed handbook of transform tables, convolution tricks, and LTI system properties with worked examples.",
    category: "Signals",
    author: "Academics Committee",
    year: 2025,
    format: "PDF",
    size: "3.1 MB",
    pages: 72,
    href: "/materials/library/signals-systems-handbook.pdf",
    tags: ["handbook", "3rd year"],
    spine: "blue",
    updatedAt: "2025-11-20",
  },
  {
    id: "communications-1",
    shelf: "academic",
    title: "Communications 1 Formula Bank",
    subtitle: "AM · FM · Noise · Transmission Lines",
    description: "Every formula you need for Communications 1 organized per topic with unit reminders.",
    category: "Communications",
    author: "Volunteer Contributors",
    year: 2024,
    format: "PDF",
    size: "1.8 MB",
    pages: 36,
    href: "/materials/library/communications-1-formula-bank.pdf",
    tags: ["formulas", "3rd year", "board subject"],
    spine: "cyan",
    updatedAt: "2025-09-02",
  },
  {
    id: "logic-circuits-lab",
    shelf: "academic",
    title: "Logic Circuits Laboratory Manual",
    subtitle: "Experiments 1–12 with Verilog supplements",
    description: "Complete lab manual with schematics, truth tables, and FPGA-ready Verilog modules for each experiment.",
    category: "Digital",
    author: "ECE Department · IECES Edit",
    year: 2025,
    format: "PDF",
    size: "9.7 MB",
    pages: 210,
    href: "/materials/library/logic-circuits-lab-manual.pdf",
    tags: ["laboratory", "2nd year"],
    spine: "indigo",
    updatedAt: "2025-08-15",
  },
  {
    id: "ece-laws-ethics",
    shelf: "academic",
    title: "ECE Laws, Contracts & Ethics Primer",
    subtitle: "RA 9292 explained",
    description: "Plain-language guide to the Electronics Engineering Law of 2004 and the code of ethics every ECE must know.",
    category: "Professional",
    author: "External Affairs",
    year: 2024,
    format: "PDF",
    size: "1.2 MB",
    pages: 28,
    href: "/materials/library/ece-laws-ethics-primer.pdf",
    tags: ["RA 9292", "4th year", "board subject"],
    spine: "cream",
    updatedAt: "2025-06-30",
  },
  {
    id: "matlab-starter",
    shelf: "academic",
    title: "MATLAB & Octave Starter Kit",
    subtitle: "Scripts for signals, filters & plots",
    description: "Ready-to-run scripts and a quick syntax guide so you can spend lab time on analysis, not debugging.",
    category: "Tools",
    author: "Academics Committee",
    year: 2025,
    format: "ZIP",
    size: "2.2 MB",
    href: "/materials/library/matlab-starter-kit.zip",
    tags: ["software", "all years"],
    spine: "slate",
    updatedAt: "2025-10-05",
  },
];

/**
 * RECORDS  ·  Organization matters & records
 * Drop files into /public/materials/records/
 */
export const recordsShelf: LibraryItem[] = [
  {
    id: "constitution-bylaws",
    shelf: "record",
    title: "Constitution & By-Laws",
    subtitle: "Amended 2024 Edition",
    description: "The governing document of IECES – RTU: membership, officers, elections, finances, and amendments.",
    category: "Governance",
    author: "Executive Board",
    year: 2024,
    format: "PDF",
    size: "840 KB",
    pages: 24,
    href: "/materials/records/constitution-and-bylaws.pdf",
    tags: ["governance"],
    spine: "navy",
    featured: true,
    updatedAt: "2024-08-01",
  },
  {
    id: "financial-report-1st-sem",
    shelf: "record",
    title: "Financial Report · 1st Semester",
    subtitle: "A.Y. 2025–2026 · Audited",
    description: "Statement of collections and disbursements with supporting receipts summary, signed by the Treasurer and Auditor.",
    category: "Financial",
    author: "Treasurer & Auditor",
    year: 2026,
    format: "PDF",
    size: "1.4 MB",
    pages: 12,
    href: "/materials/records/financial-report-1st-sem.pdf",
    tags: ["finance", "transparency"],
    spine: "cyan",
    updatedAt: "2026-01-20",
  },
  {
    id: "gpoa-2025-2026",
    shelf: "record",
    title: "General Plan of Activities",
    subtitle: "A.Y. 2025–2026 · OSA Approved",
    description: "The full approved GPOA document including objectives, budgets, and committee assignments per activity.",
    category: "GPOA",
    author: "Executive Board",
    year: 2025,
    format: "PDF",
    size: "2.0 MB",
    pages: 18,
    href: "/materials/records/gpoa-2025-2026.pdf",
    tags: ["gpoa", "planning"],
    spine: "blue",
    updatedAt: "2025-09-10",
  },
  {
    id: "ga-minutes-q1",
    shelf: "record",
    title: "General Assembly Minutes",
    subtitle: "1st Semester · Minutes of the Meeting",
    description: "Attendance, agenda, resolutions, and action items from the first-semester general assembly.",
    category: "Minutes",
    author: "Secretary",
    year: 2025,
    format: "PDF",
    size: "620 KB",
    pages: 8,
    href: "/materials/records/ga-minutes-1st-sem.pdf",
    tags: ["minutes"],
    spine: "slate",
    updatedAt: "2025-10-02",
  },
  {
    id: "board-resolutions",
    shelf: "record",
    title: "Executive Board Resolutions",
    subtitle: "Resolutions 001–006 · Compiled",
    description: "Compiled official resolutions passed by the Executive Board for the current academic year.",
    category: "Executive",
    author: "Executive Board",
    year: 2026,
    format: "PDF",
    size: "510 KB",
    pages: 10,
    href: "/materials/records/board-resolutions-compiled.pdf",
    tags: ["executive"],
    spine: "indigo",
    updatedAt: "2026-02-01",
  },
  {
    id: "accomplishment-report",
    shelf: "record",
    title: "Accomplishment Report",
    subtitle: "A.Y. 2024–2025",
    description: "Year-end accomplishment report submitted to the Office of Student Affairs with photo documentation.",
    category: "Reports",
    author: "Executive Board",
    year: 2025,
    format: "PDF",
    size: "14.2 MB",
    pages: 46,
    href: "/materials/records/accomplishment-report-2024-2025.pdf",
    tags: ["reports"],
    spine: "cream",
    updatedAt: "2025-07-15",
  },
];

/**
 * DESIGNS  ·  Visual materials & brand assets
 * Drop files into /public/materials/designs/
 */
export const designsShelf: LibraryItem[] = [
  {
    id: "brand-kit",
    shelf: "design",
    title: "IECES Brand Identity Kit",
    subtitle: "Logo, colors, typography & usage rules",
    description: "Official logo files (PNG/SVG), the blue-silk brand palette, type pairings, and do's & don'ts for all publications.",
    category: "Brand",
    author: "Creatives Committee",
    year: 2025,
    format: "ZIP",
    size: "38 MB",
    href: "/materials/designs/ieces-brand-kit.zip",
    cover: "/materials/designs/brand-kit-cover.jpg",
    tags: ["logo", "palette", "fonts"],
    spine: "blue",
    featured: true,
    updatedAt: "2025-08-20",
  },
  {
    id: "logo-pack",
    shelf: "design",
    title: "Official Logo Pack",
    subtitle: "Seal · Wordmark · Monochrome",
    description: "High-resolution seal and wordmark in full color, white, and black variants for print and digital.",
    category: "Logo",
    author: "Creatives Committee",
    year: 2025,
    format: "PNG",
    size: "12 MB",
    href: "/brand/logo.png",
    cover: "/brand/logo.png",
    tags: ["logo"],
    spine: "navy",
    updatedAt: "2025-08-20",
  },
  {
    id: "pubmat-templates",
    shelf: "design",
    title: "Pubmat Templates",
    subtitle: "Canva & Figma · Square, Story, Cover",
    description: "Editable templates for announcements, event posters, and financial reports consistent with the brand kit.",
    category: "Templates",
    author: "Creatives Committee",
    year: 2026,
    format: "LINK",
    href: "https://www.canva.com/",
    cover: "/materials/bulletin/pubmat-ecetss.jpg",
    tags: ["canva", "figma", "templates"],
    spine: "cyan",
    updatedAt: "2026-01-05",
  },
  {
    id: "event-photos",
    shelf: "design",
    title: "Event Photo Archive",
    subtitle: "Documentation · A.Y. 2025–2026",
    description: "Curated photo documentation from General Assemblies, ECETSS, and outreach programs.",
    category: "Photos",
    author: "Documentation Team",
    year: 2026,
    format: "LINK",
    href: "https://drive.google.com/",
    cover: "/materials/bulletin/pubmat-genassembly.jpg",
    tags: ["photos", "drive"],
    spine: "slate",
    updatedAt: "2026-02-10",
  },
  {
    id: "certificate-templates",
    shelf: "design",
    title: "Certificate Templates",
    subtitle: "Participation · Appreciation · Recognition",
    description: "Print-ready A4 landscape certificate templates with signature placeholders.",
    category: "Templates",
    author: "Creatives Committee",
    year: 2025,
    format: "PPTX",
    size: "4.5 MB",
    href: "/materials/designs/certificate-templates.pptx",
    cover: "/materials/bulletin/pubmat-finance.jpg",
    tags: ["certificates"],
    spine: "cream",
    updatedAt: "2025-11-11",
  },
];

export const shelves: Record<Shelf, { title: string; blurb: string; href: string; items: LibraryItem[] }> = {
  academic: {
    title: "Academic Materials",
    blurb: "Reviewers, handbooks, lab manuals, and tools curated by the Academics Committee.",
    href: "/library",
    items: academicShelf,
  },
  record: {
    title: "Organization Records",
    blurb: "Constitution, financial reports, GPOA documents, minutes, and resolutions — open for every member.",
    href: "/library/records",
    items: recordsShelf,
  },
  design: {
    title: "Design & Visual Materials",
    blurb: "Brand kit, logo pack, templates, and photo archives used across IECES publications.",
    href: "/library/designs",
    items: designsShelf,
  },
};

export const allLibraryItems: LibraryItem[] = [...academicShelf, ...recordsShelf, ...designsShelf];
