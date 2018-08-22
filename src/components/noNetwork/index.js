import noNetwork from './src/noNetwork.vue';

/* istanbul ignore next */
noNetwork.install = function(Vue) {
  Vue.component(noNetwork.name, noNetwork);
};

export default noNetwork;
