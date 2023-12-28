<template>
	<form class="px-8 py-4 m-5 shadow-sm rounded-lg bg-base-300">
		<div>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text text-primary-content">Email</span>
				</div>
				<input
					v-model="email"
					type="email"
					placeholder="email@.com"
					class="input input-bordered bg-base-100 w-full max-w-xs"
					required
				/>
				<div class="label"></div>
			</label>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text text-primary-content">Password</span>
				</div>
				<input
					v-model="password"
					type="text"
					placeholder="Type here"
					class="input input-bordered bg-base-100 w-full max-w-xs"
					required
				/>
				<div class="label"></div>
			</label>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Remember me</span>
				<input type="checkbox" checked="checked" class="checkbox" />
			</label>
		</div>
		<div class="py-1">
			<button
				class="btn btn-block"
				:disabled="this.isSubmitBtnDisabled"
				@click="emitLogin"
				type="submit"
			>
				Login
			</button>
		</div>
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
