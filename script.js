let lang = "ko";
let i18n = {};
let data = { pipeline: [], findings: [], publications: [], skills: [], projects: [], certs: [] };

async function loadContent() {
  const [i18nRes, dataRes] = await Promise.all([
    fetch("content/i18n.json"),
    fetch("content/data.json"),
  ]);
  i18n = await i18nRes.json();
  data = await dataRes.json();
}

function applyLang() {
  const idx = lang === "ko" ? 0 : 1;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[key]) el.textContent = i18n[key][idx];
  });

  const langKo = document.getElementById("langKo");
  const langEn = document.getElementById("langEn");
  langKo.style.fontWeight = lang === "ko" ? "800" : "400";
  langEn.style.fontWeight = lang === "en" ? "800" : "400";
  langKo.style.color = lang === "ko" ? "var(--ink)" : "var(--muted-2)";
  langEn.style.color = lang === "en" ? "var(--ink)" : "var(--muted-2)";

  renderPipeline();
  renderFindings();
  renderPubs();
  renderSkills();
  renderProjects();
  renderCerts();
}

function renderPipeline() {
  document.getElementById("pipeline").innerHTML = data.pipeline
    .map(
      (s, i) => `
      <div class="pipe-step">
        <span class="pipe-num">${String(i + 1).padStart(2, "0")}</span>
        <div class="pipe-label">${lang === "ko" ? s.ko : s.en}</div>
      </div>`
    )
    .join("");
}

function renderFindings() {
  document.getElementById("findingList").innerHTML = data.findings
    .map((f) => `<li>${lang === "ko" ? f.ko : f.en}</li>`)
    .join("");
}

function renderPubs() {
  document.getElementById("pubList").innerHTML = data.publications
    .map(
      (p) => `
      <div class="pub-item">
        <span class="pub-bracket">[${p.bracket}]</span>
        <a class="pub-title" href="${p.doi}" target="_blank" rel="noreferrer">${p.title}</a><br/>
        <span class="pub-authors">${p.authors}</span> <span class="pub-venue">${p.venue}</span>.
        <div class="pub-badges">
          ${p.first ? `<span class="badge ${p.tag}">${lang === "ko" ? "제1저자" : "First author"}</span>` : ""}
          ${p.pdb.map((id) => `<span class="badge tag-a">PDB ${id}</span>`).join("")}
          <a class="badge doi" href="${p.doi}" target="_blank" rel="noreferrer">DOI ↗</a>
        </div>
      </div>`
    )
    .join("");
}

function renderSkills() {
  document.getElementById("skillGrid").innerHTML = data.skills
    .map(
      (g) => `
      <div class="skill-group">
        <h3>${lang === "ko" ? g.ko : g.en}</h3>
        <div class="skill-items">${g.items.map((i) => `<span class="skill-chip">${i}</span>`).join("")}</div>
      </div>`
    )
    .join("");
}

function renderProjects() {
  document.getElementById("projectGrid").innerHTML = data.projects
    .map(
      (p) => `
      <div class="project-card">
        <h3>${p.name}</h3>
        <p>${lang === "ko" ? p.ko : p.en}</p>
        <span class="project-tech">${p.tech}</span>
      </div>`
    )
    .join("");
}

function renderCerts() {
  document.getElementById("certGrid").innerHTML = data.certs
    .map((c) => `<div class="cert-item"><span>${lang === "ko" ? c.ko : c.en}</span><span>${c.date}</span></div>`)
    .join("");
}

function initLangToggle() {
  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "ko" ? "en" : "ko";
    applyLang();
  });
}

function initThemeToggle() {
  let theme = "auto";
  document.getElementById("themeToggle").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  });
}

async function init() {
  await loadContent();
  initLangToggle();
  initThemeToggle();
  applyLang();
}

document.addEventListener("DOMContentLoaded", init);
