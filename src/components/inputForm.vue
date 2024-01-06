<template>
	<form class="space-y-2 px-8 py-4 m-5 shadow-sm rounded-lg bg-base-300">
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-primary-content">Route Name:</span>
			</div>
			<input
				v-model="inputName"
				type="text"
				id="route-name"
				name="route-name"
				placeholder="Silence"
				required
				class="input input-bordered bg-base-100 w-full max-w-xs"
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Rating*</span>
			</div>
			<select
				class="select select-bordered"
				v-model="inputRating"
				id="rating"
				name="rating"
				required
			>
				<option v-for="(option, idx) in ratingOptions" :key="idx">
					{{ option.value }}
				</option>
			</select>
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Comment:</span>
			</div>
			<textarea
				class="textarea textarea-bordered h-24"
				placeholder="How fun it was?"
				v-model="inputComment"
				id="comment"
				name="comment"
			></textarea>
		</label>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Flash ?</span>
				<input type="checkbox" :checked="false" class="checkbox" />
			</label>
		</div>
		<div class="py-1">
			<button
				class="btn btn-block"
				@click="emitFormRoute"
				:disabled="this.isAddBtnDisabled"
				type="submit"
			>
				Add
			</button>
		</div>
	</form>
</template>
<script>
import { format } from 'date-fns';
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
			inputDate: new Date().toISOString().split('T')[0],
			inputRating: null,
			inputComment: null,
			inputIsPassed: false,
		};
	},

	methods: {
		emitFormRoute(event) {
			event.preventDefault();

			const route = {
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
		today() {
			return format(new Date(), 'yyyy-MM-dd');
		},
	},
};
</script>
