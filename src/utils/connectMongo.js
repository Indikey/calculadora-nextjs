import mongoose from 'mongoose';

export const connectMongo = async () =>
	mongoose.connect(process.env.DATABASE_URL);
