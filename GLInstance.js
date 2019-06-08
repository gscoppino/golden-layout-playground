import GLRootPane from "./GLPanes/Root.js";
import GLDataDetailPane from "./GLPanes/DataDetail.js";
import GLEventRegistry from "./GLEvents/registry.js";
import DataService from "./DataService.js";

const goldenLayoutContainer = $("#golden-layout-container");

// Hydrate golden layout with previous state, if available (currently disabled)
// Otherwise, retrieves data and sets it post-initialization

const goldenLayoutState = null; // = localStorage.getItem('goldenLayoutState');

const goldenLayout = new GoldenLayout(
  goldenLayoutState !== null ? JSON.parse(goldenLayoutState) : { content: [] },
  goldenLayoutContainer
);

if (goldenLayoutState === null) {
  DataService.loadData().then(data => {
    goldenLayout.config.content.push(
      GLRootPane({
        data: data
      })
    );
  });
}

goldenLayout.on("stateChanged", () => {
  // Save state to local storage (currently disabled)
  // localStorage.setItem(
  //   "goldenLayoutState",
  //   JSON.stringify(goldenLayout.toConfig())
  // );
});

goldenLayout.eventHub.on(GLEventRegistry.DataMaster.LoadData, data => {
  goldenLayout.root.contentItems[0].addChild(
    GLDataDetailPane({
      detail: data
    })
  );
});

$(window).on('resize', () => {
  goldenLayout.updateSize($(window).width(), $(window).height());
});

export default goldenLayout;
