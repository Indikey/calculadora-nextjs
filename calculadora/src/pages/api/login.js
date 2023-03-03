import Client from '../../models/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AuthConfig from '../../utils/auth.json';
import { connectMongo } from '../../utils/connectMongo';

connectMongo();

export default async function login(req, res) {
	if (req.method === 'POST') {
		const { email: reqEmail, password: reqPassword } = req.body;

		try {
			const user = await Client.findOne({
				email: reqEmail,
			}).select('+password');

			if (!user) {
				return res
					.status(404)
					.send({ error: 'Usuário não encontrado' });
			}

			if (!(await bcrypt.compare(reqPassword, user.password))) {
				return res.status(401).send({ error: 'Senha inválida' });
			}

			const token = jwt.sign({ id: user.id }, AuthConfig.secret, {
				expiresIn: 60 * 60 * 24, // 24hrs
			});

			res.send({
				user: user,
				token,
			});
		} catch (err) {
			return res.status(400).send({ err: err.message });
		}
	} else {
		return res.status(405).send({ error: 'Método inválido' });
	}
}
