# Johann Philippe — website

Personal site (music · computer music · outreach · agenda), built with
[Hugo](https://gohugo.io). Bilingual FR/EN, no database, no JavaScript framework —
just Markdown files and a hand-written theme. Fully F/LOSS.

## Preview locally

```sh
hugo server        # open http://localhost:1313  (drafts hidden)
hugo server -D     # include drafts
```

## Publishing

Push to `main`. GitHub Actions builds the site and deploys it to GitHub Pages
(`.github/workflows/deploy.yml`). Nothing else to do.

---

## Writing a new article

Every article is a **folder** inside a section, containing one Markdown file per
language plus its images:

```
content/music/my-piece/
  index.fr.md      ← French version
  index.en.md      ← English version (optional)
  cover.jpg        ← images live next to the text
  photo1.jpg
```

The folder name becomes the URL (`/music/my-piece/`) and is shared by both languages.
Keep it lowercase, no spaces or accents.

### Sections
- `content/music/`          — compositions & performances
- `content/computer-music/` — dev projects
- `content/outreach/`       — workshops, residencies
- `content/agenda/`         — events
- `content/posts/`          — news (shown on the home page)

### Front matter (the header between `---`)

Music / outreach post:

```yaml
---
title: "My piece"
date: 2026-05-18
summary: "One-line subtitle shown under the title in listings (optional)."
category: composition        # music only: composition | performance
cover: "cover.jpg"           # a file in this folder, OR a full https:// URL
cover_credit: "Photographer" # optional; shows a small "© Photographer" on the cover
player: "https://www.youtube.com/watch?v=..."   # optional embedded player
gallery:                     # optional small gallery
  - "photo1.jpg"             # plain form: no credit
  - src: "photo2.jpg"        # credited form
    credit: "Photographer"
---
Your text in Markdown here.
```

### Photo credits
Any image can carry an optional credit, shown as a small "© …" overlay in the corner:
- **Cover** → `cover_credit: "Name"` in the front matter.
- **Gallery** → write the item as `- src: "…"` + `credit: "…"` (plain `- "…"` = no credit).
- **Home hero** → `home_image_credit` in `config/_default/params.toml`.
- **Inline image in the text** → use the `pic` shortcode:
  ```
  {{</* pic "photo.jpg" "Photographer" */>}}
  {{</* pic "photo.jpg" "Photographer" "An optional caption" */>}}
  ```
  (Just the credit is optional too: `{{</* pic "photo.jpg" */>}}`.)

Computer-music post — add a repo link:

```yaml
---
title: "my-tool"
date: 2026-06-10
github: "https://github.com/johannphilippe/my-tool"
links:                       # optional extra links
  - name: "Docs"
    url: "https://..."
---
```

Agenda event:

```yaml
---
title: "Concert name"
date: 2026-09-27             # future = "upcoming", past = "past" (automatic)
time: "20:30"
location: "Venue, City"
link: "https://..."          # optional
---
```

### Embedded players
`player:` (and the inline `{{</* embed "URL" */>}}` shortcode) auto-detect
**YouTube, Vimeo, PeerTube, Bandcamp, SoundCloud**. Just paste the normal page/share
URL. For Bandcamp, paste the `src` URL from its "Embed this album" iframe code.

### Images

**In an article:** drop the file in the article's own folder and reference it by
filename (`cover.jpg`, `gallery1.jpg`, …), or use a full `https://` URL for a remote
image. Files co-located with the post are the simplest option.

**Where to put pictures in general — two folders:**
- The **article's own folder** (a page bundle) → optimised at build. Best for post images.
- `assets/` → also optimised at build. This is where the home hero lives
  (`assets/img/home.jpg`).
- `static/` → copied **as-is**, no processing. Use for already-optimised files or SVGs;
  reference them from the site root (a file `static/img/x.jpg` → `/img/x.jpg`).

**Automatic optimisation.** Any *local* raster image (JPEG/PNG/TIFF/BMP/WebP) is resized
and converted to **WebP** at build time. You can commit a full-size photo and forget
about it. Images are **never upscaled** — a small source stays its own size.

| Where | Max width | Quality |
|---|---|---|
| Home hero | 2000px | 82 |
| Article cover | 1800px | 82 |
| Gallery thumbnail | 700px | 80 |
| Gallery click-through | 1600px | 82 |
| About portrait, inline `pic` | 1400px | 82 |

Remote `https://` images and SVG/GIF are passed through untouched.

**Home hero:** replace `assets/img/home.jpg` with your own picture (any name works —
just update `home_image` in `config/_default/params.toml`). If it's a local file under
`assets/`, it's automatically resized to 2000px wide and served as WebP. A remote
`https://` URL is used as-is.

Tip: keep source photos reasonably sized (≤ ~2500px wide) so the repo stays lean.

---

## Configuration

Everything tweakable lives in `config/_default/params.toml`:

- `agenda = true|false` — show/hide the whole Agenda section (nav included).
- `accent = "#c8a24a"` — the single accent colour.
- `grain = true|false` — the subtle film-grain overlay.
- `[[contact]]` blocks — add as many contact links as you want (About page + footer).

Site languages live in `config/_default/languages.toml`; UI strings (button labels,
section names) in `i18n/fr.toml` and `i18n/en.toml`.
