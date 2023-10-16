<script>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
let rtId = 0;
export default {
	data() {
		return {
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
	methods: {},
};
</script>

<template>
	<div>
		<form class="addRouteForm">
			<label for="date">Date:</label>
			<input type="date" id="date" name="date" /><br /><br />

			<label for="name">Name:</label>
			<input type="rtId" id="name" name="name" /><br /><br />

			<label for="rating">Rating:</label>
			<select>
				<option v-for="option in ratingOptions" :value="option.value">
					{{ option.value }}
				</option></select
			><br /><br />

			<label for="comment">Comment:</label><br />
			<textarea id="comment" name="comment" rows="4" cols="50"></textarea
			><br /><br />

			<input type="checkbox" id="passed" name="passed" />
			<label for="passed">Passed ?</label><br /><br />

			<button>Submit</button>
		</form>
	</div>
	<!-- <div class="wrapper">
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
		</nav>
	</div> -->
	<!-- <RouterView /> -->
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
