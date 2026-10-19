/**
 * NEXO Research Studio - Buscador, Recomendador y Gestor de Marcos Teóricos
 * Archivo: js/theoriesEngine.js
 * Autor / Dirección Metodológica: Ing. Percy Castro Mejía
 */

import { THEORIES_DATA } from "../data/theoriesData.js";

let selectedFacultyFilter = "";
let selectedVarOutcome = "";
let searchQuery = "";

/**
 * Normaliza cadenas de texto para búsquedas insensibles a tildes y mayúsculas
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
 * Obtiene el catálogo unificado de teorías (Predefinidas + Personalizadas por el usuario)
 * @param {Object} state Estado global de la aplicación
 * @returns {Array<Object>}
 */
function getAllTheories(state) {
  const customList = (state && state.customTheories) ? state.customTheories : [];
  return [...THEORIES_DATA, ...customList];
}

/**
 * Inicializa el motor de teorías y vincula los controles de búsqueda y filtro
 * @param {Object} state Estado global de la aplicación
 * @param {Function} onSelectTheory Callback invocado al seleccionar una teoría
 */
export function initTheoriesEngine(state, onSelectTheory) {
  const facSelectEl = document.getElementById("thfacultad");
  const varInputEl = document.getElementById("thvar");
  const searchInputEl = document.getElementById("thq");
  const listContainerEl = document.getElementById("thlist");
  const matchContainerEl = document.getElementById("thmatch");
  const countEl = document.getElementById("thcount");

  // Auto-seleccionar la facultad declarada por el estudiante si existe
  if (facSelectEl && state.student && state.student.facultad) {
    selectedFacultyFilter = state.student.facultad;
    facSelectEl.value = selectedFacultyFilter;
  }

  // Inicializar la variable de resultado desde el proyecto si ya fue escrita
  if (state.project && (state.project.v2 || state.project.v1)) {
    selectedVarOutcome = state.project.v2 || state.project.v1;
    if (varInputEl && !varInputEl.value) {
      varInputEl.value = selectedVarOutcome;
    }
  }

  // Escuchar eventos en los controles de filtrado
  if (facSelectEl) {
    facSelectEl.addEventListener("change", (e) => {
      selectedFacultyFilter = e.target.value;
      updateTheoriesUI(listContainerEl, matchContainerEl, countEl, state, onSelectTheory);
    });
  }

  if (varInputEl) {
    varInputEl.addEventListener("input", (e) => {
      selectedVarOutcome = e.target.value;
      updateTheoriesUI(listContainerEl, matchContainerEl, countEl, state, onSelectTheory);
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      updateTheoriesUI(listContainerEl, matchContainerEl, countEl, state, onSelectTheory);
    });
  }

  // Renderizado inicial
  updateTheoriesUI(listContainerEl, matchContainerEl, countEl, state, onSelectTheory);
}

/**
 * Sincroniza la teoría seleccionada con la Pestaña 01 y el estado global
 * @param {Object|string} theory Objeto o nombre de la teoría seleccionada
 * @param {Object} state Estado global de la aplicación
 * @param {Function} onSelectTheory Callback de actualización
 */
export function applyTheoryToProject(theory, state, onSelectTheory) {
  const theoryName = typeof theory === "string" ? theory : theory.nombre;
  
  if (!state.project) state.project = {};
  state.project.teo = theoryName;

  // Sincronizar dinámicamente con el selector #f-teo en la Pestaña 01
  const teoSelect01 = document.getElementById("f-teo");
  if (teoSelect01) {
    let optionExists = Array.from(teoSelect01.options).some(opt => opt.value === theoryName);
    
    if (!optionExists) {
      const newOpt = document.createElement("option");
      newOpt.value = theoryName;
      const authorText = typeof theory === "object" && theory.autor ? ` (${theory.autor}, ${theory.anio || ''})` : '';
      newOpt.textContent = `${theoryName}${authorText}`;
      teoSelect01.appendChild(newOpt);
    }
    teoSelect01.value = theoryName;
  }

  if (onSelectTheory) {
    onSelectTheory(theoryName);
  }

  // Mensaje confirmatorio de vinculación
  const countEl = document.getElementById("thcount");
  if (countEl) {
    countEl.textContent = `¡Teoría «${theoryName}» asignada con éxito a su investigación!`;
    countEl.className = "text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold pt-1";
    setTimeout(() => {
      countEl.className = "text-xs font-mono text-slate-400 pt-1";
    }, 4000);
  }
}

/**
 * Filtra el catálogo según facultad y término de búsqueda
 */
function filterTheories(state) {
  const q = cleanStr(searchQuery);
  const allList = getAllTheories(state);

  return allList.filter(theory => {
    // Filtro por Facultad
    if (selectedFacultyFilter && theory.facultad !== selectedFacultyFilter) {
      return false;
    }

    // Búsqueda Abierta (Nombre, Autor, Postulado, Palabras Clave)
    if (q) {
      const matchName = cleanStr(theory.nombre).includes(q);
      const matchAutor = cleanStr(theory.autor).includes(q);
      const matchPost = cleanStr(theory.postulado).includes(q);
      const matchKw = theory.kw ? theory.kw.some(k => cleanStr(k).includes(q)) : false;
      const matchKeywords = theory.keywords ? theory.keywords.some(k => cleanStr(k).includes(q)) : false;

      if (!matchName && !matchAutor && !matchPost && !matchKw && !matchKeywords) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Obtiene recomendaciones basadas en la variable de resultado
 */
function getRecommendedTheories(varName, state) {
  if (!varName || !varName.trim()) return [];
  const cleanVar = cleanStr(varName);
  const allList = getAllTheories(state);

  return allList.filter(theory => {
    const matchFac = !selectedFacultyFilter || theory.facultad === selectedFacultyFilter;
    const matchRes = theory.resultados ? theory.resultados.some(r => cleanStr(r).includes(cleanVar)) : false;
    const matchKw = theory.kw ? theory.kw.some(k => cleanStr(k).includes(cleanVar)) : false;
    const matchKeywords = theory.keywords ? theory.keywords.some(k => cleanStr(k).includes(cleanVar)) : false;
    const matchName = cleanStr(theory.nombre).includes(cleanVar);

    return matchFac && (matchRes || matchKw || matchKeywords || matchName);
  });
}

/**
 * Actualiza la interfaz gráfica del recomendador verde y el catálogo
 */
function updateTheoriesUI(listEl, matchEl, countEl, state, onSelectTheory) {
  const filtered = filterTheories(state);

  if (countEl) {
    countEl.textContent = `${filtered.length} marco(s) teórico(s) encontrado(s)`;
  }

  // RENDERIZADO DEL RECUADRO DE RECOMENDACIÓN VERDE
  if (matchEl) {
    matchEl.innerHTML = "";
    if (selectedVarOutcome && selectedVarOutcome.trim().length > 2) {
      const recs = getRecommendedTheories(selectedVarOutcome, state);

      if (recs.length > 0) {
        const topRec = recs[0];
        const isAssigned = state.project && state.project.teo === topRec.nombre;

        const box = document.createElement("div");
        box.className = "p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-2";
        box.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
              ${recs.length} Teoría(s) sugerida(s) para «<strong>${selectedVarOutcome}</strong>»:
            </span>
          </div>
          <div class="flex items-center justify-between gap-3 pt-1">
            <div class="text-xs text-emerald-800 dark:text-emerald-300 font-medium truncate">
              • ${topRec.nombre} ${topRec.autor ? `(${topRec.autor})` : ''}
            </div>
            <button type="button" id="btn-use-rec" class="px-3 py-1 ${
              isAssigned ? 'bg-emerald-700 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            } font-mono font-bold text-xs rounded-lg transition shadow-sm flex-shrink-0 cursor-pointer">
              ${isAssigned ? 'Asignado' : 'Usar'}
            </button>
          </div>
        `;

        // Acción operativa del botón Usar en el recuadro verde
        const btnUseRec = box.querySelector("#btn-use-rec");
        if (btnUseRec) {
          btnUseRec.addEventListener("click", () => {
            applyTheoryToProject(topRec, state, onSelectTheory);
            updateTheoriesUI(listEl, matchEl, countEl, state, onSelectTheory);
          });
        }

        matchEl.appendChild(box);
      } else {
        // Sugerencia sin coincidencias directas con enlace a ChatGPT
        const gptQuery = `Actúa como docente e investigador. Recomiéndame el marco teórico o modelo conceptual idóneo para investigar la variable "${selectedVarOutcome}" en la carrera de ${state.student?.escuela || "investigación científica"}. Indica: Autor, Año, Constructos clave y Cita APA 7.`;
        const gptUrl = `https://chatgpt.com/?q=${encodeURIComponent(gptQuery)}`;

        matchEl.innerHTML = `
          <div class="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-2">
            <p class="text-xs text-amber-800 dark:text-amber-300">
              No hay sugerencias estáticas exactas para «<strong>${selectedVarOutcome}</strong>».
            </p>
            <div class="pt-1">
              <a href="${gptUrl}" target="_blank" rel="noopener" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition inline-flex items-center gap-1.5">
                <i data-lucide="bot" class="w-3.5 h-3.5"></i> Consultar a ChatGPT sobre esta Variable
              </a>
            </div>
          </div>
        `;
      }
    }
  }

  // RENDERIZADO DEL CATÁLOGO PRINCIPAL (TARJETAS DESPLEGABLES / ACORDEÓN)
  if (listEl) {
    listEl.innerHTML = "";

    // CASO: SI NO SE ENCUENTRA LA TEORÍA BUSCADA
    if (filtered.length === 0) {
      const cleanQ = searchQuery.trim();
      const gptPrompt = `Actúa como docente e investigador. Explícame el marco teórico o modelo conceptual denominado "${cleanQ || 'solicitado'}". Indica Autor, Año, Constructos o Dimensiones y la Cita en formato APA 7.`;
      const gptUrl = `https://chatgpt.com/?q=${encodeURIComponent(gptPrompt)}`;

      listEl.innerHTML = `
        <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div class="text-slate-600 dark:text-slate-300 text-xs space-y-1">
            <p class="font-bold text-sm text-slate-800 dark:text-slate-200">No se encontró el marco teórico «${cleanQ}» en el catálogo preseteado.</p>
            <p class="text-slate-500">Consulte al Tutor IA para aprender en qué consiste o regístrelo directamente para vincularlo a su investigación.</p>
          </div>

          <div class="flex items-center gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
            <a href="${gptUrl}" target="_blank" rel="noopener" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition inline-flex items-center gap-2">
              <i data-lucide="bot" class="w-4 h-4"></i> Investigar «${cleanQ}» en ChatGPT
            </a>
          </div>

          <!-- Formulario de Teoría Personalizada -->
          <div class="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-3 mt-3">
            <span class="text-xs font-bold block text-slate-800 dark:text-slate-200">Registrar e Incorporar Teoría Personalizada:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input type="text" id="custom-th-name" value="${cleanQ}" placeholder="Nombre exacto del Marco Teórico" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-nexo-gold">
              <input type="text" id="custom-th-author" placeholder="Autor y Año (Ej. Smith, 2021)" class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-nexo-gold">
            </div>
            <button type="button" id="btn-save-custom-th" class="px-4 py-2 bg-nexo-navy hover:bg-nexo-navy/90 text-white text-xs font-semibold rounded-xl transition cursor-pointer">
              Guardar y Asignar a mi Proyecto
            </button>
          </div>
        </div>
      `;

      // Evento para guardar teoría personalizada
      const saveCustomBtn = listEl.querySelector("#btn-save-custom-th");
      if (saveCustomBtn) {
        saveCustomBtn.addEventListener("click", () => {
          const nameVal = document.getElementById("custom-th-name").value.trim();
          const authorVal = document.getElementById("custom-th-author").value.trim();

          if (!nameVal) return;

          const customObj = {
            id: `custom_${Date.now()}`,
            facultad: selectedFacultyFilter || "f-salud",
            nombre: nameVal,
            autor: authorVal || "Autor Personalizado",
            anio: new Date().getFullYear().toString(),
            tipo: "Teoría Personalizada",
            postulado: "Marco teórico personalizado registrado directamente por el investigador.",
            resumen: "Sostén conceptual registrado de forma personalizada.",
            constructos: [
              "Dimensiones de la Variable 1",
              "Dimensiones de la Variable 2"
            ],
            predice: "Sostén conceptual para el análisis de los resultados.",
            resultados: [nameVal.toLowerCase()],
            kw: [nameVal.toLowerCase()],
            usela: "Diseñado por el usuario para su tema de tesis particular.",
            nouse: "Estudios no vinculados a este constructo.",
            pregunta: `¿De qué manera se relaciona ${nameVal} con el problema general de investigación?`,
            ejemploCita: `${authorVal || 'Investigador'} postula las bases de ${nameVal}.`,
            ref: `${authorVal || 'Investigador'}. (${new Date().getFullYear()}). Documento de Trabajo de Investigación.`
          };

          if (!state.customTheories) state.customTheories = [];
          state.customTheories.push(customObj);

          applyTheoryToProject(customObj, state, onSelectTheory);
          updateTheoriesUI(listEl, matchEl, countEl, state, onSelectTheory);
        });
      }

      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const facNames = {
      "f-salud": "Ciencias de la Salud",
      "f-ingenieria": "Ingeniería, Arq. y Urb.",
      "f-empresariales": "Ciencias Empresariales",
      "f-derecho": "Derecho y Humanidades"
    };

    // RENDERIZADO DE TARJETAS EN FORMATO ACORDEÓN
    filtered.forEach(theory => {
      const isAssigned = state && state.project && state.project.teo === theory.nombre;

      const card = document.createElement("article");
      card.className = `bg-white dark:bg-slate-900 rounded-2xl border transition shadow-sm overflow-hidden ${
        isAssigned 
          ? "border-nexo-gold ring-1 ring-nexo-gold" 
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`;

      // Renderizado flexible de constructos
      let constructosHTML = "";
      if (Array.isArray(theory.constructos)) {
        constructosHTML = theory.constructos.map(c => {
          if (Array.isArray(c)) {
            return `<li><strong class="text-slate-800 dark:text-slate-200">${c[0]}:</strong> ${c[1]}</li>`;
          }
          return `<span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono">${c}</span>`;
        }).join(Array.isArray(theory.constructos[0]) ? "" : " ");
      }

      card.innerHTML = `
        <!-- CABECERA DE LA TARJETA (COMPACTA - DESPLEGABLE) -->
        <div class="p-4 flex items-center justify-between gap-3 cursor-pointer select-none toggle-header bg-slate-50/50 dark:bg-slate-800/30">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-8 h-8 rounded-xl bg-nexo-navy/10 dark:bg-slate-800 text-nexo-navy dark:text-nexo-gold flex items-center justify-center font-bold font-mono text-xs flex-shrink-0">
              <i data-lucide="book" class="w-4 h-4"></i>
            </div>
            <div class="truncate">
              <div class="flex items-center gap-2">
                <h3 class="font-display font-bold text-sm text-slate-900 dark:text-white truncate">${theory.nombre}</h3>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex-shrink-0">${facNames[theory.facultad] || "General"}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${theory.autor || ''} ${theory.anio ? `(${theory.anio})` : ''}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            <button type="button" class="btn-use-card px-3.5 py-1.5 ${
              isAssigned ? "bg-emerald-600 text-white" : "bg-nexo-navy hover:bg-nexo-navy/90 text-white"
            } text-xs font-semibold rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer">
              <i data-lucide="${isAssigned ? "check" : "plus"}" class="w-3.5 h-3.5"></i>
              <span>${isAssigned ? "Asignado" : "Usar"}</span>
            </button>
            
            <button type="button" class="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition toggle-icon">
              <i data-lucide="chevron-down" class="w-4 h-4 transition-transform duration-200"></i>
            </button>
          </div>
        </div>

        <!-- DETALLES (DESPLEGABLE OCULTO POR DEFECTO) -->
        <div class="details-body hidden p-5 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900 text-xs">
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Postulado Central:</strong> ${theory.postulado || theory.resumen || 'Sin postulado declarado.'}
          </p>

          ${constructosHTML ? `
            <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <span class="font-mono text-[10px] uppercase font-bold text-slate-500 block mb-1">Constructos / Dimensiones Clave:</span>
              ${Array.isArray(theory.constructos[0]) ? `<ul class="list-disc list-inside space-y-1 text-xs">${constructosHTML}</ul>` : `<div class="flex flex-wrap gap-1.5 pt-1">${constructosHTML}</div>`}
            </div>
          ` : ''}

          ${theory.predice ? `<p><strong class="text-emerald-600 dark:text-emerald-400">Predicción Teórica:</strong> ${theory.predice}</p>` : ''}

          ${(theory.usela || theory.nouse) ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              ${theory.usela ? `
                <div class="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                  <span class="font-mono text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Úsela si:</span>
                  <p class="text-emerald-950 dark:text-emerald-200">${theory.usela}</p>
                </div>
              ` : ''}
              ${theory.nouse ? `
                <div class="p-3 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-200/60 dark:border-rose-800/40">
                  <span class="font-mono text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300 block mb-1">NO la use si:</span>
                  <p class="text-rose-950 dark:text-rose-200">${theory.nouse}</p>
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${(theory.ejemploCita || theory.pregunta) ? `
            <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              ${theory.ejemploCita ? `<p class="italic text-slate-700 dark:text-slate-300"><strong>Cita Recomendada (APA 7):</strong> "${theory.ejemploCita}"</p>` : ''}
              ${theory.pregunta ? `<p class="text-slate-500"><strong>Pregunta sugerida:</strong> ${theory.pregunta}</p>` : ''}
            </div>
          ` : ''}
        </div>
      `;

      // Evento para colapsar/desplegar acordeón
      const headerEl = card.querySelector(".toggle-header");
      const detailsEl = card.querySelector(".details-body");
      const iconEl = card.querySelector(".toggle-icon i");

      headerEl.addEventListener("click", (e) => {
        if (e.target.closest(".btn-use-card")) return;

        const isHidden = detailsEl.classList.contains("hidden");
        if (isHidden) {
          detailsEl.classList.remove("hidden");
          if (iconEl) iconEl.style.transform = "rotate(180deg)";
        } else {
          detailsEl.classList.add("hidden");
          if (iconEl) iconEl.style.transform = "rotate(0deg)";
        }
      });

      // Evento del botón Usar/Asignar dentro de la tarjeta
      const btnUse = card.querySelector(".btn-use-card");
      if (btnUse) {
        btnUse.addEventListener("click", (e) => {
          e.stopPropagation();
          applyTheoryToProject(theory, state, onSelectTheory);
          updateTheoriesUI(listEl, matchEl, countEl, state, onSelectTheory);
        });
      }

      listEl.appendChild(card);
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}