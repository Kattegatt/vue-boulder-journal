import bcrypt from 'bcryptjs';
import axios from 'axios';

async function hashPassword(password) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export default {
	login(loginCreds, testLogin) {
		const { email, password, remember } = loginCreds;

		return new Promise((resolve, reject) => {
			testLogin.forEach(obj => {
				if (obj.email === email && obj.password === password) {
					if (remember) {
						resolve('remember user');
					} else {
						resolve('log user');
					}
				}
				reject('No Such User');
			});
		});
	},

	registration: async function (registrationCreds) {
		const { firstName, lastName, email, password } = registrationCreds;

		const passwordHash = await hashPassword(password);
		console.log(passwordHash);

		return new Promise((resolve, reject) => {
			axios
				.post('http://localhost:8080/api/user', {
					firstName,
					lastName,
					email,
					passwordHash,
				})
				.then(response => {
					console.log('Registration successful', response);
					resolve(response);
				})
				.catch(error => {
					reject(error.response);
				});
		});
	},
};
