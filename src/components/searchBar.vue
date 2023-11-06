<template>
	<form class="m-2 flex items-center w-40">
		<div class="relative w-full">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
			<input
				v-model="searchInput"
				type="date"
				id="simple-search"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-gray-500 block w-full pl-10 p-2.5"
				placeholder="Search"
				@input="emitInput"
			/>
		</div>
		<button
			type="button"
			@click="emptySearch"
			class="items-center justify-center mx-2 px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
		>
			X
		</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			searchInput: '',
		};
	},
	methods: {
		emptySearch() {
			this.searchInput = '';
			this.emitInput();
		},
		emitInput() {
			this.$emit('activeInput', this.searchInput);
		},
	},
};
</script>
