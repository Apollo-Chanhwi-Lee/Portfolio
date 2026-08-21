# Portfolio

Chan Hwi Lee's CV / portfolio site — live at
https://apollo-chanhwi-lee.github.io/Portfolio/

## Structure

- `index.html` / `styles.css` / `script.js` — the site itself (plain
  HTML/CSS/JS, no build step)
- `content/i18n.json` — bilingual (KO/EN) text dictionary for all
  `data-i18n="..."`-tagged elements in `index.html`
- `content/data.json` — structured content for the repeated sections
  (research pipeline, findings, publications, skills, side projects,
  certifications)
- `scripts/validate_content.py` — checks that `content/i18n.json` and
  `content/data.json` are internally consistent and that every
  `data-i18n` key used in `index.html` has a translation. Run it after
  editing any content file:

  ```bash
  python3 scripts/validate_content.py
  ```

- `app.py` — a zero-dependency local static file server for previewing
  changes:

  ```bash
  python3 app.py
  ```

## Updating content

Edit `content/i18n.json` (one-off text) or `content/data.json`
(publications, skills, projects, certifications, etc.) directly — no code
changes needed for content updates. Run the validator before committing.
