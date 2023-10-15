import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const firstStore = defineStore('firstStore', () => {
	return {
		name: 'TestPinia',
	};
});
