/**
 * NEXO Research Studio - Capa de Datos: Facultades y Escuelas USS
 * Archivo: data/facultiesData.js
 */

export const FACULTIES_DATA = [
  {
    id: "f-salud",
    nombre: "Facultad de Ciencias de la Salud",
    escuelas: [
      "Enfermería",
      "Medicina Humana",
      "Psicología",
      "Estomatología",
      "Tecnología Médica"
    ],
    schools: [
      {
        id: "esc-enfermeria",
        name: "Escuela Profesional de Enfermería",
        lines: [
          "Salud pública, cuidado humanizado y gestión de servicios de salud",
          "Salud materna, perinatal y del adolescente",
          "Cuidado integral en enfermedades crónicas y no transmisibles",
          "Promoción de la salud, estilos de vida y autocuidado"
        ]
      },
      {
        id: "esc-medicina",
        name: "Escuela Profesional de Medicina Humana",
        lines: [
          "Enfermedades infecciosas, tropicales y reemergentes",
          "Enfermedades crónicas no transmisibles y metabólicas",
          "Salud comunitaria, epidemiología y salud global"
        ]
      },
      {
        id: "esc-psicologia",
        name: "Escuela Profesional de Psicología",
        lines: [
          "Salud mental, bienestar psicológico y resiliencia",
          "Psicología educativa, aprendizaje y desarrollo humano",
          "Psicología organizacional, clima laboral y salud en el trabajo"
        ]
      },
      {
        id: "esc-estomatologia",
        name: "Escuela Profesional de Estomatología",
        lines: [
          "Salud bucal comunitaria y epidemiología oral",
          "Odontología restauradora, materiales y estética",
          "Cirugía bucal, patología y rehabilitación"
        ]
      },
      {
        id: "esc-tecnologia-medica",
        name: "Escuela Profesional de Tecnología Médica",
        lines: [
          "Laboratorio clínico y anatomía patológica",
          "Terapia física y rehabilitación"
        ]
      }
    ]
  },
  {
    id: "f-ingenieria",
    nombre: "Facultad de Ingeniería, Arquitectura y Urbanismo",
    escuelas: [
      "Ingeniería Civil",
      "Ingeniería Industrial",
      "Ingeniería de Sistemas",
      "Ingeniería Agroindustrial",
      "Arquitectura"
    ],
    schools: [
      {
        id: "esc-sistemas",
        name: "Escuela Profesional de Ingeniería de Sistemas",
        lines: [
          "Ingeniería de software, arquitecturas web y cloud",
          "Inteligencia artificial, analítica de datos y minería de datos",
          "Ciberseguridad, gestión de TI y gobernanza digital"
        ]
      },
      {
        id: "esc-civil",
        name: "Escuela Profesional de Ingeniería Civil",
        lines: [
          "Ingeniería estructural, materiales sostenibles y geotecnia",
          "Gestión de proyectos de construcción y metodología BIM",
          "Hidráulica, saneamiento ambiental y recursos hídricos"
        ]
      },
      {
        id: "esc-industrial",
        name: "Escuela Profesional de Ingeniería Industrial",
        lines: [
          "Gestión de operaciones, logística y cadena de suministro",
          "Optimización de procesos, Lean Manufacturing y calidad ISO",
          "Seguridad industrial, salud ocupacional y ergonomía"
        ]
      },
      {
        id: "esc-agroindustrial",
        name: "Escuela Profesional de Ingeniería Agroindustrial",
        lines: [
          "Procesos agroindustriales, tecnología de alimentos y conservación",
          "Gestión de la calidad e inocuidad agroalimentaria"
        ]
      },
      {
        id: "esc-arquitectura",
        name: "Escuela Profesional de Arquitectura",
        lines: [
          "Diseño arquitectónico bioclimático y urbanismo sostenible",
          "Patrimonio edificado, conservación y renovación urbana",
          "Tecnología de la construcción y hábitat social"
        ]
      }
    ]
  },
  {
    id: "f-empresariales",
    nombre: "Facultad de Ciencias Empresariales",
    escuelas: [
      "Administración",
      "Contabilidad",
      "Comercio y Negocios Internacionales",
      "Turismo y Negocios"
    ],
    schools: [
      {
        id: "esc-administracion",
        name: "Escuela Profesional de Administración",
        lines: [
          "Gestión estratégica, desarrollo organizacional y liderazgo",
          "Marketing digital, comportamiento del consumidor y ventas",
          "Emprendimiento, gestión de Pymes e innovación empresarial"
        ]
      },
      {
        id: "esc-contabilidad",
        name: "Escuela Profesional de Contabilidad",
        lines: [
          "Gestión tributaria, auditoría financiera y gubernamental",
          "Finanzas corporativas, costos y toma de decisiones",
          "Contabilidad de gestión y sistemas de información contable"
        ]
      },
      {
        id: "esc-comercio",
        name: "Escuela Profesional de Comercio y Negocios Internacionales",
        lines: [
          "Comercio exterior, logística internacional y aduanas",
          "Estrategias de internacionalización de Mipymes"
        ]
      },
      {
        id: "esc-turismo",
        name: "Escuela Profesional de Turismo y Negocios",
        lines: [
          "Gestión del patrimonio turístico, ecoturismo y sostenibilidad",
          "Marketing turístico, hotelería y calidad de servicio"
        ]
      }
    ]
  },
  {
    id: "f-derecho",
    nombre: "Facultad de Derecho y Humanidades",
    escuelas: [
      "Derecho",
      "Educación",
      "Ciencias de la Comunicación"
    ],
    schools: [
      {
        id: "esc-derecho",
        name: "Escuela Profesional de Derecho",
        lines: [
          "Derecho constitucional, derechos humanos y garantías",
          "Derecho penal, criminología y proceso penal",
          "Derecho civil, laboral, corporativo y resolución de conflictos"
        ]
      },
      {
        id: "esc-educacion",
        name: "Escuela Profesional de Educación",
        lines: [
          "Estrategias pedagógicas, didáctica e innovación educativa",
          "Gestión y calidad de las instituciones educativas",
          "Tecnología educativa e inclusión escolar"
        ]
      },
      {
        id: "esc-comunicacion",
        name: "Escuela Profesional de Ciencias de la Comunicación",
        lines: [
          "Comunicación corporativa, reputación e imagen institucional",
          "Periodismo digital, medios interactivos y redes sociales",
          "Comunicación para el desarrollo y responsabilidad social"
        ]
      }
    ]
  }
];