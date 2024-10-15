import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
	name: 'bus-lines',
	path: '/',
	component: () => import('@/views/BusLines.vue'),
}, {
	name: 'bus-stops',
	path: '/bus-stops',
	component: () => import('@/views/BusStops.vue'),
}]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
