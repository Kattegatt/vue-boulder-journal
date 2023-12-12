<template>
	<div class="flex justify-between items-center my-4 text-fuchsia-50">
		<div class="flex ml-5">
			<a
				href="/"
				class="text-white p-2 mx-2 bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center"
				>Login</a
			>
			<a
				@click="emitRegistration"
				href="/register"
				class="text-white p-2 mx-2 bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center"
				>Register</a
			>
			<a
				v-if="!skipLogin"
				href="/home"
				class="text-white p-2 mx-2 bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center"
				>Home</a
			>
		</div>
		<!-- <div class="flex mr-5">
			<a
				@click="logUserOff"
				v-if="!skipLogin"
				href="/"
				class="text-white p-2 mx-2 bg-gray-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center"
				>Log Off</a
			>
		</div> -->
	</div>
</template>

<script>
export default {
	props: {
		skipLogin: Boolean,
	},
	methods: {
		logUserOff() {
			localStorage.setItem('loggedUser', false);
		},
		emitRegistration() {
			const registrationCreds = {
				firstName: 'neame',
				lastName: 'lasnm',
				email: 'sas@cmon',
				password: '123',
			};

			this.$emit('register-user', registrationCreds);
		},
	},
};
</script>
