export class GLDataRenderComponent {
  constructor(container, state) {
    this.container = container;
    this.state = state;

    // Wait so we can appropriately size the SVG to the same size as the container.
    this.container.on("open", () => {
      this.render(state, container.getElement());
    });
  }

  render(state, target) {
    target.empty();

    const svg = $(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`);
    target.append(svg);

    const MARGIN = { TOP: 20, RIGHT: 30, BOTTOM: 30, LEFT: 40 };
    const CHART_WIDTH = target.width() - MARGIN.LEFT - MARGIN.RIGHT;
    const CHART_HEIGHT = target.height() - MARGIN.TOP - MARGIN.BOTTOM;

    const x = d3
      .scaleBand()
      .range([0, CHART_WIDTH])
      .padding(0.1);
    const xAxis = d3.axisBottom(x);

    const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);
    const yAxis = d3.axisLeft(y).ticks(10, "%");

    const chart = d3
      .select(svg.get(0))
      .attr("width", CHART_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", CHART_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    const data = [
      { name: "A", value: 0.08167 },
      { name: "B", value: 0.01492 },
      { name: "C", value: 0.02782 },
      { name: "D", value: 0.04253 },
      { name: "E", value: 0.12702 },
      { name: "F", value: 0.02288 },
      { name: "G", value: 0.02015 },
      { name: "H", value: 0.06094 },
      { name: "I", value: 0.06966 },
      { name: "J", value: 0.00153 },
      { name: "K", value: 0.00772 },
      { name: "L", value: 0.04025 },
      { name: "M", value: 0.02406 },
      { name: "N", value: 0.06749 },
      { name: "O", value: 0.07507 },
      { name: "P", value: 0.01929 },
      { name: "Q", value: 0.00095 },
      { name: "R", value: 0.05987 },
      { name: "S", value: 0.06327 },
      { name: "T", value: 0.09056 },
      { name: "U", value: 0.02758 },
      { name: "V", value: 0.00978 },
      { name: "W", value: 0.0236 },
      { name: "X", value: 0.0015 },
      { name: "Y", value: 0.01974 },
      { name: "Z", value: 0.00074 }
    ];
    data.columns = ["letter", "frequency"];

    Promise.resolve(data).then(data => {
      data.sort((a, b) => {
        return b.value - a.value;
      });

      x.domain(data.map(d => d.name));
      y.domain([0, d3.max(data, d => d.value)]);

      chart
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${CHART_HEIGHT})`)
        .call(xAxis)
        .append("text")
        .attr("x", CHART_WIDTH / 2)
        .attr("y", MARGIN.BOTTOM)
        .style("text-anchor", "middle")
        .style("fill", "currentColor")
        .text("Letters");

      chart
        .append("g")
        .attr("class", "axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(CHART_HEIGHT / 2))
        .attr("y", -MARGIN.LEFT)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Frequency");

      chart
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("fill", "steelblue")
        .attr("height", d => CHART_HEIGHT - y(d.value))
        .attr("width", x.bandwidth());
    });
  }
}
