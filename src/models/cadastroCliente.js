import { Schema, model, models, Model } from 'mongoose';

const CadastroClienteSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	clientId: {
		type: String,
		required: true,
	},
});

const CadastroCliente = models.CadastroCliente || model('CadastroCliente', CadastroClienteSchema);

export default CadastroCliente;
