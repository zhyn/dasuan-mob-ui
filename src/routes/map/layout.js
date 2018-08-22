const layout = resolve => require(['src/views/layout/index.vue'], resolve)

export default [
	{
	    path: '/layout',
	    component: layout,
	    meta: {
	        title: 'layout'
	    },
	    name: 'layout',
		children: [
		
		]
	}
]