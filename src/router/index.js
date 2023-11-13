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
		// {
		// 	path: '/register',
		// 	name: 'register',
		// 	component: RegisterView,
		// },
		{
			path: '/home',
			name: 'home',
			component: HomeView,
		},
	],
});

// router.beforeEach((to, from, next) => {
// 	const isRemembered = localStorage.getItem('bjKnownUser');
// 	const isLogged = localStorage.getItem('loggedUser');

// 	if (to.path !== '/' && !isRemembered && !isLogged) {
// 		next('/');
// 	} else if (to.path === '/' && isRemembered && isLogged) {
// 		next('/home');
// 	} else {
// 		next();
// 	}
// });

export default router;
