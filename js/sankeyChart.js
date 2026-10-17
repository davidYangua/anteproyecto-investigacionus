/**
 * NEXO Research Studio - Diagrama Sankey de Trazabilidad Metodológica (D3.js)
 * Archivo: js/sankeyChart.js
 */

/**
 * Genera la estructura de Nodos y Enlaces para el Sankey a partir del estado actual
 * @param {Object} state Estado global del proyecto
 * @returns {Object} Objeto con arreglos { nodes, links }
 */
export function buildSankeyDataFromState(state) {
  const project = state.project || {};

  const v1 = project.v1 || "Variable 1 (Sin definir)";
  const v2 = project.v2 || "Variable 2 (Sin definir)";
  const teo = project.teo || "Sin Teoría Asignada";
  const dis = project.dis ? project.dis.toUpperCase() : "Diseño NO Asignado";
  const status = "Evaluación de Coherencia";

  const nodes = [
    { name: v1, category: "variable" },
    { name: v2, category: "variable" },
    { name: teo, category: "teoria" },
    { name: dis, category: "diseno" },
    { name: status, category: "estado" }
  ];

  const links = [
    { source: 0, target: 2, value: 1 },
    { source: 1, target: 2, value: 1 },
    { source: 2, target: 3, value: 2 },
    { source: 3, target: 4, value: 2 }
  ];

  return { nodes, links };
}

/**
 * Renderiza el gráfico Sankey dentro del contenedor SVG
 * @param {string} containerSelector Selector CSS del contenedor SVG o wrapper
 * @param {Object} state Estado global de la aplicación
 */
export function renderSankeyChart(containerSelector, state) {
  const wrapper = document.querySelector(containerSelector);
  if (!wrapper || !window.d3 || !window.d3.sankey) return;

  wrapper.innerHTML = "";

  const data = buildSankeyDataFromState(state);
  const width = wrapper.clientWidth || 600;
  const height = wrapper.clientHeight || 280;

  const svg = d3.select(wrapper)
    .append("svg")
    .attr("id", "nx-sankey-svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("height", "100%");

  // Configuración del generador d3-sankey
  const sankey = d3.sankey()
    .nodeWidth(16)
    .nodePadding(18)
    .extent([[10, 10], [width - 10, height - 10]]);

  const { nodes, links } = sankey({
    nodes: data.nodes.map(d => Object.assign({}, d)),
    links: data.links.map(d => Object.assign({}, d))
  });

  // Paleta de colores enterprise según categoría
  const colorMap = {
    variable: "#0A2540",
    teoria: "#C5A059",
    diseno: "#059669",
    estado: "#38BDF8"
  };

  // Tooltip emergente
  let tooltip = d3.select("body").select(".sankey-tooltip");
  if (tooltip.empty()) {
    tooltip = d3.select("body")
      .append("div")
      .attr("class", "sankey-tooltip opacity-0");
  }

  // Renderizado de Enlaces (Flujos Curvos Bézier)
  svg.append("g")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("class", "sankey-link")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", "#C5A059")
    .attr("stroke-width", d => Math.max(1, d.width))
    .on("mouseover", (event, d) => {
      tooltip
        .style("opacity", 1)
        .html(`<strong>Flujo:</strong> ${d.source.name} &rarr; ${d.target.name}`)
        .style("left", `${event.pageX + 12}px`)
        .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0));

  // Renderizado de Nodos
  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "sankey-node");

  node.append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => colorMap[d.category] || "#64748B");

  // Etiquetas de Nodos
  node.append("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 8 : d.x0 - 8)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name);
}