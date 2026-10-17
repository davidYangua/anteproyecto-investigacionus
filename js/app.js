/**
 * NEXO Research Studio - Orquestador Principal Integrado
 * Archivo: js/app.js
 */

import { FACULTIES_DATA } from "../data/facultiesData.js";
import { SECTIONS_DATA } from "../data/sectionsData.js";
import { THEORIES_DATA } from "../data/theoriesData.js";

import { evaluateCoherenceChain, renderCoherenceChainUI } from "./coherenceChain.js";
import { initSectionStudio, parseAIDictamen } from "./sectionStudio.js";
import { initTheoriesEngine } from "./theoriesEngine.js";
import { initJurySimulator } from "./jurySimulator.js";
import { initLogAndReport, renderReportView } from "./logAndReport.js";
import { renderSankeyChart } from "./sankeyChart.js";
import { buildHiloPrompt, buildSectionPrompt, buildReportPrompt } from "./aiPrompts.js";
import { exportToWord, exportStateToJSON, importStateFromJSON } from "./reportExporter.js";

const STORAGE_KEY = "nexo_research_studio_state_v1";

// Proyecto de ejemplo predeterminado (Burnout y Satisfacción Laboral - USS)
const EXAMPLE_PROJECT = {
  student: {
    nombre: "María Fernanda Torres",
    facultad: "f-salud",
    escuela: "Enfermería",
    seccion: "Sección A · lunes",
    titulo: "Relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026"
  },
  project: {
    v1: "Síndrome de burnout",
    v2: "Satisfacción laboral",
    pob: "Profesionales de enfermería",
    amb: "Hospital público de Chiclayo",
    per: "2026",
    dis: "corr",
    preg: "¿Existe relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026?",
    teo: "Modelo de Demandas y Recursos Laborales (JD-R)",
    obj: "Determinar la relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.",
    hip: "Existe relación inversa y significativa entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.",
    i1: "Maslach Burnout Inventory (MBI)",
    i2: "Escala General de Satisfacción Laboral NTP 394"
  }
};

let state = {
  theme: "light",
  student: { nombre: "", facultad: "", escuela: "", seccion: "", titulo: "" },
  project: { v1: "", v2: "", pob: "", amb: "", per: "", dis: "", preg: "", teo: "", obj: "", hip: "", i1: "", i2: "" },
  drafts: {},
  checks: {},
  log: []
};

document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();

  // Si no hay datos guardados, cargar el proyecto de ejemplo de la USS por defecto
  if (!state.project.v1) {
    loadExampleData();
  }

  initThemeToggle();
  initTabsNavigation();
  initFacultyDropdowns();
  bindFormInputs();
  bindHiloEvents();

  // Inicialización de subsistemas
  initSectionStudio(state, handleDraftChange, handleCheckChange);
  initTheoriesEngine(state, handleSelectTheory);
  initJurySimulator(state, handleSaveJuryLog);
  initLogAndReport(state);
  bindExporterEvents();

  // Actualización visual inicial
  refreshUI();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn("No se pudo cargar el estado guardado:", e);
  }
  document.documentElement.setAttribute("data-theme", state.theme || "light");
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Error al guardar estado:", e);
  }
}

function loadExampleData() {
  state.student = { ...EXAMPLE_PROJECT.student };
  state.project = { ...EXAMPLE_PROJECT.project };
  const exFlag = document.getElementById("exflag");
  if (exFlag) exFlag.classList.remove("hidden");
  saveState();
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  toggleBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    saveState();
  });
}

// Control Navegación por Pestañas
function initTabsNavigation() {
  const tabBtns = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("aria-controls");

      tabBtns.forEach(b => {
        b.setAttribute("aria-selected", "false");
        b.className = "tab-btn px-4 py-3 font-display text-sm font-semibold rounded-t-xl transition flex items-center gap-2 whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800/50";
      });

      panels.forEach(p => p.classList.add("hidden"));

      btn.setAttribute("aria-selected", "true");
      btn.className = "tab-btn px-4 py-3 font-display text-sm font-semibold rounded-t-xl transition flex items-center gap-2 whitespace-nowrap bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t-2 border-nexo-gold";

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
      }

      if (targetId === "p-inf") {
        renderReportView(state);
      } else if (targetId === "p-hilo") {
        refreshUI();
      }
    });
  });
}

// Carga Dinámica de Facultades y Escuelas USS
function initFacultyDropdowns() {
  const facSelect = document.getElementById("st-fac");
  const escSelect = document.getElementById("st-esc");
  const teoSelect = document.getElementById("f-teo");

  if (!facSelect || !escSelect) return;

  facSelect.innerHTML = `<option value="">Seleccione Facultad…</option>`;
  FACULTIES_DATA.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.nombre;
    if (state.student.facultad === f.id) opt.selected = true;
    facSelect.appendChild(opt);
  });

  facSelect.addEventListener("change", (e) => {
    const facId = e.target.value;
    state.student.facultad = facId;
    state.student.escuela = "";
    populateSchools(facId, escSelect);
    populateTheoriesDropdown(facId, teoSelect);
    saveState();
  });

  if (state.student.facultad) {
    populateSchools(state.student.facultad, escSelect);
    populateTheoriesDropdown(state.student.facultad, teoSelect);
  }
}

function populateSchools(facId, escSelect) {
  if (!escSelect) return;
  escSelect.innerHTML = `<option value="">Seleccione Escuela…</option>`;
  const fac = FACULTIES_DATA.find(f => f.id === facId);
  if (fac && fac.escuelas) {
    fac.escuelas.forEach(esc => {
      const opt = document.createElement("option");
      opt.value = esc;
      opt.textContent = esc;
      if (state.student.escuela === esc) opt.selected = true;
      escSelect.appendChild(opt);
    });
  }
}

function populateTheoriesDropdown(facId, teoSelect) {
  if (!teoSelect) return;
  teoSelect.innerHTML = `<option value="">Seleccione o escriba marco teórico…</option>`;
  const filtered = facId ? THEORIES_DATA.filter(t => t.facultad === facId) : THEORIES_DATA;

  filtered.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.nombre;
    opt.textContent = `${t.nombre} (${t.autor})`;
    if (state.project.teo === t.nombre) opt.selected = true;
    teoSelect.appendChild(opt);
  });
}

function bindFormInputs() {
  document.querySelectorAll("[data-st]").forEach(input => {
    const key = input.getAttribute("data-st");
    if (state.student[key]) input.value = state.student[key];
    input.addEventListener("input", (e) => {
      state.student[key] = e.target.value;
      saveState();
      updatePromptsAndLinks();
    });
  });

  document.querySelectorAll("[data-k]").forEach(input => {
    const key = input.getAttribute("data-k");
    if (state.project[key]) input.value = state.project[key];
    input.addEventListener("input", (e) => {
      state.project[key] = e.target.value;
      saveState();
      refreshUI();
      updatePromptsAndLinks();
    });
  });

  const resetBtn = document.getElementById("startmine");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.student = { nombre: "", facultad: "", escuela: "", seccion: "", titulo: "" };
      state.project = { v1: "", v2: "", pob: "", amb: "", per: "", dis: "", preg: "", teo: "", obj: "", hip: "", i1: "", i2: "" };
      saveState();
      window.location.reload();
    });
  }
}

function bindHiloEvents() {
  const copyBtn = document.getElementById("copymatrix");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(JSON.stringify(state.project, null, 2)).then(() => {
        showToast("Matriz de elementos núcleo copiada", "success");
      });
    });
  }
}

function refreshUI() {
  const links = evaluateCoherenceChain(state.project);
  renderCoherenceChainUI(links, document.getElementById("chain"), document.getElementById("scorebar"), document.getElementById("chainsum"));
  renderSankeyChart("#sankey-wrapper", state);
}

function updatePromptsAndLinks() {
  const pvHilo = document.getElementById("pv-hilo");
  const gptHilo = document.getElementById("gpt-hilo");
  const text = buildHiloPrompt(state);
  if (pvHilo) pvHilo.textContent = text;
  if (gptHilo) gptHilo.href = `https://chatgpt.com/?q=${encodeURIComponent(text)}`;
}

function handleDraftChange(secId, text) {
  if (!state.drafts) state.drafts = {};
  state.drafts[secId] = text;
  saveState();
}

function handleCheckChange(secId, checksArray) {
  if (!state.checks) state.checks = {};
  state.checks[secId] = checksArray;
  saveState();
}

function handleSelectTheory(theoryName) {
  state.project.teo = theoryName;
  const teoSelect = document.getElementById("f-teo");
  if (teoSelect) teoSelect.value = theoryName;
  saveState();
  refreshUI();
  updatePromptsAndLinks();
  showToast(`Teoría «${theoryName}» asignada`, "success");
}

function handleSaveJuryLog(entry) {
  state.log.push(entry);
  saveState();
  showToast("Sustentación registrada en la bitácora", "info");
}

function bindExporterEvents() {
  const exportWordBtn = document.getElementById("exportdocx");
  const saveJsonBtn = document.getElementById("savejson");
  const loadJsonInput = document.getElementById("loadjson");

  if (exportWordBtn) {
    exportWordBtn.addEventListener("click", async () => {
      try {
        await exportToWord(state);
        showToast("Documento de Word (.docx) descargado", "success");
      } catch (err) {
        showModal("Error al Exportar", err.message);
      }
    });
  }

  if (saveJsonBtn) {
    saveJsonBtn.addEventListener("click", () => {
      exportStateToJSON(state);
      showToast("Respaldo JSON descargado", "success");
    });
  }

  if (loadJsonInput) {
    loadJsonInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        importStateFromJSON(file, (importedState) => {
          state = { ...state, ...importedState };
          saveState();
          window.location.reload();
        }, (errMsg) => showModal("Error", errMsg));
      }
    });
  }
}

export function showModal(title, messageHTML) {
  const container = document.getElementById("modal-container");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");
  if (!container || !titleEl || !bodyEl) return;
  titleEl.textContent = title;
  bodyEl.innerHTML = messageHTML;
  container.classList.remove("hidden");
}

export function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `p-3.5 rounded-xl border text-xs font-semibold shadow-lg flex items-center justify-between gap-3 ${
    type === "success" ? "bg-emerald-900 text-emerald-100 border-emerald-700" : "bg-slate-900 text-slate-100 border-slate-700"
  }`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}