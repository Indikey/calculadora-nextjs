import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'calculadora-token': token } = parseCookies();

export const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
});

if (token) {
	API.defaults.headers['Authorization'] = `Bearer ${token}`;
}
