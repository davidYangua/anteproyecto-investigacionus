/**
 * NEXO Research Studio - Estación de Redacción y Ruta de 16 Semanas
 * Archivo: js/sectionStudio.js
 */

import { SECTIONS_DATA } from "../data/sectionsData.js";
import { MODELS_DATA } from "../data/modelsData.js";

let currentSectionId = "s11";
let currentModelView = "orden";

/**
 * Inicializa la Estación de Redacción y sus oyentes de eventos
 * @param {Object} state Estado global de la aplicación
 * @param {Function} onDraftChange Callback al modificar el borrador
 * @param {Function} onCheckChange Callback al marcar un criterio de autoevaluación
 */
export function initSectionStudio(state, onDraftChange, onCheckChange) {
  const routeListEl = document.getElementById("routelist");
  const routeSelectEl = document.getElementById("routeselect");
  const draftEl = document.getElementById("draft");
  const modelBtns = document.querySelectorAll("[data-mv]");

  // Renderizar la lista de la ruta de 16 semanas
  renderRouteList(SECTIONS_DATA, currentSectionId, routeListEl, routeSelectEl, (secId) => {
    currentSectionId = secId;
    renderSectionDetails(currentSectionId, state);
  });

  // Evento para cambiar de modo de vista del modelo (Orden, Ejemplo, Plantilla)
  modelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentModelView = btn.getAttribute("data-mv");
      modelBtns.forEach(b => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      renderModelView(currentSectionId, currentModelView);
    });
  });

  // Evento de edición del borrador
  if (draftEl) {
    draftEl.addEventListener("input", (e) => {
      const text = e.target.value;
      if (onDraftChange) onDraftChange(currentSectionId, text);
      const sec = SECTIONS_DATA.find(s => s.id === currentSectionId);
      analyzeDraftSignals(text, sec);
    });
  }

  // Carga inicial
  renderSectionDetails(currentSectionId, state);
}

/**
 * Renderiza la lista lateral de la Ruta de 16 Semanas
 */
export function renderRouteList(sections, activeId, listEl, selectEl, onSelect) {
  if (listEl) {
    listEl.innerHTML = "";
    sections.forEach(sec => {
      const li = document.createElement("li");
      const isActive = sec.id === activeId;
      
      li.className = `p-2.5 rounded-xl cursor-pointer transition border text-xs flex items-center justify-between ${
        isActive 
          ? "bg-nexo-navy text-white font-semibold border-nexo-navy shadow-sm" 
          : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`;

      li.innerHTML = `
        <div class="flex items-center gap-2 truncate">
          <span class="font-mono text-[10px] px-1.5 py-0.5 rounded ${isActive ? "bg-nexo-gold text-slate-900 font-bold" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}">
            ${sec.code}
          </span>
          <span class="truncate">${sec.title}</span>
        </div>
        ${sec.ra ? `<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">${sec.ra}</span>` : ""}
      `;

      li.addEventListener("click", () => {
        if (onSelect) onSelect(sec.id);
        renderRouteList(sections, sec.id, listEl, selectEl, onSelect);
      });

      listEl.appendChild(li);
    });
  }

  if (selectEl) {
    selectEl.innerHTML = "";
    sections.forEach(sec => {
      const opt = document.createElement("option");
      opt.value = sec.id;
      opt.textContent = `[${sec.code}] ${sec.wk} - ${sec.title}`;
      if (sec.id === activeId) opt.selected = true;
      selectEl.appendChild(opt);
    });

    selectEl.onchange = (e) => {
      if (onSelect) onSelect(e.target.value);
      renderRouteList(sections, e.target.value, listEl, selectEl, onSelect);
    };
  }
}

/**
 * Renderiza los detalles de la sección seleccionada en el panel principal
 */
export function renderSectionDetails(secId, state) {
  const sec = SECTIONS_DATA.find(s => s.id === secId);
  if (!sec) return;

  const wkEl = document.getElementById("s-wk");
  const titleEl = document.getElementById("s-title");
  const extEl = document.getElementById("s-ext");
  const prodEl = document.getElementById("s-prod");
  const pruebaEl = document.getElementById("s-prueba");
  const draftEl = document.getElementById("draft");
  const checksEl = document.getElementById("checks");

  if (wkEl) wkEl.textContent = `${sec.wk} · Código ${sec.code}`;
  if (titleEl) titleEl.textContent = sec.title;
  
  if (extEl) {
    if (sec.ext) {
      extEl.textContent = `Extensión esperada: ${sec.ext[0]} - ${sec.ext[1]} palabras`;
      extEl.classList.remove("hidden");
    } else {
      extEl.classList.add("hidden");
    }
  }

  if (prodEl) prodEl.textContent = sec.prod;
  if (pruebaEl) pruebaEl.textContent = sec.prueba;

  // Cargar borrador del estado
  const savedDraft = (state.drafts && state.drafts[secId]) || "";
  if (draftEl) {
    draftEl.value = savedDraft;
    analyzeDraftSignals(savedDraft, sec);
  }

  // Renderizar modelo metodológico
  renderModelView(secId, currentModelView);

  // Renderizar checklist de autoevaluación
  if (checksEl) {
    checksEl.innerHTML = "";
    const savedChecks = (state.checks && state.checks[secId]) || [];

    sec.crit.forEach((critText, idx) => {
      const isChecked = savedChecks.includes(idx);
      const li = document.createElement("li");
      li.className = "flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition";

      li.innerHTML = `
        <input type="checkbox" id="chk-${secId}-${idx}" ${isChecked ? "checked" : ""} class="mt-0.5 rounded border-slate-300 text-nexo-navy focus:ring-nexo-gold">
        <label for="chk-${secId}-${idx}" class="text-xs text-slate-700 dark:text-slate-300 cursor-pointer leading-normal flex-1">
          ${critText}
        </label>
      `;

      const inputEl = li.querySelector("input");
      inputEl.addEventListener("change", () => {
        let currentArr = [...(state.checks[secId] || [])];
        if (inputEl.checked) {
          if (!currentArr.includes(idx)) currentArr.push(idx);
        } else {
          currentArr = currentArr.filter(i => i !== idx);
        }
        if (!state.checks) state.checks = {};
        state.checks[secId] = currentArr;
      });

      checksEl.appendChild(li);
    });
  }
}

/**
 * Renderiza el modelo de redacción según el modo activo
 */
export function renderModelView(secId, mode) {
  const mbodyEl = document.getElementById("mbody");
  if (!mbodyEl) return;

  const modelData = MODELS_DATA[secId];
  if (!modelData) {
    mbodyEl.innerHTML = `<p class="text-xs text-slate-400 italic">No hay un modelo específico registrado para esta sección. Siga las pautas del docente.</p>`;
    return;
  }

  mbodyEl.innerHTML = "";

  if (mode === "orden") {
    const ol = document.createElement("ol");
    ol.className = "space-y-2 list-decimal list-inside";
    modelData.steps.forEach(([stepTitle, stepDesc]) => {
      const li = document.createElement("li");
      li.className = "text-xs leading-relaxed";
      li.innerHTML = `<strong class="text-slate-800 dark:text-slate-200">${stepTitle}:</strong> ${stepDesc}`;
      ol.appendChild(li);
    });
    mbodyEl.appendChild(ol);
  } else if (mode === "ejemplo") {
    const div = document.createElement("div");
    div.className = "space-y-3";
    modelData.example.forEach(([partTitle, partText, partNote]) => {
      const card = document.createElement("div");
      card.className = "p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1";
      card.innerHTML = `
        <span class="text-[10px] font-mono uppercase font-bold text-nexo-gold block">${partTitle}</span>
        <p class="text-xs text-slate-800 dark:text-slate-200">${partText}</p>
        ${partNote ? `<p class="text-[11px] text-slate-500 italic border-l-2 border-slate-300 dark:border-slate-700 pl-2 mt-1">${partNote}</p>` : ""}
      `;
      div.appendChild(card);
    });
    mbodyEl.appendChild(div);
  } else if (mode === "plantilla") {
    const pre = document.createElement("pre");
    pre.className = "tpl text-xs font-mono bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap";
    pre.textContent = modelData.formula || "Fórmula no especificada.";
    mbodyEl.appendChild(pre);

    if (modelData.rules && modelData.rules.length > 0) {
      const rulesBox = document.createElement("div");
      rulesBox.className = "mt-3 space-y-1";
      rulesBox.innerHTML = `<span class="text-[10px] font-mono uppercase font-bold text-amber-500 block">Reglas Críticas:</span>`;
      const ul = document.createElement("ul");
      ul.className = "list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5";
      modelData.rules.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r;
        ul.appendChild(li);
      });
      rulesBox.appendChild(ul);
      mbodyEl.appendChild(rulesBox);
    }
  }
}

/**
 * Analiza el borrador en tiempo real y muestra señales/alertas
 */
export function analyzeDraftSignals(draftText, sec) {
  const signalsEl = document.getElementById("signals");
  if (!signalsEl) return;

  signalsEl.innerHTML = "";
  if (!draftText || !draftText.trim()) return;

  const words = draftText.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Contador de palabras
  const countBadge = document.createElement("span");
  countBadge.className = "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
  countBadge.textContent = `${wordCount} palabras`;
  signalsEl.appendChild(countBadge);

  // Alerta de Extensión
  if (sec && sec.ext) {
    const [minW, maxW] = sec.ext;
    const extBadge = document.createElement("span");
    if (wordCount < minW) {
      extBadge.className = "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      extBadge.textContent = `Por debajo de la extensión sugerida (Mín. ${minW})`;
    } else if (wordCount > maxW) {
      extBadge.className = "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
      extBadge.textContent = `Supera el rango recomendado (Máx. ${maxW})`;
    } else {
      extBadge.className = "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      extBadge.textContent = `Extensión en el rango óptimo (${minW}-${maxW})`;
    }
    signalsEl.appendChild(extBadge);
  }

  // Detección de Adjetivos Valorativos Subjetivos
  const subjectiveWords = ["grave", "alarmante", "preocupante", "pésimo", "terrible", "desastroso", "increíble"];
  const foundSubj = subjectiveWords.filter(sw => draftText.toLowerCase().includes(sw));
  if (foundSubj.length > 0) {
    const subjBadge = document.createElement("span");
    subjBadge.className = "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
    subjBadge.textContent = `Detectado lenguaje subjetivo/valorativo (${foundSubj.join(", ")})`;
    signalsEl.appendChild(subjBadge);
  }
}

/**
 * Parsea el dictamen estructurado emitido por la IA
 * Expectativa de formato: DICTAMEN: 1=C; 2=P; 3=N...
 */
export function parseAIDictamen(text) {
  if (!text) return null;
  const match = text.match(/DICTAMEN:\s*([0-9=CPN;\s]+)/i);
  if (!match) return null;

  const rawString = match[1].trim();
  const pairs = rawString.split(";").map(p => p.trim()).filter(Boolean);

  const results = {};
  pairs.forEach(pair => {
    const [num, code] = pair.split("=").map(s => s.trim());
    if (num && code) {
      results[num] = code.toUpperCase();
    }
  });

  return Object.keys(results).length > 0 ? results : null;
}