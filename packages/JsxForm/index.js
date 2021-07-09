import JsxForm from './src/Form';

JsxForm.install = function(Vue, option = {}) {
  const defaultOption = {
    emptyText: '',
    formClass: ''
  };
  Vue.prototype.$jsxForm = {
    ...defaultOption,
    ...option
  };
  Vue.component(JsxForm.name, JsxForm);
};

export default JsxForm;
