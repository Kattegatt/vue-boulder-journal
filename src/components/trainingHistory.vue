<template>
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
export default {
	props: {},
	data() {},
	methods: {},
};
</script>
