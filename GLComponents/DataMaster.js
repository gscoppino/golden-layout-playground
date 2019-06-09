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

      let inc = 3;
      // setInterval(() => {
      //   if (this.simulation) {
      //     this.simulation.stop();
      //   }
      //   state.data.nodes.push(
      //     {
      //       "id": ++inc,
      //       "name": "Test " + inc,
      //       "width": 200,
      //       "height": 150,
      //       "formFields": []
      //     }
      //   );

      //   state.data.connectors.push({
      //     source: 1,
      //     target: inc
      //   });

      //   this.render(state, container.getElement());
      // }, 2000);
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

    const linkForce = d3
      .forceLink(state.data.connectors)
      .id(d => d.id)
      .distance(d => Math.max(
        Math.sqrt(d.source.width * d.source.width + d.source.height * d.source.height),
        Math.sqrt(d.target.width * d.target.width + d.target.height * d.target.height)
      ));
    
    const link = d3.linkHorizontal()
      .x(d => d.x + d.width / 2)
      .y(d => d.y + d.height / 2);

    const simulation = d3
      .forceSimulation()
      .nodes(state.data.nodes)
      .force('center', d3.forceCenter(CHART_WIDTH / 2, CHART_HEIGHT / 2))
      // .force('charge', d3.forceManyBody().strength(d => -(Math.sqrt(d.width*d.width + d.height*d.height) / 2)))
      .force('collide', d3.forceCollide().radius(d => Math.sqrt(d.width*d.width + d.height*d.height) / 2))
      .force('link', linkForce);
    
    this.simulation = simulation;

    // Connectors
    const connectorContainer = diagram
    .append("g")
    .selectAll("g")
    .data(state.data.connectors)
    .enter()
    .append("g");

  const connectors = connectorContainer
    .selectAll("path")
    .data(state.data.connectors)
    .enter()
    .append("path")
    .style('fill', 'none')
    .style('stroke', 'black');

    // Nodes
    const nodeContainer = diagram
    .append("g")
    .selectAll("g")
    .data(state.data.nodes)
    .enter()
    .append("g");
    const nodes = nodeContainer
      .append("rect")
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .attr("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", "1");

    const nodeText = nodeContainer
      .append("text")
      .text(d => d.name)
      .style("text-anchor", "middle")
      .style("fill", "black");
    
      simulation.on('tick', () => {
          nodes
            .attr('x', d => d.x)
            .attr('y', d => d.y);
          
          nodeText
            .attr("x", d => d.x + d.width / 2)
            .attr("y", d => d.y + d.height / 2)
            .attr('dy', '0.35em'); // for centering
          
          connectors
            .attr('d', link);
      });
  }
}
