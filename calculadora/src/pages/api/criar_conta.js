import Client from '../../models/client';
import { connectMongo } from '../../utils/connectMongo';

connectMongo();

export default async function criar_conta(req, res) {
	if (req.method === 'POST') {
		const { name, email, password } = req.body;

		const novoCliente = {
			name,
			email,
			password,
		};

		const isEmpty = () => {
			var valuesArr = Object.values(novoCliente);
			const values = valuesArr.filter(
				(el) => el === null || el === undefined || el?.length === 0
			);
			if (values.length !== 0) {
				return true;
			} else return false;
		};

		if (isEmpty()) {
			return res.status(400).send({ message: 'Por favor, preencha todos os campos' });
		}

		if (await Client.findOne({ email })) {
			return res.status(400).send({ message: 'Email já cadastrado' });
		}

		try {
			const client = await Client.create(novoCliente);
			return res.send({ client });
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	} else {
		return res.status(405).send({ error: 'Método inválido' });
	}
}
