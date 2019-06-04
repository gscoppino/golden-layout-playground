import GLComponentRegistry from "../GLComponents/registry.js";

export default function(state) {
  return {
    id: `GLDataDetailFor${state.detail.id}`,
    title: `${state.detail.name} (Editor View)`,
    type: "component",
    componentName: GLComponentRegistry.DataDetail,
    componentState: {
      detail: state.detail
    }
  };
}
