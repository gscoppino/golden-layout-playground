import goldenLayoutInstance from "../GLInstance.js";
import GLEventRegistry from "../GLEvents/registry.js";

const EventEmitter = goldenLayoutInstance.eventHub;

export class GLDataMasterComponent {
  constructor(container, state) {
    this.container = container;
    this.state = state;

    this.render(this.state, this.container.getElement());
  }

  onSelectDetail(event) {
    EventEmitter.emit(
      GLEventRegistry.DataMaster.LoadData,
      $(event.target).data("detail")
    );
  }

  render(state, target) {
    target.empty();

    const list = $("<ul></ul>");

    const listElements = state.data.map(detail => {
      const el = $(`<li>${detail.name}</li>`);

      el.css("margin", "1rem");
      el.data("detail", detail);
      el.on("click", this.onSelectDetail);

      return el;
    });

    list.append(listElements);

    target.html(list);
  }
}
