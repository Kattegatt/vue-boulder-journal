const db = require('../db');

class RouteController {
	async createRoute(req, res) {
		const { name, rating, attempts, isPassed, comment, sessionId } = req.body;
		const newRoute = await db.query(
			`INSERT INTO public.route (name, rating, attempts, is_passed, comment, session_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
			[name, rating, attempts, isPassed, comment, sessionId]
		);
		res.json(newRoute.rows[0]);
	}
	async getRoutes(req, res) {
		const routes = await db.query(`SELECT * FROM public.route `);

		res.json(routes.rows);
	}
	async getOneRoute(req, res) {
		const id = req.params.id;
		const route = await db.query(`SELECT * FROM public.route WHERE route_id = $1`, [id]);
		res.json(route.rows[0]);
	}
	async updateRoute(req, res) {
		const { id, attempts, isPassed, comment } = req.body;
		const updatedRoute = await db.query(
			`UPDATE public.route set attempts = $2, isPassed = $3, comment = $4 WHERE route_id = $1 RETURNING *`,
			[id, attempts, isPassed, comment]
		);

		res.json(updatedRoute.rows[0]);
	}
	async deleteRoute(req, res) {
		const id = req.params.id;
		const deletedRoute = await db.query(`delete from public.route where route_id = $1`, [id]);
		res.json(deletedRoute.rows[0]);
	}
}

module.exports = new RouteController();
