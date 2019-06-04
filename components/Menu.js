/**
 * Creates a menu.
 * @param {Object} state
 * @param {MenuItem[]} state.children
 * @returns instance of menu element wrapped in jQuery API
 */
export default function(state) {
  const menu = $("<ul></ul>");
  state.children.forEach(child => menu.append(child));
  return menu;
}
