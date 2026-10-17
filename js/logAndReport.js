/**
 * NEXO Research Studio - Bitácora de IA, Anexo 5, Mapa de Calor y Plan de Trabajo
 * Archivo: js/logAndReport.js
 */

import { SECTIONS_DATA } from "../data/sectionsData.js";
import { evaluateCoherenceChain } from "./coherenceChain.js";

export function initLogAndReport(state) {
  const copyDeclBtn = document.getElementById("copydecl");

  if (copyDeclBtn) {
    copyDeclBtn.addEventListener("click", () => {
      const declText = generateAnexo5Text(state);
      navigator.clipboard.writeText(declText).then(() => {
        const msgEl = document.getElementById("declmsg");
        if (msgEl) {
          msgEl.textContent = "¡Texto del Anexo 5 copiado al portapapeles!";
          msgEl.className = "text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold";
          setTimeout(() => { msgEl.textContent = ""; }, 3000);
        }
      });
    });
  }

  renderReportView(state);
}

export function renderReportView(state) {
  renderReportStats(state);
  renderHeatmap(state);
  renderWorkPlan(state);
  renderAILogTable(state);
  renderAnexo5Draft(state);
}

/**
 * Renderiza el Mapa de Calor Metodológico (16 Semanas)
 */
export function renderHeatmap(state) {
  const container = document.getElementById("heatmap-container");
  if (!container) return;

  container.innerHTML = "";
  const drafts = state.drafts || {};

  SECTIONS_DATA.forEach(sec => {
    const text = drafts[sec.id] || "";
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;

    let statusClass = "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
    let statusLabel = "Sin iniciar";

    if (words > 0) {
      const minW = sec.ext ? sec.ext[0] : 50;
      if (words >= minW) {
        statusClass = "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
        statusLabel = "Completo";
      } else {
        statusClass = "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
        statusLabel = "En proceso";
      }
    }

    const cell = document.createElement("div");
    cell.className = `p-3 rounded-xl border flex flex-col justify-between transition shadow-sm ${statusClass} cursor-pointer`;
    cell.title = `${sec.code}: ${sec.title} (${words} palabras - ${statusLabel})`;
    cell.innerHTML = `
      <div class="flex items-center justify-between gap-1">
        <span class="font-mono text-[10px] font-bold uppercase">${sec.code}</span>
        <span class="text-[9px] font-mono opacity-80">${words} w</span>
      </div>
      <span class="text-[11px] font-semibold truncate mt-1.5">${sec.title}</span>
    `;

    container.appendChild(cell);
  });
}

export function renderReportStats(state) {
  const statsContainer = document.getElementById("stats");
  if (!statsContainer) return;

  const drafts = state.drafts || {};
  const logs = state.log || [];
  const project = state.project || {};

  const completedSections = Object.keys(drafts).filter(k => drafts[k] && drafts[k].trim().length > 0).length;

  let totalWords = 0;
  Object.values(drafts).forEach(text => {
    if (text) {
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      totalWords += words.length;
    }
  });

  const coherenceLinks = evaluateCoherenceChain(project);
  const okLinksCount = coherenceLinks.filter(l => l.status === "ok").length;
  const decisionsCount = logs.filter(l => l.dec && l.dec !== "Consulta").length;

  statsContainer.innerHTML = `
    <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
      <span class="text-[10px] font-mono font-bold uppercase text-slate-400 block">Secciones Iniciadas</span>
      <span class="text-2xl font-extrabold font-display text-slate-900 dark:text-white">${completedSections} / 16</span>
    </div>

    <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
      <span class="text-[10px] font-mono font-bold uppercase text-slate-400 block">Total Palabras Redactadas</span>
      <span class="text-2xl font-extrabold font-display text-slate-900 dark:text-white">${totalWords.toLocaleString("es-PE")}</span>
    </div>

    <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
      <span class="text-[10px] font-mono font-bold uppercase text-slate-400 block">Coherencia Metodológica</span>
      <span class="text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">${okLinksCount} / 6</span>
    </div>

    <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
      <span class="text-[10px] font-mono font-bold uppercase text-slate-400 block">Decisiones de IA Auditadas</span>
      <span class="text-2xl font-extrabold font-display text-nexo-gold">${decisionsCount}</span>
    </div>
  `;
}

export function renderWorkPlan(state) {
  const planContainer = document.getElementById("plan");
  if (!planContainer) return;

  const project = state.project || {};
  const drafts = state.drafts || {};
  const checks = state.checks || {};
  const coherenceLinks = evaluateCoherenceChain(project);

  const pendingItems = [];

  coherenceLinks.forEach(link => {
    if (link.status !== "ok") {
      pendingItems.push({
        type: "Coherencia Metodológica",
        detail: `[${link.title}] ${link.detail}`
      });
    }
  });

  SECTIONS_DATA.forEach(sec => {
    const draftText = drafts[sec.id] || "";
    const words = draftText.trim().split(/\s+/).filter(w => w.length > 0).length;

    if (!draftText) {
      pendingItems.push({
        type: `Sección ${sec.code} (${sec.title})`,
        detail: `Borrador no iniciado. Producto esperado: ${sec.prod}`
      });
    } else if (sec.ext) {
      const [minW] = sec.ext;
      if (words < minW) {
        pendingItems.push({
          type: `Sección ${sec.code} (${sec.title})`,
          detail: `Extensión insuficiente (${words} palabras de un mínimo de ${minW}).`
        });
      }
    }

    const userChecks = checks[sec.id] || [];
    const missingChecksCount = sec.crit.length - userChecks.length;
    if (missingChecksCount > 0 && draftText) {
      pendingItems.push({
        type: `Sección ${sec.code} (${sec.title})`,
        detail: `Faltan cumplir ${missingChecksCount} criterio(s) de autoevaluación.`
      });
    }
  });

  planContainer.innerHTML = `
    <h3 class="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
      <i data-lucide="list-checks" class="w-4 h-4 text-nexo-gold"></i> Plan de Trabajo Dinámico (Prioridades de Redacción)
    </h3>
  `;

  if (pendingItems.length === 0) {
    planContainer.innerHTML += `
      <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
        ¡Excelente trabajo! No se detectan inconsistencias críticas de coherencia ni borradores pendientes.
      </div>
    `;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "space-y-2 text-xs";

  pendingItems.slice(0, 8).forEach(item => {
    const li = document.createElement("li");
    li.className = "p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-2.5";
    li.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0"></span>
      <div>
        <strong class="text-slate-800 dark:text-slate-200 block">${item.type}</strong>
        <span class="text-slate-600 dark:text-slate-400 leading-normal">${item.detail}</span>
      </div>
    `;
    ul.appendChild(li);
  });

  planContainer.appendChild(ul);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

export function renderAILogTable(state) {
  const tbody = document.getElementById("logbody");
  const logCountEl = document.getElementById("logcount");
  if (!tbody) return;

  const logs = state.log || [];
  if (logCountEl) logCountEl.textContent = `${logs.length} registro(s)`;

  tbody.innerHTML = "";

  if (logs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-6 text-center text-slate-400 italic">
          No hay registros en la bitácora aún. Las consultas y auditorías realizadas con el Tutor IA se listarán automáticamente aquí.
        </td>
      </tr>
    `;
    return;
  }

  logs.slice().reverse().forEach(entry => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50 dark:hover:bg-slate-800/40 transition";
    const dateFormatted = entry.timestamp ? new Date(entry.timestamp).toLocaleString("es-PE", { dateStyle: "short", timeStyle: "short" }) : "—";

    tr.innerHTML = `
      <td class="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">${dateFormatted}</td>
      <td class="p-3 font-semibold text-slate-800 dark:text-slate-200">${entry.sec || "—"}</td>
      <td class="p-3 text-slate-600 dark:text-slate-400">${entry.tool || "ChatGPT"}</td>
      <td class="p-3 text-slate-700 dark:text-slate-300 max-w-xs truncate" title="${entry.ai || ''}">${entry.ai || "—"}</td>
      <td class="p-3">
        <span class="font-bold text-nexo-gold block">${entry.dec || "Consulta"}</span>
        <span class="text-[11px] text-slate-500 block leading-tight">${entry.why || ""}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

export function generateAnexo5Text(state) {
  const student = state.student || {};
  const logs = state.log || [];

  const toolsUsed = [...new Set(logs.map(l => l.tool))].join("; ") || "ChatGPT (OpenAI)";
  const sectionsAudited = [...new Set(logs.map(l => l.sec))].join("; ") || "Secciones del Capítulo I y II";
  const accepted = logs.filter(l => l.dec && l.dec.includes("Aceptar")).length;
  const total = logs.length;
  const todayStr = new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" });

  return `DECLARACIÓN JURADA DE USO DE HERRAMIENTAS DE INTELIGENCIA ARTIFICIAL (ANEXO 5)

Yo, ${student.nombre || "________________________________________"}, estudiante de la Escuela Profesional de ${student.escuela || "____________________"} de la Universidad Señor de Sipán, declaro bajo juramento que:

1. He utilizado herramientas de Inteligencia Artificial Generativa (${toolsUsed}) exclusivamente como soporte de tutoría, revisión metodológica y auditoría de coherencia para la redacción de mi anteproyecto de investigación titulado:
"${student.titulo || "________________________________________________________________________________________"}".

2. La herramienta de IA no redactó párrafos finales ni generó datos empíricos, hallazgos o referencias bibliográficas ficticias. Su función se limitó a la evaluación contra los criterios del manual metodológico de las secciones: ${sectionsAudited}.

3. Se realizaron un total de ${total} interacciones de auditoría registradas en la bitácora de la plataforma NEXO Research Studio, de las cuales acepté e incorporé ${accepted} observaciones fundamentadas.

4. Todas las fuentes citadas han sido verificadas en sus textos originales, asumiendo la responsabilidad intelectual y ética sobre la totalidad del contenido presentado.

Chiclayo, ${todayStr}.

__________________________________________
Firma del Estudiante / Investigador
DNI / Código USS: ________________________`;
}

export function renderAnexo5Draft(state) {
  const declEl = document.getElementById("decl");
  if (declEl) {
    declEl.textContent = generateAnexo5Text(state);
  }
}