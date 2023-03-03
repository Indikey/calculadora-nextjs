import { Schema, model, models, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const ClientSchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	isAdmin: {
		required: false,
		type: Boolean,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

ClientSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

const Client = models.Client || model('Client', ClientSchema);

export default Client;
