<template>
	<navigationBlock></navigationBlock>
	<div class="flex flex-col items-center justify-center">
		<registrationForm @registration-data="validateRegistration"></registrationForm>
	</div>
</template>

<script>
import navigationBlock from '../components/NavigationBlock.vue';
import registrationForm from '../components/RegistrationForm.vue';

import authService from '../services/authService';

export default {
	data() {
		return {
			// skipLogin: this.checkLogged,
		};
	},
	components: {
		navigationBlock,
		registrationForm,
	},

	methods: {
		// checkLogged() {
		// 	return localStorage.getItem('bjKnownUser');
		// },
		validateRegistration(registrationCreds) {
			authService
				.registration(registrationCreds)
				.then(responseData => {
					console.log({ successfulRegistration: responseData });
				})
				.catch(error => {
					console.log({ error: error });
				});
		},
		// validateLogin(loginCreds) {
		// 	console.dir(`test data - ${loginCreds.email}`);
		// 	authService
		// 		.login(loginCreds, testData)
		// 		.then(response => {
		// 			if (response === 'remember user') {
		// 				console.log('successful login with remembering');
		// 				localStorage.setItem('bjKnownUser', true);
		// 				localStorage.setItem('loggedUser', true);
		// 				this.$router.push({ name: 'home' });
		// 			} else {
		// 				console.log('successful login');
		// 				localStorage.setItem('loggedUser', true);
		// 				this.$router.push({ name: 'home' });
		// 			}
		// 		})
		// 		.catch(reject => {
		// 			alert(reject);
		// 		});
		// },
	},
};
</script>
