import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { Layout, Typography } from 'antd';
import FormularioCadastro from '../components/FormularioCadastro';
import { RefreshUser } from '../services/auth';
import styles from '../styles/Home.module.scss';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
	
  return (
    <Layout>
			<Content>
				<Title>Bem vindo</Title>
				<FormularioCadastro />
			</Content>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
	const { 'calculadora-token': token } = parseCookies(context);

	if (token) {
		const response = await RefreshUser(token);
		if (response?.status === 200) {
			return {
				redirect: {
					destination: '/calculadora',
					permanent: false,
				},
			};
		} else {
			console.error("Error refresh:", response)
		}
	}

	return {
		props: {},
	};
};