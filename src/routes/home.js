export default [
	/**
	 * @brief 대시보드
	 */
	{
		name: 'home',
		path: '/',
		meta: { auth: true, layout: 'default' },
		component: () => import (/* webpackChunkName: "home" */ '@/views/Home.vue')
	},
	/**
	 * @brief 이현
	 */
	{
		name: 'daughter',
		path: '/daughter',
		meta: { auth: true, layout: 'default' },
		component: () => import (/* webpackChunkName: "home" */ '@/views/Daughter.vue')
	},
	/**
	 * @brief 게임
	 */
	{
		name: 'joy',
		path: '/joy',
		meta: { auth: true, layout: 'default' },
		component: () => import (/* webpackChunkName: "home" */ '@/views/Joy.vue')
	}
];
