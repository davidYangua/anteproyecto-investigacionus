/**
 * NEXO Research Studio - Capa de Datos: Catálogo Multidisciplinario de Teorías por Facultad
 * Archivo: data/theoriesData.js
 * Dirección Metodológica: Ing. Percy Castro Mejía
 */

export const THEORIES_DATA = [
  // ==========================================
  // FACULTAD DE CIENCIAS DE LA SALUD (f-salud)
  // ==========================================
  {
    id: "nightingale",
    facultad: "f-salud",
    nombre: "Teoría del Entorno",
    autor: "Florence Nightingale",
    anio: "1859",
    tipo: "Filosofía y fundamentos",
    postulado: "La enfermedad es un proceso reparador y la función del profesional es manipular el entorno (aire, luz, ruido, limpieza, dieta) para que la naturaleza actúe sobre el paciente.",
    resumen: "Sostiene que las condiciones externas del entorno hospitalario y comunitario determinan el proceso de recuperación y salud del paciente.",
    constructos: [
      "Entorno Físico y Bioseguridad",
      "Agencia Reparadora",
      "Confort y Salud Holística"
    ],
    predice: "Mejores condiciones ambientales → mejor recuperación y menos complicaciones.",
    resultados: ["infecciones asociadas a la atención", "recuperación", "calidad del sueño", "confort ambiental", "higiene hospitalaria"],
    kw: ["entorno", "ambiente", "infeccion", "higiene", "lavado de manos", "ruido", "sueno", "limpieza", "bioseguridad"],
    usela: "Su resultado depende de condiciones del entorno hospitalario o domiciliario (ruido, higiene, bioseguridad, ventilación).",
    nouse: "Su resultado es una conducta, una vivencia o una relación interpersonal.",
    instrumentos: "Listas de cotejo de bioseguridad o de condiciones ambientales validadas.",
    pregunta: "¿Existe relación entre las condiciones ambientales de la unidad y la calidad del sueño en pacientes hospitalizados?",
    ejemploCita: "Nightingale (1859) postula que el control riguroso de las condiciones ambientales optimiza la capacidad reparadora natural del organismo.",
    ref: "Nightingale, F. (1859). Notes on nursing: What it is, and what it is not. Harrison."
  },
  {
    id: "orem",
    facultad: "f-salud",
    nombre: "Teoría del Déficit de Autocuidado",
    autor: "Dorothea Orem",
    anio: "1959–2001",
    tipo: "Modelo conceptual",
    postulado: "Las personas tienen capacidad (agencia) para cuidar de sí mismas; cuando la demanda de autocuidado supera esa capacidad aparece un déficit que el profesional compensa mediante sistemas de atención.",
    resumen: "Explica la relación entre la capacidad individual de cuidarse y las demandas terapéuticas de las enfermedades crónicas.",
    constructos: [
      "Agencia de Autocuidado",
      "Demanda Terapéutica",
      "Déficit de Autocuidado"
    ],
    predice: "Mayor agencia de autocuidado → mejores prácticas de autocuidado y mejor control de la condición clínica.",
    resultados: ["autocuidado", "adherencia al tratamiento", "control glucémico", "manejo de enfermedad crónica", "agencia de autocuidado"],
    kw: ["autocuidado", "adherencia", "cronic", "diabetes", "hipertension", "tratamiento", "control glucemico", "dialisis"],
    usela: "Su resultado es el autocuidado, la adherencia o el manejo de una enfermedad crónica.",
    nouse: "Su resultado es una experiencia laboral del personal (burnout, satisfacción).",
    instrumentos: "Appraisal of Self-Care Agency Scale (ASA); Escala de Ejercicio de Autocuidado.",
    pregunta: "¿Existe relación entre la agencia de autocuidado y el control glucémico en adultos con diabetes tipo 2?",
    ejemploCita: "Orem (2001) sostiene que el déficit de autocuidado surge cuando las demandas terapéuticas superan la agencia del individuo.",
    ref: "Orem, D. E. (2001). Nursing: Concepts of practice (6th ed.). Mosby."
  },
  {
    id: "roy",
    facultad: "f-salud",
    nombre: "Modelo de Adaptación",
    autor: "Callista Roy",
    anio: "1970–2009",
    tipo: "Modelo conceptual",
    postulado: "La persona es un sistema adaptativo que responde a estímulos (focales, contextuales y residuales) mediante mecanismos de afrontamiento que se expresan en cuatro modos adaptativos.",
    resumen: "Enfoca al ser humano como un sistema holístico adaptativo que responde a cambios fisiológicos y psicosociales.",
    constructos: [
      "Estímulos Focales y Contextuales",
      "Mecanismos de Afrontamiento",
      "Modos Adaptativos (Fisiológico y Psicosocial)"
    ],
    predice: "Mejores procesos de afrontamiento ante un estímulo → respuestas más adaptativas.",
    resultados: ["afrontamiento", "adaptación a la enfermedad", "resiliencia", "ajuste psicosocial"],
    kw: ["afrontamiento", "adaptacion", "resiliencia", "ajuste", "estresor", "ansiedad", "hemodialisis"],
    usela: "Estudia cómo la persona afronta y se adapta a una enfermedad, cirugía o cambio vital.",
    nouse: "Su resultado es una conducta preventiva voluntaria.",
    instrumentos: "Coping and Adaptation Processing Scale (CAPS, Roy).",
    pregunta: "¿Existe relación entre el afrontamiento y la adaptación en pacientes con insuficiencia renal en hemodiálisis?",
    ejemploCita: "Roy (2009) concibe a la persona como un sistema adaptativo que responde integralmente a los estímulos del entorno.",
    ref: "Roy, C. (2009). The Roy adaptation model (3rd ed.). Pearson."
  },
  {
    id: "pender",
    facultad: "f-salud",
    nombre: "Modelo de Promoción de la Salud",
    autor: "Nola Pender",
    anio: "1982–2015",
    tipo: "Teoría de rango medio",
    postulado: "La conducta promotora de salud resulta de las características individuales y, sobre todo, de las cogniciones y afectos específicos de la conducta, que los profesionales pueden modificar.",
    resumen: "Integra procesos cognitivo-perceptuales que impulsan a los individuos a comprometerse con estilos de vida saludables.",
    constructos: [
      "Beneficios y Barreras Percibidas",
      "Autoeficacia Percibida",
      "Conducta Promotora de la Salud"
    ],
    predice: "Más beneficios percibidos, autoeficacia y apoyo, y menos barreras → mayor conducta promotora de salud.",
    resultados: ["estilo de vida", "conducta promotora de salud", "actividad física", "alimentación saludable", "conductas preventivas"],
    kw: ["estilo", "vida", "conducta", "promocion", "preventiv", "habito", "actividad fisica", "alimentacion", "tamizaje"],
    usela: "Su resultado es una conducta de salud o un estilo de vida.",
    nouse: "Su resultado es una condición clínica o una experiencia laboral.",
    instrumentos: "Health-Promoting Lifestyle Profile II (HPLP-II, Walker & Pender).",
    pregunta: "¿Existe relación entre la autoeficacia percibida y el estilo de vida promotor de salud en gestantes?",
    ejemploCita: "Pender et al. (2015) afirman que las cogniciones específicas y la autoeficacia determinan el compromiso con estilos de vida saludables.",
    ref: "Pender, N. J., Murdaugh, C. L., & Parsons, M. A. (2015). Health promotion in nursing practice (7th ed.). Pearson."
  },
  {
    id: "watson",
    facultad: "f-salud",
    nombre: "Teoría del Cuidado Humano",
    autor: "Jean Watson",
    anio: "1979",
    tipo: "Filosofía y fundamentos",
    postulado: "El cuidado es la esencia de las disciplinas de salud y se realiza en una relación transpersonal que protege la dignidad de la persona; se expresa en los procesos caritas.",
    resumen: "Sostiene que el cuidado transpersonal promueve la sanación holística y preserva la dignidad del paciente.",
    constructos: [
      "Relación Transpersonal de Cuidado",
      "Procesos Caritas",
      "Momento de Cuidado"
    ],
    predice: "Mayor presencia de comportamientos de cuidado humanizado → mayor satisfacción y bienestar percibido del paciente.",
    resultados: ["cuidado humanizado", "calidad del cuidado percibida", "satisfacción del paciente", "percepción del cuidado"],
    kw: ["cuidado humanizado", "humaniz", "percepcion del cuidado", "calidad del cuidado", "satisfaccion del paciente", "trato"],
    usela: "Su resultado es el cuidado humanizado o la satisfacción del usuario con la atención.",
    nouse: "Su resultado es un indicador puramente fisiológico.",
    instrumentos: "Caring Behaviors Inventory (Wolf); Escala de Percepción del Cuidado Humanizado.",
    pregunta: "¿Existe relación entre la percepción del cuidado humanizado y la satisfacción del paciente hospitalizado?",
    ejemploCita: "Watson (1979) destaca que la relación transpersonal y los procesos caritas garantizan la calidad humanizada de la atención.",
    ref: "Watson, J. (1979). Nursing: The philosophy and science of caring. Little, Brown."
  },

  // ==========================================================
  // FACULTAD DE INGENIERÍA, ARQUITECTURA Y URBANISMO (f-ingenieria)
  // ==========================================================
  {
    id: "deming_phva",
    facultad: "f-ingenieria",
    nombre: "Ciclo PHVA / Círculo de Deming",
    autor: "Walter Shewhart & Edward Deming",
    anio: "1950",
    tipo: "Modelo de gestión e ingeniería",
    postulado: "La mejora continua de cualquier proceso industrial, tecnológico o constructivo requiere una secuencia iterativa de cuatro etapas: Planificar, Hacer, Verificar y Actuar.",
    resumen: "Marco metodológico iterativo de 4 pasos para la optimización de procesos industriales y estándares de calidad.",
    constructos: [
      "Planificación Estratégica",
      "Ejecución de Procesos",
      "Verificación / Control de Calidad",
      "Estandarización y Mejora Continua"
    ],
    predice: "Sistemática aplicación del ciclo PHVA → reducción de variabilidad y aumento en la eficiencia operativa o de calidad.",
    resultados: ["mejora de procesos", "eficiencia operativa", "reducción de mermas", "calidad del producto", "productividad industrial"],
    kw: ["phva", "deming", "mejora continua", "procesos", "calidad", "eficiencia", "optimizacion", "productividad", "planta"],
    usela: "Estudios de optimización de procesos, implementación de gestión de calidad o reducción de desperdicios en planta/obra.",
    nouse: "Estudios puramente teóricos o sin medición de indicadores de proceso.",
    instrumentos: "Listas de verificación de procesos, indicadores OEE, diagramas de control de calidad.",
    pregunta: "¿De qué manera la implementación del ciclo PHVA optimiza la productividad en una línea de producción agroindustrial?",
    ejemploCita: "Deming (1986) argumenta que la iteración sistemática del ciclo PHVA reduce la variabilidad y eleva la eficiencia en los procesos productivos.",
    ref: "Deming, W. E. (1986). Out of the Crisis. MIT Press."
  },
  {
    id: "lean_construction",
    facultad: "f-ingenieria",
    nombre: "Filosofía Lean Construction & Last Planner System",
    autor: "Lauri Koskela & Glenn Ballard",
    anio: "1992–2000",
    tipo: "Modelo de gestión en edificación",
    postulado: "La producción en edificación debe orientarse a maximizar el valor para el cliente eliminando sistemáticamente las 8 pérdidas (desperdicios) mediante la gestión de flujos de trabajo estables.",
    resumen: "Gestión de la producción en edificación orientada a reducir pérdidas de tiempo y materiales garantizando flujos continuos.",
    constructos: [
      "Flujo Continuo de Trabajo",
      "Eliminación de Desperdicios (Waste)",
      "Last Planner System (PPC)"
    ],
    predice: "Uso del Last Planner System → mayor Porcentaje de Plan Cumplido (PPC) y reducción de tiempos muertos en obra.",
    resultados: ["cumplimiento de plazos", "porcentaje de plan cumplido (PPC)", "reducción de desperdicios", "productividad en obra"],
    kw: ["lean", "construction", "last planner", "ppc", "desperdicios", "obras", "edificacion", "cronograma", "construccion"],
    usela: "Proyectos de investigación en ingeniería civil o arquitectura enfocados en la eficiencia y gestión de obras.",
    nouse: "Estudios de cálculo estructural puro sin componente de gestión de producción.",
    instrumentos: "Hojas de registro PPC, Lookahead Planning, Diagramas VSM (Value Stream Mapping).",
    pregunta: "¿Cómo influye la aplicación de Lean Construction en el Porcentaje de Plan Cumplido (PPC) en obras residenciales?",
    ejemploCita: "Koskela (1992) plantea la construcción como un flujo de conversiones donde la eliminación de perdidas maximiza el valor entregado.",
    ref: "Ballard, G. (2000). The Last Planner System of Production Control (Doctoral dissertation, University of Birmingham)."
  },
  {
    id: "tam_davis",
    facultad: "f-ingenieria",
    nombre: "Modelo de Aceptación de Tecnología (TAM)",
    autor: "Fred Davis",
    anio: "1989",
    tipo: "Modelo teórico de sistemas de información",
    postulado: "La adopción de una tecnología de información o sistema de software está determinada por la utilidad percibida y la facilidad de uso percibida por los usuarios.",
    resumen: "Modela cómo los usuarios aceptan y adoptan sistemas de software en función de su facilidad y utilidad percibida.",
    constructos: [
      "Utilidad Percibida",
      "Facilidad de Uso Percibida",
      "Intención de Uso Tecnológico"
    ],
    predice: "Mayor utilidad y facilidad percibida → mayor intención conductual de adopción del sistema de información.",
    resultados: ["adopción tecnológica", "usabilidad de software", "satisfacción de usuario", "aceptación de sistemas"],
    kw: ["tam", "tecnologia", "software", "usabilidad", "adopcion", "sistemas", "desarrollo", "interfaz", "utilidad"],
    usela: "Investigaciones en ingeniería de sistemas, desarrollo de software, apps móviles e implementación de TI.",
    nouse: "Proyectos de hardware o infraestructura sin interacción con usuarios.",
    instrumentos: "Cuestionario TAM (Davis) adaptado con escala Likert de usabilidad.",
    pregunta: "¿Existe relación entre la utilidad percibida y la adopción de un sistema ERP en pequeñas empresas de servicios?",
    ejemploCita: "Davis (1989) demuestra que la utilidad percibida es el determinante clave para la aceptación de nuevos sistemas de información.",
    ref: "Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly."
  },
  {
    id: "iso_9001",
    facultad: "f-ingenieria",
    nombre: "Sistema de Gestión de la Calidad ISO 9001",
    autor: "Organización Internacional de Normalización (ISO)",
    anio: "2015",
    tipo: "Estándar de ingeniería y gestión",
    postulado: "La calidad de un producto o servicio de software o ingeniería se logra mediante un enfoque basado en procesos y la gestión de riesgos enfocada en la satisfacción del cliente.",
    resumen: "Estándar internacional para la gestión estandarizada de procesos, auditorías de calidad y mitigación de riesgos.",
    constructos: [
      "Enfoque Basado en Procesos",
      "Gestión de Riesgos",
      "Conformidad y Satisfacción del Cliente"
    ],
    predice: "Mayor madurez en la gestión de procesos ISO → menor tasa de no conformidades y retrabajos.",
    resultados: ["satisfacción del cliente", "reducción de no conformidades", "calidad de software", "estandarización de procesos"],
    kw: ["iso 9001", "gestion de calidad", "no conformidades", "procesos", "estandarizacion", "auditoria", "retrabajos"],
    usela: "Evaluaciones de calidad en desarrollo de software, empresas manufactureras o servicios de ingeniería.",
    nouse: "Proyectos sin alcance organizacional o de estandarización.",
    instrumentos: "Auditorías de calidad, listas de verificación ISO 9001, matrices de evaluación de no conformidades.",
    pregunta: "¿Existe relación entre el nivel de cumplimiento de la norma ISO 9001 y la tasa de retrabajos en empresas de software?",
    ejemploCita: "ISO (2015) establece que el enfoque basado en procesos promueve la mejora continua y minimiza las no conformidades operativas.",
    ref: "ISO. (2015). ISO 9001:2015 Quality management systems — Requirements."
  },

  // ==========================================
  // FACULTAD DE CIENCIAS EMPRESARIALES (f-empresariales)
  // ==========================================
  {
    id: "jdr",
    facultad: "f-empresariales",
    nombre: "Modelo de Demandas y Recursos Laborales (JD-R)",
    autor: "Arnold Bakker & Evangelia Demerouti",
    anio: "2007",
    tipo: "Modelo organizacional",
    postulado: "Todo puesto de trabajo tiene demandas (que exigen esfuerzo) y recursos (que ayudan a lograr metas); el desequilibrio activa un proceso de deterioro (burnout) y los recursos un proceso motivacional (engagement).",
    resumen: "Evalúa cómo el equilibrio entre demandas laborales exijentes y recursos organizacionales condiciona la productividad y el engagement.",
    constructos: [
      "Demandas Laborales Exigentes",
      "Recursos Organizacionales",
      "Engagement / Afrontamiento Laboral"
    ],
    predice: "Demandas altas sin recursos → agotamiento y rotación; Recursos altos → compromiso y productividad.",
    resultados: ["burnout", "satisfacción laboral", "engagement", "desempeño laboral", "intención de rotación"],
    kw: ["demandas", "recursos", "burnout", "engagement", "clima laboral", "desempeno", "productividad", "rotacion", "laboral"],
    usela: "Estudios sobre clima laboral, productividad, compromiso del colaborador y salud ocupacional.",
    nouse: "Investigaciones de marketing o finanzas puras.",
    instrumentos: "Utrecht Work Engagement Scale (UWES); Maslach Burnout Inventory (MBI); Cuestionario de Demandas-Recursos.",
    pregunta: "¿Existe relación entre los recursos laborales percibidos y el engagement en colaboradores de empresas de servicios?",
    ejemploCita: "Bakker y Demerouti (2007) explican que los recursos organizacionales amortiguan el impacto del estrés laboral y elevan el desempeño.",
    ref: "Bakker, A. B., & Demerouti, E. (2007). The job demands-resources model: State of the art. Journal of Managerial Psychology."
  },
  {
    id: "servqual",
    facultad: "f-empresariales",
    nombre: "Modelo de Calidad de Servicio SERVQUAL",
    autor: "A. Parasuraman, V. Zeithaml & L. Berry",
    anio: "1988",
    tipo: "Modelo de evaluación comercial",
    postulado: "La calidad del servicio es la brecha (Gap) entre las expectativas previas del cliente y sus percepciones reales sobre el servicio recibido a lo largo de 5 dimensiones.",
    resumen: "Mide las brechas entre la expectativa previa del consumidor y su percepción de la calidad del servicio recibido.",
    constructos: [
      "Tangibilidad y Empatía",
      "Fiabilidad y Capacidad de Respuesta",
      "Seguridad y Calidad Percibida"
    ],
    predice: "Menor brecha entre expectativa y percepción en las 5 dimensiones → mayor satisfacción y lealtad de marca.",
    resultados: ["satisfacción del cliente", "calidad de servicio", "lealtad del cliente", "intención de recompra"],
    kw: ["servqual", "calidad de servicio", "expectativas", "percepcion", "satisfaccion del cliente", "servicio", "cliente"],
    usela: "Evaluaciones comerciales en turismo, hotelería, banca, retail y empresas de servicio.",
    nouse: "Análisis de estados financieros o proyectos sin contacto directo con el consumidor.",
    instrumentos: "Cuestionario SERVQUAL de 22 pares de afirmaciones (Expectativas vs. Percepciones).",
    pregunta: "¿Cuál es el nivel de calidad de servicio percibido por los usuarios según el modelo SERVQUAL en el sector hotelero?",
    ejemploCita: "Parasuraman et al. (1988) definen la calidad del servicio en función del diferencial entre las expectativas previas y la percepción final.",
    ref: "Parasuraman, A., Zeithaml, V. A., & Berry, L. L. (1988). SERVQUAL: A multiple-item scale for measuring consumer perceptions of service quality."
  },
  {
    id: "vrio_barney",
    facultad: "f-empresariales",
    nombre: "Teoría de Recursos y Capacidades (VRIO)",
    autor: "Jay Barney",
    anio: "1991",
    tipo: "Modelo de estrategia empresarial",
    postulado: "Las empresas logran ventajas competitivas sostenibles mediante el control de recursos internos estratégicos que poseen las características de Valor, Rareza, Inimitabilidad y Organización.",
    resumen: "Analiza cómo los activos intangibles y capacidades internas de la empresa crean ventajas competitivas duraderas.",
    constructos: [
      "Valor Estratégico",
      "Rareza e Inimitabilidad",
      "Organización y Aprovechamiento"
    ],
    predice: "Recursos con atributos VRIO → mayor ventaja competitiva sostenible y mejor desempeño financiero.",
    resultados: ["ventaja competitiva", "desempeño financiero", "posicionamiento de mercado", "competitividad"],
    kw: ["vrio", "barney", "recursos", "capacidades", "estrategia", "competitividad", "ventaja competitiva", "empresa"],
    usela: "Investigaciones de estrategia empresarial, gestión del talento humano y competitividad de Mipymes.",
    nouse: "Estudios de conducta individual del consumidor.",
    instrumentos: "Matriz VRIO de evaluación de activos estratégicos organizacionales.",
    pregunta: "¿Cómo influyen los recursos y capacidades internas en la ventaja competitiva sostenible de las Mipymes?",
    ejemploCita: "Barney (1991) sostiene que la ventaja competitiva sostenible proviene de la posesión de recursos valiosos, raros e inimitables.",
    ref: "Barney, J. (1991). Firm resources and sustained competitive advantage. Journal of Management."
  },

  // ==========================================
  // FACULTAD DE DERECHO Y HUMANIDADES (f-derecho)
  // ==========================================
  {
    id: "alexy_arg",
    facultad: "f-derecho",
    nombre: "Teoría de la Argumentación Jurídica",
    autor: "Robert Alexy",
    anio: "1989",
    tipo: "Teoría jurídica y dogmática",
    postulado: "El discurso jurídico es un caso especial del discurso práctico general orientado a justificar racionalmente las decisiones judiciales conforme a reglas y principios de ponderación.",
    resumen: "Proporciona criterios racionales y el test de ponderación para motivar las sentencias y resolver conflictos entre principios constitucionales.",
    constructos: [
      "Reglas y Principios Jurídicos",
      "Test de Ponderación y Proporcionalidad",
      "Motivación Racional de Sentencias"
    ],
    predice: "Correcta aplicación del test de ponderación → mayor motivación racional y fundamentación de las sentencias.",
    resultados: ["motivación de resoluciones", "fundamentación jurídica", "protección de derechos fundamentales", "seguridad jurídica"],
    kw: ["alexy", "argumentacion", "ponderacion", "principios", "derechos fundamentales", "sentencias", "motivacion", "derecho"],
    usela: "Análisis de jurisprudencia, motivación de decisiones judiciales, garantías del debido proceso y derecho constitucional.",
    nouse: "Investigaciones estadísticas cuantitativas sin análisis dogmático o casuístico.",
    instrumentos: "Fichas de análisis jurisprudencial, matrices de evaluación de la motivación de resoluciones.",
    pregunta: "¿De qué manera el criterio de ponderación de Robert Alexy garantiza la motivación de las sentencias en materia penal?",
    ejemploCita: "Alexy (1989) propone la ponderación como el método racional para resolver la colisión de principios constitucionales.",
    ref: "Alexy, R. (1989). A Theory of Legal Argumentation. Oxford University Press."
  },
  {
    id: "reale_tridimensional",
    facultad: "f-derecho",
    nombre: "Teoría Tridimensional del Derecho",
    autor: "Miguel Reale",
    anio: "1968",
    tipo: "Filosofía del Derecho",
    postulado: "El fenómeno jurídico surge de la interacción dinámica e indisoluble entre el Hecho social, el Valor de justicia y la Norma legal.",
    resumen: "Sostiene que el Derecho es la intelección dinámica entre norma, hecho social y valor axiológico de justicia.",
    constructos: [
      "Dimensión Fáctica (Hecho Social)",
      "Dimensión Axiológica (Valor de Justicia)",
      "Dimensión Normativa (Leyes y Códigos)"
    ],
    predice: "Integración de hecho, valor y norma → eficacia jurídica real y mayor legitimidad social de las leyes.",
    resultados: ["eficacia jurídica", "legitimidad constitucional", "justicia social", "análisis normativo"],
    kw: ["tridimensional", "reale", "hecho", "valor", "norma", "filosofia", "justicia", "constitucional", "ley"],
    usela: "Estudios sociojurídicos, análisis de eficacia normatividad y reformas legislativas.",
    nouse: "Proyectos puramente procesales o de aplicación mecánica del código.",
    instrumentos: "Matriz tridimensional de análisis de efectividad legislativa.",
    pregunta: "¿Cuál es la efectividad de la norma ambiental bajo el enfoque tridimensional del Derecho en conflictos socioambientales?",
    ejemploCita: "Reale (1968) postula que la norma legal cobra vigencia real cuando responde dinámicamente al hecho social y al valor de justicia.",
    ref: "Reale, M. (1968). Teoría Tridimensional del Derecho. Imprenta do Centro Académico."
  },
  {
    id: "constructivismo_ped",
    facultad: "f-derecho",
    nombre: "Constructivismo Pedagógico y Aprendizaje Significativo",
    autor: "David Ausubel, Lev Vygotsky & Jean Piaget",
    anio: "1968–1978",
    tipo: "Teoría educativa y pedagógica",
    postulado: "El aprendizaje es un proceso activo de construcción donde el estudiante conecta la nueva información con sus conocimientos previos dentro de una zona de desarrollo próximo mediada socialmente.",
    resumen: "Plantea que el conocimiento se construye activamente relacionando saberes previos con nuevas estructuras conceptuales.",
    constructos: [
      "Saberes Previos",
      "Zona de Desarrollo Próximo (ZDP)",
      "Aprendizaje Significativo"
    ],
    predice: "Estrategias de enseñanza basadas en andamiaje y saberes previos → mayor logro de aprendizajes significativos.",
    resultados: ["rendimiento académico", "logro de aprendizaje", "competencias lectoras", "pensamiento crítico"],
    kw: ["constructivismo", "ausubel", "vygotsky", "aprendizaje significativo", "didactica", "pedagogia", "competencias", "educacion"],
    usela: "Investigaciones en educación, innovación docente, didáctica de lenguas, desarrollo de habilidades y tics en el aula.",
    nouse: "Estudios exclusivamente normativos o jurídicos.",
    instrumentos: "Rúbricas de evaluación de competencias, pruebas de rendimiento académico pre y post test.",
    pregunta: "¿Existe relación entre la aplicación de estrategias constructivistas y el logro de competencias lectoras en estudiantes de primaria?",
    ejemploCita: "Ausubel (1968) destaca que el aprendizaje significativo ocurre cuando la nueva información se ancla en las estructuras cognitivas previas.",
    ref: "Ausubel, D. P. (1968). Educational Psychology: A Cognitive View. Holt, Rinehart and Winston."
  }
];

/**
 * Obtiene las teorías filtradas por el identificador de facultad
 * @param {string} facId ID de facultad (ej. "f-salud", "f-ingenieria", "f-empresariales", "f-derecho")
 * @returns {Array} Lista de teorías coincidentes
 */
export function getTheoriesByFaculty(facId) {
  if (!facId) return THEORIES_DATA;
  return THEORIES_DATA.filter(t => t.facultad === facId);
}

/**
 * Busca una teoría específica por su ID único
 * @param {string} id 
 * @returns {Object|null}
 */
export function getTheoryById(id) {
  return THEORIES_DATA.find(t => t.id === id) || null;
}

/**
 * Filtra el catálogo por consulta de texto y/o facultad
 * @param {string} query Término de búsqueda
 * @param {string} facId ID de facultad opcional
 * @returns {Array}
 */
export function searchTheories(query = "", facId = "") {
  const cleanQ = query.trim().toLowerCase();
  let list = facId ? getTheoriesByFaculty(facId) : THEORIES_DATA;

  if (!cleanQ) return list;

  return list.filter(t => {
    const nameMatch = t.nombre ? t.nombre.toLowerCase().includes(cleanQ) : false;
    const authorMatch = t.autor ? t.autor.toLowerCase().includes(cleanQ) : false;
    const postuladoMatch = t.postulado ? t.postulado.toLowerCase().includes(cleanQ) : false;
    const kwMatch = t.kw ? t.kw.some(k => k.toLowerCase().includes(cleanQ)) : false;

    return nameMatch || authorMatch || postuladoMatch || kwMatch;
  });
}