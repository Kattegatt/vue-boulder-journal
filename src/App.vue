<template>
	<div class="flex flex-col items-center justify-center">
		<input-form @form-route="addNewRoute" />
	</div>
	<search-bar />
	<training-history :training-days-list="trainingDaysList" @deleteBtnPressed="removeRoute" />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import inputForm from './components/inputForm.vue';
import searchBar from './components/searchBar.vue';
import trainingHistory from './components/trainingHistory.vue';

export default {
	data() {
		return {
			trainingDaysList: [],
			routes: [],
		};
	},
	components: {
		inputForm,
		searchBar,
		trainingHistory,
	},
	computed: {},
	methods: {
		addNewRoute(route) {
			const existingRoute = this.routes.find(
				r => r.date === route.date && r.name === route.name && r.rating === route.rating
			);

			if (existingRoute) {
				existingRoute.attempts += 1;
				existingRoute.isPassed = route.isPassed;
			} else {
				this.routes.push(route);
			}

			this.updateTrainingDaysList();
		},
		removeRoute(route) {
			this.routes = this.routes.filter(r => {
				r !== route;
			});

			this.updateTrainingDaysList();
		},
		updateTrainingDaysList() {
			let routes = this.routes;
			let uniqueDates = [...new Set(routes.map(r => r.date))];

			let trainingDaysList = uniqueDates.map(date => {
				let filteredRoutes = routes.filter(r => r.date === date);
				return { date: date, routes: filteredRoutes };
			});

			this.trainingDaysList = trainingDaysList;
		},
	},
	// watch: {
	// 	routes() {},
	// },
};
</script>
