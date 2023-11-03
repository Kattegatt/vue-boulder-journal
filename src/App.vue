<template>
	<div class="flex flex-col items-center justify-center">
		<input-form @add-route="addNewRoute" />
	</div>
	<form class="flex items-center w-96">
		<label for="simple-search" class="sr-only">Search</label>
		<div class="relative w-full">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
			<input
				type="text"
				id="simple-search"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-gray-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search branch name..."
				required
			/>
		</div>
		<button
			type="submit"
			class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			<span class="sr-only bg-black">Search</span>
		</button>
	</form>
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
	},
	computed: {},
	methods: {
		addNewRoute(route) {
			const existingRoute = this.routes.find(
				r => r.date === route.date && r.name === route.name && r.rating === route.rating
			);
			console.log(`Exist route - ${existingRoute}`);

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
};
</script>
