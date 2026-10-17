# IECES – RTU · Official Website

> **Easy for you, ECE for us.**
> Transparency hub of the Institute of Electronics Engineering Students – Rizal Technological University.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Drizzle ORM · PostgreSQL**. Optimized for **GitHub → Vercel** deployment.

📱 Maintaining the site from Android or iPhone? Read **[MOBILE-EDITING-GUIDE.md](./MOBILE-EDITING-GUIDE.md)** for exact upload, replacement, preview, and troubleshooting steps.

---

## ✨ Features

| Page | Route | What it does |
|------|-------|--------------|
| Home | `/` | Hero with the tagline, quick access cards, latest posts, upcoming GPOA, featured library items |
| Transparency Bulletin | `/bulletin` | Facebook-style infinite-scroll feed · category filters (Announcement, Pubmat, Financial, GPOA, Executive, Academic) · reactions · share · single-post pages |
| Grievance Form | `/grievance` | Suggestions / concerns / questions / commendations · anonymous toggle · ticket number · **status tracker** · **QR code** + copy link |
| Library | `/library` | Book-shelf of academic materials (banner + 3D book design) · search, filter, sort |
| Records | `/library/records` | Organization records: constitution, financial reports, GPOA, minutes, resolutions |
| Design Materials | `/library/designs` | Brand kit, logo pack, templates, photo archive |
| GPOA Calendar | `/calendar` | Trello-style board (Planned / Ongoing / Accomplished) + month calendar view · activity detail modal · optional Trello/Google Calendar embed |
| Links & Contact | `/links` | Community chats, official pages, forms, useful links, contact info, executive board |
| Officer Dashboard | `/admin` | Password-protected: directly upload pubmats/documents, publish/pin/delete posts, triage grievances |

Also: SEO metadata, Open Graph, `sitemap.xml`, `robots.txt`, `/api/health`, 404 page, responsive Material-inspired UI.

---

## 🗂 Project structure (where to drag & drop)

```
├── public/
│   ├── brand/                 ← logo.png, hero-texture.jpg (replace with official assets)
│   └── materials/             ← 📁 DRAG & DROP ZONE
│       ├── bulletin/          ← pubmat images referenced by posts
│       ├── library/           ← reviewers, handbooks (PDF/ZIP)
│       ├── records/           ← constitution, financial reports, minutes
│       └── designs/           ← brand kit, templates
├── src/
│   ├── content/               ← ✏️ EDIT THESE to update the site (no code knowledge needed)
│   │   ├── site.ts            ← name, tagline, emails, socials, officers, navigation
│   │   ├── library.ts         ← academicShelf / recordsShelf / designsShelf entries
│   │   ├── gpoa.ts            ← GPOA activities (board + calendar), Trello embed URL
│   │   ├── links.ts           ← community chats, official pages, forms, resources
│   │   └── bulletin-seed.ts   ← first-run posts (only used when the DB is empty)
│   ├── app/                   ← routes (App Router)
│   │   ├── page.tsx           ← Home
│   │   ├── bulletin/          ← feed + [slug]
│   │   ├── grievance/
│   │   ├── library/ (+records, +designs)
│   │   ├── calendar/
│   │   ├── links/
│   │   ├── admin/ (+login)
│   │   └── api/               ← posts, grievances, admin auth, health
│   ├── components/            ← UI grouped per feature (bulletin, library, grievance, calendar, admin, layout, ui)
│   ├── db/                    ← schema.ts (Drizzle) + index.ts (client)
│   └── lib/                   ← data access + helpers
├── drizzle.config.json
├── .env.example
└── next.config.ts
```

### Updating content (the 3 common tasks)

1. **Post an announcement / pubmat / financial report** → go to `/admin`, log in, choose the image/document directly from your device, and publish. The files upload to Vercel Blob automatically. Existing URLs remain available under the form's Advanced section.
2. **Add a library item** → drop the file in `public/materials/<library|records|designs>/`, add an object to the matching array in `src/content/library.ts`.
3. **Update the GPOA** → edit `src/content/gpoa.ts` (change `status` to move cards between columns).

Commit → push → Vercel redeploys in ~1 minute.

### Images missing after a phone upload?

Open the expected asset directly at `https://your-site.vercel.app/brand/logo.png`. A 404 means the file is not present in GitHub under that exact path and letter casing. GitHub/Vercel paths are case-sensitive (`logo.png` and `Logo.PNG` differ). Keep the official source image unedited and named exactly `logo.png`; upload it with GitHub's **Add file → Upload files**, verify that GitHub previews it, then redeploy. Missing pubmats and covers show a branded emergency fallback instead of a broken-image icon.

---

## 🚀 Local development

```bash
cp .env.example .env            # set DATABASE_URL + ADMIN_PASSWORD
npm install
npx drizzle-kit push            # creates the tables
npm run dev                     # http://localhost:3000
```

The bulletin auto-seeds from `src/content/bulletin-seed.ts` the first time it loads with an empty `posts` table.

---

## ☁️ Deploy to Vercel (GitHub)

1. Push this folder to a GitHub repository.
2. Create a Postgres database — **Neon** (free), **Vercel Postgres**, or **Supabase** — copy the connection string.
3. In Vercel → **New Project** → import the repo. Framework is auto-detected (Next.js).
4. Add **Environment Variables**:
   - `DATABASE_URL` = your Postgres connection string (append `?sslmode=require` for Neon/Supabase)
   - `ADMIN_PASSWORD` = a strong password for `/admin`
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app` (used by the QR code)
5. In Vercel → **Storage**, create a **Public Blob** store and connect it to this project. Vercel automatically adds `BLOB_READ_WRITE_TOKEN`; never commit that token to GitHub.
6. Deploy. After the first deploy run the schema push once from your machine:
   ```bash
   DATABASE_URL="<prod connection string>" npx drizzle-kit push
   ```
   (or add `"postinstall": "drizzle-kit push"` if you prefer automatic pushes).
7. Open `/admin/login`, sign in, choose files from your device, and start posting.

> **Custom domain:** Vercel → Settings → Domains. Update `NEXT_PUBLIC_SITE_URL` afterwards so the grievance QR points to the new domain.

---

## 🔐 Security notes

- Admin session = HMAC-signed, HttpOnly cookie (7 days). No third-party auth needed.
- Blob upload tokens are short-lived, officer-authenticated, path-scoped, MIME-restricted, and size-limited.
- Grievance endpoint has validation + honeypot. Anonymous submissions never store identity fields.
- `.env` is git-ignored. Only `NEXT_PUBLIC_*` variables reach the browser.

## 🧰 Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npx drizzle-kit push` | Apply schema to DB |
| `npx drizzle-kit studio` | Browse DB in a GUI |

---

© Institute of Electronics Engineering Students – RTU · Est. 1986
