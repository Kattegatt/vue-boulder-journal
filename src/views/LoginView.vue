<template>
	<navigationBlock
		@register-user="validateRegistration"
		:skip-login="skipLogin"
	></navigationBlock>
	<div class="flex flex-col items-center justify-center">
		<loginForm @login-data="validateLogin"></loginForm>
	</div>
</template>

<script>
import navigationBlock from '../components/NavigationBlock.vue';
import loginForm from '../components/LoginForm.vue';
import authService from '../services/authService';

export default {
	data() {
		return {
			// skipLogin: this.checkLogged(),
		};
	},
	components: {
		navigationBlock,
		loginForm,
	},

	methods: {
		checkLogged() {
			return localStorage.getItem('bjKnownUser');
		},
		validateLogin(loginCreds) {
			console.dir(`test data - ${loginCreds.email}`);

			authService
				.login(loginCreds, testData)
				.then(response => {
					if (response === 'remember user') {
						console.log('successful login with remembering');
						localStorage.setItem('bjKnownUser', true);
						localStorage.setItem('loggedUser', true);
						this.$router.push({ name: 'home' });
					} else {
						console.log('successful login');
						localStorage.setItem('loggedUser', true);
						this.$router.push({ name: 'home' });
					}
				})
				.catch(reject => {
					alert(reject);
				});
		},
		validateRegistration(registrationCreds) {
			authService
				.registration(registrationCreds)
				.then(responseData => {
					console.log({ successfulResponse: responseData });
				})
				.catch(error => {
					console.log({ error: error });
				});
		},
	},
	watch: {},
};
const testData = [
	{
		email: 'asd@asd',
		password: '123',
	},
	{
		email: '1@2',
		password: '5432',
	},
];
</script>
