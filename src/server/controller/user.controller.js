const db = require('../db');

class UserController {
	async createUser(req, res) {
		const { firstName, lastName, email, passwordHash } = req.body;
		const newUser = await db.query(
			`INSERT INTO public.user (first_name, last_name, email, password_hash) values ($1, $2, $3, $4) RETURNING *`,
			[firstName, lastName, email, passwordHash]
		);
		res.json(newUser.rows[0]);
	}
	async getUsers(req, res) {
		const users = await db.query(`SELECT * FROM public.user `);

		res.json(users.rows);
	}
	async getOneUser(req, res) {
		const id = req.params.id;
		const user = await db.query(`SELECT * FROM public.user WHERE id = $1`, [id]);
		res.json(user.rows[0]);
	}
	async updateUser(req, res) {
		const { id, firstName, lastName, email, passwordHash } = req.body;
		const updatedUser = await db.query(
			`UPDATE public.user set first_name = $2, last_name = $3, email = $4, password_hash = $5 WHERE id = $1 RETURNING *`,
			[id, firstName, lastName, email, passwordHash]
		);

		res.json(updatedUser.rows[0]);
	}
	async deleteUser(req, res) {
		const id = req.params.id;
		const deletedUser = await db.query(`delete from public.user where id = $1`, [id]);
		res.json(deletedUser.rows[0]);
	}
}

module.exports = new UserController();
