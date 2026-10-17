/**
 * NEXO Research Studio - Motor de Coherencia Metodológica (6 Eslabones)
 * Archivo: js/coherenceChain.js
 */

/**
 * Normaliza y limpia cadenas para comparaciones flexibles
 * @param {string} str 
 * @returns {string}
 */
function normalizeText(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Evalúa los 6 eslabones de la cadena de coherencia
 * @param {Object} data Objeto con el estado actual de las variables y campos
 * @returns {Array<Object>} Lista de objetos con el diagnóstico de cada eslabón
 */
export function evaluateCoherenceChain(data = {}) {
  const {
    v1 = "",
    v2 = "",
    pob = "",
    amb = "",
    per = "",
    dis = "",
    preg = "",
    teo = "",
    obj = "",
    hip = "",
    i1 = "",
    i2 = ""
  } = data;

  const nV1 = normalizeText(v1);
  const nV2 = normalizeText(v2);
  const nPob = normalizeText(pob);
  const nAmb = normalizeText(amb);
  const nPer = normalizeText(per);
  const nPreg = normalizeText(preg);
  const nObj = normalizeText(obj);
  const nHip = normalizeText(hip);
  const nI1 = normalizeText(i1);
  const nI2 = normalizeText(i2);

  const links = [];

  // ==========================================
  // ESLABÓN 1: Declaración de Núcleo (V1, V2, Población, Ámbito, Periodo)
  // ==========================================
  const link1 = {
    id: 1,
    title: "Eslabón 1: Declaración de Núcleo Temático",
    status: "bad",
    msg: "",
    detail: ""
  };

  if (!nV1 || !nPob || !nAmb || !nPer) {
    link1.status = "bad";
    link1.msg = "Incompleto";
    link1.detail = "Faltan declarar campos clave del núcleo: asegúrese de completar al menos la Variable 1, Población, Ámbito y Periodo.";
  } else if (!nV2) {
    link1.status = "warn";
    link1.msg = "Estudio Univariado / Descriptivo";
    link1.detail = "Se ha registrado solo una variable (V1). Si su estudio es correlacional o explicativo, debe declarar la Variable 2.";
  } else {
    link1.status = "ok";
    link1.msg = "Núcleo Bivariado Completo";
    link1.detail = `Variables (${v1} ${v2 ? "y " + v2 : ""}), delimitadas en ${pob}, ${amb} (${per}).`;
  }
  links.push(link1);

  // ==========================================
  // ESLABÓN 2: Pregunta General vs. Variables y Delimitación
  // ==========================================
  const link2 = {
    id: 2,
    title: "Eslabón 2: Pregunta General de Investigación",
    status: "bad",
    msg: "",
    detail: ""
  };

  if (!nPreg) {
    link2.status = "bad";
    link2.msg = "Sin Pregunta General";
    link2.detail = "Ingrese la pregunta general de investigación (sección 1.3).";
  } else {
    const hasV1 = nV1 && nPreg.includes(nV1);
    const hasV2 = !nV2 || nPreg.includes(nV2);
    const hasPob = nPob && nPreg.includes(nPob);
    const isInterrogative = preg.trim().startsWith("¿") || preg.trim().endsWith("?");

    if (hasV1 && hasV2 && isInterrogative) {
      link2.status = "ok";
      link2.msg = "Pregunta Alineada";
      link2.detail = "La pregunta formula adecuadamente las variables y estructura interrogativa.";
    } else if (!isInterrogative) {
      link2.status = "warn";
      link2.msg = "Falta Signo Interrogativo";
      link2.detail = "La pregunta general debe iniciar con «¿» y cerrar con «?».";
    } else {
      link2.status = "warn";
      link2.msg = "Discrepancia de Términos";
      link2.detail = "Asegúrese de que la pregunta contenga exactamente los nombres de las variables declaradas.";
    }
  }
  links.push(link2);

  // ==========================================
  // ESLABÓN 3: Marco Teórico vs. Variable de Resultado (V2)
  // ==========================================
  const link3 = {
    id: 3,
    title: "Eslabón 3: Fundamentación Teórica Principal",
    status: "bad",
    msg: "",
    detail: ""
  };

  if (!teo) {
    link3.status = "bad";
    link3.msg = "Sin Marco Teórico Seleccionado";
    link3.detail = "Seleccione una teoría o modelo conceptual principal que respalde la investigación (sección 1.4).";
  } else {
    link3.status = "ok";
    link3.msg = "Sostén Teórico Asignado";
    link3.detail = `Teoría/Modelo asignado: «${teo}». Recuerde redactar el párrafo de traducción constructo-variable en la sección 1.4.`;
  }
  links.push(link3);

  // ==========================================
  // ESLABÓN 4: Objetivo General vs. Pregunta General
  // ==========================================
  const link4 = {
    id: 4,
    title: "Eslabón 4: Alineación Pregunta - Objetivo General",
    status: "bad",
    msg: "",
    detail: ""
  };

  if (!nObj) {
    link4.status = "bad";
    link4.msg = "Sin Objetivo General";
    link4.detail = "Declare el objetivo general (sección 1.5).";
  } else {
    const verbs = ["determinar", "evaluar", "analizar", "identificar", "establecer", "describir", "comparar", "demostrar"];
    const startsWithVerb = verbs.some(v => nObj.startsWith(v));
    const hasV1InObj = nV1 && nObj.includes(nV1);

    if (startsWithVerb && hasV1InObj) {
      link4.status = "ok";
      link4.msg = "Objetivo Coherente";
      link4.detail = "El objetivo general inicia con un verbo en infinitivo adecuado y mantiene las variables de estudio.";
    } else if (!startsWithVerb) {
      link4.status = "warn";
      link4.msg = "Verbo Infinitivo Ausente";
      link4.detail = "El objetivo general debe iniciar con un verbo en infinitivo (ej. Determinar, Identificar, Evaluar).";
    } else {
      link4.status = "warn";
      link4.msg = "Posible Desalineación";
      link4.detail = "Verifique que las variables en el objetivo general coincidan literalmente con la pregunta de investigación.";
    }
  }
  links.push(link4);

  // ==========================================
  // ESLABÓN 5: Diseño Metodológico vs. Alcance y Verbos
  // ==========================================
  const link5 = {
    id: 5,
    title: "Eslabón 5: Alcance y Diseño Metodológico",
    status: "bad",
    msg: "",
    detail: ""
  };

  if (!dis) {
    link5.status = "bad";
    link5.msg = "Sin Diseño Asignado";
    link5.detail = "Seleccione el alcance y diseño metodológico (sección 2.1).";
  } else {
    if (dis === "corr" && nObj && !nObj.includes("relacion") && !nObj.includes("asociac") && !nObj.includes("determinar")) {
      link5.status = "warn";
      link5.msg = "Incoherencia Verbo - Alcance";
      link5.detail = "Un alcance correlacional exige verbos o frases de asociación como «Determinar la relación entre…» o «Determinar la asociación…».";
    } else {
      link5.status = "ok";
      link5.msg = "Metodología Consistente";
      link5.detail = `Alcance/Diseño seleccionado: [${dis.toUpperCase()}]. Coincide con la naturaleza del estudio.`;
    }
  }
  links.push(link5);

  // ==========================================
  // ESLABÓN 6: Hipótesis e Instrumentos
  // ==========================================
  const link6 = {
    id: 6,
    title: "Eslabón 6: Hipótesis e Instrumentos de Medición",
    status: "bad",
    msg: "",
    detail: ""
  };

  if (!nHip && dis !== "desc") {
    link6.status = "bad";
    link6.msg = "Falta Hipótesis Alterna";
    link6.detail = "Los estudios correlacionales o explicativos requieren la declaración explícita de la hipótesis alterna (Hi).";
  } else if (!nI1) {
    link6.status = "warn";
    link6.msg = "Falta Instrumento de Variable 1";
    link6.detail = "Declare el cuestionario, escala o lista de cotejo para medir la Variable 1.";
  } else {
    link6.status = "ok";
    link6.msg = "Operacionalización e Hipótesis Validadas";
    link6.detail = `Instrumentos asignados: ${i1} ${i2 ? "y " + i2 : ""}. ${nHip ? "Hipótesis formulada." : "Diseño descriptivo exento de hipótesis."}`;
  }
  links.push(link6);

  return links;
}

/**
 * Renderiza la interfaz de tarjetas del Hilo de Coherencia en el DOM
 * @param {Array<Object>} links Lista de diagnósticos de los 6 eslabones
 * @param {HTMLElement} containerEl Contenedor DOM para las tarjetas
 * @param {HTMLElement} scoreBarEl Contenedor de la barra visual de progreso
 * @param {HTMLElement} scoreSummaryEl Contenedor del texto de resumen
 */
export function renderCoherenceChainUI(links, containerEl, scoreBarEl, scoreSummaryEl) {
  if (!containerEl) return;

  containerEl.innerHTML = "";
  if (scoreBarEl) scoreBarEl.innerHTML = "";

  let okCount = 0;

  links.forEach(link => {
    if (link.status === "ok") okCount++;

    // Color badges
    let statusClass = "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
    let iconName = "alert-circle";

    if (link.status === "ok") {
      statusClass = "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      iconName = "check-circle-2";
    } else if (link.status === "warn") {
      statusClass = "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      iconName = "alert-triangle";
    }

    // Crear Card DOM
    const card = document.createElement("div");
    card.className = "p-4 rounded-xl border bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 transition shadow-sm space-y-1.5";

    card.innerHTML = `
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-xs font-bold font-display text-slate-800 dark:text-slate-200">${link.title}</h3>
        <span class="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border ${statusClass}">
          <i data-lucide="${iconName}" class="w-3.5 h-3.5"></i>
          <span>${link.msg}</span>
        </span>
      </div>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${link.detail}</p>
    `;

    containerEl.appendChild(card);

    // Agregar bloque a la barra de puntuación
    if (scoreBarEl) {
      const seg = document.createElement("div");
      seg.className = `h-2 flex-1 rounded-full transition-all duration-300 ${
        link.status === "ok" ? "bg-emerald-500" : link.status === "warn" ? "bg-amber-400" : "bg-rose-400"
      }`;
      scoreBarEl.appendChild(seg);
    }
  });

  if (scoreSummaryEl) {
    scoreSummaryEl.textContent = `${okCount} de 6 eslabones firmes`;
  }

  // Re-inicializar íconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
}