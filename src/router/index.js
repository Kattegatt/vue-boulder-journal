import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/home',
			name: 'home',
			component: HomeView,
		},
	],
});

router.beforeEach((to, from, next) => {
	const isLogged = localStorage.getItem('bjKnownUser');

	if (to.path !== '/' && !isLogged) {
		next('/');
	} else if (to.path === '/' && isLogged) {
		next('/home');
	} else {
		next();
	}
});

export default router;
