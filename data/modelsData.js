/**
 * NEXO Research Studio - Capa de Datos: Modelos de Redacción
 * Archivo: data/modelsData.js
 */

export const MODELS_DATA = {
  s1: {
    steps: [
      ["Variable(s)", "La(s) variable(s) de interés, con el nombre exacto que usará en todo el documento."],
      ["Población", "A quién estudia: la unidad de análisis (profesionales de enfermería, no «personal de salud»)."],
      ["Ámbito", "La institución o lugar, que anticipa la autorización que deberá tramitar."],
      ["Periodo", "El año o los meses de recolección."]
    ],
    formula: "[Variable(s) de interés] en [población] de [ámbito o institución], [periodo].\n\nDescriptivo: Nivel de [variable] en [población] de [ámbito], [periodo]\nCorrelacional: Relación entre [variable 1] y [variable 2] en [población] de [ámbito], [periodo]\nComparativo: [Variable] según [grupo 1 y grupo 2] en [ámbito], [periodo]\nCuasiexperimental: Efecto de [intervención] sobre [variable resultado] en [población] de [ámbito], [periodo]",
    rules: [
      "Máximo 20 palabras; sin siglas no explicadas ni adjetivos valorativos («grave», «alarmante»).",
      "Sin verbos conjugados: es un título, no una oración con acción.",
      "La población debe ser accesible para usted en el semestre."
    ],
    example: [
      ["Declaración", "Relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.", "«Relación entre» anticipa un alcance correlacional y obliga, más adelante, a una hipótesis de asociación y a una prueba de correlación."],
      ["Variables", "síndrome de burnout · satisfacción laboral", "Son dos variables con instrumentos validados en español: una variable sin instrumento obliga a construir y validar uno, lo que excede el semestre."],
      ["Población y ámbito", "profesionales de enfermería · de un hospital público de Chiclayo", "Delimita la unidad de análisis (no estudiantes, no técnicos) y anticipa el trámite de autorización institucional."],
      ["Justificación de la elección", "Se elige el tema porque la población es accesible mediante convenio docente-asistencial, ambas variables cuentan con instrumentos validados en español y existe evidencia previa peruana que permite construir antecedentes sólidos.", "Contiene los tres criterios que el docente evaluará: acceso, instrumento y evidencia previa."]
    ]
  },
  s2: {
    steps: [
      ["P · Población", "A quién."],
      ["I/E · Exposición o intervención", "Qué se evalúa."],
      ["C · Comparación", "Frente a qué, solo si aplica."],
      ["O · Resultado", "Qué se mide."],
      ["Bloques de búsqueda", "Un bloque por variable de la pregunta: OR dentro de cada bloque, AND entre bloques."],
      ["Registro", "Base, fecha, límites aplicados desde la interfaz, fórmula y número de resultados."]
    ],
    formula: "Base de datos:\nFecha de búsqueda (día/mes/año):\nLímites aplicados desde la interfaz:\nFórmula de búsqueda:\nNúmero de resultados:\nSeleccionados por título y resumen:\nIncluidos tras leer el texto completo:",
    rules: [
      "Tantos bloques como variables tiene la pregunta.",
      "Sin corchetes en PubMed y sin truncadores ni asteriscos en ninguna base.",
      "Frases completas y exactas: «professional burnout», nunca («professional» AND «burnout»)."
    ],
    example: [
      ["Pregunta", "¿Existe relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería?", "Tres variables en la pregunta: población, exposición y resultado. Por eso habrá tres bloques."],
      ["Bloque 1 · Población", "\"nurses\" OR \"nursing staff\" OR \"registered nurses\"", "Dentro del bloque todo va con OR: son maneras distintas de nombrar lo mismo."],
      ["Bloque 2 · Exposición", "\"burnout\" OR \"professional burnout\" OR \"occupational burnout\"", "«professional burnout» va como frase completa; separada recuperaría artículos donde las palabras aparecen sin relación."],
      ["Bloque 3 · Resultado", "\"job satisfaction\" OR \"work satisfaction\"", "Entre bloques va AND: son cosas distintas que deben coincidir en el mismo estudio."],
      ["Fórmula final", "(\"nurses\" OR \"nursing staff\" OR \"registered nurses\") AND (\"burnout\" OR \"professional burnout\" OR \"occupational burnout\") AND (\"job satisfaction\" OR \"work satisfaction\")", "No hay ningún asterisco ni límite dentro de la fórmula: los años e idiomas se marcaron en los filtros de PubMed."],
      ["Registro", "PubMed, 17/09/2026, 412 resultados; 38 seleccionados por título y resumen; 12 incluidos tras texto completo.", "Con fecha y número de resultados, cualquier lector puede repetir la búsqueda. Eso es reproducibilidad."]
    ]
  },
  s11: {
    steps: [
      ["P1 · Magnitud global", "Defina la variable y dé la cifra mundial con organismo y año."],
      ["P2 · Causas y consecuencias", "Factores asociados y consecuencias clínicas, económicas y para el sistema de salud, con citas."],
      ["P3 · Magnitud nacional", "Cifra oficial del Perú y hallazgos de estudios peruanos."],
      ["P4 · Contexto normativo", "Norma o plan nacional y el indicador que muestra que no basta."],
      ["P5 · Nivel local", "Región e institución: cifra o hecho documentado y observable."],
      ["P6 · Vacío y pregunta", "Qué se estudió, qué no, por qué importa no saberlo, y la pregunta textual."]
    ],
    formula: "P1. La [variable] constituye [definición operativa]. Según [organismo, año], afecta a [cifra]… (Autor, año).\nP2. La literatura identifica como factores asociados [f1], [f2] y [f3] (Autor, año)…\nP3. En el Perú, [fuente oficial, año] reporta [cifra nacional]…\nP4. Frente a ello, [norma técnica, año] establece [medida]. Sin embargo, [indicador]…\nP5. En la región [X], [cifra o hecho]. En [institución], [dato institucional]…\nP6. Pese a la evidencia descrita, los estudios se han centrado en [lo estudiado] y no en [lo no estudiado]… Por ello, se plantea la siguiente pregunta: ¿[pregunta]?",
    rules: [
      "Cada nivel lleva al menos una cifra con fuente y año.",
      "Si no hay estadística local publicada, describa hechos institucionales observables, con prudencia y sin inventar cifras.",
      "El último párrafo termina con la pregunta literal que reaparecerá en 1.3."
    ],
    example: [
      ["P1 · Definición y magnitud", "El síndrome de burnout es un estado de agotamiento emocional, despersonalización y baja realización personal derivado de la exposición sostenida a estresores laborales. En profesionales de enfermería, la Organización Mundial de la Salud lo reconoce como un fenómeno ocupacional con consecuencias sobre la calidad del cuidado y la seguridad del paciente.", "Define la variable antes de hablar de ella. Mencionarla sin definirla obliga al lector a suponer."],
      ["P3 · Nivel nacional", "En el Perú, la evidencia disponible confirma la magnitud del problema. Sucapuca et al. (2022), en 340 profesionales de enfermería del departamento de Puno, encontraron que los factores del desempeño laboral explicaron el 28,54 % de la varianza del burnout… Romero-Carazas et al. (2024), en 420 enfermeras peruanas, hallaron una correlación negativa entre burnout y satisfacción laboral (β = −0,46; p < 0,001).", "Cifras exactas con su estadístico. «Varios estudios muestran que el burnout es alto» no es evidencia; «explicaron el 28,54 % de la varianza» sí lo es."],
      ["P5 · Nivel local", "En la región Lambayeque, los servicios hospitalarios operan con una razón de enfermeras por paciente inferior a la recomendada y con jornadas que incluyen turnos nocturnos consecutivos… En el hospital donde se realizará el estudio, el registro de licencias por causas asociadas al estrés laboral y la rotación del personal asistencial constituyen manifestaciones observables de esta situación.", "Sin estadística local publicada, recurre a hechos institucionales observables descritos con prudencia, sin inventar cifras."],
      ["P6 · Vacío y pregunta", "Sin embargo, los estudios peruanos identificados se han desarrollado principalmente en Lima, Puno y Arequipa, y ninguno ha evaluado conjuntamente el burnout y la satisfacción laboral en profesionales de enfermería de hospitales públicos de Lambayeque. Esta ausencia de evidencia local impide diseñar intervenciones institucionales ajustadas a la realidad regional. Por ello se plantea la siguiente pregunta: ¿existe relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026?", "Nombra el vacío con precisión geográfica y temática: no dice «no hay estudios», dice cuáles hay y qué no cubrieron. Cierra con la pregunta literal."]
    ]
  },
  s12: {
    steps: [
      ["1 · Autor, diseño y objetivo", "Autor(es) (año) + verbo en pasado + diseño + país + objetivo."],
      ["2 · Muestra e instrumento", "n, unidad de análisis e instrumento aplicado."],
      ["3 · Resultado con cifra", "El hallazgo principal con su estadístico exacto."],
      ["4 · Conclusión", "Lo que concluyeron los autores."],
      ["5 · Aporte a mi estudio", "Qué toma usted de este antecedente: teoría, dirección, instrumento o diseño."]
    ],
    formula: "[Autor(es) (año)] [realizaron / evaluaron / determinaron] un estudio [diseño] en [país], con el objetivo de [objetivo]. La muestra estuvo conformada por [n] [unidad de análisis], a quienes se aplicó [instrumento]. Los resultados mostraron que [hallazgo con cifra exacta]. Los autores concluyeron que [conclusión]. [Aporte a mi estudio].",
    rules: [
      "Un solo párrafo, siempre en pasado.",
      "El quinto movimiento, el aporte, distingue un antecedente de un resumen; sin él la rúbrica descuenta.",
      "Dos internacionales, dos nacionales y dos locales o regionales, de los últimos cinco años."
    ],
    example: [
      ["1 · Autor, diseño y objetivo", "Romero-Carazas et al. (2024) realizaron un estudio transversal y explicativo en el Perú, con el objetivo de analizar la relación entre burnout, actividad física y satisfacción laboral bajo la teoría de demandas y recursos laborales.", "Autor y diseño en una oración. El verbo va en pasado."],
      ["2 · Muestra e instrumento", "La muestra estuvo conformada por 420 profesionales de enfermería, a quienes se aplicó la Medida Ultracorta de Burnout, la Escala General de Satisfacción Laboral NTP 394 y el Cuestionario Internacional de Actividad Física.", "Nombra los instrumentos: le servirá para comparar con los suyos."],
      ["3 · Resultado", "Los resultados mostraron una correlación negativa entre burnout y satisfacción laboral (β = −0,46; p < 0,001) y un efecto mediador significativo de la actividad física (β = −0,106; p < 0,001).", "La cifra exacta con su estadístico, no un adjetivo."],
      ["4 · Conclusión", "Los autores concluyeron que promover la actividad física constituye una estrategia para mitigar el burnout y mejorar la satisfacción laboral.", "La conclusión es de los autores; todavía no es la suya."],
      ["5 · Aporte", "Este antecedente aporta al presente estudio el marco teórico de demandas y recursos laborales, la evidencia de la dirección esperada de la asociación y dos instrumentos validados en población peruana.", "El movimiento que casi nadie escribe: dice qué decisión de su estudio se apoya en este trabajo."]
    ]
  },
  s13: {
    steps: [
      ["Pregunta general", "¿[Verbo interrogativo del alcance] [variable 1] y [variable 2] en [población] de [ámbito], [periodo]?"],
      ["Preguntas específicas", "Por una sola ruta: A) por dimensiones, B) por subgrupos o C) por pasos del análisis."],
      ["Delimitación", "Espacial, temporal, poblacional y conceptual (con el autor de cada definición)."]
    ],
    formula: "¿[Verbo interrogativo del alcance] [variable 1] y [variable 2] en [población] de [ámbito], [periodo]?\n\nRuta A · Por dimensiones: ¿Cuál es el nivel de [dimensión 1] en [población]…?\nRuta B · Por subgrupos: ¿Existen diferencias en [variable] según [sexo, servicio, condición laboral]…?\nRuta C · Por pasos: describir cada variable primero, luego relacionarlas.",
    rules: [
      "La pregunta general repite palabra por palabra la que cerró la realidad problemática.",
      "Todas las específicas comparten población, ámbito y periodo con la general.",
      "Ninguna específica introduce una variable nueva."
    ],
    example: [
      ["Pregunta general", "¿Existe relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026?", "Es idéntica a la que cerró la realidad problemática. Esa repetición no es redundancia: es coherencia, y se califica."],
      ["Específicas 1 y 2", "1. ¿Cuál es el nivel del síndrome de burnout en profesionales de enfermería de un hospital público de Chiclayo, 2026?\n2. ¿Cuál es el nivel de satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026?", "Primero se describe cada variable."],
      ["Específicas 3 a 5", "3. ¿Existe relación entre la dimensión agotamiento emocional y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026?\n4. … despersonalización …\n5. … realización personal …", "Luego se relacionan sus dimensiones (ruta A). Cinco preguntas darán cinco objetivos y, de ellos, las hipótesis."],
      ["Delimitación conceptual", "Burnout según Maslach y Jackson; satisfacción laboral según la escala NTP 394.", "Nombra a los autores de las definiciones: de ahí saldrán las dimensiones de la operacionalización (semana 10)."]
    ]
  },
  ra1: {
    steps: [
      ["Ubicación", "Sección, párrafo y oración exactos."],
      ["Problema", "Qué falla y por qué, en una oración."],
      ["Solución", "Una corrección ejecutable en el mismo taller."]
    ],
    formula: "Ubicación: párrafo 3 de la realidad problemática, tercera oración.\nProblema: se afirma que la prevalencia regional es alta, sin cifra ni fuente.\nSolución: incorporar el dato del boletín epidemiológico regional o eliminar la afirmación.",
    rules: [
      "No son comentarios útiles: «está bien», «mejorar redacción», «falta más información».",
      "Declare siempre una fortaleza del trabajo revisado.",
      "Cierre con una recomendación global: aceptar sin cambios, correcciones menores, correcciones mayores o rechazar."
    ],
    example: [
      ["Observación 1", "1.1, párrafo 1 · La variable «satisfacción laboral» no está definida antes de usarse · Añadir definición operativa con cita en la primera mención.", "Localiza el problema: sin ubicación, el autor no puede corregir."],
      ["Observación 3", "1.2, antecedente 3 · Publicado en 2013; excede la antigüedad permitida · Reemplazar por un estudio de los últimos cinco años.", "Propone una solución ejecutable, no solo señala el defecto."],
      ["Observación 4", "1.2, antecedente 5 · Falta el quinto movimiento (aporte al estudio) · Añadir una oración final indicando qué se toma de ese estudio.", "Aplica un criterio concreto de la rúbrica."],
      ["Fortaleza y recomendación", "Fortaleza principal: el nivel nacional está sostenido con dos estudios peruanos recientes y cifras exactas. Recomendación global: aceptar con correcciones menores.", "Identificar lo que funciona enseña a reconocer un texto correcto. Usa el vocabulario editorial real."]
    ]
  },
  s14: {
    steps: [
      ["P1 · Origen y postulado", "La [teoría], formulada por [autor] en [año], sostiene que [postulado central]."],
      ["P2 · Constructos", "La teoría se estructura en [n] constructos: [constructo 1], definido como…"],
      ["P3 · Relaciones que postula", "Según esta teoría, [constructo A] incrementa o reduce [constructo B] a través de [mecanismo]."],
      ["P4 · Traducción al estudio", "En la presente investigación, [constructo A] se operacionaliza como [variable 1] y [constructo B] como [variable 2]. Por tanto, la teoría permite anticipar que [relación esperada]."],
      ["P5 · Respaldo empírico", "Esta relación es consistente con lo hallado en [población] por [autor, año], quien encontró [resultado con cifra]."],
      ["1.4.3 · Bases conceptuales", "Por variable: definición conceptual con cita, dimensiones según el autor, instrumento con ítems, escala y propiedades psicométricas, y relevancia para la disciplina."]
    ],
    formula: "1.4.3 [Variable]\nDefinición conceptual: [definición con cita]. Dimensiones: [d1], [d2], [d3], según [autor, año]. Medición: se evalúa mediante [instrumento], compuesto por [n] ítems en escala [tipo], con [propiedades psicométricas reportadas]. Relevancia para la disciplina: [por qué esta variable importa en el campo].",
    rules: [
      "Sin biografía de la autora: el postulado en dos líneas.",
      "El P4 es obligatorio y el de mayor peso en la rúbrica.",
      "Con un estudio transversal, escriba «consistente con», no «confirma»."
    ],
    example: [
      ["P1–P2 · Postulado y constructos", "La teoría de demandas y recursos laborales, formulada por Bakker y Demerouti, sostiene que todo puesto de trabajo puede describirse mediante dos categorías: las demandas, que son los aspectos físicos, psicológicos y organizacionales que exigen esfuerzo sostenido, y los recursos, que son los aspectos que permiten alcanzar los objetivos laborales y amortiguar el costo de las demandas.", "Enuncia el postulado sin biografía y define los constructos con el vocabulario de la teoría, no con el del estudio."],
      ["P3 · Relaciones", "La teoría postula dos procesos simultáneos. En el proceso de deterioro de la salud, las demandas elevadas y sostenidas agotan la energía del trabajador y producen agotamiento emocional; en el proceso motivacional, los recursos disponibles incrementan el compromiso y la satisfacción laboral. Cuando las demandas superan de manera persistente a los recursos, aparece el síndrome de burnout y, en consecuencia, disminuye la satisfacción laboral.", "El corazón: dice qué causa qué y por qué. Sin este párrafo no hay teoría, hay descripción."],
      ["P4 · Traducción", "En la presente investigación, las demandas laborales corresponden a la sobrecarga asistencial, la rotación de turnos y la exposición al sufrimiento del paciente…; los recursos corresponden al apoyo del equipo, la autonomía profesional y las prácticas de autocuidado… La teoría permite anticipar, por tanto, una relación inversa entre burnout y satisfacción laboral.", "Nombra qué elemento del hospital es una «demanda» y cuál un «recurso». Su última oración ya es la hipótesis de la semana 9, en lenguaje teórico."],
      ["P5 · Respaldo", "Romero-Carazas et al. (2024) aplicaron esta misma teoría a 420 profesionales de enfermería del Perú y hallaron una correlación negativa entre burnout y satisfacción laboral (β = −0,46; p < 0,001), además de un efecto mediador de la actividad física (β = −0,106; p < 0,001).", "Ancla la teoría en evidencia peruana con cifras, lo que además refuerza la justificación."]
    ]
  },
  s15: {
    steps: [
      ["Verbo en infinitivo", "Según el alcance: identificar/describir (descriptivo), determinar la relación (correlacional), comparar (comparativo), determinar el efecto (experimental)."],
      ["Variable(s)", "Con el mismo nombre que en la pregunta."],
      ["Población", "La misma de la pregunta."],
      ["Ámbito", "El mismo de la pregunta."],
      ["Periodo", "El mismo de la pregunta."]
    ],
    formula: "[Verbo en infinitivo] + [variable(s)] + [población] + [ámbito] + [periodo]\n\n¿Existe relación entre A y B en P?  →  Determinar la relación entre A y B en P.",
    rules: [
      "El general es la pregunta general transformada: solo cambia el modo gramatical.",
      "Tantos específicos como preguntas específicas, en el mismo orden: primero descriptivos, luego relacionales.",
      "Nunca: concientizar, sensibilizar, capacitar, mejorar, promover, fomentar, lograr, implementar."
    ],
    example: [
      ["Objetivo general", "Determinar la relación entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.", "Conserva exactamente las palabras de la pregunta, cambiando solo «¿Existe relación entre…?» por «Determinar la relación entre…»."],
      ["Específicos 1 y 2", "1. Identificar el nivel del síndrome de burnout en profesionales de enfermería de un hospital público de Chiclayo, 2026.\n2. Identificar el nivel de satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.", "«Identificar» porque son descriptivos."],
      ["Específicos 3 a 5", "3. Determinar la relación entre la dimensión agotamiento emocional y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.\n4. … despersonalización …\n5. … realización personal …", "«Determinar la relación» porque son correlacionales. Mezclar verbos entre alcances es el error más sancionado de esta sección."],
      ["Lo que no aparece", "(Ningún objetivo del tipo «proponer un programa de intervención».)", "Ese objetivo exigiría otro diseño y la validación del programa, imposible en el tiempo disponible."]
    ]
  },
  ra2: {
    steps: [
      ["Observación recibida", "Cítela textualmente."],
      ["Respuesta", "Agradezca, diga qué hizo y dónde (página y párrafo)."],
      ["Si no la acepta", "Escríbalo igual, con argumento y cita."],
      ["Bitácora", "N.º, observación, semana, acción realizada y página."]
    ],
    formula: "Observación 1: «La teoría se menciona pero no se aplica a las variables del estudio.»\nRespuesta: Se agradece la observación. Se incorporó un párrafo de traducción (página 12, párrafo 3) donde las demandas laborales se especifican como sobrecarga asistencial y rotación de turnos, y los recursos como apoyo del equipo y actividad física.",
    rules: [
      "Discrepar con fundamento es parte del trabajo científico; ignorar sin responder, no.",
      "La bitácora acumula desde la semana 5: demuestra progresión."
    ],
    example: [
      ["Fila 4", "La teoría no se traducía a las variables · Semana 8 · Se añadió el párrafo de traducción constructo-variable · Página 12", "Deja rastro verificable: el docente va a la página indicada y comprueba el cambio en segundos."],
      ["Fila 5", "El objetivo 3 usaba el verbo «analizar» en un alcance correlacional · Semana 8 · Se reemplazó por «determinar la relación» · Página 15", "Un cambio aparentemente menor, un verbo, con consecuencias mayores: ese verbo determinará la prueba estadística de la semana 10."]
    ]
  },
  s16: {
    steps: [
      ["Hi", "Existe relación [inversa / directa] y [significativa] entre [variable 1] y [variable 2] en [población] de [ámbito], [periodo]."],
      ["H0", "No existe relación significativa entre [variable 1] y [variable 2] en [población] de [ámbito], [periodo]."],
      ["Específicas", "Solo para los objetivos relacionales, con su propia dirección."]
    ],
    formula: "Hi: Existe relación [dirección] y significativa entre [V1] y [V2] en [población] de [ámbito], [periodo].\nH0: No existe relación significativa entre [V1] y [V2] en [población] de [ámbito], [periodo].\n\nComparativo: Existen diferencias significativas en [variable] entre [grupo 1] y [grupo 2]…\nIntervención: [Intervención] produce un efecto significativo sobre [variable resultado] en [población]…",
    rules: [
      "La dirección se deriva de la teoría (P4) y de los antecedentes.",
      "Los objetivos descriptivos no generan hipótesis.",
      "Nunca se dice que la hipótesis alterna «quedó demostrada»: se rechaza o no la nula."
    ],
    example: [
      ["Hipótesis general", "Hi: Existe relación inversa y significativa entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.\nH0: No existe relación significativa entre el síndrome de burnout y la satisfacción laboral en profesionales de enfermería de un hospital público de Chiclayo, 2026.", "Dice «inversa», no solo «existe relación». La dirección viene del párrafo de traducción de la teoría y del hallazgo de Romero-Carazas et al. (β = −0,46)."],
      ["Hi1 y Hi2", "Hi1: Existe relación inversa y significativa entre el agotamiento emocional y la satisfacción laboral…\nHi2: Existe relación inversa y significativa entre la despersonalización y la satisfacción laboral…", "Una hipótesis por cada objetivo correlacional."],
      ["Hi3", "Hi3: Existe relación directa y significativa entre la realización personal y la satisfacción laboral…", "Cambia de dirección porque la realización personal es una dimensión invertida del burnout. Demuestra que se comprendió el instrumento y no se copió una plantilla."],
      ["Lo que no hay", "(Cinco objetivos específicos y solo tres hipótesis específicas.)", "Los objetivos 1 y 2 son descriptivos. La correspondencia no es numérica ciega, es lógica."]
    ]
  },
  s17: {
    steps: [
      ["Teórica", "Qué teoría verifica, adapta o extiende y en qué contexto no estudiado."],
      ["Metodológica", "Qué instrumento o procedimiento aplica, adapta o valida, y qué deja replicable."],
      ["Práctica", "Quién (actor concreto) podrá tomar qué decisión, y por qué hoy no puede."],
      ["Social", "A quién beneficia directa e indirectamente y por qué mecanismo."]
    ],
    formula: "Justificación teórica. El estudio contribuye al conocimiento sobre [tema] al [verificar / adaptar / extender] [teoría] en [contexto no estudiado]. Los estudios disponibles se han desarrollado en [contextos], y ninguno ha examinado [vacío] (Autor, año).\nJustificación práctica. Los resultados permitirán a [actor concreto] [decisión concreta].\nJustificación social. El estudio beneficia a [beneficiario directo], en la medida en que [mecanismo], y de forma indirecta a [beneficiario indirecto].",
    rules: [
      "Un párrafo por tipo, cada uno rotulado.",
      "Nombre el vacío con lugares concretos, no con «no existen estudios».",
      "Sin actor, decisión y beneficio, la justificación práctica es retórica."
    ],
    example: [
      ["Teórica", "El estudio contribuye al conocimiento sobre el bienestar laboral al verificar la teoría de demandas y recursos laborales en un hospital público de la región Lambayeque, contexto no examinado hasta la fecha. La evidencia peruana disponible proviene de Puno (Sucapuca et al., 2022) y de muestras nacionales sin desagregación regional (Romero-Carazas et al., 2024)…", "El vacío se nombra con lugares concretos (Puno, muestras nacionales)."],
      ["Metodológica", "La investigación aplicará instrumentos con respaldo psicométrico en población peruana y reportará sus coeficientes de confiabilidad en la muestra estudiada…", "Se refiere a sus instrumentos, no a la metodología en general."],
      ["Práctica", "Los resultados permitirán a la jefatura del departamento identificar los servicios con mayor agotamiento emocional y priorizar en ellos medidas de reorganización de turnos y de acompañamiento profesional, decisiones que actualmente se adoptan sin información local.", "Nombra a quién (la jefatura), qué decidirá (reorganización de turnos) y por qué hoy no puede (sin información local)."],
      ["Social", "El estudio beneficia de forma directa a los profesionales del establecimiento… y de forma indirecta a los usuarios, dado que el agotamiento profesional se asocia con la calidad de la atención.", "Conecta con el usuario/paciente, destinatario último de toda investigación."]
    ]
  },
  s21: {
    steps: [
      ["Tipo", "Enfoque, tipo, alcance, temporalidad, observacional o experimental, prospectivo o retrospectivo."],
      ["Diseño y esquema", "No experimental o experimental, con el esquema (M → O; M: O1 r O2)."],
      ["Población y muestra", "N, criterios de inclusión y exclusión, fórmula con datos citados y tipo de muestreo."],
      ["Operacionalización", "Definición conceptual y operacional, dimensiones, indicadores, ítems, escala y valores finales."],
      ["Análisis", "Programa, prueba de normalidad, pruebas inferenciales y α."]
    ],
    formula: "La presente investigación es de enfoque cuantitativo, de tipo aplicada, alcance correlacional, temporalidad transversal, observacional y prospectiva. El diseño es no experimental, correlacional, dado que no se manipulará ninguna variable y ambas serán medidas en un solo momento. El esquema del diseño se representa de la siguiente manera: [esquema].\n\nLa población estuvo conformada por [N] [unidad de análisis] de [ámbito]. Criterios de inclusión: [a], [b]. Criterios de exclusión: [c], [d]. Para la muestra se aplicó la fórmula para proporciones en población finita (confianza 95 %, error 5 %, p tomada de [autor, año]), obteniéndose [n] participantes. El muestreo fue [tipo].",
    rules: [
      "La definición conceptual cita a un autor; la operacional describe lo que usted hará.",
      "Las dimensiones son las del instrumento, no las que usted imagina.",
      "La escala de medición decide la prueba estadística."
    ],
    example: [
      ["Definición conceptual", "Estado de agotamiento emocional, despersonalización y baja realización personal, producido por la exposición prolongada a estresores laborales (Maslach & Jackson).", "Cita a un autor."],
      ["Definición operacional", "Puntaje obtenido en la escala aplicada a los profesionales, categorizado en nivel bajo, medio y alto.", "No cita a nadie, porque describe lo que usted hará. Confundirlas es el error más frecuente."],
      ["Dimensiones e ítems", "Agotamiento emocional (1–9) · Despersonalización (10–14) · Realización personal (15–22).", "Conectan la matriz con el anexo: un evaluador debe encontrar esos ítems en el cuestionario."],
      ["Escala", "Ordinal · Valores finales: bajo, medio, alto.", "Escala ordinal en ambas variables: anticipa Rho de Spearman, no Pearson."]
    ]
  },
  s26: {
    steps: [
      ["Autonomía", "Voluntariedad y consentimiento, con la medida concreta para su población."],
      ["No maleficencia", "Anonimato, almacenamiento, tiempo de conservación, quién accede y ruta de derivación si el instrumento puede revelar riesgo."],
      ["Beneficencia", "Qué se devolverá y a quién."],
      ["Justicia", "Cómo se invita sin discriminar."],
      ["Cierre", "Comité de ética de la universidad, comité del establecimiento y autorización de la dirección."]
    ],
    formula: "Autonomía. La participación será voluntaria. Antes de aplicar el instrumento se entregará un consentimiento informado que explicará el objetivo, el procedimiento, la duración, la ausencia de riesgos previsibles y el derecho a retirarse sin consecuencia alguna. En el caso de [particularidad de su población], se adoptará [medida específica].\n\nEl proyecto será presentado al Comité Institucional de Ética en Investigación de [institución] y la recolección se iniciará únicamente después de obtener su aprobación y la autorización de la dirección de [establecimiento].",
    rules: [
      "Un párrafo por principio, siempre aplicado a su estudio, no copiado del Informe Belmont.",
      "El consentimiento tiene los nueve elementos.",
      "Si no hay beneficio directo, se dice."
    ],
    example: [
      ["Autonomía", "La participación de los profesionales será voluntaria. El consentimiento informado se entregará de manera individual, fuera del horario laboral directo y sin la presencia de personal con cargo de jefatura, con el fin de evitar cualquier percepción de presión institucional.", "Describe una medida concreta que responde a un riesgo real de esa población."],
      ["No maleficencia", "Los cuestionarios serán anónimos… La base de datos se almacenará en un archivo protegido con contraseña… y será conservada por cinco años… Se incluirá al final del cuestionario la información de contacto del servicio correspondiente.", "Dice qué pasará con los datos y ofrece una salida si el instrumento revela malestar."],
      ["Beneficencia", "Los resultados agregados serán presentados al departamento del establecimiento en una sesión de devolución…", "Se concreta en la devolución, que refuerza la justificación práctica."],
      ["Cierre", "El proyecto será presentado al Comité Institucional de Ética en Investigación de la Universidad Señor de Sipán y al comité correspondiente del establecimiento de salud…", "Menciona las dos autorizaciones. Omitir la del establecimiento detiene muchos estudios en la práctica."]
    ]
  },
  ra3: {
    steps: [
      ["Objetivo específico", "Una fila por objetivo."],
      ["Hipótesis", "Solo si el objetivo es relacional."],
      ["Variable y dimensión", "Con los ítems del instrumento."],
      ["Escala", "Nominal, ordinal, de intervalo o de razón."],
      ["Prueba estadística", "Justificada por la escala y la normalidad."],
      ["¿Coherente?", "Toda fila incoherente genera una observación con ubicación, problema y solución."]
    ],
    formula: "Objetivo específico | Hipótesis | Variable y dimensión | Ítems | Escala | Prueba estadística | ¿Coherente?",
    rules: [
      "Revise siempre en la dirección instrumento → operacionalización → trazabilidad.",
      "Si una fila usa otra prueba, debe justificarse por la escala, no por preferencia."
    ],
    example: [
      ["OE1", "Identificar el nivel de burnout · — · Burnout (global) · 1–22 · Ordinal · Frecuencias y porcentajes · Sí", "Sin hipótesis, y eso es correcto: es descriptivo."],
      ["OE3", "Determinar la relación entre agotamiento emocional y satisfacción laboral · Hi1 · 1–9 / 1–15 · Ordinal · Rho de Spearman · Sí", "Escalas ordinales: prueba no paramétrica."],
      ["Observación registrada", "En la versión inicial, el OE5 declaraba la prueba t de Student. Se corrigió a Rho de Spearman, dado que ambas variables son ordinales.", "El error estadístico más frecuente en pregrado, capturado antes de la entrega."]
    ]
  },
  s13r: {
    steps: [
      ["Referencias", "APA 7, verificadas una por una: el DOI abre y el artículo dice lo que usted afirma."],
      ["Matriz de consistencia", "Problema, objetivo, hipótesis, variable, dimensiones, metodología y análisis, una fila por objetivo específico."],
      ["Cronograma", "Ética y autorización antes de la recolección; prueba piloto incluida."],
      ["Presupuesto", "Cantidad, costo unitario, total y fuente de financiamiento."]
    ],
    formula: "Problema | Objetivo | Hipótesis | Variable | Dimensiones | Metodología | Análisis\nGeneral | General | General | V1 y V2 | | Tipo, diseño, población, muestra… | Descriptiva e inferencial\nEspecífico 1 | Específico 1 | — | V1 | | | Frecuencias y porcentajes\nEspecífico 3 | Específico 3 | Hi1 | V1.D1 y V2 | | | Rho de Spearman",
    rules: [
      "Entre 25 y 40 referencias, al menos 60 % de los últimos cinco años.",
      "Correspondencia total entre citas y referencias, en ambos sentidos.",
      "Un presupuesto redondo y sin detalle no es evaluable."
    ],
    example: [
      ["Cronograma", "Marzo: anteproyecto y comité de ética · Abril: comité, autorización y prueba piloto · Mayo–junio: recolección · Junio: digitación y análisis · Julio: informe y sustentación.", "El comité de ética y la autorización van antes de recolectar. Un cronograma que recolecta en la primera semana es observado de inmediato."],
      ["Presupuesto", "Impresión de instrumentos: 200 × S/ 0,20 = S/ 40,00 · Movilidad: 20 × S/ 10,00 = S/ 200,00 · Asesoría estadística: S/ 400,00 · Total: S/ 790,00 · Financiamiento: autofinanciado.", "Realista y verificable. La fuente de financiamiento se declara siempre, aunque sea propia."]
    ]
  },
  def: {
    steps: [
      ["Apertura (45 s)", "Título, problema con cifra global, nacional y local, vacío en una línea y pregunta."],
      ["Antecedentes", "Tabla de autor, diseño y muestra, hallazgo con cifra y aporte."],
      ["Método y cierre", "Diseño, muestra, instrumentos, análisis y aspectos éticos."]
    ],
    formula: "«Buenos días. Presentaré el anteproyecto titulado [título]. El problema que lo motiva es el siguiente: [cifra global], [cifra nacional] y, en [su ámbito], [dato local]. Sin embargo, los estudios disponibles [vacío en una línea]. Por ello, la pregunta que guía este estudio es: [pregunta].»",
    rules: [
      "Memorice la apertura; el resto se explica.",
      "Una cifra exacta vale más que tres adjetivos.",
      "La columna «aporte al estudio» es la que el jurado busca."
    ],
    example: [
      ["Fila de antecedente", "Romero-Carazas et al., 2024, Perú · Transversal, 420 enfermeras · Burnout se asocia inversamente con satisfacción (β = −0,46) · Teoría y dirección esperada", "Cuatro columnas que se leen en 20 segundos; el aporte demuestra que los antecedentes fueron usados, no listados."],
      ["Fila de antecedente", "Sucapuca et al., 2022, Perú · Transversal, 340 enfermeras · El desempeño laboral explica el 28,54 % de la varianza del burnout · Contexto nacional y variables de control", "Cifras con su estadístico y antecedentes peruanos recientes: sostienen la pertinencia nacional."]
    ]
  }
};