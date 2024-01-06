const db = require('../db');

class UserController {
	async createUser(req, res) {
		const { nickname, email, passwordHash } = req.body;

		const existingUser = await db.query('SELECT * FROM public.user WHERE email = $1', [email]);

		if (existingUser.rowCount) {
			return res.status(400).json({ error: 'User already existing' });
		}

		const newUser = await db.query(
			`INSERT INTO public.user (nickname, email, password_hash) values ($1, $2, $3) RETURNING *`,
			[nickname, email, passwordHash]
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
		const { id, nickname, email, passwordHash } = req.body;
		const updatedUser = await db.query(
			`UPDATE public.user set nickname = $2, email = $3, password_hash = $4 WHERE id = $1 RETURNING *`,
			[id, nickname, email, passwordHash]
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
