import React, { useContext } from 'react';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { Button, Form, Input, Layout, Typography } from 'antd';
import { AuthContext } from '../context/Auth';
import { RefreshUser } from '../services/auth';
import styles from '../styles/Login.module.scss';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Login() {
  const { signIn, authLoading } = useContext(AuthContext);

  const fazerLogin = async (formValues) => {
    signIn(formValues);
  }
  
  return (
    <Layout>
      <Content className={styles.content}>
        <Title className={styles.titleText}>Calculadora</Title>
        <div className={styles.loginCard}>
          <Title level={3} className={styles.loginCardTitle}>Acessar minha conta</Title>
          <Form
            layout='vertical'
            onFinish={fazerLogin}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor, digite seu email',
                },
              ]}
            >
              <Input type='email' autoComplete='email' />
            </Form.Item>
            <Form.Item
              label="Senha"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor, digite sua senha',
                },
              ]}
            >
              <Input.Password autoComplete='current-password' />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={authLoading}>
                ENTRAR
              </Button>
            </Form.Item>
            <Paragraph>Não tem uma conta? Clique <Link href='/'>aqui para se cadastrar</Link>.</Paragraph>
          </Form>
        </div>
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
		}
	}

	return {
		props: {},
	};
};