# ML @ Columbia

Marketing site for a student-run machine learning club. Two pages, no build step,
no framework — plain HTML, one stylesheet, three scripts.

```
index.html          home
projects.html       project index, filterable by semester
assets/styles.css   design tokens + all layout (light and dark)
assets/data.js      the project list — edit this to add a project
assets/motifs.js    generated SVG artwork (no photos, no faces)
assets/site.js      rendering, filters, hero canvas
vercel.json         cleanUrls so /projects resolves
```

## Run it locally

```bash
npx serve .
```

## Deploy

```bash
vercel        # preview
vercel --prod # production
```

## Adding a project

Append an entry to `assets/data.js`. Both pages read from it.

```js
{ n:"Name", group:"Applied ML", org:"With a fintech startup",
  k:"curve", seed:42, feat:true,
  t:"A sentence or two on what it does.",
  tags:["PyTorch","Modal"] }
```

- `k` picks the generated artwork: `curve` (training run), `bars` (spectrogram),
  `scatter` (embedding), `grid` (segmentation mask), `graph` (k-NN).
- `seed` makes that artwork deterministic — change it to reroll.
- `feat: true` puts it in the three-up row on the home page.
- New `group` values create a new section and a new filter chip automatically.
- `org` is the provenance line. Keep partners generic — "a big tech company", not the logo.

## Placeholders to replace

- `hello@mlatcolumbia.org` — the contact address, in both pages' nav, CTAs and footer.
- Footer GitHub and Instagram links currently point at the bare sites.
- Stats on the home page (10 / 41 / 7) and the recruitment dates.
