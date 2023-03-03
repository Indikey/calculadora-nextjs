import { API } from './api';

export async function Authenticate({ email, password }) {
	try {
		const response: any = API.post('/login', {
			email,
			password,
		});

		return response;
	} catch (error) {}
}

export async function RefreshUser(token) {
	try {
		const response: any = API.post('/refresh', {
			token,
		});
		return response;
	} catch (error) {
		console.error("Error on RefreshUser")
	}
}
