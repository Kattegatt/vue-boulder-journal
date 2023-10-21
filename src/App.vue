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
			trainingDays: [],
			routes: [],
		};
	},
	methods: {
		addNewTrainingDay() {
			// date = format(date, 'dd-MM-yyyy');
			// const newId = (Math.random() + 1).toString(36).substring(3);
			const route = {
				name: this.inputName,
				rating: this.inputRating,
				attempts: 1,
				isPassed: this.inputIsPassed,
				comment: this.inputComment,
			};
			console.log('route', route);

			let routeAdded = false;

			if (!this.trainingDays.length) {
				this.trainingDays.push({
					date: this.inputDate,
					routes: [route],
				});
				routeAdded = true;
			}
			if (!routeAdded) {
				this.trainingDays.forEach(day => {
					// check if route already exists in this day
					if (day.date === this.inputDate) {
						console.log('same day', day);
						const existingRoute = day.routes.find(
							r => r.name === route.name && r.rating === route.rating
						);
						if (existingRoute) {
							routeAdded = true;
							console.log('existingRoute', existingRoute);
							existingRoute.attempts += 1;
							if (route.isPassed) existingRoute.isPassed = true;
						} else {
							day.routes.push(route); // adding route to existing day
							routeAdded = true;
						}
					}
				});
				// creating new day and pushing route
				if (!routeAdded) {
					this.trainingDays.push({
						date: this.inputDate,
						routes: [route],
					});
				}
			}

			this.inputName = null;
			this.inputDate = null;
			this.inputRating = null;
			this.inputComment = null;
			this.inputIsPassed = false;
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
				@click="addNewTrainingDay"
				:disabled="inputName === null || inputRating === null || inputDate === null"
				type="submit"
				class="submit-button"
			>
				Add
			</button>
		</form>
	</div>
	<div v-if="trainingDays.length" class="training-list-container">
		<div class="training-list">
			<div v-for="(day, index) in trainingDays" :key="index" class="training-day">
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
	border-bottom: 1px solid #ddd;
	padding-bottom: 10px;
	margin-bottom: 10px;
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
