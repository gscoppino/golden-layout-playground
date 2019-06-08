import goldenLayoutInstance from "../GLInstance.js";
import GLEventRegistry from "../GLEvents/registry.js";

const EventEmitter = goldenLayoutInstance.eventHub;

export class GLDataMasterComponent {
  constructor(container, state) {
    this.container = container;
    this.state = state;

    // Wait so we can appropriately size the SVG to the same size as the container.
    this.container.on('resize', () => {
      this.render(state, container.getElement());
      this.container.off('resize');
    });
  }

  onSelectDetail(event) {
    EventEmitter.emit(
      GLEventRegistry.DataMaster.LoadData,
      $(event.target).data("detail")
    );
  }

  render(state, target) {
    const MARGIN = { TOP: 20, RIGHT: 30, BOTTOM: 30, LEFT: 40 };
    const CHART_WIDTH = target.width() - MARGIN.LEFT - MARGIN.RIGHT;
    const CHART_HEIGHT = target.height() - MARGIN.TOP - MARGIN.BOTTOM;

    target.empty();

    const svg = $(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`);
    target.append(svg);

    const diagram = d3
      .select(svg.get(0))
      .attr("width", CHART_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", CHART_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

    const nodeContainer = diagram
      .append("g")
      .selectAll("g")
      .data(state.data.nodes)
      .enter()
      .append("g");

    // Nodes
    nodeContainer
      .append("rect")
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", "1");

    nodeContainer
      .append("text")
      .text(d => d.name)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .attr("x", d => d.x + d.width / 2)
      .attr("y", d => d.y + d.height / 2)
      .attr('dy', '0.35em'); // for centering

    // Connectors
    // Create a node map first for improved performance
    const nodeMap = state.data.nodes.reduce((map, node) => {
      map[node.id] = node;
      return map;
    }, {});
  
    const connectorContainer = diagram
      .append("g")
      .selectAll("g")
      .data(state.data.connectors)
      .enter()
      .append("g");

    connectorContainer
      .selectAll("line")
      .data(state.data.connectors)
      .enter()
      .append("line")
      .style('stroke', 'black')
      .attr("x1", function (d) {
        const node1 = nodeMap[d.connectionA];
        return node1.x + node1.width;
      })
      .attr("y1", function (d) {
        const node1 = nodeMap[d.connectionA];
        return node1.y + (node1.height / 2);
      })
      .attr("x2", function (d) {
        const node2 = nodeMap[d.connectionB];
        return node2.x;
      })
      .attr("y2", function (d) {
        const node2 = nodeMap[d.connectionB];
        return node2.y + (node2.height / 2);
      });
  }
}
