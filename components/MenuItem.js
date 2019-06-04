/**
 * Creates a menu item.
 * @param {Object} state
 * @param {String} state.label
 * @returns instance of menu item element wrapped in jQuery API
 */
export default function(state) {
  return $(`<li>${state.label}</li>`);
}
