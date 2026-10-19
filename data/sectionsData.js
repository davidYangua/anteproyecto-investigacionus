
export const SECTIONS_DATA = [
  {
    id: "s1",
    wk: "Semana 1",
    code: "S1",
    title: "Línea, tema y declaración de tema",
    prod: "Línea de investigación de la Escuela, tres temas candidatos y un tema elegido redactado como declaración de una sola oración.",
    ext: null,
    prueba: "¿Puede enunciar su tema en 20 palabras o menos, con variables, población, ámbito y periodo, y sin un solo adjetivo valorativo?",
    crit: [
      "Mi tema se ubica en una línea de investigación vigente de la Escuela.",
      "Mi declaración tiene variables, población, ámbito y periodo.",
      "Mi declaración tiene 20 palabras o menos y ningún adjetivo valorativo.",
      "Tengo acceso real a la población.",
      "Existe al menos un instrumento validado en español para cada variable.",
      "Encontré al menos tres estudios previos sobre el mismo par de variables."
    ]
  },
  {
    id: "s2",
    wk: "Semana 2",
    code: "S2",
    title: "Pregunta estructurada y estrategia de búsqueda",
    prod: "Pregunta PICO o PEO, estrategia ejecutada en PubMed y una base en español, con fecha y número de resultados; 12 referencias en un gestor.",
    ext: null,
    prueba: "Si borra un bloque de su estrategia, ¿qué elemento de su pregunta queda sin buscar? Si la respuesta es «ninguno», le sobra un bloque.",
    crit: [
      "Mi pregunta está escrita en formato PICO o PEO.",
      "Mi estrategia tiene tantos bloques como variables tiene mi pregunta.",
      "Dentro de cada bloque usé OR; entre bloques usé AND.",
      "No usé corchetes en PubMed ni truncadores en ninguna base.",
      "Registré base, fecha, fórmula y número de resultados."
    ]
  },
  {
    id: "s11",
    wk: "Semana 3",
    code: "1.1",
    title: "Realidad problemática",
    prod: "Sección 1.1 de 900 a 1 200 palabras, con un mínimo de 12 citas, organizada en los cuatro niveles del embudo.",
    ext: [900, 1200],
    prueba: "Lea solo la primera oración de cada párrafo: ¿el recorrido baja del mundo a su servicio y desemboca en su pregunta?",
    crit: [
      "Mi realidad problemática tiene los cuatro niveles del embudo.",
      "Cada nivel tiene al menos una cifra con fuente y año.",
      "Identifiqué el vacío de conocimiento que justifica el estudio.",
      "El último párrafo termina con la pregunta de investigación textual.",
      "Todas las citas del texto están en mis referencias."
    ]
  },
  {
    id: "s12",
    wk: "Semana 3",
    code: "1.2",
    title: "Trabajos previos",
    prod: "Seis antecedentes (dos internacionales, dos nacionales, dos locales o regionales), cada uno en un párrafo con cinco movimientos.",
    ext: null,
    prueba: "Por cada antecedente: ¿qué decisión teórica, metodológica o de medición de su estudio cambia gracias a él? Si ninguna, no es antecedente, es relleno.",
    crit: [
      "Tengo seis antecedentes: dos internacionales, dos nacionales, dos locales.",
      "Cada antecedente tiene los cinco movimientos, incluido el aporte.",
      "Ningún antecedente supera los cinco años (salvo excepción justificada).",
      "Los antecedentes están redactados en pasado.",
      "Cada resultado se reporta con su cifra."
    ]
  },
  {
    id: "s13",
    wk: "Semana 4",
    code: "1.3",
    title: "Formulación del problema",
    prod: "Pregunta general, preguntas específicas y tabla de delimitación espacial, temporal, poblacional y conceptual.",
    ext: null,
    prueba: "¿Su pregunta general es idéntica, palabra por palabra, a la que cierra su realidad problemática?",
    crit: [
      "Mi pregunta general es interrogativa y está delimitada.",
      "Es idéntica a la que cierra mi realidad problemática.",
      "El verbo de mi pregunta corresponde al alcance que declararé.",
      "Tengo entre tres y cinco preguntas específicas.",
      "Todas comparten población, ámbito y periodo con la general.",
      "Ninguna pregunta específica introduce una variable nueva."
    ]
  },
  {
    id: "ra1",
    wk: "Semana 5",
    code: "RA1",
    ra: "20 %",
    title: "Revisión previa del RA1",
    prod: "Capítulo I (1.1, 1.2 y 1.3) corregido tras revisión por pares, con ficha de revisión y bitácora de correcciones.",
    ext: null,
    prueba: "¿Las variables conservan exactamente el mismo nombre en 1.1, 1.2 y 1.3?",
    crit: [
      "1.1 con los cuatro niveles y cierre con la pregunta.",
      "1.2 con seis antecedentes vigentes y con aporte.",
      "1.3 con pregunta general y específicas delimitadas.",
      "Todas las citas y referencias correspondidas, en APA 7.",
      "Ficha de revisión por pares adjunta, con las correcciones aplicadas."
    ]
  },
  {
    id: "s14",
    wk: "Semana 6",
    code: "1.4",
    title: "Teorías relacionadas al tema",
    prod: "Sección 1.4 de 1 200 a 1 800 palabras: teoría principal (40 %), modelos complementarios (25 %) y bases conceptuales de cada variable (35 %).",
    ext: [1200, 1800],
    prueba: "Al terminar de leer su 1.4, ¿un lector puede responder por qué usted espera que A se relacione con B?",
    crit: [
      "Mi teoría principal explica mi variable de resultado.",
      "Enuncié los constructos con sus definiciones.",
      "Escribí el párrafo de traducción constructo-variable («En la presente investigación…»).",
      "De la teoría se deriva explícitamente la relación que espero encontrar.",
      "Incluí al menos un estudio empírico con cifras que respalda esa relación.",
      "Definí cada variable con dimensiones e instrumento."
    ]
  },
  {
    id: "s15",
    wk: "Semana 7",
    code: "1.5",
    title: "Objetivos",
    prod: "Un objetivo general y de tres a cinco específicos, con la tabla de alineación pregunta-objetivo.",
    ext: null,
    prueba: "Ponga su pregunta general y su objetivo general uno debajo del otro: ¿cambia algo más que el modo gramatical?",
    crit: [
      "Mi objetivo general es la transformación literal de mi pregunta general.",
      "Tengo tantos objetivos específicos como preguntas específicas, en el mismo orden.",
      "Cada objetivo tiene verbo en infinitivo, variables, población, ámbito y periodo.",
      "Los verbos corresponden al alcance de cada objetivo.",
      "Ningún objetivo contiene verbos de intervención institucional.",
      "Ningún objetivo une dos acciones distintas."
    ]
  },
  {
    id: "ra2",
    wk: "Semana 8",
    code: "RA2",
    ra: "20 %",
    title: "Revisión previa del RA2",
    prod: "Secciones 1.4 y 1.5 integradas al Capítulo I corregido, tras revisión por pares.",
    ext: null,
    prueba: "¿La relación que deriva su teoría es la misma que su objetivo general se compromete a determinar?",
    crit: [
      "Capítulo I completo y corregido, no solo las secciones nuevas.",
      "Teoría con constructos, relación postulada y traducción a mis variables.",
      "Bases conceptuales con definición, dimensiones e instrumento por variable.",
      "Objetivos alineados uno a uno con las preguntas.",
      "Verbos coherentes con el alcance."
    ]
  },
  {
    id: "s16",
    wk: "Semana 9",
    code: "1.6",
    title: "Hipótesis",
    prod: "Hipótesis general y específicas, cada una con hipótesis nula y alterna.",
    ext: null,
    prueba: "¿Alguien podría rastrear de qué teoría o de qué antecedente salió la dirección de su hipótesis?",
    crit: [
      "Mi hipótesis se deriva de la teoría y de los antecedentes.",
      "Declaré Hi y H0 en la general y en las específicas.",
      "La dirección de cada hipótesis está fundamentada.",
      "Solo los objetivos relacionales generaron hipótesis.",
      "Las variables de la hipótesis son idénticas a las del objetivo."
    ]
  },
  {
    id: "s17",
    wk: "Semana 9",
    code: "1.7",
    title: "Justificación e importancia",
    prod: "Sección 1.7 de 600 a 900 palabras con los cuatro tipos de justificación, cada uno rotulado.",
    ext: [600, 900],
    prueba: "Nombre a una persona concreta que tomará una decisión distinta gracias a su estudio. ¿Qué decidirá?",
    crit: [
      "Mi justificación tiene los cuatro tipos, cada uno rotulado.",
      "La justificación práctica nombra actor, decisión y beneficio.",
      "La justificación teórica dice qué aporta al conocimiento, no solo que «aporta».",
      "La justificación metodológica se refiere a mi instrumento o diseño."
    ]
  },
  {
    id: "s21",
    wk: "Semana 10",
    code: "Cap. II",
    title: "Material y método",
    prod: "Tipo y diseño con esquema, población y muestra con cálculo, matriz de operacionalización, técnicas e instrumentos y plan de análisis.",
    ext: null,
    prueba: "¿Su diseño corresponde al verbo de su objetivo general? Si su objetivo dice «relación», su diseño no puede ser descriptivo simple.",
    crit: [
      "Declaré el tipo con los seis criterios.",
      "Mi diseño corresponde al verbo de mi objetivo general.",
      "Incluí el esquema del diseño.",
      "Declaré población con N, criterios de inclusión y de exclusión.",
      "Calculé la muestra con fórmula y datos citados, o justifiqué el censo.",
      "Las dimensiones e ítems coinciden con el instrumento del anexo.",
      "Declaré programa estadístico, prueba de normalidad, pruebas inferenciales y α."
    ]
  },
  {
    id: "s26",
    wk: "Semana 11",
    code: "2.6",
    title: "Criterios éticos y de rigor",
    prod: "Secciones 2.6 y 2.7, consentimiento informado (Anexo 4) y declaración de uso de herramientas de IA (Anexo 5).",
    ext: null,
    prueba: "¿Qué riesgo de coerción tiene su población en particular y qué hará usted, concretamente, para prevenirlo?",
    crit: [
      "Desarrollé los cuatro principios aplicados a mi población.",
      "Declaré cómo protegeré la confidencialidad y por cuánto tiempo conservaré los datos.",
      "Prevení el riesgo de coerción propio de mi población.",
      "Incluí la ruta de derivación si el instrumento puede revelar riesgo.",
      "Mi consentimiento informado tiene los nueve elementos.",
      "Declaré el uso de herramientas de inteligencia artificial."
    ]
  },
  {
    id: "ra3",
    wk: "Semana 12",
    code: "RA3",
    ra: "20 %",
    title: "Revisión previa del RA3",
    prod: "1.6, 1.7 y Capítulo II completo, con matriz de trazabilidad sin filas incoherentes.",
    ext: null,
    prueba: "Siga una sola variable desde la pregunta hasta el ítem del instrumento: ¿conserva nombre y dimensiones en todo el recorrido?",
    crit: [
      "Capítulo I corregido más Capítulo II completo.",
      "Matriz de trazabilidad completa, sin filas incoherentes.",
      "Instrumento anexado, coincidente con la matriz de operacionalización.",
      "Pruebas estadísticas justificadas por escala y normalidad.",
      "Criterios éticos aplicados y de rigor desarrollados."
    ]
  },
  {
    id: "s13r",
    wk: "Semana 13",
    code: "Ref.",
    title: "Referencias y anexos",
    prod: "Referencias en APA 7 verificadas una por una, matriz de consistencia, cronograma y presupuesto.",
    ext: null,
    prueba: "Elija tres referencias al azar: ¿abre el DOI y el artículo dice lo que usted afirma que dice?",
    crit: [
      "Entre 25 y 40 referencias, con al menos 60 % de los últimos cinco años.",
      "Todas las referencias verificadas: el DOI o el enlace abre.",
      "Correspondencia total entre citas y referencias, en ambos sentidos.",
      "Matriz de consistencia completa y coincidente con el documento.",
      "Cronograma con trámites éticos, piloto, recolección y análisis."
    ]
  },
  {
    id: "def",
    wk: "Semanas 14–16",
    code: "RA4",
    ra: "40 %",
    title: "Presentación y defensa",
    prod: "Anteproyecto concluido hasta anexos y defensa oral de 12 a 15 minutos, más preguntas del jurado.",
    ext: null,
    prueba: "¿Cuál es la pregunta del jurado que menos quisiera recibir? Respóndala por escrito antes de exponer.",
    crit: [
      "Capítulos I y II completos y corregidos según RA1, RA2 y RA3.",
      "Matriz de consistencia coincidente con el cuerpo del documento.",
      "Declaración de uso de herramientas de IA firmada.",
      "Diapositivas ensayadas y cronometradas.",
      "Respuestas escritas a las preguntas frecuentes del jurado."
    ]
  }
];

/**
 * Obtiene una sección de la ruta por su id único (ej. "s1", "s11", "s14")
 */
export function getSectionById(secId) {
  return SECTIONS_DATA.find(s => s.id === secId) || SECTIONS_DATA[0];
}

/**
 * Retorna todas las secciones registradas
 */
export function getAllSections() {
  return SECTIONS_DATA;
}