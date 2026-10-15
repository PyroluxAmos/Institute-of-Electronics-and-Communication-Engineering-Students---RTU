# 📁 Materials — drag & drop zone

Drop files here, commit, push → Vercel redeploys automatically.

| Folder        | What goes here                                   | Then edit                         |
|---------------|--------------------------------------------------|-----------------------------------|
| `bulletin/`   | Pubmat images for bulletin posts (JPG/PNG)       | Post from `/admin` (image URL)    |
| `library/`    | Reviewers, handbooks, lab manuals (PDF/ZIP)      | `src/content/library.ts` → `academicShelf` |
| `records/`    | Constitution, financial reports, minutes (PDF)   | `src/content/library.ts` → `recordsShelf`  |
| `designs/`    | Brand kit, templates, logo variations            | `src/content/library.ts` → `designsShelf`  |

Public URL = `/materials/<folder>/<file>` — e.g. `/materials/records/gpoa-2025-2026.pdf`.

> Large files (> 25 MB)? Upload to Google Drive and use the share link as `href` instead.
