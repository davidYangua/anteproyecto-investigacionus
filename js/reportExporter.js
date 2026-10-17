/**
 * NEXO Research Studio - Exportador a Word (.docx) y Gestión de Respaldo JSON
 * Archivo: js/reportExporter.js
 */

import { SECTIONS_DATA } from "../data/sectionsData.js";
import { evaluateCoherenceChain } from "./coherenceChain.js";
import { generateAnexo5Text } from "./logAndReport.js";

/**
 * Compila y descarga el informe de avance en formato Microsoft Word (.docx)
 * @param {Object} state Estado global de la aplicación
 */
export async function exportToWord(state) {
  if (!window.docx) {
    throw new Error("La librería docx.js no está cargada en la página.");
  }

  const {
    Document,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    HeadingLevel,
    AlignmentType,
    WidthType,
    BorderStyle
  } = window.docx;

  const student = state.student || {};
  const project = state.project || {};
  const drafts = state.drafts || {};
  const logs = state.log || [];
  const coherenceLinks = evaluateCoherenceChain(project);

  // --- Estilos de celdas para tablas ---
  const tableHeaderCell = (text) => new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })],
      alignment: AlignmentType.CENTER
    })],
    shading: { fill: "0A2540" },
    width: { size: 100, type: WidthType.PERCENTAGE }
  });

  const tableDataCell = (text, isBold = false) => new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text: text || "—", bold: isBold, size: 20 })]
    })],
    width: { size: 100, type: WidthType.PERCENTAGE }
  });

  const docChildren = [];

  // 1. TÍTULO DEL DOCUMENTO
  docChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "UNIVERSIDAD SEÑOR DE SIPÁN",
          bold: true,
          size: 28,
          color: "0A2540"
        })
      ],
      alignment: AlignmentType.CENTER,
      spaceAfter: 100
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "INFORME CONSOLIDADO DE AVANCE Y AUDITORÍA DE ANTEPROYECTO",
          bold: true,
          size: 24,
          color: "C5A059"
        })
      ],
      alignment: AlignmentType.CENTER,
      spaceAfter: 300
    })
  );

  // 2. TABLA DE AFILIACIÓN Y DATOS DEL ESTUDIANTE
  docChildren.push(
    new Paragraph({
      text: "1. Datos del Investigador y Afiliación Académica",
      heading: HeadingLevel.HEADING_2,
      spaceBefore: 200,
      spaceAfter: 100
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [tableHeaderCell("Campo"), tableHeaderCell("Información Declarada")] }),
        new TableRow({ children: [tableDataCell("Estudiante / Investigador", true), tableDataCell(student.nombre)] }),
        new TableRow({ children: [tableDataCell("Facultad USS", true), tableDataCell(student.facultad)] }),
        new TableRow({ children: [tableDataCell("Escuela Profesional", true), tableDataCell(student.escuela)] }),
        new TableRow({ children: [tableDataCell("Sección / Grupo", true), tableDataCell(student.seccion)] }),
        new TableRow({ children: [tableDataCell("Título del Anteproyecto", true), tableDataCell(student.titulo)] })
      ]
    }),
    new Paragraph({ spaceAfter: 200 })
  );

  // 3. TABLA DE ELEMENTOS NÚCLEO
  docChildren.push(
    new Paragraph({
      text: "2. Matriz de Elementos Núcleo (Hilo de Coherencia)",
      heading: HeadingLevel.HEADING_2,
      spaceBefore: 200,
      spaceAfter: 100
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [tableHeaderCell("Eslabón Núcleo"), tableHeaderCell("Definición Registrada")] }),
        new TableRow({ children: [tableDataCell("Variable 1 (Asociada / VI)", true), tableDataCell(project.v1)] }),
        new TableRow({ children: [tableDataCell("Variable 2 (Resultado / VD)", true), tableDataCell(project.v2)] }),
        new TableRow({ children: [tableDataCell("Población y Ámbito", true), tableDataCell(`${project.pob || "—"} en ${project.amb || "—"} (${project.per || "—"})`)] }),
        new TableRow({ children: [tableDataCell("Pregunta General (1.3)", true), tableDataCell(project.preg)] }),
        new TableRow({ children: [tableDataCell("Teoría Principal (1.4)", true), tableDataCell(project.teo)] }),
        new TableRow({ children: [tableDataCell("Objetivo General (1.5)", true), tableDataCell(project.obj)] }),
        new TableRow({ children: [tableDataCell("Hipótesis Alterna, Hi (1.6)", true), tableDataCell(project.hip)] }),
        new TableRow({ children: [tableDataCell("Alcance y Diseño (2.1)", true), tableDataCell(project.dis)] }),
        new TableRow({ children: [tableDataCell("Instrumentos de Medición", true), tableDataCell(`V1: ${project.i1 || "—"} | V2: ${project.i2 || "—"}`)] })
      ]
    }),
    new Paragraph({ spaceAfter: 200 })
  );

  // 4. DIAGNÓSTICO DE COHERENCIA METODOLÓGICA
  docChildren.push(
    new Paragraph({
      text: "3. Resultado de la Auditoría Autómata de Coherencia",
      heading: HeadingLevel.HEADING_2,
      spaceBefore: 200,
      spaceAfter: 100
    })
  );

  coherenceLinks.forEach(link => {
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${link.title}: `, bold: true, size: 20 }),
          new TextRun({
            text: link.msg.toUpperCase(),
            bold: true,
            color: link.status === "ok" ? "059669" : link.status === "warn" ? "D97706" : "DC2626",
            size: 20
          }),
          new TextRun({ text: ` — ${link.detail}`, size: 20 })
        ],
        spaceAfter: 80
      })
    );
  });

  docChildren.push(new Paragraph({ spaceAfter: 200 }));

  // 5. REDACCIÓN POR SECCIONES (BORRADORES)
  docChildren.push(
    new Paragraph({
      text: "4. Borradores Redactados por Secciones (Ruta de 16 Semanas)",
      heading: HeadingLevel.HEADING_2,
      spaceBefore: 200,
      spaceAfter: 100
    })
  );

  SECTIONS_DATA.forEach(sec => {
    const text = drafts[sec.id] || "";
    if (text && text.trim().length > 0) {
      docChildren.push(
        new Paragraph({
          text: `[${sec.code}] ${sec.title} (${sec.wk})`,
          heading: HeadingLevel.HEADING_3,
          spaceBefore: 120,
          spaceAfter: 60
        }),
        new Paragraph({
          children: [new TextRun({ text: text, size: 22 })],
          spaceAfter: 140
        })
      );
    }
  });

  // 6. BITÁCORA DE DECLARACIÓN DE USO DE IA
  docChildren.push(
    new Paragraph({
      text: "5. Bitácora de Trazabilidad de Consultas a IA",
      heading: HeadingLevel.HEADING_2,
      spaceBefore: 200,
      spaceAfter: 100
    })
  );

  if (logs.length > 0) {
    const logRows = [
      new TableRow({
        children: [
          tableHeaderCell("Fecha"),
          tableHeaderCell("Sección"),
          tableHeaderCell("Dictamen IA"),
          tableHeaderCell("Decisión")
        ]
      })
    ];

    logs.forEach(entry => {
      const dateStr = entry.timestamp ? new Date(entry.timestamp).toLocaleDateString("es-PE") : "—";
      logRows.push(
        new TableRow({
          children: [
            tableDataCell(dateStr),
            tableDataCell(entry.sec),
            tableDataCell(entry.ai),
            tableDataCell(entry.dec, true)
          ]
        })
      );
    });

    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: logRows
      }),
      new Paragraph({ spaceAfter: 200 })
    );
  } else {
    docChildren.push(
      new Paragraph({
        text: "No se registran consultas a herramientas de IA en esta sesión.",
        spaceAfter: 200
      })
    );
  }

  // 7. DECLARACIÓN JURADA (ANEXO 5)
  docChildren.push(
    new Paragraph({
      text: "6. Anexo 5: Declaración Jurada de Uso de IA",
      heading: HeadingLevel.HEADING_2,
      spaceBefore: 200,
      spaceAfter: 100
    }),
    new Paragraph({
      children: [new TextRun({ text: generateAnexo5Text(state), size: 20 })],
      spaceAfter: 200
    })
  );

  // Crear el documento Word
  const doc = new Document({
    sections: [{
      properties: {},
      children: docChildren
    }]
  });

  // Generar Blob y descargar
  const blob = await window.docx.Packer.toBlob(doc);
  const fileName = `Informe_Anteproyecto_NEXO_${(student.nombre || "Estudiante").replace(/\s+/g, "_")}.docx`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta el estado completo de la aplicación a un archivo de respaldo JSON
 * @param {Object} state 
 */
export function exportStateToJSON(state) {
  const jsonStr = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const fileName = `Respaldo_NEXO_${new Date().toISOString().slice(0, 10)}.json`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Lee y valida un archivo JSON de respaldo para restaurar el estado de la aplicación
 * @param {File} file Archivo subido por el usuario
 * @param {Function} onSuccess Callback al importar con éxito
 * @param {Function} onError Callback en caso de error de lectura o estructura
 */
export function importStateFromJSON(file, onSuccess, onError) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const parsedData = JSON.parse(event.target.result);

      // Validación básica de la estructura del estado
      if (typeof parsedData !== "object" || parsedData === null) {
        throw new Error("El archivo JSON no tiene un formato de objeto válido.");
      }

      if (onSuccess) onSuccess(parsedData);
    } catch (err) {
      if (onError) onError(err.message || "Error al procesar el archivo JSON.");
    }
  };

  reader.onerror = () => {
    if (onError) onError("Error al leer el archivo del disco.");
  };

  reader.readAsText(file);
}