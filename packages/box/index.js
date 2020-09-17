import NnBox from './src/main';

/* istanbul ignore next */
NnBox.install = function(Vue) {
  Vue.component(NnBox.name, NnBox);
};

export default NnBox;
