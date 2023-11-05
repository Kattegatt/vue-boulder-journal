<template>
	<div class="flex flex-col items-center justify-center">
		<input-form @form-route="addNewRoute" />
	</div>
	<search-bar @activeInput="updateSearchInput" />
	<div class="flex">
		<button
			class="flex items-center justify-center mx-2 px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
		>
			Previous
		</button>

		<button
			class="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
		>
			Next
		</button>
	</div>
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
			currentPage: 1,
			searchInput: '',
			trainingDaysList: [],
			routes: [],
		};
	},
	components: {
		inputForm,
		searchBar,
		trainingHistory,
	},
	computed: {
		paginatedTrainingDaysList() {},
		calculatedPage() {},
		lastPage() {},
	},
	methods: {
		updateSearchInput(input) {
			this.searchInput = input;
		},
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
		},
		removeRoute(route) {
			this.routes = this.routes.filter(r => {
				return r !== route;
			});
		},
	},
	watch: {
		routes: {
			handler() {
				let routes = this.routes;
				let uniqueDates = [...new Set(routes.map(r => r.date))];
				let trainingDaysList = uniqueDates.map(date => {
					let filteredRoutes = routes.filter(r => r.date === date);
					return { date: date, routes: filteredRoutes };
				});
				trainingDaysList.sort((a, b) => {
					let aDate = new Date(a.date);
					let bDate = new Date(b.date);
					return aDate - bDate;
				});
				this.trainingDaysList = trainingDaysList;
			},
			deep: true,
		},
	},
};
</script>
