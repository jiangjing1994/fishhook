/**
 * Created by jiang on 2019/9/9
 * File description:
 * History:
 */
import components from './src/main'

components.install = function(Vue) {
    Vue.component(components.name, components);
};

export default components;
