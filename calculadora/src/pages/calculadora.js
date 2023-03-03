import React from 'react';
import { parseCookies } from 'nookies';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';

const { Content } = Layout;

export default function Calculadora() {
	
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
				<AppHeader />
        <Content>
          <p>Calculadora</p>
        </Content>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
	const { 'calculadora-token': token } = parseCookies(context);
	const { 'calculadora-user': user } = parseCookies(context);

	if (!token || !user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
