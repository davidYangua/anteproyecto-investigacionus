/**
 * NEXO Research Studio - Generador de Informes Word (.docx) de Alta Gama y Respaldos JSON
 * Archivo: js/reportExporter.js
 * Autor / Dirección Metodológica: Ing. Percy Castro Mejía
 */

import { THEORIES_DATA } from "../data/theoriesData.js";
import { evaluateCoherenceChain } from "./coherenceChain.js";

/**
 * Normaliza y extrae la nomenclatura Nombre_Apellido para el archivo
 */
function getCleanStudentFilename(fullName) {
  if (!fullName || !fullName.trim()) return "Estudiante_USS";
  
  const clean = fullName.trim().replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
  const parts = clean.split(/\s+/);

  if (parts.length === 1) return `${parts[0]}_USS`;
  return `${parts[0]}_${parts[1]}`;
}

/**
 * Genera y descarga el informe oficial en formato Word (.docx)
 */
export async function exportToWord(state) {
  if (!window.docx) {
    throw new Error("La librería docx.js no está cargada en la aplicación.");
  }

  const {
    Document,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    HeadingLevel,
    BorderStyle,
    Packer
  } = window.docx;

  const student = state.student || {};
  const project = state.project || {};
  const drafts = state.drafts || {};
  const log = state.log || [];
  const customTheories = state.customTheories || [];

  // 1. Obtener la Teoría Asignada detallada
  const allTheories = [...THEORIES_DATA, ...customTheories];
  const assignedTheory = allTheories.find(t => t.nombre === project.teo) || null;

  // 2. Evaluar Coherencia
  const coherenceLinks = evaluateCoherenceChain(project);
  const okCount = coherenceLinks.filter(l => l.status === "ok").length;

  // 3. Cálculo de Palabras Totales y Progreso
  let totalWords = 0;
  let draftedSections = 0;
  Object.values(drafts).forEach(txt => {
    if (txt && txt.trim()) {
      draftedSections++;
      totalWords += txt.trim().split(/\s+/).length;
    }
  });

  // 4. Configuración de Bordes y Colores de Tablas
  const mainBorders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
    insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" }
  };

  const createStyledCell = (text, isHeader = false, widthPercent = 50, bgHex = null, align = AlignmentType.LEFT) => {
    let background = "FFFFFF";
    if (isHeader) background = "0A2540";
    else if (bgHex) background = bgHex;

    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      shading: { fill: background },
      margins: { top: 100, bottom: 100, left: 150, right: 150 },
      children: [
        new Paragraph({
          alignment: align,
          children: [
            new TextRun({
              text: text || "—",
              bold: isHeader,
              color: isHeader ? "FFFFFF" : "1E293B",
              size: 18,
              font: "Arial"
            })
          ]
        })
      ]
    });
  };

  const weekTitles = {
    w1: "Semana 1: Realidad Problemática y Contextualización",
    w2: "Semana 2: Formulación de Preguntas (General y Específicas)",
    w3: "Semana 3: Objetivos e Hipótesis de Investigación",
    w4: "Semana 4: Justificación e Importancia del Estudio",
    w5: "Semana 5: Antecedentes Internacionales y Nacionales",
    w6: "Semana 6: Bases Teóricas y Definición de Constructos",
    w7: "Semana 7: Definición Conceptual y Operacional de Variables",
    w8: "Semana 8: Enfoque, Alcance y Diseño Metodológico",
    w9: "Semana 9: Población, Muestra y Muestreo",
    w10: "Semana 10: Criterios de Inclusión y Exclusión",
    w11: "Semana 11: Selección y Adaptación de Instrumentos",
    w12: "Semana 12: Validez y Confiabilidad de Instrumentos",
    w13: "Semana 13: Procedimiento de Recolección de Datos",
    w14: "Semana 14: Plan de Análisis Estadístico",
    w15: "Semana 15: Aspectos Éticos y Rigor Científico",
    w16: "Semana 16: Consolidados y Anexos del Anteproyecto"
  };

  const docChildren = [];

  // CABECERA INSTITUCIONAL
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "UNIVERSIDAD SEÑOR DE SIPÁN", bold: true, size: 28, color: "0A2540", font: "Arial" })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "VICERRECTORADO DE INVESTIGACIÓN · PLATAFORMA NEXO RESEARCH STUDIO", size: 16, color: "64748B", font: "Arial" })],
      space: { after: 100 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "INFORME CONSOLIDADO DE AVANCE Y AUDITORÍA DE ANTEPROYECTO", bold: true, size: 20, color: "C5A059", font: "Arial" })],
      space: { after: 300 }
    })
  );

  // SECCIÓN 1: DATOS
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "1. Datos del Investigador y Afiliación Académica", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: mainBorders,
      rows: [
        new TableRow({ children: [createStyledCell("Estudiante / Investigador", true, 35), createStyledCell(student.nombre, false, 65)] }),
        new TableRow({ children: [createStyledCell("Facultad USS", true, 35), createStyledCell(student.facultad, false, 65, "F8FAFC")] }),
        new TableRow({ children: [createStyledCell("Escuela Profesional", true, 35), createStyledCell(student.escuela, false, 65)] }),
        new TableRow({ children: [createStyledCell("Sección / Grupo de Clase", true, 35), createStyledCell(student.seccion, false, 65, "F8FAFC")] }),
        new TableRow({ children: [createStyledCell("Título del Anteproyecto", true, 35), createStyledCell(student.titulo, false, 65)] })
      ]
    }),
    new Paragraph({ text: "", space: { after: 250 } })
  );

  // SECCIÓN 2: MÉTRICAS
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "2. Resumen Ejecutivo de Métricas y Progreso de Redacción", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: mainBorders,
      rows: [
        new TableRow({
          children: [
            createStyledCell("Cadena de Coherencia", true, 25),
            createStyledCell("Total Palabras Redactadas", true, 25),
            createStyledCell("Secciones Redactadas", true, 25),
            createStyledCell("Avance Estimado", true, 25)
          ]
        }),
        new TableRow({
          children: [
            createStyledCell(`${okCount} de 6 Eslabones OK`, false, 25, "F8FAFC", AlignmentType.CENTER),
            createStyledCell(`${totalWords} palabras`, false, 25, "FFFFFF", AlignmentType.CENTER),
            createStyledCell(`${draftedSections} de 16 semanas`, false, 25, "F8FAFC", AlignmentType.CENTER),
            createStyledCell(`${Math.round((draftedSections / 16) * 100)}%`, false, 25, "FFFFFF", AlignmentType.CENTER)
          ]
        })
      ]
    }),
    new Paragraph({ text: "", space: { after: 250 } })
  );

  // SECCIÓN 3: NÚCLEO
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "3. Matriz de Elementos Núcleo (Hilo de Coherencia Metodológica)", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: mainBorders,
      rows: [
        new TableRow({ children: [createStyledCell("Variable 1 (Asociada / VI)", true, 35), createStyledCell(project.v1, false, 65)] }),
        new TableRow({ children: [createStyledCell("Variable 2 (Resultado / VD)", true, 35), createStyledCell(project.v2, false, 65, "F8FAFC")] }),
        new TableRow({ children: [createStyledCell("Población y Ámbito", true, 35), createStyledCell(`${project.pob || "—"} en ${project.amb || "—"} (${project.per || "—"})`, false, 65)] }),
        new TableRow({ children: [createStyledCell("Enfoque Metodológico", true, 35), createStyledCell(project.enf ? project.enf.toUpperCase() : "—", false, 65, "F8FAFC")] }),
        new TableRow({ children: [createStyledCell("Alcance y Diseño (2.1)", true, 35), createStyledCell(project.dis ? project.dis.toUpperCase() : "—", false, 65)] }),
        new TableRow({ children: [createStyledCell("Pregunta General (1.3)", true, 35), createStyledCell(project.preg, false, 65, "F8FAFC")] }),
        new TableRow({ children: [createStyledCell("Teoría Principal (1.4)", true, 35), createStyledCell(project.teo, false, 65)] }),
        new TableRow({ children: [createStyledCell("Objetivo General (1.5)", true, 35), createStyledCell(project.obj, false, 65, "F8FAFC")] }),
        new TableRow({ children: [createStyledCell("Hipótesis Alterna, Hi (1.6)", true, 35), createStyledCell(project.hip, false, 65)] }),
        new TableRow({ children: [createStyledCell("Instrumentos de Medición", true, 35), createStyledCell(`V1: ${project.i1 || "—"} | V2: ${project.i2 || "—"}`, false, 65, "F8FAFC")] })
      ]
    }),
    new Paragraph({ text: "", space: { after: 250 } })
  );

  // SECCIÓN 4: OPERACIONALIZACIÓN
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "4. Matriz de Operacionalización y Conservación de Flujo (Trazabilidad)", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: mainBorders,
      rows: [
        new TableRow({
          children: [
            createStyledCell("Nivel Macro (Variable)", true, 30),
            createStyledCell("Nivel Meso (Dimensiones)", true, 40),
            createStyledCell("Nivel Micro (Ítems / Instrumento)", true, 30)
          ]
        }),
        new TableRow({
          children: [
            createStyledCell(project.v1 || "Variable 1", false, 30, "F8FAFC"),
            createStyledCell("Dimensiones del Instrumento V1", false, 40, "F8FAFC"),
            createStyledCell(project.i1 || "Ítems V1", false, 30, "F8FAFC")
          ]
        }),
        new TableRow({
          children: [
            createStyledCell(project.v2 || "Variable 2", false, 30),
            createStyledCell("Dimensiones del Instrumento V2", false, 40),
            createStyledCell(project.i2 || "Ítems V2", false, 30)
          ]
        })
      ]
    }),
    new Paragraph({ text: "", space: { after: 250 } })
  );

  // SECCIÓN 5: MARCO TEÓRICO
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "5. Fundamentación y Ficha Técnica del Marco Teórico Seleccionado", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    })
  );

  if (assignedTheory) {
    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: mainBorders,
        rows: [
          new TableRow({ children: [createStyledCell("Nombre del Marco Teórico", true, 35), createStyledCell(assignedTheory.nombre, false, 65)] }),
          new TableRow({ children: [createStyledCell("Autor y Año", true, 35), createStyledCell(`${assignedTheory.autor || '—'} (${assignedTheory.anio || '—'})`, false, 65, "F8FAFC")] }),
          new TableRow({ children: [createStyledCell("Postulado Central", true, 35), createStyledCell(assignedTheory.postulado || assignedTheory.resumen, false, 65)] }),
          new TableRow({ children: [createStyledCell("Constructos / Dimensiones", true, 35), createStyledCell(Array.isArray(assignedTheory.constructos) ? assignedTheory.constructos.join(", ") : "—", false, 65, "F8FAFC")] }),
          new TableRow({ children: [createStyledCell("Predicción Teórica", true, 35), createStyledCell(assignedTheory.predice || "—", false, 65)] }),
          new TableRow({ children: [createStyledCell("Cita Sugerida (APA 7)", true, 35), createStyledCell(assignedTheory.ejemploCita || "—", false, 65, "F8FAFC")] }),
          new TableRow({ children: [createStyledCell("Referencia Completa", true, 35), createStyledCell(assignedTheory.ref || "—", false, 65)] })
        ]
      })
    );
  } else {
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: project.teo ? `Teoría declarada: ${project.teo}` : "No se ha seleccionado una teoría en el proyecto.", italic: true, size: 18, font: "Arial" })]
      })
    );
  }

  docChildren.push(new Paragraph({ text: "", space: { after: 250 } }));

  // SECCIÓN 6: AUDITORÍA
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "6. Auditoría Autómata de la Cadena de Coherencia (6 Eslabones)", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    })
  );

  coherenceLinks.forEach(link => {
    const isOk = link.status === "ok";
    const isWarn = link.status === "warn";
    const badgeColor = isOk ? "059669" : isWarn ? "D97706" : "DC2626";

    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `• ${link.title}: `, bold: true, size: 18, font: "Arial" }),
          new TextRun({ text: `[${link.msg.toUpperCase()}] — `, bold: true, color: badgeColor, size: 18, font: "Arial" }),
          new TextRun({ text: link.detail, size: 18, font: "Arial" })
        ],
        space: { after: 120 }
      })
    );
  });

  docChildren.push(new Paragraph({ text: "", space: { after: 250 } }));

  // SECCIÓN 7: BORRADORES
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "7. Borradores Redactados por Secciones (Ruta de 16 Semanas)", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    })
  );

  const draftKeys = Object.keys(drafts).filter(k => drafts[k] && drafts[k].trim());

  if (draftKeys.length === 0) {
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: "No se registran borradores redactados en la estación de trabajo.", italic: true, size: 18, font: "Arial" })]
      })
    );
  } else {
    draftKeys.forEach(secId => {
      const text = drafts[secId];
      const title = weekTitles[secId] || `Sección ${secId.toUpperCase()}`;

      docChildren.push(
        new Paragraph({
          children: [new TextRun({ text: title, bold: true, size: 18, color: "C5A059", font: "Arial" })],
          space: { before: 100, after: 50 }
        }),
        new Paragraph({
          children: [new TextRun({ text: text, size: 18, font: "Arial" })],
          space: { after: 150 }
        })
      );
    });
  }

  docChildren.push(new Paragraph({ text: "", space: { after: 250 } }));

  // SECCIÓN 8: JURADO SIMULADO (FILTRADO MULTI-COMPATIBLE)
  const juryEntries = log.filter(e => e.tipo === "jurado" || e.pregunta || e.foco || e.respuesta);

  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "8. Bitácora de Sustentación Oral (Jurado Simulado)", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    })
  );

  if (juryEntries.length === 0) {
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: "No se registran simulaciones de sustentación con el jurado.", italic: true, size: 18, font: "Arial" })]
      })
    );
  } else {
    juryEntries.forEach((j, idx) => {
      const preg = j.pregunta || j.detalles || "—";
      const resp = j.respuesta || "—";
      const val = j.valoracion || "Evaluada";
      const plan = j.plan || "—";

      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Pregunta ${idx + 1}: `, bold: true, size: 18, color: "0A2540", font: "Arial" }),
            new TextRun({ text: preg, size: 18, font: "Arial" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `Respuesta formulada: `, bold: true, size: 18, font: "Arial" }),
            new TextRun({ text: resp, size: 18, font: "Arial" }),
            new TextRun({ text: ` [Valoración: ${val}]`, bold: true, color: "059669", size: 18, font: "Arial" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `Plan de refuerzo: `, bold: true, italic: true, size: 18, font: "Arial" }),
            new TextRun({ text: plan, italic: true, size: 18, font: "Arial" })
          ],
          space: { after: 150 }
        })
      );
    });
  }

  docChildren.push(new Paragraph({ text: "", space: { after: 250 } }));

  // SECCIÓN 9: BITÁCORA DE IA (FILTRADO MULTI-COMPATIBLE)
  const aiEntries = log.filter(e => e.tipo === "ia" || e.herramienta || e.dictamen || e.tool || e.sec);

  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "9. Bitácora de Declaración de Inteligencia Artificial Generativa", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    })
  );

  if (aiEntries.length === 0) {
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: "No se registran interacciones en la bitácora de IA durante la sesión.", italic: true, size: 18, font: "Arial" })]
      })
    );
  } else {
    aiEntries.forEach((entry, idx) => {
      const fecha = entry.fecha || entry.timestamp || new Date().toLocaleDateString("es-PE");
      const seccion = entry.seccion || entry.sec || "Estación de Redacción";
      const herramienta = entry.herramienta || entry.tool || "ChatGPT (OpenAI)";
      const dictamen = entry.dictamen || entry.dec || "Auditado";
      const decision = entry.decision || entry.why || "Dictamen procesado e incorporado.";

      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Registro #${idx + 1} (${fecha}): `, bold: true, size: 18, font: "Arial" }),
            new TextRun({ text: `Sección: ${seccion} | Herramienta: ${herramienta} | Dictamen: `, size: 18, font: "Arial" }),
            new TextRun({ text: `${dictamen}`, bold: true, color: "059669", size: 18, font: "Arial" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `Decisión: ${decision}`, italic: true, size: 18, font: "Arial" })
          ],
          space: { after: 120 }
        })
      );
    });
  }

  docChildren.push(new Paragraph({ text: "", space: { after: 300 } }));

  // SECCIÓN 10: ANEXO 5
  const dateStr = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });

  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: "10. Anexo 5: Declaración Jurada de Uso de IA (Formato USS)", bold: true, size: 22, color: "0A2540", font: "Arial" })],
      space: { after: 150 }
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [
        new TextRun({
          text: `Yo, ${student.nombre || "________________________________________"}, estudiante de la Escuela Profesional de ${student.escuela || "____________________"} de la Universidad Señor de Sipán, declaro bajo juramento que:`,
          size: 18,
          font: "Arial"
        })
      ],
      space: { after: 120 }
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [
        new TextRun({
          text: `1. He utilizado herramientas de Inteligencia Artificial Generativa (ChatGPT, OpenAI) exclusivamente como soporte de tutoría, revisión metodológica y auditoría de coherencia para la redacción de mi anteproyecto de investigación titulado: "${student.titulo || "________________________________________________________________________________________"}".`,
          size: 18,
          font: "Arial"
        })
      ],
      space: { after: 100 }
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [
        new TextRun({
          text: `2. La herramienta de IA no redactó párrafos finales ni generó datos empíricos, hallazgos o referencias bibliográficas ficticias. Su función se limitó a la evaluación contra los criterios del manual metodológico.`,
          size: 18,
          font: "Arial"
        })
      ],
      space: { after: 100 }
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [
        new TextRun({
          text: `3. Se realizaron un total de ${log.length} interacciones de auditoría registradas en la bitácora de la plataforma NEXO Research Studio.`,
          size: 18,
          font: "Arial"
        })
      ],
      space: { after: 100 }
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [
        new TextRun({
          text: `4. Todas las fuentes citadas han sido verificadas en sus textos originales, asumiendo la responsabilidad intelectual y ética sobre la totalidad del contenido presentado.`,
          size: 18,
          font: "Arial"
        })
      ],
      space: { after: 200 }
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: `Chiclayo, ${dateStr}.`,
          size: 18,
          font: "Arial"
        })
      ],
      space: { after: 400 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "__________________________________________\nFirma del Estudiante / Investigador\nDNI / Código USS: ________________________",
          size: 18,
          font: "Arial"
        })
      ]
    })
  );

  const doc = new Document({
    sections: [{ children: docChildren }]
  });

  const blob = await Packer.toBlob(doc);
  const studentSlug = getCleanStudentFilename(student.nombre);
  const fileName = `Informe_Anteproyecto_${studentSlug}.docx`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportStateToJSON(state) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const studentSlug = getCleanStudentFilename(state.student?.nombre);
  
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `Respaldo_NEXO_${studentSlug}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

export function importStateFromJSON(file, onSuccess, onError) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (onSuccess) onSuccess(parsed);
    } catch (err) {
      if (onError) onError("El archivo seleccionado no tiene un formato JSON válido.");
    }
  };
  reader.readAsText(file);
}