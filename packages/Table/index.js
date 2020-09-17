/**
 * Created by jing on 2018-03-26
 * File description:
 * History:
 */
import components from './src/main';

/* istanbul ignore next */
components.install = function(Vue) {
  Vue.component(components.name, components);
};

export default components;
