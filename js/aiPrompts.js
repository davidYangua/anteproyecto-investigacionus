/**
 * NEXO Research Studio - Generador Centralizado de Prompts para IA
 * Archivo: js/aiPrompts.js
 */

import { SECTIONS_DATA } from "../data/sectionsData.js";
import { MODELS_DATA } from "../data/modelsData.js";
import { evaluateCoherenceChain } from "./coherenceChain.js";

const SYSTEM_ROLE = `Actúa como tutor de metodología de la investigación científica de la Universidad Señor de Sipán (Perú). Tu objetivo es fomentar el pensamiento crítico y la rigurosidad científica en el estudiante, evaluando objetivamente su trabajo.

REGLAS DE EVALUACIÓN:
- No reescribas la sección ni entregues párrafos listos para copiar y pegar. Señala, cita textualmente y explica.
- Apoya cada juicio en una cita textual del borrador presentado.
- Respeta los criterios del manual metodológico y los productos esperados.
- Responde siempre en español, con un trato profesional y académico.`;

/**
 * Genera los metadatos globales del proyecto en formato JSON para la IA
 * @param {Object} state 
 * @returns {Object}
 */
export function buildMetadataJSON(state = {}) {
  const student = state.student || {};
  const project = state.project || {};

  return {
    institucion: "Universidad Señor de Sipán (USS)",
    curso: "Metodología de la Investigación Científica",
    estudiante: {
      nombre: student.nombre || "No especificado",
      facultad: student.facultad || "No especificada",
      escuela: student.escuela || "No especificada",
      seccion: student.seccion || "No especificada",
      titulo_preliminar: student.titulo || "No especificado"
    },
    elementos_nucleo: {
      variable_1: project.v1 || "No declarada",
      variable_2_resultado: project.v2 || "No declarada",
      poblacion: project.pob || "No declarada",
      ambito: project.amb || "No declarado",
      periodo: project.per || "No declarado",
      enfoque_metodologico: project.enf || "cuanti",
      pregunta_general: project.preg || "No declarada",
      teoria_principal: project.teo || "No declarada",
      objetivo_general: project.obj || "No declarado",
      hipotesis_alterna: project.hip || "No declarada",
      alcance_diseno: project.dis || "No declarado",
      instrumento_v1: project.i1 || "No declarado",
      instrumento_v2: project.i2 || "No declarado"
    },
    fecha_evaluacion: new Date().toLocaleDateString("es-PE")
  };
}

/**
 * Genera el prompt para auditar el Hilo de Coherencia
 * @param {Object} state 
 * @returns {string}
 */
export function buildHiloPrompt(state = {}) {
  const metadata = buildMetadataJSON(state);
  const coherenceEvaluation = evaluateCoherenceChain(state.project || {});

  return `${SYSTEM_ROLE}

TAREA: Audita la coherencia interna de los elementos núcleo del anteproyecto de investigación.

METADATOS Y ELEMENTOS NÚCLEO (JSON):
${JSON.stringify(metadata, null, 2)}

EVALUACIÓN AUTOMÁTICA DE ESLABONES:
${JSON.stringify(coherenceEvaluation, null, 2)}

ESTRUCTURA DE TU RESPUESTA:
1. Auditoría de Coherencia Lógica: Revisa la alineación entre Pregunta General, Teoría Principal, Objetivo General, Hipótesis y Diseño Metodológico.
2. Inconsistencias Detectadas: Enumera hasta 3 incoherencias críticas de términos, variables o alcance.
3. Pregunta Clave de Reflexión: Plantea la pregunta principal que el estudiante debe resolver antes de avanzar.`;
}

/**
 * Genera el prompt para auditar una sección específica de la ruta
 * @param {string} secId 
 * @param {Object} state 
 * @returns {string}
 */
export function buildSectionPrompt(secId, state = {}) {
  const sec = SECTIONS_DATA.find(s => s.id === secId);
  const model = MODELS_DATA ? MODELS_DATA[secId] : null;
  const draft = (state.drafts && state.drafts[secId]) || "";
  const metadata = buildMetadataJSON(state);

  if (!sec) return "Sección no encontrada.";

  return `${SYSTEM_ROLE}

SECCIÓN A AUDITAR: [${sec.code}] ${sec.title} (${sec.wk})
PRODUCTO ESPERADO: ${sec.prod}
PRUEBA CRÍTICA: ${sec.prueba}

METADATOS DEL PROYECTO (JSON):
${JSON.stringify(metadata, null, 2)}

CRITERIOS DE EVALUACIÓN DEL MANUAL:
${sec.crit.map((c, i) => `${i + 1}.${c}`).join("\n")}

${model && model.steps ? `ORDEN ESPERADO DE PÁRRAFOS:\n${model.steps.map((s, i) => `${i + 1}. ${s[0]}: ${s[1]}`).join("\n")}` : ""}

BORRADOR PRESENTADO POR EL ESTUDIANTE:
"""
${draft || "(El estudiante aún no ha redactado el borrador de esta sección)"}
"""

ENTREGA TU RESPUESTA CON ESTE FORMATO EXACTO:
1. Tabla de Criterios: N° | Criterio | Estado (Cumple / Parcial / No cumple) | Cita Textual de Evidencia | Observación
2. Análisis de Estructura: Evaluación de la secuencia temática de los párrafos.
3. Correcciones Prioritarias (Máx 3): Ubicación, problema concreto y acción recomendada (sin redactar por el estudiante).
4. Línea Final Obligatoria (Dictamen en formato exacto):
DICTAMEN: 1=C; 2=P; 3=N... (Un valor por cada uno de los ${sec.crit.length} criterios).`;
}

/**
 * Genera el prompt para la auditoría completa del informe
 * @param {Object} state 
 * @returns {string}
 */
export function buildReportPrompt(state = {}) {
  const metadata = buildMetadataJSON(state);
  const drafts = state.drafts || {};

  return `${SYSTEM_ROLE}

TAREA: Realiza una auditoría integral de todo el anteproyecto de investigación presentado.

METADATOS DEL PROYECTO (JSON):
${JSON.stringify(metadata, null, 2)}

BORRADORES DISPONIBLES:
${JSON.stringify(drafts, null, 2)}

ESTRUCTURA DE TU EVALUACIÓN:
1. Diagnóstico General del Anteproyecto: Fortalezas y debilidades metodológicas globales.
2. Alineación y Trazabilidad: Correspondencia entre el Capítulo I y Capítulo II.
3. Plan Prioritado de Correcciones: Acciones urgentes recomendadas ordenadas por impacto.`;
}

/**
 * Formatea un prompt para ser enviado mediante URL a ChatGPT
 * @param {string} prompt 
 * @returns {string}
 */
export function formatPromptForChatGPT(prompt) {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}