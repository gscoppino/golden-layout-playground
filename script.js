import Menu from "./Components/Menu.js";
import MenuItem from "./Components/MenuItem.js";
import GLDataMasterPane from "./GLPanes/DataMaster.js";
import GLComponentRegistry from "./GLComponents/registry.js";
import { GLDataMasterComponent } from "./GLComponents/DataMaster.js";
import { GLDataDetailComponent } from "./GLComponents/DataDetail.js";
import { GLDataRenderComponent } from "./GLComponents/DataRender.js";
import goldenLayoutInstance from "./GLInstance.js";
import DataService from "./DataService.js";

// Create main menu
const menuContainer = $("#menu-container");
const masterViewMenuItem = MenuItem({
  label: "Add Master View"
});
const menu = Menu({
  children: [masterViewMenuItem]
});

// Register golden layout components
goldenLayoutInstance.registerComponent(
  GLComponentRegistry.DataMaster,
  GLDataMasterComponent
);
goldenLayoutInstance.registerComponent(
  GLComponentRegistry.DataDetail,
  GLDataDetailComponent
);
goldenLayoutInstance.registerComponent(
  GLComponentRegistry.DataRender,
  GLDataRenderComponent
);

// Retrieve data
DataService.loadData().then(data => {
  // Insert menu into the DOM
  menuContainer.html(menu);

  // Register drag sources
  goldenLayoutInstance.createDragSource(
    masterViewMenuItem,
    GLDataMasterPane({ data }, { title: "Master" })
  );

  // Initialize golden layout
  goldenLayoutInstance.init();
});
