import React, {useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Button, Divider, Form, Input, notification, Typography } from 'antd';
import { API } from '../services/api';
import styles from '../styles/FormularioCadastro.module.scss';

const { Paragraph, Title } = Typography;

export default function FormularioCadastro() {
  const [formCarregando, setFormCarregando] = useState(false);

  const [notificationApi, notificationHolder] = notification.useNotification();

  const criarConta = async (valoresForm) => {
    const { name, email, password, password_confirm } = valoresForm;

    if (password !== password_confirm) {
      notificationApi['error']({
				message: 'Senha e confirmação de senha precisam ser iguais.'
			});
      return false;
    };

    setFormCarregando(true)

    try {
      const response = await API.post('/criar_conta', {name, email, password});
      if (response?.status === 200) {
        setFormCarregando(false);
        notificationApi['success']({
          message: 'Cadastro efetuado com sucesso!'
        });
        Router.push('/login');
      }
    } catch (err) {
      setFormCarregando(false);
      notificationApi['error']({
        message:
          err?.response?.data?.message ??
          'Erro interno, por favor tente novamente mais tarde.',
      });
    }    
  }
  
  return (
    <div className={styles.signupCard}>
      <Title level={4}>Preencha seus dados para criar sua conta:</Title>
      <Form
        layout='vertical'
        onFinish={criarConta}
      >
        {notificationHolder}
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor, digite seu nome',
            },
          ]}
        >
          <Input autoComplete='name' />
        </Form.Item>
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
          <Input.Password autoComplete='new-password' />
        </Form.Item>
        <Form.Item
          label="Confirme a senha"
          name="password_confirm"
          rules={[
            {
              required: true,
              message: 'Por favor, confirme sua senha',
            },
          ]}
        >
          <Input.Password autoComplete='new-password' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={formCarregando}>
            CRIAR CONTA
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Paragraph>Já tem uma conta? Clique <Link href='/login'>aqui para entrar</Link>.</Paragraph>
    </div>
  )
}