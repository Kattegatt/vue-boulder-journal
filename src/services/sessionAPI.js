import axios from 'axios';

export default {
	createTrainingSession: async function (userId) {
		const startTimestamp = new Date();
		try {
			const postResponse = await axios.post('http://localhost:8080/api/session', {
				userId,
				startTimestamp,
			});

			return postResponse;
		} catch (error) {
			console.error('Error closing session:', error);
			throw error;
		}
	},
	closeTrainingSession: async function (sessionId) {
		const endTimestamp = new Date();

		try {
			const postResponse = await axios.put('http://localhost:8080/api/session', {
				sessionId,
				endTimestamp,
			});

			return postResponse;
		} catch (error) {
			console.error('Error closing session:', error);
			throw error;
		}
	},
};
