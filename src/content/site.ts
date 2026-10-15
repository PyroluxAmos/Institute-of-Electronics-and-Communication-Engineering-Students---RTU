/**
 * ─────────────────────────────────────────────────────────────
 *  SITE IDENTITY  ·  edit freely
 *  Everything global about the organization lives here.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  shortName: "IECES – RTU",
  acronym: "IECES",
  name: "Institute of Electronics Engineering Students – RTU",
  legalName: "Institute of Electronics and Communication Engineering Students – Rizal Technological University",
  tagline: "Easy for you, ECE for us.",
  established: 1986,
  campus: "RTU Boni Campus, Mandaluyong City",
  description:
    "IECES is the official academic organization of Electronics Engineering students of Rizal Technological University – Mandaluyong campus. We champion transparency, academic excellence, and a community where every ECE student is heard.",
  logo: "/brand/logo.png",
  heroTexture: "/brand/hero-texture.jpg",
  /** Used for the QR code on the grievance page when NEXT_PUBLIC_SITE_URL is not set. */
  fallbackUrl: "https://ieces-rtu.vercel.app",
  email: "ieces@rtu.edu.ph",
  altEmail: "iecesrtu@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/RTUIECES",
    instagram: "https://www.instagram.com/rtuieces",
    tiktok: "https://www.tiktok.com/@rtuieces",
    messenger: "https://m.me/RTUIECES",
  },
  officeHours: "Monday – Friday · 9:00 AM – 5:00 PM",
  officeLocation: "ECE Department Office, College of Engineering & Industrial Technology, RTU Boni Campus",
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/bulletin", label: "Bulletin" },
  { href: "/library", label: "Library" },
  { href: "/calendar", label: "GPOA Calendar" },
  { href: "/links", label: "Links & Contact" },
  { href: "/grievance", label: "Grievance", accent: true },
] as const;

export const officers = [
  { role: "President", name: "To be updated", email: "president@ieces-rtu.ph" },
  { role: "Vice President – Internal", name: "To be updated" },
  { role: "Vice President – External", name: "To be updated" },
  { role: "Secretary", name: "To be updated" },
  { role: "Treasurer", name: "To be updated" },
  { role: "Auditor", name: "To be updated" },
  { role: "Public Relations Officer", name: "To be updated" },
  { role: "Creatives Head", name: "To be updated" },
] as const;
