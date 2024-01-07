const db = require('../db');

class SessionController {
	async createSession(req, res) {
		const { userId, startTimestamp } = req.body;
		const newSession = await db.query(
			`INSERT INTO public.training_session (start_timestamp, user_id) values ($1, $2) RETURNING *`,
			[startTimestamp, userId]
		);
		res.json(newSession.rows[0]);
	}

	async getSessions(req, res) {
		const userId = req.body.userId;
		const sessions = await db.query(
			`SELECT * FROM public.training_session WHERE user_id = $1 `,
			[userId]
		);

		res.json(sessions.rows);
	}

	async getOneSession(req, res) {
		let sessionId = req.params.id;
		const session = await db.query(
			`SELECT * FROM public.training_session WHERE session_id = $1`,
			[sessionId]
		);
		res.json(session.rows[0]);
	}

	async updateSession(req, res) {
		const { sessionId, endTimestamp } = req.body;
		const updatedSession = await db.query(
			`UPDATE public.training_session SET end_timestamp = $2 WHERE session_id = $1 RETURNING *`,
			[sessionId, endTimestamp]
		);

		res.json(updatedSession.rows[0]);
	}

	async deleteSession(req, res) {
		const sessionId = req.params.id;
		const deletedSession = await db.query(
			`DELETE from public.training_session WHERE session_id = $1`,
			[sessionId]
		);
		res.json(deletedSession.rows[0]);
	}
}

module.exports = new SessionController();
