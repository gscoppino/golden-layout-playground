import GLDataMasterPane from "./DataMaster.js";
import GLDataViewPane from "./DataView.js";

export default function(state) {
  return {
    type: "row",
    content: [
      GLDataMasterPane({
        data: state.data
      }),
      GLDataViewPane({
        detail: state.data[0]
      })
    ]
  };
}
