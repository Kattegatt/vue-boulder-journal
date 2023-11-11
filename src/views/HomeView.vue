<template>
	<navigationBlock></navigationBlock>

	<div class="flex flex-col items-center justify-center">
		<input-form @form-route="addNewRoute" />
	</div>
	<search-bar @activeInput="updateSearchInput" />
	<div class="flex my-2">
		<button
			@click="prevPage"
			class="flex items-center justify-center mx-2 px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
			:class="{ 'opacity-30': this.currentPage === 1 }"
		>
			Previous
		</button>

		<button
			@click="nextPage"
			class="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
			:class="{ 'opacity-30': isLastPage }"
		>
			Next
		</button>
	</div>
	<training-history
		:training-days-list="paginatedTrainingDaysList"
		@deleteBtnPressed="removeRoute"
	/>
</template>

<script>
import inputForm from '../components/InputForm.vue';
import searchBar from '../components/searchBar.vue';
import trainingHistory from '../components/trainingHistory.vue';
import navigationBlock from '../components/NavigationBlock.vue';

const DAYS_ON_PAGE = 3;

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
		navigationBlock,
	},
	created() {
		const routesData = localStorage.getItem('routesStorage');

		if (routesData) this.routes = JSON.parse(routesData);
	},

	computed: {
		paginatedTrainingDaysList() {
			const start = DAYS_ON_PAGE * (this.currentPage - 1);
			const end = DAYS_ON_PAGE * this.currentPage;
			return this.trainingDaysList
				.filter(day => day.date.includes(this.searchInput))
				.slice(start, end);
		},
		isLastPage() {
			return DAYS_ON_PAGE * this.currentPage >= this.trainingDaysList.length;
		},
	},
	methods: {
		nextPage() {
			if (!this.isLastPage) this.currentPage += 1;
		},
		prevPage() {
			if (this.currentPage > 1) this.currentPage -= 1;
		},
		updateSearchInput(input) {
			this.searchInput = input;
			this.currentPage = 1;
		},

		addNewRoute(route) {
			const existingRoute = this.routes.find(
				r => r.date === route.date && r.name === route.name && r.rating === route.rating
			);

			if (existingRoute) {
				existingRoute.attempts += 1;
				existingRoute.isPassed = route.isPassed;
			} else {
				localStorage.setItem;
				this.routes.push(route);
			}
			this.updateStorage(this.routes);
		},
		removeRoute(route) {
			this.routes = this.routes.filter(r => {
				return r !== route;
			});
			this.updateStorage(this.routes);
		},
		updateStorage(routes) {
			localStorage.setItem('routesStorage', JSON.stringify(routes));
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
				// localStorage.setItem('trainingDaysListStorage', JSON.stringify(trainingDaysList));
			},
			deep: true,
		},
	},
};
</script>