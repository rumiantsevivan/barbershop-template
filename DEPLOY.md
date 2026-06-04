# DEPLOY.md — Publish to GitHub Pages (+ custom domain)

This is a plain static site (HTML/CSS/JS). No build step. You just push the files
to GitHub and turn on Pages. ~5 minutes.

---

## A. One-time setup (per client site)

You need the `gh` CLI logged in (`gh auth login`) once on your machine.

From inside the site folder (the one containing `index.html`):

```bash
git init
git add -A
git commit -m "Launch <client name> website"

# create a public repo and push (replace the name)
gh repo create <client-slug>-site --public --source=. --push

# enable GitHub Pages from the default branch root
gh api -X POST repos/<your-username>/<client-slug>-site/pages \
  -f "source[branch]=master" -f "source[path]=/"
```

Your site goes live at:
```
https://<your-username>.github.io/<client-slug>-site/
```
(Give it 1–2 minutes the first time.)

> Using the GitHub **website** instead of the CLI? Create a repo, upload all the
> files, then **Settings → Pages → Source: Deploy from a branch → `master` / `/root`
> → Save.**

---

## B. Updating the site later

After editing `data.js` (or swapping photos):

```bash
git add -A
git commit -m "Update content"
git push
```
Changes go live in ~1 minute. (Hard-refresh with Ctrl+F5 to bust the cache.)

---

## C. Custom domain (e.g. `www.theclient.com`)

### 1. Add a CNAME file to the repo
Create a file named exactly `CNAME` (no extension) in the site root containing
just the domain:

```
www.theclient.com
```

Commit and push it. (Or set it in **Settings → Pages → Custom domain**, which
creates this file for you.)

### 2. Point the domain's DNS at GitHub
At the client's domain registrar (GoDaddy / Namecheap / Google Domains / etc):

**For a `www` subdomain (recommended):**
- Add a **CNAME** record:
  - Host/Name: `www`
  - Value/Target: `<your-username>.github.io`

**For the root/apex domain (`theclient.com` with no www):**
- Add four **A** records pointing `@` to GitHub's IPs:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- (Optional) also add the `www` CNAME above and let GitHub redirect.

### 3. Turn on HTTPS
In **Settings → Pages**, once DNS resolves (can take 10 min–24 h), tick
**Enforce HTTPS**. Done — the site is live on the client's domain with a free
SSL certificate.

---

## D. Troubleshooting

| Symptom                                   | Fix                                                        |
|-------------------------------------------|------------------------------------------------------------|
| 404 right after enabling Pages            | Wait 1–2 min and refresh; first build takes a moment.      |
| CSS/JS not loading                        | Paths are **relative** (`css/…`, `js/…`) — keep the folder structure intact; don't move files. |
| Old content still showing                 | Hard refresh (Ctrl+F5). GitHub Pages caches briefly.       |
| Custom domain "not properly configured"   | DNS hasn't propagated yet — wait, then re-check in Settings → Pages. |
| Map/photos blank                          | Check `data.js` paths and that images are committed (`git status`). |

---

### File tree (don't rename/move these)
```
index.html  services.html  gallery.html  team.html  contact.html
css/styles.css
js/data.js   ← the ONLY file you edit per client
js/main.js
img/…        ← photos + placeholders
FILL.md  DEPLOY.md
```
