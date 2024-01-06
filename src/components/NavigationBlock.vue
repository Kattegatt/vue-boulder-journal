<template>
	<div class="flex flex-row justify-between my-4">
		<div class="flex flex-row ml-5 space-x-3">
			<a href="/" class="btn btn-neutral text-white rounded-lg font-medium">Login</a>
			<a
				@click="emitRegistration"
				href="/register"
				class="btn btn-neutral text-white rounded-lg font-medium"
				>Register</a
			>
			<a
				v-if="!skipLogin"
				href="/home"
				class="btn btn-neutral text-white rounded-lg font-medium"
				>Home</a
			>
		</div>
		<div class="flex mr-5">
			<a
				@click="logUserOff"
				v-if="!skipLogin"
				href="/"
				class="btn btn-neutral text-white rounded-lg font-medium"
				>Log Off</a
			>
		</div>
	</div>
	<div class="divider"></div>
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
