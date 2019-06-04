import GLDataDetailPane from "./DataDetail.js";
import GLDataRenderPane from "./DataRender.js";

export default function(state) {
  return {
    id: `GLDataViewFor${state.detail.id}`,
    type: "column",
    content: [GLDataDetailPane(state), GLDataRenderPane(state)]
  };
}
