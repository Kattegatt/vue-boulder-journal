<template>
	<form class="px-8 py-5 m-5 shadow-sm rounded-lg bg-base-300">
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-primary-content">Nickname</span>
			</div>
			<input
				v-model="nickname"
				type="text"
				id="nickname"
				placeholder="Adam O"
				class="input input-bordered bg-base-100 w-full max-w-xs"
				required
			/>
			<div class="label"></div>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-primary-content">Email</span>
			</div>
			<input
				v-model="email"
				id="email"
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
				id="password"
				type="password"
				placeholder="Password"
				class="input input-bordered bg-base-100 w-full max-w-xs"
				required
			/>
			<div class="label"></div>
		</label>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Remember me</span>
				<input type="checkbox" :checked="false" class="checkbox" />
			</label>
		</div>
		<button
			class="btn btn-block"
			@click="emitRegistration"
			:disabled="this.isSubmitBtnDisabled"
			type="submit"
		>
			Register
		</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			nickname: '',
			remember: false,
		};
	},
	methods: {
		emitRegistration(event) {
			event.preventDefault();

			const registrationCreds = {
				nickname: this.nickname,
				email: this.email,
				password: this.password,
				remember: this.remember,
			};

			this.$emit('registration-data', registrationCreds);

			this.resetFields();
		},
		resetFields() {
			this.nickname = '';
			this.email = '';
			this.password = '';
			this.remember = false;
		},
	},
	computed: {
		isSubmitBtnDisabled() {
			return !this.email || !this.password || !this.nickname;
		},
	},
};
</script>
