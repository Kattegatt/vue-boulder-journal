<script>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRatingsStore } from './stores/routes-ratings-store';

export default {
	setup() {
		const ratingsStore = useRatingsStore();
		const ratingOptions = ratingsStore.ratingOptions;

		return {
			ratingOptions,
		};
	},

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
	computed: {
		isDisabled() {
			console.log(!this.inputName || !this.inputDate || !this.inputRating);
			return !this.inputName || !this.inputDate || !this.inputRating;
		},
	},
	methods: {
		resetFormFields() {
			this.inputName = null;
			(this.inputDate = new Date().toISOString().slice(0, 10)), (this.inputRating = null);
			this.inputComment = null;
			this.inputIsPassed = false;
		},
		addNewRoute() {
			const route = {
				date: this.inputDate,
				name: this.inputName,
				rating: this.inputRating,
				attempts: 1,
				isPassed: this.inputIsPassed,
				comment: this.inputComment,
			};

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

			this.resetFormFields();
			this.updateTrainingHistory();
		},

		removeRoute(route) {
			this.trainingHistory.forEach(d => {
				d.routes = d.routes.filter(r => {
					return r !== route;
				});
			});
			this.trainingHistory = this.trainingHistory.filter(d => {
				return d.routes.length;
			});
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

<template>
	<div class="flex justify-center bg-green-400 mb-5">
		<form
			action="#"
			method="post"
			class="absolute bg-slate-200 px-8 py-5 m-5 shadow-sm rounded-lg"
		>
			<div class="mb-3">
				<label for="date" class="block mb-2 text-sm font-medium text-gray-900">Date:</label>
				<input
					v-model="inputDate"
					type="date"
					id="date"
					name="date"
					required
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				/>
			</div>
			<div class="mb-3">
				<label for="route-name" class="block mb-2 text-sm font-medium text-gray-900"
					>Route Name:</label
				>
				{{}}
				<input
					v-model="inputName"
					type="text"
					id="route-name"
					name="route-name"
					placeholder="Finger Crasher"
					required
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				/>
			</div>
			<div class="mb-3">
				<label for="rating" class="block mb-2 text-sm font-medium text-gray-900"
					>Rating:</label
				>
				<select
					v-model="inputRating"
					id="rating"
					name="rating"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option v-for="(option, idx) in ratingOptions" :key="idx">
						{{ option.value }}
					</option>
				</select>
			</div>
			<div class="mb-5">
				<label for="comment" class="block mb-2 text-sm font-medium text-gray-900"
					>Comment:</label
				>
				<textarea
					v-model="inputComment"
					id="comment"
					name="comment"
					rows="3"
					cols="40"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				></textarea>
			</div>
			<div class="mb-1">
				<input
					v-model="inputIsPassed"
					type="checkbox"
					id="passed"
					name="passed"
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
				/>
				<label for="passed" class="ml-2 text-sm font-medium text-gray-900">Passed?</label
				><br /><br />
			</div>
			<div class="mb-1">
				<button
					@click="addNewRoute"
					:disabled="this.isDisabled"
					type="submit"
					class="disabled:bg-gray-400 text-white bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
				>
					Add
				</button>
			</div>
		</form>
	</div>
	<div v-if="trainingHistory.length" class="flex bg-black relative justify-center p-10">
		<div
			v-for="(day, index) in trainingHistory"
			:key="index"
			class="flex bg-gray-700 p-5 justify-items-center"
		>
			<div class="date">
				<h3>{{ day.date }}</h3>
			</div>
			<div v-for="(route, routeIndex) in day.routes" :key="routeIndex" class="">
				<p>
					<strong>{{ route.name }}</strong>
				</p>
				<p>Rating: {{ route.rating }}</p>
				<div v-if="route.comment" class="">Comment: {{ route.comment }}</div>
				<p>Attempts: {{ route.attempts }}</p>
				<p v-if="route.isPassed">Passed</p>
				<button @click.stop="removeRoute(route)" type="button" class="">Del</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
