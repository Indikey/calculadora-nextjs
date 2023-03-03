import { createContext, useState, useEffect } from 'react';
import { Authenticate, RefreshUser } from '../services/auth';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { notification } from 'antd';
import { API } from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(false);

	const [notificationApi, contextHolder] = notification.useNotification();

	const isAuthenticated = !!user;

	async function signIn({ email, password }) {
		setAuthLoading(true);

		try {
			const response = await Authenticate({
				email,
				password,
			});

			const { user, token } = response.data;

			API.defaults.headers['Authorization'] = `Bearer ${token}`;

			notificationApi['success']({
				message: 'Autenticado com sucesso.',
			});
			setAuthLoading(false);
			setCookie(undefined, 'calculadora-token', token, {
				maxAge: 60 * 60 * 72, // 72hrs
			});
			setCookie(undefined, 'calculadora-user', JSON.stringify(user), {
				maxAge: 60 * 60 * 72, // 72hrs
			});
			setUser(user);

			Router.push('/calculadora');
		} catch (err) {
			setAuthLoading(false);
			// Envia notificação
			notificationApi['error']({
				message: err?.response?.data?.error
				? err?.response?.data?.error
				: 'Erro ao fazer login',
				description:
					'',
			});
		}
	}

	async function refresh(token) {
		setAuthLoading(true);
		try {
			const response = await RefreshUser(token);
			if (response?.status === 200) {
				setCookie(
					undefined,
					'calculadora-user',
					JSON.stringify(response.data),
					{
						maxAge: 60 * 60 * 24, // 24hrs
					}
				);
				setUser(response.data);
				setAuthLoading(false);
			}

		} catch (err) {
			setAuthLoading(false);
			signOut()
		}
	}

	function signOut() {
		Router.push('/');
		destroyCookie(undefined, 'calculadora-token');
		destroyCookie(undefined, 'calculadora-user');
		setUser(null);
	}

	useEffect(() => {
		const { 'calculadora-token': token } = parseCookies();
		if (token) {
			async function refreshToken(token) {
				setAuthLoading(true);
				try {
					const response = await RefreshUser(token);
					if (response?.status === 200) {
						setCookie(
							undefined,
							'calculadora-user',
							JSON.stringify(response.data),
							{
								maxAge: 60 * 60 * 24, // 24hrs
							}
						);
						setUser(response.data);
						setAuthLoading(false);
					}
		
				} catch (err) {
					setAuthLoading(false);
					signOut()
				}
			}
			refreshToken(token);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				authLoading,
				signIn,
				refresh,
				signOut,
			}}
		>
			{contextHolder}
			{children}
		</AuthContext.Provider>
	);
}
