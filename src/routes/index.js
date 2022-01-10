import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteHome from '@/routes/home';

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [].concat(
		RouteHome
	),
	scrollBehavior()
	{
		return {
			x: 0,
			y: 0
		};
	}
})

router.beforeResolve((to, from, next) => {
	next();
});

export default router;
