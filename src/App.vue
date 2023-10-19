<script>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useRatingsStore } from './stores/routes-ratings-store';
export default {
	data() {
		return {
			inputName: null,
			inputDate: null,
			inputRating: null,
			inputComment: null,
			inputIsPassed: false,
			trainingDays: [],
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
		addNewRoute(date = new Date(), name, rating, comment = null, isPassed) {
			date = format(date, 'dd-MM-yyyy');
			// const newId = (Math.random() + 1).toString(36).substring(3);
			const route = {
				name: name,
				rating: rating,
				attempts: 1,
				isPassed: isPassed,
				comment: comment,
			};
			console.log(`Route- ${route}`);
			if (!this.trainingDays.length) {
				this.trainingDays.push({ date: date, routes: [route] });
				return;
			}
			let routeAdded = false;
			this.trainingDays.forEach(day => {
				if (day.date === date) {
					// check if date already exists
					const existingRoute = day.routes.find(
						r => r.name === route.name
					);
					existingRoute
						? (existingRoute.attempts += 1)
						: (routeAdded = true);

					// If the route is not added yet, add it to the list
					!routeAdded
						? day.routes.push(route)
						: this.trainingDays.push({
								date: date,
								routes: [route],
						  });
					if (!routeAdded) day.routes.push(route);
				} else this.trainingDays.push({ date: date, routes: [route] });
			});
		},
	},
};
</script>

<template>
	<div class="container">
		<div class="left">
			<form action="#" method="post" class="form">
				<label for="date">Date:</label>
				<input
					v-model="inputDate"
					type="date"
					id="date"
					name="date"
					required
				/><br /><br />
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
				<select id="rating" name="rating">
					<option v-for="option in ratingOptions" value="easy">
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
				<input
					v-model="inputIsPassed"
					type="checkbox"
					id="passed"
					name="passed"
				/>
				<label for="passed">Passed?</label><br /><br />
				<button
					@click="
						addNewRoute(
							inputDate,
							inputName,
							inputRating,
							inputComment,
							inputIsPassed
						)
					"
					type="submit"
					class="submit-button"
				>
					Add
				</button>
			</form>
		</div>
		<div class="right">
			<div class="route">
				<!-- Здесь будут добавленные трассы -->
			</div>
		</div>
	</div>
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
