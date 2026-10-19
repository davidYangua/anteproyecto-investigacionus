
export const TRANSLATIONS = {
  es: {
    title: "NEXO | Research Studio",
    subtitle: "Plataforma multidisciplinaria de diseño metodológico, auditoría de coherencia y gestión de investigación científica por facultades.",
    tab1: "Hilo de Coherencia",
    tab2: "Estación de Redacción",
    tab3: "Marcos Teóricos",
    tab4: "Jurado Simulado",
    tab5: "Bitácora e Informe",
    faculty: "Facultad USS",
    school: "Escuela Profesional",
    approach: "Enfoque Metodológico",
    title_label: "Título preliminar del trabajo de investigación",
    v1_label: "Variable 1 (Asociada / Independiente)",
    v2_label: "Variable 2 (De resultado / Dependiente)",
    sankey_title: "Trazabilidad del Flujo Metodológico (Matriz Sankey Proporcional)",
    sankey_subtitle: "Conservación de masa operativa: Indicadores → Marco Teórico → Diseño → Coherencia",
    export_docx: "Exportar Informe en Word (.docx)",
    audit_chatgpt: "Auditar Coherencia en ChatGPT"
  },
  en: {
    title: "NEXO | Research Studio",
    subtitle: "Multidisciplinary platform for methodological design, coherence audit, and scientific research management by faculties.",
    tab1: "Coherence Chain",
    tab2: "Drafting Station",
    tab3: "Theoretical Frameworks",
    tab4: "Simulated Jury",
    tab5: "Log & Report",
    faculty: "USS Faculty",
    school: "Professional School",
    approach: "Methodological Approach",
    title_label: "Preliminary Research Title",
    v1_label: "Variable 1 (Associated / Independent)",
    v2_label: "Variable 2 (Outcome / Dependent)",
    sankey_title: "Methodological Flow Traceability (Proportional Sankey Diagram)",
    sankey_subtitle: "Operational mass conservation: Indicators → Theory → Design → Coherence",
    export_docx: "Export Report to Word (.docx)",
    audit_chatgpt: "Audit Coherence in ChatGPT"
  }
};

/**
 * Actualiza dinámicamente los textos traducibles de la interfaz
 * @param {string} lang Código del idioma ("es" | "en")
 */
export function updateI18nUI(lang = "es") {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = dict[key];
      } else {
        // Preservar íconos de Lucide o elementos secundarios si existen dentro del contenedor
        const icon = el.querySelector("i[data-lucide]");
        if (icon) {
          const iconHTML = icon.outerHTML;
          el.innerHTML = `${iconHTML} <span>${dict[key]}</span>`;
        } else {
          el.textContent = dict[key];
        }
      }
    }
  });

  // Re-inicializar la iconografía vectorial tras actualizar el DOM
  if (window.lucide) {
    window.lucide.createIcons();
  }
}