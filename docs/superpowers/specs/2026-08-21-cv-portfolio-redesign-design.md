# CV / Portfolio Redesign — Design Spec

Date: 2026-08-21
Owner: Chan Hwi Lee (이찬휘)
Repo: `Apollo-Chanhwi-Lee/Portfolio` (this repo)

## Problem

The repo contained a generic "frontend developer" template (fake bio, fake
projects, dark glassmorphic theme) unrelated to the owner's actual
background. The owner is a structural biology / biochemistry researcher
(KNU, M.S. in Structural Molecular Biology) currently transitioning toward
data/AI tooling (SNU Big Data AI Fintech program), targeting grad
applications, industry (bio/pharma) job hunting, and general professional
presence simultaneously.

Reference site: https://hyunwoopark.com (academic CV site, Next.js +
chakra-ui). We are not adopting its stack, only its visual language and
information architecture.

## Content sources

Pulled from the owner's own resume/portfolio files (SSH'd from their
Windows PC, `D:\개인서류\1.이력서\...`):
- `20260715 잡코리아 이력서.pdf` — general resume (education, experience,
  certifications, target roles)
- `이찬휘_대웅제약_경력기술서.pdf` — detailed career description
- `이찬휘_포트폴리오.pdf` — Daewoong-application portfolio deck with the
  CgDHQD structure-pipeline figures and headshot photo
- Google Scholar profile (`user=_7ZSTOgAAAAJ`) — cross-checked publication
  list

Extracted asset: headshot photo (`pdfimages` from portfolio PDF page 2),
embedded as a data URI in the mockup; will be a real file in the repo.

## Decisions made (via brainstorming Q&A)

1. **Overhaul the existing repo in place** — keep `Apollo-Chanhwi-Lee/Portfolio`,
   replace all content/styling, don't fork a new repo.
2. **Audience**: all three — grad applications, industry job hunting, and
   general professional presence. No single narrow framing.
3. **Visual style**: light, minimal, black-and-white academic style modeled
   on hyunwoopark.com — not the prior dark glassmorphic theme.
4. **Language**: bilingual KO/EN toggle, Korean default, no page reload
   (client-side dictionary swap).
5. **Employment history scope**: omit the current Coupang Fulfillment
   warehouse job and short part-time gigs (fitness center, hotel front
   desk) — the site reads as a research CV, not a full work history.
6. **Versatility section**: include a "Side Projects" section surfacing the
   owner's coding side-projects (tm-widget, ai-token-monitor, etc.) and the
   SNU program, reflecting their own self-description ("바이오계 팔색조").
7. **Hosting**: GitHub Pages first, via this repo, at
   `apollo-chanhwi-lee.github.io` (free, zero setup). Migrating to Vercel
   later is left open and does not require any code changes since the site
   is framework-free static HTML/CSS/JS.
8. **Domain**: `chanhwi.com` was investigated and is available to purchase
   (~$10–15/yr) but is NOT part of this build — owner deferred it. No
   custom-domain wiring (CNAME file, DNS) in this pass.

## Visual design system

Validated via a published mockup
(`/private/tmp/.../scratchpad/portfolio_mockup/index.html`, screenshotted
against the live hyunwoopark.com reference for fidelity). Key tokens:

- **Layout**: two-column, sticky left sidebar (photo, name, degree line,
  contact links, circular social-icon buttons) + right scrolling content
  column with sectioned blocks (Education, Experience, Featured Research,
  Publications, Skills, Side Projects, Certifications & Languages).
- **Color**: true black/white/gray chrome (`--paper: #fff`, `--ink: #111114`,
  `--muted`, `--border` grays). No decorative accent color anywhere in nav,
  buttons, or structural chrome. Color is reserved *only* for functional
  publication-category badges (3 muted hues: blue/pink/amber tag tokens),
  mirroring how the reference uses color solely for UTD24/FT50/ABS tags.
- **Typography**: Public Sans throughout (body + headings), no serif, no
  monospace — matches the reference's plain sans-serif treatment. Tabular
  numerals enabled via `font-feature-settings`.
- **Dark mode**: full token-based light/dark support (`prefers-color-scheme`
  media query + `data-theme` override), plus an in-page toggle button (◐)
  mirroring the reference's own dark-mode toggle.
- **CV download**: print-stylesheet-driven (`window.print()`), no PDF
  generation pipeline.

## Content architecture (single scrolling page)

1. Sidebar: photo, name (KO/EN), degree/role line, email, Google Scholar,
   GitHub, social icon row
2. Intro tagline (one line, bilingual)
3. Education — SNU program (in progress) → KNU M.S. → KNU B.S.
4. Experience — TG Biotech (2023–2025), KNU undergrad researcher (2020–2021)
5. Featured Research — CgDHQD structure pipeline as a mini case study
   (6-step pipeline diagram, resolution/PDB stat row, 3 key findings)
6. Publications — 3 real papers, bracketed citation-style
   (`[J1]`/`[J2]`/`[J3]`), full author lists, DOI links, first-author badge,
   PDB badges
7. Skills — 3 grouped categories (Protein Science / Cell & Molecular Assays
   / Structural Tools)
8. Side Projects — 4 GitHub repos framed as the "+data/tools" side of the
   profile
9. Certifications & Languages — 4 entries
10. Footer

## Stack

Plain HTML/CSS/JS, no build step, no framework — matches the existing
repo's `app.py` local static-file-server pattern, which stays unchanged.
Content (education/experience/publications/skills/projects/certs) lives as
JS data arrays rendered client-side, so the bilingual dictionary swap and
future content edits don't require touching markup.

## Out of scope for this pass

- Custom domain (`chanhwi.com`) wiring
- Vercel migration
- Real PDF export pipeline (using browser print instead)
- Any content beyond what's in the sources above (no fabricated projects,
  no invented publications)
