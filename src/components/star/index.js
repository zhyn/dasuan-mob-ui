import dsStar from './src/star';

/* istanbul ignore next */
dsStar.install = function(Vue) {
  Vue.component(dsStar.name, dsStar);
};

export default dsStar;
