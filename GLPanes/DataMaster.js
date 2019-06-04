import GLComponentRegistry from "../GLComponents/registry.js";

export default function(state, config = {}) {
  return {
    id: "GLDataMaster",
    title: config.title || undefined,
    type: "component",
    componentName: GLComponentRegistry.DataMaster,
    componentState: {
      data: state.data
    }
  };
}
