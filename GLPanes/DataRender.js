import GLComponentRegistry from "../GLComponents/registry.js";

export default function(state) {
  return {
    id: `GLDataRenderFor${state.detail.id}`,
    title: `${state.detail.name} (Render View)`,
    type: "component",
    componentName: GLComponentRegistry.DataRender,
    componentState: {
      detail: state.detail
    }
  };
}
