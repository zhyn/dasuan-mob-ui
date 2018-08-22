const demo = resolve => require(['src/views/demo/demo.vue'], resolve) 

export default [
    {
      path: '/',
      component: demo
    }
]