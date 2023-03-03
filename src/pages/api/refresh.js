import Client from '../../models/client';
import jwt from 'jsonwebtoken';
import AuthConfig from '../../utils/auth.json';
import { connectMongo } from '../../utils/connectMongo';

connectMongo();

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function refresh(req, res) {
	const { token: userToken } = req.body;

	if (!userToken) {
		res.status(400).send({ error: 'Token not provided' });
	}

	try {
		jwt.verify(userToken, AuthConfig.secret, async (err, decode) => {
			if (err) {
				res.status(400).json({
					err,
				});
			} else {
				const userRefreshData = await Client.findById(
					decode?.id
				);
				
				if (userRefreshData) {
					res.status(200).json(userRefreshData);
				} else {
					res.status(400).json({
						message: 'User not found',
					});
				}
			}
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
		res.end();
	}
}
