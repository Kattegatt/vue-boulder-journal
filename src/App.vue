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
	<div class="form-container">
		<form action="#" method="post" class="addRouteForm">
			<label for="date">Date:</label>
			<input v-model="inputDate" type="date" id="date" name="date" required /><br /><br />
			<label for="route-name">Name:</label>
			{{}}
			<input
				v-model="inputName"
				type="text"
				id="route-name"
				name="route-name"
				required
			/><br /><br />
			<label for="rating">Rating:</label>
			<select v-model="inputRating" id="rating" name="rating">
				<option v-for="(option, idx) in ratingOptions" :key="idx">
					{{ option.value }}
				</option></select
			><br /><br />
			<label for="comment">Comment:</label><br />
			<textarea
				v-model="inputComment"
				id="comment"
				name="comment"
				rows="4"
				cols="30"
			></textarea
			><br /><br />
			<input v-model="inputIsPassed" type="checkbox" id="passed" name="passed" />
			<label for="passed">Passed?</label><br /><br />
			<button
				@click="addNewRoute"
				:disabled="inputName === null || inputRating === null || inputDate === null"
				type="submit"
				class="submit-button"
			>
				Add
			</button>
		</form>
	</div>
	<div v-if="trainingHistory.length" class="training-list-container">
		<div class="training-list">
			<div v-for="(day, index) in trainingHistory" :key="index" class="training-day">
				<div class="training-day-date">
					<h3>{{ day.date }}</h3>
				</div>
				<div v-for="(route, routeIndex) in day.routes" :key="routeIndex" class="route-item">
					<p>
						<strong>{{ route.name }}</strong>
					</p>
					<p>Rating: {{ route.rating }}</p>
					<div v-if="route.comment" class="route-comment">
						Comment: {{ route.comment }}
					</div>
					<p>Attempts: {{ route.attempts }}</p>
					<p v-if="route.isPassed">Passed</p>
					<button @click.stop="removeRoute(route)" type="button" class="delete-btn">
						Del
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
}

.form-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 50px;
}
.addRouteForm {
	background-color: rgb(217, 217, 217);
	padding: 10px;
	border: 2px solid black;
}
.training-list-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
}
.training-list {
	width: 300px;
	background-color: rgb(217, 217, 217);
	padding: 10px;
	border: 2px solid black;
}

.training-day {
	background-color: #f5f5f5;
	border: 1px solid #ddd;
	border-radius: 5px;
	margin-bottom: 10px;
	padding: 10px;
}

.training-day-date {
	margin-bottom: 0px;
}

.training-day-date h3 {
	margin-left: 15px;
}
.route-item {
	position: relative;
	border-bottom: 1px solid #988989;
	padding-bottom: 10px;
	margin-bottom: 10px;
}
.delete-btn {
	background: none;
	border: none;
	color: red;
	font-size: 18px;
	position: absolute;
	right: 43%;
	bottom: 1%;
	cursor: pointer;
}

.route-comment {
	word-wrap: break-word;
}
nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}
</style>
