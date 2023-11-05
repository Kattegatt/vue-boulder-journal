<template>
	<div class="flex flex-col items-center justify-center">
		<input-form @form-route="addNewRoute" />
	</div>
	<search-bar />
	<div
		v-if="trainingHistory.length"
		class="grid grid-flow-col items-center justify-center bg-gray-100 p-10"
	>
		<div
			v-for="(day, index) in trainingHistory"
			:key="index"
			class="bg-gray-400 p-2 justify-items-center m-4 shadow-sm rounded-lg"
		>
			<div class="date">
				<h3
					class="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white"
				>
					{{ day.date }}
				</h3>
			</div>
			<div
				v-for="(route, routeIndex) in day.routes"
				:key="routeIndex"
				class="my-3 p-2 bg-slate-50 rounded-lg w-44"
			>
				<p class="font-semibold">
					{{ route.name }}
				</p>
				<p>Rating: {{ route.rating }}</p>
				<p v-if="route.comment" class="">Comment: {{ route.comment }}</p>
				<p>Attempts: {{ route.attempts }}</p>
				<p v-if="route.isPassed">Passed</p>
				<button
					@click="removeRoute(route)"
					type="button"
					class="text-lg font-bold text-red-900 px-2 py-1 rounded-lg hover:bg-slate-400 focus:ring-3"
				>
					Del
				</button>
			</div>
		</div>
	</div>
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
			inputName: null,
			inputDate: new Date().toISOString().slice(0, 10),
			inputRating: null,
			inputComment: null,
			inputIsPassed: false,
			trainingHistory: [],
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

			this.updateTrainingHistory();
		},
		removeRoute(route) {
			this.routes = this.routes.filter(r => {
				r !== route;
			});

			this.updateTrainingHistory();
		},
		updateTrainingHistory() {
			let routes = this.routes;
			let uniqueDates = [...new Set(routes.map(r => r.date))];

			let trainingHistory = uniqueDates.map(date => {
				let filteredRoutes = routes.filter(r => r.date === date);
				return { date: date, routes: filteredRoutes };
			});

			this.trainingHistory = trainingHistory;
		},
	},
	// watch: {
	// 	routes() {},
	// },
};
</script>
