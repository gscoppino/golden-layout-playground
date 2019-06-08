import GLDataMasterPane from "./DataMaster.js";
import GLDataDetailPane from "./DataDetail.js";

export default function(state) {
  return {
    type: "row",
    content: [
      GLDataMasterPane({
        data: state.data
      }),
      GLDataDetailPane({
        detail: state.data.nodes[0]
      })
    ]
  };
}
