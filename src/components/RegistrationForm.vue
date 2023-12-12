<template>
	<form class="bg-slate-300 px-8 py-5 m-5 shadow-sm rounded-lg">
		<div class="py-2">Registration</div>
		<div class="mb-6">
			<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
				>Your email</label
			>
			<input
				v-model="email"
				type="email"
				id="email"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="name@gmail.com"
				required
			/>
		</div>
		<div class="mb-6">
			<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
				>Your password</label
			>
			<input
				v-model="password"
				type="password"
				id="password"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				required
			/>
		</div>
		<div class="flex items-start mb-6">
			<div class="flex items-center h-5">
				<input
					v-model="remember"
					id="remember"
					type="checkbox"
					value=""
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
				/>
			</div>
			<label for="remember" class="ml-2 text-sm font-medium text-gray-900">Remember me</label>
		</div>
		<button
			@click="emitLogin"
			:disabled="this.isSubmitBtnDisabled"
			type="submit"
			class="text-white bg-blue-700 disabled:opacity-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
		>
			Submit
		</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			remember: false,
		};
	},
	methods: {
		emitLogin(event) {
			event.preventDefault();

			const loginCreds = {
				email: this.email,
				password: this.password,
				remember: this.remember,
			};

			this.$emit('login-data', loginCreds);

			this.resetFields();
		},
		resetFields() {
			this.email = '';
			this.password = '';
			this.remember = false;
		},
	},
	computed: {
		isSubmitBtnDisabled() {
			return !this.email || !this.password;
		},
	},
};
</script>
