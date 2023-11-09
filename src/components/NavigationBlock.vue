<template>
	<div class="my-4 flex text-fuchsia-50">
		<a
			v-if="this.skipLogin"
			href="/"
			class="text-white p-2 mx-2 bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center"
			>Login</a
		>
		<a
			href="/home"
			class="text-white p-2 mx-2 bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center"
			>Home</a
		>
	</div>
</template>

<script>
export default {
	data() {
		return {
			skipLogin: false,
		};
	},
	mounted() {
		const isLogged = localStorage.getItem('bjKnownUser');
		console.log('isLogged', isLogged);

		if (isLogged) {
			this.skipLogin = true;
		}
	},
};
</script>
