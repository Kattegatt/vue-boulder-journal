import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useRatingsStore = defineStore('ratingsOptions', () => {
	const options = [
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
	];
	ref(options);

	return options;
});

export default useRatingsStore;