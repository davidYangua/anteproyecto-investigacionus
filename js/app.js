/**
 * NEXO Research Studio - Orquestador Principal de la Aplicación
 * Archivo: js/app.js
 * Autor / Dirección Metodológica: Ing. Percy Castro Mejía
 */

import { updateI18nUI } from "./i18n.js";
import { setupFacultySelects, evaluateCoherenceChain, renderCoherenceChainUI } from "./coherenceChain.js";
import { renderSankeyChart } from "./sankeyChart.js";
import { initSectionStudio } from "./sectionStudio.js";
import { initTheoriesEngine } from "./theoriesEngine.js";
import { initJurySimulator } from "./jurySimulator.js";
import { initLogAndReport, renderReportView } from "./logAndReport.js";
import { buildHiloPrompt, buildReportPrompt, formatPromptForChatGPT } from "./aiPrompts.js";
import { exportToWord, exportStateToJSON, importStateFromJSON } from "./reportExporter.js";

// ==========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================
const STORAGE_KEY = "nexo_studio_state_v2026";

export let state = {
  theme: "light",
  lang: "es",
  student: {
    nombre: "",
    facultad: "",
    escuela: "",
    seccion: "",
    titulo: ""
  },
  project: {
    v1: "",
    v2: "",
    pob: "",
    amb: "",
    per: "",
    enf: "cuanti", // cuanti | cuali | mixto
    dis: "",
    preg: "",
    teo: "",
    obj: "",
    hip: "",
    i1: "",
    i2: ""
  },
  drafts: {},
  checks: {},
  log: [],
  customTheories: []
};

// ==========================================
// INICIALIZACIÓN PRINCIPAL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initTheme();
  initI18n();
  initTabs();
  initFormListeners();
  initResetHandlers();

  // 1. Conectar selectores dinámicos de Facultad, Escuela y Teorías
  setupFacultySelects(state, () => {
    saveState();
    refreshAllViews();
  });

  // 2. Inicializar Pestaña 02: Estación de Redacción (16 Semanas)
  initSectionStudio(state, 
    (secId, draftText) => {
      saveState();
      renderReportView(state);
    },
    (secId, checksArr) => {
      saveState();
      renderReportView(state);
    }
  );

  // 3. Inicializar Pestaña 03: Motor de Marcos Teóricos
  initTheoriesEngine(state, (theoryName) => {
    state.project.teo = theoryName;
    saveState();
    refreshAllViews();
  });

  // 4. Inicializar Pestaña 04: Jurado Simulado
  initJurySimulator(state, (juryEntry) => {
    if (!state.log) state.log = [];
    state.log.push(juryEntry);
    saveState();
    renderReportView(state);
  });

  // 5. Inicializar Pestaña 05: Bitácora e Informe
  initLogAndReport(state);

  // 6. Configurar eventos de exportación y respaldo
  initExporterEvents();

  // Renderizado e iconografía inicial
  refreshAllViews();
  initLucideIcons();
});

// ==========================================
// PERSISTENCIA (LOCALSTORAGE)
// ==========================================
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("No se pudo guardar el estado en localStorage", e);
  }
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
      populateFormFromState();
    }
  } catch (e) {
    console.warn("Error al cargar estado previo", e);
  }
}

function populateFormFromState() {
  Object.keys(state.student || {}).forEach(key => {
    const el = document.querySelector(`[data-st="${key}"]`);
    if (el) el.value = state.student[key] || "";
  });

  Object.keys(state.project || {}).forEach(key => {
    const el = document.querySelector(`[data-k="${key}"]`);
    if (el) el.value = state.project[key] || "";
  });
}

// ==========================================
// REFRESO GLOBAL DE VISTAS Y COMPONENTES
// ==========================================
function refreshAllViews() {
  window.nexoState = state;

  // Diagnóstico de eslabones de coherencia
  const coherenceLinks = evaluateCoherenceChain(state.project);
  renderCoherenceChainUI(
    coherenceLinks,
    document.getElementById("chain"),
    document.getElementById("scorebar"),
    document.getElementById("chainsum")
  );

  // Re-renderizado de la Matriz Sankey con conservación de flujo
  renderSankeyChart("#sankey-wrapper", state);

  // Actualizar prompts dinámicos para ChatGPT
  updateAIPromptsAndLinks();

  // Actualizar informe consolidado de la pestaña 05
  renderReportView(state);

  // Refrescar íconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateAIPromptsAndLinks() {
  const hiloPrompt = buildHiloPrompt(state);
  const pvHiloEl = document.getElementById("pv-hilo");
  const gptHiloBtn = document.getElementById("gpt-hilo");
  if (pvHiloEl) pvHiloEl.textContent = hiloPrompt;
  if (gptHiloBtn) gptHiloBtn.href = formatPromptForChatGPT(hiloPrompt);

  const reportPrompt = buildReportPrompt(state);
  const gptInfBtn = document.getElementById("gpt-inf");
  if (gptInfBtn) gptInfBtn.href = formatPromptForChatGPT(reportPrompt);
}

// ==========================================
// SISTEMA DE MODAL ANIMADO Y REINICIO DE PROYECTO
// ==========================================

/**
 * Muestra un modal de confirmación con animación fluida en Tailwind CSS
 */
export function showConfirmModal({ title, body, confirmText = "Confirmar", cancelText = "Cancelar", onConfirm }) {
  const container = document.getElementById("modal-container");
  const box = document.getElementById("modal-box");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");
  const footerEl = document.getElementById("modal-footer");

  if (!container || !box) return;

  titleEl.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-500"></i> ${title}`;
  bodyEl.innerHTML = body;

  footerEl.innerHTML = `
    <button id="modal-cancel-btn" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer">
      ${cancelText}
    </button>
    <button id="modal-confirm-btn" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5">
      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      <span>${confirmText}</span>
    </button>
  `;

  // Animación de entrada
  container.classList.remove("hidden");
  setTimeout(() => {
    container.classList.remove("opacity-0");
    box.classList.remove("scale-95", "opacity-0");
    box.classList.add("scale-100", "opacity-100");
  }, 10);

  const closeModal = () => {
    box.classList.remove("scale-100", "opacity-100");
    box.classList.add("scale-95", "opacity-0");
    container.classList.add("opacity-0");
    setTimeout(() => {
      container.classList.add("hidden");
    }, 200);
  };

  document.getElementById("modal-close").onclick = closeModal;
  document.getElementById("modal-cancel-btn").onclick = closeModal;
  document.getElementById("modal-confirm-btn").onclick = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Inicializa los eventos del botón de reinicio global
 */
function initResetHandlers() {
  const newProjectBtn = document.getElementById("btn-new-project");
  const startMineBtn = document.getElementById("startmine");

  const promptReset = () => {
    showConfirmModal({
      title: "Reiniciar e Iniciar Nuevo Proyecto",
      body: `
        <p class="mb-2">¿Está seguro de que desea borrar todos los datos e iniciar una nueva investigación?</p>
        <ul class="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <li>Se limpiarán las variables, preguntas, objetivos e hipótesis de la Pestaña 01.</li>
          <li>Se vaciarán los borradores de redacción de las 16 semanas.</li>
          <li>Se eliminarán las bitácoras del jurado simulado y las teorías personalizadas.</li>
        </ul>
      `,
      confirmText: "Sí, Reiniciar Todo",
      cancelText: "Cancelar",
      onConfirm: resetWholeProject
    });
  };

  if (newProjectBtn) newProjectBtn.addEventListener("click", promptReset);
  if (startMineBtn) startMineBtn.addEventListener("click", promptReset);
}

/**
 * Ejecuta la limpieza completa del estado en memoria, localStorage y controles DOM
 */
function resetWholeProject() {
  // 1. Limpieza del estado en memoria
  state.student = {
    nombre: "",
    facultad: "",
    escuela: "",
    seccion: "",
    titulo: ""
  };
  state.project = {
    v1: "",
    v2: "",
    pob: "",
    amb: "",
    per: "",
    enf: "cuanti",
    dis: "",
    preg: "",
    teo: "",
    obj: "",
    hip: "",
    i1: "",
    i2: ""
  };
  state.drafts = {};
  state.checks = {};
  state.log = [];
  state.customTheories = [];

  // 2. Eliminar respaldo en LocalStorage
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("No se pudo limpiar localStorage", e);
  }

  // 3. Vaciar todos los controles DOM de entrada (inputs, selects y textareas)
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id === "theme-toggle" || el.id === "lang-toggle" || el.id === "thfacultad") return;
    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
  });

  // 4. Resetear selectores de facultades y actualizar vistas
  setupFacultySelects(state, () => {
    saveState();
    refreshAllViews();
  });

  // Ocultar banner de ejemplo
  const exflag = document.getElementById("exflag");
  if (exflag) exflag.classList.add("hidden");

  // 5. Refrescar vistas
  refreshAllViews();
}

// ==========================================
// GESTIÓN DE TEMA Y LUCIDE
// ==========================================
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  
  if (state.theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.theme);
      document.documentElement.classList.toggle("dark", state.theme === "dark");
      saveState();
      renderSankeyChart("#sankey-wrapper", state);
    });
  }
}

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================
// INTERNACIONALIZACIÓN (IDIOMA ES / EN)
// ==========================================
function initI18n() {
  const langBtn = document.getElementById("lang-toggle");
  const langText = document.getElementById("lang-text");

  if (langText) langText.textContent = state.lang.toUpperCase();
  updateI18nUI(state.lang);

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      state.lang = state.lang === "es" ? "en" : "es";
      if (langText) langText.textContent = state.lang.toUpperCase();
      updateI18nUI(state.lang);
      saveState();
      renderSankeyChart("#sankey-wrapper", state);
    });
  }
}

// ==========================================
// NAVEGACIÓN POR PESTAÑAS
// ==========================================
function initTabs() {
  const buttons = document.querySelectorAll("[role='tab']");
  const panels = document.querySelectorAll("[role='tabpanel']");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");

      buttons.forEach(b => {
        b.setAttribute("aria-selected", "false");
        b.className = "tab-btn px-4 py-3 font-display text-sm font-semibold rounded-t-xl transition flex items-center gap-2 whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-800/50 cursor-pointer";
      });

      panels.forEach(p => p.classList.add("hidden"));

      btn.setAttribute("aria-selected", "true");
      btn.className = "tab-btn px-4 py-3 font-display text-sm font-semibold rounded-t-xl transition flex items-center gap-2 whitespace-nowrap bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t-2 border-nexo-gold cursor-pointer";

      const activePanel = document.getElementById(targetId);
      if (activePanel) activePanel.classList.remove("hidden");

      refreshAllViews();
    });
  });
}

// ==========================================
// ESCUCHA DE FORMULARIOS DE NÚCLEO Y ESTUDIANTE
// ==========================================
function initFormListeners() {
  document.querySelectorAll("[data-st]").forEach(input => {
    input.addEventListener("input", (e) => {
      const key = e.target.getAttribute("data-st");
      state.student[key] = e.target.value;
      saveState();
    });
  });

  document.querySelectorAll("[data-k]").forEach(input => {
    input.addEventListener("input", (e) => {
      const key = e.target.getAttribute("data-k");
      state.project[key] = e.target.value;
      saveState();
      refreshAllViews();
    });
  });
}

// ==========================================
// EXPORTACIÓN A WORD Y MANEJO DE JSON
// ==========================================
function initExporterEvents() {
  const exportDocxBtn = document.getElementById("exportdocx");
  const saveJsonBtn = document.getElementById("savejson");
  const loadJsonInput = document.getElementById("loadjson");
  const bkMsgEl = document.getElementById("bkmsg");

  if (exportDocxBtn) {
    exportDocxBtn.addEventListener("click", async () => {
      try {
        await exportToWord(state);
      } catch (err) {
        alert("Error al exportar el documento a Word: " + err.message);
      }
    });
  }

  if (saveJsonBtn) {
    saveJsonBtn.addEventListener("click", () => {
      exportStateToJSON(state);
    });
  }

  if (loadJsonInput) {
    loadJsonInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      importStateFromJSON(file, 
        (importedState) => {
          state = { ...state, ...importedState };
          saveState();
          populateFormFromState();
          refreshAllViews();
          if (bkMsgEl) {
            bkMsgEl.textContent = "¡Respaldo restaurado con éxito!";
            bkMsgEl.className = "text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold";
          }
        },
        (errMessage) => {
          if (bkMsgEl) {
            bkMsgEl.textContent = errMessage;
            bkMsgEl.className = "text-xs font-mono text-rose-500 font-semibold";
          }
        }
      );
    });
  }
}