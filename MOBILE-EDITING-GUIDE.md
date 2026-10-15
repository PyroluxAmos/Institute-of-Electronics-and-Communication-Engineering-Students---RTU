# Updating the IECES Website From a Phone

This guide is for officers maintaining the GitHub repository using Android or iPhone. You do not need a computer for routine text, link, logo, background, pubmat, and document updates.

## Recommended phone setup

Use **Chrome or Safari**, not only the GitHub app. If a GitHub control is hidden:

- Chrome: menu `⋮` → **Desktop site**
- Safari: `aA` → **Request Desktop Website**

The GitHub app is useful for reviewing commits, but the browser is usually easier for uploading files and editing code.

---

## A. Replace an image without changing code

The safest method is to preserve the exact filename and path.

### Example: replace the official logo

Required path:

```text
public/brand/logo.png
```

1. Prepare the new official image on your phone.
2. Rename it exactly `logo.png` (lowercase).
3. Open the repository on GitHub.
4. Navigate to `public` → `brand`.
5. Open the existing `logo.png`.
6. Tap `…` and choose **Delete file** (or the trash icon).
7. Enter a commit message such as `Remove old official logo`.
8. Choose **Commit directly to the main branch** and commit.
9. Return to `public/brand`.
10. Tap **Add file** → **Upload files**.
11. Select the new `logo.png` from your phone.
12. Confirm GitHub shows the filename exactly as `logo.png`.
13. Commit with a message such as `Upload updated official logo`.
14. Vercel will redeploy automatically.

GitHub may allow dragging/uploading a replacement directly, but deleting and uploading in two commits is the most reliable phone workflow.

### Example: replace the homepage background

Required path:

```text
public/brand/hero-texture.jpg
```

Follow the same steps, but rename the new image exactly `hero-texture.jpg`.

Recommended homepage background:

- Format: JPG
- Orientation: landscape
- Size: 1920 × 1080 or larger
- File size: ideally under 2 MB
- Keep important details away from the left-center area because the headline appears there
- Dark blue/cyan images work best because white text overlays the image

The website adds a dark readability overlay automatically.

### Exact capitalization matters

Vercel runs on Linux, where these are different files:

```text
logo.png
Logo.png
logo.PNG
```

Always use the exact lowercase names documented below.

---

## B. Replaceable design files

| What changes | Exact GitHub path | Recommended format |
|---|---|---|
| Official logo everywhere | `public/brand/logo.png` | Transparent PNG, square, 1000×1000+ |
| Homepage hero background | `public/brand/hero-texture.jpg` | JPG, landscape, 1920×1080+ |
| General Assembly sample pubmat | `public/materials/bulletin/pubmat-genassembly.jpg` | JPG, square |
| ECETSS sample pubmat | `public/materials/bulletin/pubmat-ecetss.jpg` | JPG, square |
| Financial sample pubmat | `public/materials/bulletin/pubmat-finance.jpg` | JPG, square |
| Brand kit library cover | `public/materials/designs/brand-kit-cover.jpg` | JPG, landscape or square |

Missing optional pubmats and library covers display a branded fallback instead of a broken image.

---

## C. Add a new image instead of replacing one

Use this for a new bulletin post or library material.

1. Give the file a web-safe name: lowercase, hyphens, no spaces.
   - Good: `ece-week-2026.jpg`
   - Avoid: `ECE Week Final FINAL (1).JPG`
2. In GitHub, open the target folder.
3. Tap **Add file** → **Upload files**.
4. Select the file and commit it.
5. Its website path starts after `public`.

Example GitHub file:

```text
public/materials/bulletin/ece-week-2026.jpg
```

Website/admin image URL:

```text
/materials/bulletin/ece-week-2026.jpg
```

Do not include `public` in the website URL.

### New bulletin pubmat

1. Upload the image to `public/materials/bulletin/`.
2. Wait for Vercel to deploy it.
3. Log in to `/admin`.
4. Create a post.
5. In **Image URL**, enter `/materials/bulletin/your-file.jpg`.

### New library cover or file

1. Upload the cover/file under the matching `public/materials/` folder.
2. Edit `src/content/library.ts` and add or update the item path.
3. Commit. Vercel redeploys.

---

## D. Edit text, links, officers, and activities on GitHub mobile

1. Open the required `.ts` file in GitHub.
2. Tap the pencil icon **Edit this file**.
3. Change only the text between quotation marks unless you understand the structure.
4. Do not remove commas, quotes, brackets, or braces.
5. Open **Preview changes** and review the highlighted lines.
6. Commit directly to `main` with a clear message.

### Content map

| What to edit | File |
|---|---|
| Organization name, tagline, emails, social links, officers | `src/content/site.ts` |
| Community chats, forms, and useful links | `src/content/links.ts` |
| GPOA activities, dates, statuses, venue, budget | `src/content/gpoa.ts` |
| Library academic items, records, and design assets | `src/content/library.ts` |
| Starter bulletin posts used only for a new empty database | `src/content/bulletin-seed.ts` |

Routine bulletin posts should be created in `/admin`, not by editing the starter seed file.

---

## E. Confirm an uploaded file before checking the page

Open the asset directly in your browser:

```text
https://YOUR-SITE.vercel.app/brand/logo.png
https://YOUR-SITE.vercel.app/brand/hero-texture.jpg
https://YOUR-SITE.vercel.app/materials/bulletin/ece-week-2026.jpg
```

Results:

- Image appears: the upload/path is correct.
- `404`: the file is missing, misnamed, in the wrong folder, or not deployed yet.
- Old image appears: wait for deployment to finish, refresh, or open an incognito tab.

Then check Vercel:

1. Open Vercel → project → **Deployments**.
2. The newest deployment should show **Ready**.
3. Its commit message should match your GitHub commit.
4. If it failed, open the deployment and read the first red error.

---

## F. Safest approval workflow for presidential design changes

1. Create a GitHub branch such as `design-update` instead of committing to `main`.
2. Upload the requested assets to that branch.
3. Vercel creates a **Preview Deployment** with a temporary preview link.
4. Send the preview link to the president.
5. After approval, merge the branch/pull request into `main`.
6. Vercel deploys the approved design to the official `.vercel.app` domain.

For quick routine changes, direct commits to `main` are acceptable. For major redesigns, always use a preview branch.

---

## G. Important limitations

- GitHub is suitable for images and documents that change occasionally.
- Avoid files larger than 25 MB in GitHub. Use Google Drive, Cloudinary, or Vercel Blob for large archives/videos.
- Do not upload `.env`, passwords, database URLs, student private data, or grievance exports.
- Compress images before uploading for faster mobile performance.
- Never delete `src`, `package.json`, `next.config.ts`, or database files when replacing assets.
