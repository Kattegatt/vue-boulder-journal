'use strict';

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
};
