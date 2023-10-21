<script>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
// import { useRatingsStore } from './stores/routes-ratings-store';
export default {
	data() {
		return {
			inputName: null,
			inputDate: null,
			inputRating: null,
			inputComment: null,
			inputIsPassed: false,
			trainingDays: [],
			routes: [],
			ratingOptions: [
				{ value: '4a' },
				{ value: '4a+' },
				{ value: '4b' },
				{ value: '4b+' },
				{ value: '4c' },
				{ value: '4c+' },
				{ value: '5a' },
				{ value: '5a+' },
				{ value: '5b' },
				{ value: '5b+' },
				{ value: '5c' },
				{ value: '5c+' },
				{ value: '6a' },
				{ value: '6a+' },
				{ value: '6b' },
				{ value: '6b+' },
				{ value: '6c' },
				{ value: '6c+' },
				{ value: '7a' },
				{ value: '7a+' },
				{ value: '7b' },
				{ value: '7b+' },
				{ value: '7c' },
				{ value: '7c+' },
				{ value: '8a' },
				{ value: '8a+' },
				{ value: '8b' },
				{ value: '8b+' },
				{ value: '8c' },
				{ value: '8c+' },
				{ value: '9a' },
				{ value: '9a+' },
				{ value: '9b' },
				{ value: '9b+' },
				{ value: '9c' },
				{ value: '9c+' },
			],
		};
	},
	methods: {
		addNewRoute() {
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
						console.log('day', day);
						const existingRoute = day.routes.find(
							r => r.name === route.name && r.rating === route.rating
						);
						if (existingRoute) {
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
			this.inputIsPassed = false;
			this.inputRating = null;
			this.inputComment = null;
			this.inputIsPassed = false;

			// console.log(this.trainingDays);
		},
	},
	addNewRoute2() {
		const formattedDate = formatDate(this.inputDate);
		const route = {
			name: this.inputName,
			rating: this.inputRating, // assuming inputRating is the correct variable
			attempts: 1,
			isPassed: this.inputIsPassed,
			comment: this.inputComment,
		};

		if (this.trainingDays.length === 0) {
			this.trainingDays.push({
				date: formattedDate,
				routes: [route],
			});
		} else {
			let dayFound = false;
			this.trainingDays.forEach(day => {
				if (day.date === formattedDate) {
					const existingRoute = day.routes.find(
						r => r.name === route.name && r.rating === route.rating
					);
					if (existingRoute) {
						existingRoute.attempts += 1;
						if (route.isPassed) {
							existingRoute.isPassed = true;
						}
					} else {
						day.routes.push(route);
					}
					dayFound = true;
				}
			});

			// If the day is not found, add it to the list
			if (!dayFound) {
				this.trainingDays.push({
					date: formattedDate,
					routes: [route],
				});
			}
		}
	},
};
</script>

<template>
	<div class="container">
		<form action="#" method="post" class="form">
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
				<option v-for="(option, idx) in ratingOptions" :key="idx" :value="option.value">
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
			<button @click="addNewRoute" type="submit" class="submit-button">Add</button>
		</form>
	</div>
	<!-- <template>
		<div class="container">
			<div class="training-list">
				<div
					v-for="(day, index) in trainingDays"
					:key="index"
					class="training-day"
				>
					<h3>{{ day.date }}</h3>
					<ul>
						<li
							v-for="(route, routeIndex) in day.routes"
							:key="routeIndex"
							class="route-item"
						>
							<p>
								Тренировка {{ routeIndex + 1 }}:
								{{ route.name }}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</template> -->
</template>

<style scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

.addRouteForm {
	background-color: rgb(180, 180, 180);
	padding: 10px;
	border: 2px;
}
nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-rtId);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
}
</style>
