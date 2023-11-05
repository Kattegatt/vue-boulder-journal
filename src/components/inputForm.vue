<template>
	<form action="#" method="post" class="bg-slate-200 px-8 py-5 m-5 shadow-sm rounded-lg">
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
			<label for="rating" class="block mb-2 text-sm font-medium text-gray-900">Rating:</label>
			<select
				value="4a"
				v-model="inputRating"
				id="rating"
				name="rating"
				required
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
				@click="formRoute"
				:disabled="this.isAddBtnDisabled"
				type="submit"
				class="text-white bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
				:class="{
					// 'bg-gray-400': disabled
					'opacity-10': this.isAddBtnDisabled,
				}"
			>
				Add
			</button>
		</div>
	</form>
</template>
<script>
import { useRatingsStore } from '/src/stores/routes-ratings-store';

export default {
	setup() {
		const ratingsStore = useRatingsStore();
		const ratingOptions = ratingsStore.ratingOptions;

		return {
			ratingOptions,
		};
	},
	props: {},
	data() {
		return {
			inputName: null,
			inputDate: new Date().toISOString().slice(0, 10),
			inputRating: null,
			inputComment: null,
			inputIsPassed: false,
		};
	},
	methods: {
		formRoute() {
			const route = {
				date: this.inputDate,
				name: this.inputName,
				rating: this.inputRating,
				attempts: 1,
				isPassed: this.inputIsPassed,
				comment: this.inputComment,
			};

			this.$emit('form-route', route);

			this.resetFormFields();
		},
		resetFormFields() {
			this.inputName = null;
			this.inputDate = new Date().toISOString().slice(0, 10);
			this.inputRating = null;
			this.inputComment = null;
			this.inputIsPassed = false;
		},
	},
	computed: {
		isAddBtnDisabled() {
			return !this.inputName || !this.inputDate || !this.inputRating;
		},
	},
};
</script>
