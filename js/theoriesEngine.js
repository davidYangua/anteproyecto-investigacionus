/**
 * NEXO Research Studio - Buscador y Recomendador de Marcos Teóricos
 * Archivo: js/theoriesEngine.js
 */

import { THEORIES_DATA } from "../data/theoriesData.js";

let selectedFacultyFilter = "";
let selectedVarOutcome = "";
let searchQuery = "";

/**
 * Normaliza cadenas de texto para búsquedas flexibles sin tildes ni mayúsculas
 * @param {string} str 
 * @returns {string}
 */
function cleanStr(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Inicializa el motor de teorías y vincula los eventos de búsqueda y filtrado
 * @param {Object} state Estado global de la aplicación
 * @param {Function} onSelectTheory Callback ejecutado al seleccionar una teoría para el proyecto
 */
export function initTheoriesEngine(state, onSelectTheory) {
  const facSelectEl = document.getElementById("thfacultad");
  const varInputEl = document.getElementById("thvar");
  const searchInputEl = document.getElementById("thq");
  const listContainerEl = document.getElementById("thlist");
  const matchContainerEl = document.getElementById("thmatch");
  const countEl = document.getElementById("thcount");

  // Escuchar cambios en los controles de filtro
  if (facSelectEl) {
    facSelectEl.addEventListener("change", (e) => {
      selectedFacultyFilter = e.target.value;
      updateTheoriesUI(listContainerEl, matchContainerEl, countEl, onSelectTheory);
    });
  }

  if (varInputEl) {
    varInputEl.addEventListener("input", (e) => {
      selectedVarOutcome = e.target.value;
      updateTheoriesUI(listContainerEl, matchContainerEl, countEl, onSelectTheory);
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      updateTheoriesUI(listContainerEl, matchContainerEl, countEl, onSelectTheory);
    });
  }

  // Renderizado inicial
  updateTheoriesUI(listContainerEl, matchContainerEl, countEl, onSelectTheory);
}

/**
 * Filtra el catálogo de teorías aplicando los criterios activos
 * @returns {Array<Object>} Lista de teorías filtradas
 */
export function filterTheories() {
  const q = cleanStr(searchQuery);
  const v = cleanStr(selectedVarOutcome);

  return THEORIES_DATA.filter(theory => {
    // Filtro por Facultad
    if (selectedFacultyFilter && theory.facultad !== selectedFacultyFilter) {
      return false;
    }

    // Filtro por búsqueda abierta (Nombre, Autor, Postulado, Palabras Clave)
    if (q) {
      const matchName = cleanStr(theory.nombre).includes(q);
      const matchAutor = cleanStr(theory.autor).includes(q);
      const matchPost = cleanStr(theory.postulado).includes(q);
      const matchKw = theory.kw.some(k => cleanStr(k).includes(q));
      if (!matchName && !matchAutor && !matchPost && !matchKw) {
        return false;
      }
    }

    // Filtro por variable de resultado
    if (v) {
      const matchRes = theory.resultados.some(r => cleanStr(r).includes(v));
      const matchKw = theory.kw.some(k => cleanStr(k).includes(v));
      if (!matchRes && !matchKw) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Obtiene recomendaciones de teorías basadas en la variable ingresada
 * @param {string} varName Nombre de la variable de resultado
 * @returns {Array<Object>} Lista de teorías recomendadas
 */
export function getRecommendedTheories(varName) {
  if (!varName || !varName.trim()) return [];
  const cleanVar = cleanStr(varName);

  return THEORIES_DATA.filter(theory => {
    const matchRes = theory.resultados.some(r => cleanStr(r).includes(cleanVar));
    const matchKw = theory.kw.some(k => cleanStr(k).includes(cleanVar));
    return matchRes || matchKw;
  });
}

/**
 * Actualiza la interfaz del recomendador y la lista principal de teorías
 */
function updateTheoriesUI(listEl, matchEl, countEl, onSelectTheory) {
  const filtered = filterTheories();

  // Actualizar contador
  if (countEl) {
    countEl.textContent = `${filtered.length} marco(s) teórico(s) encontrado(s)`;
  }

  // Renderizar caja de recomendación por variable
  if (matchEl) {
    matchEl.innerHTML = "";
    if (selectedVarOutcome && selectedVarOutcome.trim().length > 2) {
      const recs = getRecommendedTheories(selectedVarOutcome);
      if (recs.length > 0) {
        const box = document.createElement("div");
        box.className = "p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2";
        box.innerHTML = `
          <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <i data-lucide="sparkles" class="w-4 h-4"></i>
            <span>${recs.length} Teoría(s) sugerida(s) para «${selectedVarOutcome}»:</span>
          </div>
        `;
        const ul = document.createElement("ul");
        ul.className = "space-y-1 text-xs text-emerald-950 dark:text-emerald-200";
        recs.forEach(r => {
          const li = document.createElement("li");
          li.className = "cursor-pointer hover:underline font-medium flex items-center justify-between";
          li.innerHTML = `<span>• ${r.nombre} (${r.autor})</span> <span class="text-[10px] font-mono bg-emerald-200 dark:bg-emerald-800 px-1.5 py-0.5 rounded">Usar</span>`;
          li.addEventListener("click", () => {
            if (onSelectTheory) onSelectTheory(r.nombre);
          });
          ul.appendChild(li);
        });
        box.appendChild(ul);
        matchEl.appendChild(box);
      } else {
        matchEl.innerHTML = `<p class="text-xs text-slate-400 italic">No hay sugerencias automáticas exactas para esta variable. Explore el catálogo general.</p>`;
      }
    }
  }

  // Renderizar la lista principal
  if (listEl) {
    listEl.innerHTML = "";
    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">No se encontraron teorías que coincidan con los filtros aplicados.</p>
          <p class="text-xs text-slate-400 mt-1">Pruebe limpiando la búsqueda o seleccionando "Todas las Facultades".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(theory => {
      const card = document.createElement("article");
      card.className = "bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition hover:border-nexo-gold/60";

      // Render de Constructos
      const constructosHTML = theory.constructos
        .map(([cName, cDesc]) => `<li><strong class="text-slate-800 dark:text-slate-200">${cName}:</strong> ${cDesc}</li>`)
        .join("");

      card.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
          <div>
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-nexo-gold block">${theory.tipo}</span>
            <h3 class="text-lg font-bold font-display text-slate-900 dark:text-white">${theory.nombre}</h3>
            <p class="text-xs font-semibold text-slate-500">${theory.autor} (${theory.anio})</p>
          </div>
          <button data-use-theory="${theory.id}" class="px-3.5 py-2 bg-nexo-navy hover:bg-nexo-navy/90 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm">
            <i data-lucide="check-circle" class="w-4 h-4 text-nexo-gold"></i>
            <span>Asignar a mi Proyecto</span>
          </button>
        </div>

        <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <p><strong>Postulado Central:</strong> ${theory.postulado}</p>
          
          <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <span class="font-mono text-[11px] font-bold text-slate-500 block mb-1 uppercase">Constructos Clave:</span>
            <ul class="list-disc list-inside space-y-1 text-xs">${constructosHTML}</ul>
          </div>

          <p><strong class="text-emerald-600 dark:text-emerald-400">Predicción Teórica:</strong> ${theory.predice}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div class="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
            <span class="font-mono text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Úsela si:</span>
            <p class="text-emerald-950 dark:text-emerald-200">${theory.usela}</p>
          </div>
          <div class="p-3 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-200/60 dark:border-rose-800/40">
            <span class="font-mono text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300 block mb-1">NO la use si:</span>
            <p class="text-rose-950 dark:text-rose-200">${theory.nouse}</p>
          </div>
        </div>

        <div class="border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span><strong>Pregunta sugerida:</strong> ${theory.pregunta}</span>
          <span class="font-mono text-[10px] text-slate-400">Ref: ${theory.ref}</span>
        </div>
      `;

      // Evento del botón Asignar
      const btnUse = card.querySelector(`[data-use-theory="${theory.id}"]`);
      if (btnUse) {
        btnUse.addEventListener("click", () => {
          if (onSelectTheory) onSelectTheory(theory.nombre);
        });
      }

      listEl.appendChild(card);
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}