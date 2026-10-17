/**
 * NEXO Research Studio - Simulador de Jurado de Sustentación
 * Archivo: js/jurySimulator.js
 */

import { SECTIONS_DATA } from "../data/sectionsData.js";

/**
 * Inicializa el Simulador de Jurado y configura los eventos de registro
 * @param {Object} state Estado global de la aplicación
 * @param {Function} onSaveJuryLog Callback ejecutado al guardar una ronda de defensa
 */
export function initJurySimulator(state, onSaveJuryLog) {
  const focusSelectEl = document.getElementById("jfocus");
  const levelSelectEl = document.getElementById("jlevel");
  const saveBtn = document.getElementById("jsave");
  const qEl = document.getElementById("jq");
  const aEl = document.getElementById("ja");
  const vEl = document.getElementById("jv");
  const lEl = document.getElementById("jl");
  const msgEl = document.getElementById("jmsg");

  // Poblar el selector de focos de evaluación
  populateJuryFocusOptions(focusSelectEl);

  // Generar y actualizar el prompt en tiempo real al cambiar focos o nivel
  if (focusSelectEl) {
    focusSelectEl.addEventListener("change", () => updateJuryPromptView(state));
  }
  if (levelSelectEl) {
    levelSelectEl.addEventListener("change", () => updateJuryPromptView(state));
  }

  // Evento para guardar el registro de la defensa en la bitácora
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const question = qEl ? qEl.value.trim() : "";
      const answer = aEl ? aEl.value.trim() : "";
      const valuation = vEl ? vEl.value : "";
      const plan = lEl ? lEl.value.trim() : "";

      if (!question || !answer || !valuation) {
        if (msgEl) {
          msgEl.textContent = "Complete la pregunta del jurado, su respuesta y la valoración obtenida.";
          msgEl.className = "text-xs font-mono text-rose-500 font-semibold";
        }
        return;
      }

      if (answer.length < 15) {
        if (msgEl) {
          msgEl.textContent = "Sustente su respuesta en al menos una oración estructurada.";
          msgEl.className = "text-xs font-mono text-rose-500 font-semibold";
        }
        return;
      }

      const focusText = focusSelectEl && focusSelectEl.selectedOptions[0] 
        ? focusSelectEl.selectedOptions[0].text 
        : "Defensa General";

      const juryEntry = {
        timestamp: new Date().toISOString(),
        sec: focusText,
        tool: "Jurado Simulado (Sustentación Oral)",
        ai: `Pregunta del Jurado: "${question}" | Valoración: [${valuation}]`,
        dec: "Defensa Registrada",
        why: `Respuesta: "${answer}"${plan ? " | Plan de mejora: " + plan : ""}`
      };

      if (onSaveJuryLog) {
        onSaveJuryLog(juryEntry);
      }

      // Limpiar formulario y notificar
      if (qEl) qEl.value = "";
      if (aEl) aEl.value = "";
      if (vEl) vEl.value = "";
      if (lEl) lEl.value = "";

      if (msgEl) {
        msgEl.textContent = "¡Ronda de sustentación registrada con éxito en la bitácora!";
        msgEl.className = "text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold";
        setTimeout(() => { msgEl.textContent = ""; }, 4000);
      }
    });
  }

  // Vista inicial del prompt
  updateJuryPromptView(state);
}

/**
 * Pobla el elemento select con las secciones evaluables del anteproyecto
 * @param {HTMLSelectElement} selectEl 
 */
export function populateJuryFocusOptions(selectEl) {
  if (!selectEl) return;

  selectEl.innerHTML = "";

  // Opción general por defecto
  const optAll = document.createElement("option");
  optAll.value = "all";
  optAll.textContent = "Defensa Integral (Todo el Hilo de Coherencia)";
  selectEl.appendChild(optAll);

  // Agregar secciones metodológicas de la ruta
  SECTIONS_DATA.forEach(sec => {
    if (!sec.ra) {
      const opt = document.createElement("option");
      opt.value = sec.id;
      opt.textContent = `[${sec.code}] ${sec.title}`;
      selectEl.appendChild(opt);
    }
  });
}

/**
 * Construye el prompt estructurado para la IA en el rol de Jurado
 * @param {Object} state Estado global de la aplicación
 * @returns {string} Prompt completo formateado
 */
export function buildJuryPrompt(state) {
  const focusSelectEl = document.getElementById("jfocus");
  const levelSelectEl = document.getElementById("jlevel");

  const focusId = focusSelectEl ? focusSelectEl.value : "all";
  const isExigente = levelSelectEl ? levelSelectEl.value === "exigente" : true;

  const project = state.project || {};
  const student = state.student || {};

  const levelDirective = isExigente
    ? "Exigente y riguroso como en una sustentación real de grado. No aceptes respuestas genéricas ni apelos emocionales. Exige fundamentación teórica y metodológica."
    : "Formativo y orientador. Si la respuesta es incompleta o débil, formula repreguntas orientadoras guiando al estudiante a la respuesta correcta.";

  let focusContext = "Examinar la coherencia integral entre pregunta, marco teórico, objetivo, diseño e instrumentos.";
  if (focusId !== "all") {
    const sec = SECTIONS_DATA.find(s => s.id === focusId);
    if (sec) {
      focusContext = `Centrarse específicamente en la sección ${sec.code} (${sec.title}). Producto esperado: ${sec.prod}. Prueba crítica: ${sec.prueba}`;
    }
  }

  const prompt = `Actúa como JURADO EVALUADOR de tesis y anteproyectos de investigación científica de la Universidad Señor de Sipán (Perú).

NIVEL DE EXIGENCIA: ${levelDirective}
FOCO DE LA EVALUACIÓN: ${focusContext}

DATOS DEL PROYECTO DEL ESTUDIANTE:
- Estudiante: ${student.nombre || "No especificado"}
- Facultad: ${student.facultad || "No especificada"}
- Escuela Profesional: ${student.escuela || "No especificada"}
- Título preliminar: "${student.titulo || "No especificado"}"
- Variable 1: ${project.v1 || "No declarada"}
- Variable 2 (Resultado): ${project.v2 || "No declarada"}
- Población y Ámbito: ${project.pob || "No declarada"} en ${project.amb || "No declarado"} (${project.per || "Periodo no especificado"})
- Pregunta General: ${project.preg || "No declarada"}
- Teoría / Modelo Principal: ${project.teo || "No declarada"}
- Objetivo General: ${project.obj || "No declarado"}
- Alcance y Diseño: ${project.dis || "No declarado"}
- Instrumento Variable 1: ${project.i1 || "No declarado"}
- Instrumento Variable 2: ${project.i2 || "No declarado"}

INSTRUCCIONES PARA LA SESIÓN:
1. Haz UNA SOLA PREGUNTA directa a la vez y espera la respuesta del estudiante.
2. Interroga sobre la coherencia metodológica, el soporte teórico o la viabilidad del instrumento; NUNCA pidas definiciones teóricas de memoria.
3. Tras la respuesta del estudiante, evalúa de forma concisa (Sólida / Parcial / Débil) y repregunta buscando la brecha metodológica durante 3 rondas.
4. Al concluir la tercera ronda, ofrece un resumen de fortalezas, vulnerabilidades y las 3 preguntas clave que debe preparar para la sustentación oficial.

Comienza presentándote brevemente como el Jurado Evaluador e inicia con tu PRIMERA PREGUNTA.`;

  return prompt;
}

/**
 * Actualiza la vista previa del prompt y el enlace directo hacia ChatGPT
 * @param {Object} state 
 */
function updateJuryPromptView(state) {
  const pvEl = document.getElementById("pv-jur");
  const gptLinkEl = document.getElementById("gpt-jur");

  const promptText = buildJuryPrompt(state);

  if (pvEl) {
    pvEl.textContent = promptText;
  }

  if (gptLinkEl) {
    const encodedPrompt = encodeURIComponent(promptText);
    gptLinkEl.href = `https://chatgpt.com/?q=${encodedPrompt}`;
  }
}