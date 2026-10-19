
import { SECTIONS_DATA } from "../data/sectionsData.js";
import { MODELS_DATA } from "../data/modelsData.js";

let currentSectionId = "s11";
let currentModelView = "orden";

/**
 * Inicializa la Estación de Redacción y sus oyentes de eventos
 */
export function initSectionStudio(state, onDraftChange, onCheckChange) {
  const routeListEl = document.getElementById("routelist");
  const routeSelectEl = document.getElementById("routeselect");
  const draftEl = document.getElementById("draft");
  const modelBtns = document.querySelectorAll("[data-mv]");
  const readDictBtn = document.getElementById("readdict");

  // Renderizar la lista de la ruta de 16 semanas
  renderRouteList(SECTIONS_DATA, currentSectionId, routeListEl, routeSelectEl, (secId) => {
    currentSectionId = secId;
    renderSectionDetails(currentSectionId, state, onCheckChange);
  });

  // Cambiar modo de vista del modelo (Orden de párrafos, Ejemplo anotado, Plantilla)
  modelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentModelView = btn.getAttribute("data-mv");
      modelBtns.forEach(b => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      renderModelView(currentSectionId, currentModelView);
    });
  });

  // Evento de edición del borrador en tiempo real
  if (draftEl) {
    draftEl.addEventListener("input", (e) => {
      const text = e.target.value;
      if (!state.drafts) state.drafts = {};
      state.drafts[currentSectionId] = text;
      
      if (onDraftChange) onDraftChange(currentSectionId, text);
      const sec = SECTIONS_DATA.find(s => s.id === currentSectionId);
      analyzeDraftSignals(text, sec);
    });
  }

  // Evento para parsear, calibrar y REGISTRAR dictámenes devueltos por la IA
  if (readDictBtn) {
    readDictBtn.addEventListener("click", () => {
      const trespEl = document.getElementById("tresp");
      const dictMsgEl = document.getElementById("dictmsg");
      const dictOutEl = document.getElementById("dictout");
      const tutorStateEl = document.getElementById("tutorstate");

      if (!trespEl || !trespEl.value.trim()) {
        if (dictMsgEl) {
          dictMsgEl.textContent = "Pegue primero la respuesta de ChatGPT con el dictamen.";
          dictMsgEl.className = "text-xs font-mono text-rose-500 font-semibold";
        }
        return;
      }

      const rawText = trespEl.value.trim();
      const dictamenData = parseAIDictamen(rawText);
      const secObj = SECTIONS_DATA.find(s => s.id === currentSectionId);
      const secTitle = secObj ? `[${secObj.code}] ${secObj.title}` : currentSectionId;

      // Generar cadena de dictamen legible
      let dictamenStr = "Dictamen procesado";
      if (dictamenData) {
        dictamenStr = Object.entries(dictamenData).map(([k, v]) => `${k}=${v}`).join("; ");
      } else {
        const match = rawText.match(/DICTAMEN:\s*([^\n]+)/i);
        if (match) dictamenStr = match[1].trim();
      }

      // REGISTRO UNIFICADO EN STATE.LOG (Pestaña 05 + Reporte Word)
      if (!state.log) state.log = [];

      const logEntry = {
        tipo: "ia",
        id: `ia_${Date.now()}`,
        fecha: new Date().toLocaleDateString("es-PE") + " " + new Date().toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString(),
        seccionId: currentSectionId,
        seccion: secTitle,
        sec: secTitle,
        herramienta: "ChatGPT (Tutor IA)",
        tool: "ChatGPT (Tutor IA)",
        dictamen: dictamenStr,
        ai: rawText,
        decision: "Dictamen auditado e incorporado al borrador de investigación.",
        dec: "Auditoría Aceptada",
        why: "Evaluación procesada desde la Estación de Redacción"
      };

      // Reemplazar si ya existía registro de esta sección o añadir
      const prevIndex = state.log.findIndex(l => l.seccionId === currentSectionId || l.sec === secTitle);
      if (prevIndex >= 0) {
        state.log[prevIndex] = logEntry;
      } else {
        state.log.push(logEntry);
      }

      // Actualizar pastilla de estado (#tutorstate)
      if (tutorStateEl) {
        tutorStateEl.textContent = `Calibrado (${dictamenStr})`;
        tutorStateEl.className = "px-3 py-1 bg-emerald-600 text-white text-xs font-mono rounded-full font-bold shadow-sm";
      }

      if (dictMsgEl) {
        dictMsgEl.textContent = "¡Dictamen calibrado y registrado en bitácora!";
        dictMsgEl.className = "text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold";
      }

      if (dictOutEl) {
        dictOutEl.innerHTML = `
          <div class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs space-y-1 mt-2">
            <strong class="text-emerald-900 dark:text-emerald-200 block">Resultado de la Auditoría Registrado:</strong>
            <p class="font-mono text-emerald-800 dark:text-emerald-300">${dictamenStr}</p>
          </div>
        `;
      }

      // Notificar cambio de borrador
      if (onDraftChange) onDraftChange(currentSectionId, draftEl ? draftEl.value : "");
    });
  }

  // Carga inicial
  renderSectionDetails(currentSectionId, state, onCheckChange);
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
export function renderSectionDetails(secId, state, onCheckChange) {
  const sec = SECTIONS_DATA.find(s => s.id === secId);
  if (!sec) return;

  const wkEl = document.getElementById("s-wk");
  const titleEl = document.getElementById("s-title");
  const extEl = document.getElementById("s-ext");
  const prodEl = document.getElementById("s-prod");
  const pruebaEl = document.getElementById("s-prueba");
  const draftEl = document.getElementById("draft");
  const checksEl = document.getElementById("checks");
  const tutorStateEl = document.getElementById("tutorstate");

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

  // Actualizar pastilla #tutorstate si ya existe dictamen para esta sección
  const secTitle = `[${sec.code}] ${sec.title}`;
  const existingLog = (state.log || []).find(l => l.seccionId === secId || l.sec === secTitle || l.seccion === secTitle);
  if (existingLog && tutorStateEl) {
    tutorStateEl.textContent = `Calibrado ✓`;
    tutorStateEl.className = "px-3 py-1 bg-emerald-600 text-white text-xs font-mono rounded-full font-bold shadow-sm";
  } else if (tutorStateEl) {
    tutorStateEl.textContent = "Sin dictamen";
    tutorStateEl.className = "px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono rounded-full text-slate-500";
  }

  // Cargar borrador guardado
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
        <input type="checkbox" id="chk-${secId}-${idx}" ${isChecked ? "checked" : ""} class="mt-0.5 rounded border-slate-300 text-nexo-navy focus:ring-nexo-gold cursor-pointer">
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
        if (onCheckChange) onCheckChange(secId, currentArr);
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

  const modelData = MODELS_DATA ? MODELS_DATA[secId] : null;
  if (!modelData) {
    mbodyEl.innerHTML = `<p class="text-xs text-slate-400 italic">No hay un modelo específico registrado para esta sección. Siga las pautas institucionales del docente.</p>`;
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

  const countBadge = document.createElement("span");
  countBadge.className = "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
  countBadge.textContent = `${wordCount} palabras`;
  signalsEl.appendChild(countBadge);

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