export class GLDataDetailComponent {
  constructor(container, state) {
    this.container = container;
    this.state = state;

    this.render(state, container.getElement());
  }

  render(state, target) {
    target.empty();

    if (!state.detail || !Array.isArray(state.detail.formFields)) {
      return target.html($("<div>No details available.</div>"));
    }

    const formEl = $("<form></form>");
    const submitButtonEl = $('<input type="submit" value="Save" />');

    const formGroupEls = state.detail.formFields.map(formField => {
      const formGroupEl = $("<div></div>");
      formGroupEl.css("margin", "1rem");
      const labelEl = $(
        `<label style="margin-right:1rem">${formField.label}</label>`
      );
      const dataEl = $("<input />");

      dataEl.attr("name", formField.name);

      if (formField.type === "string") {
        dataEl.attr("type", "text");
      } else if (formField.type === "number") {
        dataEl.attr("type", "number");
      } else if (formField.type === "boolean") {
        dataEl.attr("type", "checkbox");
      }

      dataEl.val(formField.value);

      dataEl.on("change", () => {
        formField.value = dataEl.val();
        container.extendState(state);
      });

      formGroupEl.append(labelEl);
      formGroupEl.append(dataEl);

      return formGroupEl;
    });

    formGroupEls.forEach(el => {
      formEl.append(el);
      formEl.append(submitButtonEl);
    });

    submitButtonEl.css("margin", "1rem");
    submitButtonEl.on("click", () => {
      event.preventDefault();
      // submit
    });

    // goldenLayout.on('stateChanged', () => {
    //     const state = container.getState();

    //     formGroupEls.forEach(el => {
    //         const field = state.detail.formFields.find(field => field.name === el.attr('name'));
    //         el.val(field.value);
    //     });
    // });

    // goldenLayout.eventHub.on('DataMaster.loadData', () => {
    //     container.getElement().html($('h1'));
    // });

    target.html(formEl);
  }
}
