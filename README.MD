# 🎓 Laboratorio del Anteproyecto

Plataforma web multidisciplinaria para el diseño metodológico, auditoría de coherencia científica, gestión de marcos teóricos por facultades y simulación de sustentaciones orales para proyectos de investigación.

---

## 📌 Visión General

Un entorno interactivo y bilingüe (**Español / Inglés**) desarrollado para guiar a los estudiantes de nivel universitario en el proceso de estructuración, redacción y defensa de anteproyectos de tesis e investigación científica. 

La plataforma integra herramientas de análisis de flujo, auditoría lógica asistida por Inteligencia Artificial (Tutor IA / ChatGPT) y un sistema de exportación ejecutiva a documentos Word (`.docx`), asegurando la trazabilidad y consistencia entre el problema, los objetivos, la teoría y la metodología.

---

## ✨ Funcionalidades Principales

El sistema está dividido en **5 estaciones metodológicas** accesibles desde la barra de navegación principal:

### 1. 🔗 Hilo de Coherencia Metodológica
* **Matriz de Núcleo Temático:** Registro dinámico de Variables, Población, Ámbito, Periodo, Enfoque (Cuantitativo/Cualitativo/Mixto), Alcance y Diseño.
* **Auditoría Automática de 6 Eslabones:** Evaluación en tiempo real del nivel de solidez y alineación entre la pregunta de investigación, la teoría principal, el objetivo general, la hipótesis y los instrumentos.
* **Diagrama Sankey de Trazabilidad:** Visualización gráfica e interactiva de la conservación de flujo desde el Nivel Macro (Variables) hasta el Nivel Micro (Ítems/Indicadores) con protección anti-corrupción SVG.
* **Integración con IA:** Generación de prompts estructurados en JSON para auditar la coherencia global del estudio en ChatGPT.

### 2. ✍️ Estación de Redacción (Ruta de 16 Semanas)
* **Navegación Guiada:** Planificador semanal estructurado para la elaboración del capítulo de Planteamiento del Problema y Marco Metodológico.
* **Modelos y Plantillas:** Consulta de secuencias lógicas de párrafos, fórmulas de redacción y ejemplos anotados.
* **Lienzo de Redacción:** Editor con guardado automático local en el navegador.
* **Prueba Crítica y Checklists:** Criterios de autoevaluación metodológica paso a paso.
* **Calibración de Dictámenes IA:** Lector de respuestas de IA para categorizar criterios cumplidos (`C`), parciales (`P`) o no cumplidos (`N`).

### 3. 📚 Marcos Teóricos por Facultad
* **Catálogo Multidisciplinario:** Base de datos de teorías y modelos conceptuales filtrables por facultades universales (Salud, Ingeniería, Empresariales, Derecho y Humanidades).
* **Recomendador de Teorías por Variable:** Coincidencia inteligente entre la variable de resultado del proyecto y los modelos conceptuales disponibles.
* **Incorporación de Teorías Personalizadas:** Formulario para registrar teorías específicas creadas o adaptadas por el investigador.
* **Asistente de Búsqueda IA:** Generación dinámica de prompts bilingües para consultar teorías no encontradas directamente en ChatGPT.

### 4. ⚖️ Jurado Simulado (Sustentación Oral)
* **Simulador de Defensa:** Configuración de rondas de interrogación técnica según la sección del anteproyecto (Planteamiento, Marco Teórico, Metodología, Instrumentos o Coherencia General).
* **Niveles de Exigencia:** Selección entre modo *Formativo* (orientador) o modo *Exigente* (defensa real de grado).
* **Bitácora de Sustentación:** Registro formal de preguntas planteadas por el jurado, respuestas formuladas, valoración de solidez y plan de refuerzo pre-defensa.

### 5. 📋 Bitácora e Informe Consolidado
* **Resumen Ejecutivo:** Diagnóstico gráfico del avance de redacción mediante mapa de calor (*heatmap*) de las 16 semanas.
* **Declaración de Uso de IA (Anexo 5):** Generación automática del borrador normativo sobre la transparencia en el uso de herramientas conversacionales.
* **Respaldo Local JSON:** Funcionalidad para exportar e importar el estado completo del proyecto para continuar en diferentes dispositivos.
* **Exportador a Word (`.docx`):** Descarga de informe estructurado y bilingüe con tablas nativas, auditoría de eslabones y registro de bitácora.

---

## 🌐 Sistema Bilingüe (ES / EN)

El sistema cuenta con un conmutador reactivo de idioma en el encabezado (`ES` / `EN`):
* **Sincronización Híbrida:** Integra cookies nativas de Google Translate (`googtrans`), atributos `lang` en el DOM y lógica personalizada en JavaScript.
* **Prompts de IA Dinámicos:** Todas las consultas enviadas a ChatGPT (Hilo de coherencia, Redacción, Marcos Teóricos, Jurado Simulado e Informe) traducen sus metadatos, tareas e instrucciones al inglés o español según el modo activo.
* **Reporte Word Adaptativo:** La exportación a `.docx` genera los encabezados, estados de auditoría y secciones en el idioma seleccionado.

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología / Librería | Uso principal |
| :--- | :--- | :--- |
| **Frontend** | HTML5 / JavaScript (ES Modules) | Estructura semántica y lógica modular |
| **Estilos** | Tailwind CSS (via CDN) | Diseño responsivo y modo oscuro |
| **Tipografía** | Google Fonts (*Plus Jakarta Sans*, *Source Sans 3*, *IBM Plex Mono*) | Jerarquía visual clara y legible |
| **Iconografía** | Lucide Icons | Interfaz de usuario limpia e intuitiva |
| **Gráficos** | Google Charts Loader (Sankey Diagram) | Diagrama de flujo de operacionalización |
| **Exportación** | Docx.js (v8.5.0 UMD) | Generación cliente de reportes `.docx` |
| **Traducción** | Google Translate Element API | Motor de internacionalización |

---

## 📂 Estructura del Proyecto

```text
├── index.html                  # Interfaz principal de la aplicación (Single Page App)
├── css/
│   ├── custom.css              # Estilos personalizados y overrides de Tailwind/Google Translate
│   └── variables.css           # Variables de temas CSS (colores, sombras, fuentes)
├── js/
│   ├── app.js                  # Módulo principal y orquestador del estado global
│   ├── aiPrompts.js            # Generador de prompts bilingües para ChatGPT
│   ├── coherenceChain.js       # Evaluador de la cadena de coherencia y selectores en cascada
│   ├── i18n.js                 # Diccionario y traducciones locales UI
│   ├── jurySimulator.js        # Lógica de la pestaña Jurado Simulado
│   ├── logAndReport.js         # Renderizado del informe consolidado y mapa de calor
│   ├── reportExporter.js       # Exportador a documentos Word (.docx) y respaldos JSON
│   ├── sankeyChart.js          # Renderizado seguro del diagrama Sankey
│   ├── sectionStudio.js        # Lógica del canvas de redacción de las 16 semanas
│   └── theoriesEngine.js       # Buscador y recomendador de marcos teóricos
└── data/
    ├── facultiesData.js        # Catálogo de facultades y escuelas profesionales
    ├── modelsData.js           # Plantillas y fórmulas metodológicas de redacción
    ├── sectionsData.js         # Estructura de las 16 semanas y criterios de evaluación
    └── theoriesData.js         # Catálogo base de teorías y modelos conceptuales
```

### Ejecución Local

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/tu-usuario/nombre-repositorio.git](https://github.com/tu-usuario/nombre-repositorio.git)
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd nombre-repositorio
   ```
3. Abre el archivo `index.html` en tu navegador web favorito (o utiliza una extensión de servidor local como *Live Server* en VS Code).