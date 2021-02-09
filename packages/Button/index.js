import components from "./src/main";

/* istanbul ignore next */
components.install = function(Vue) {
  Vue.component(components.name, components);
};

export default components;

