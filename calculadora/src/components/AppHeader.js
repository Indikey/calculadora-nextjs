import React, { useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link'
import { Layout, Menu } from 'antd';
import { ExportOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/Auth';
import styles from '../styles/AppHeader.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  
  const { signOut } = useContext(AuthContext);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'home':
        Router.push('/calculadora');
        break;
      case 'logout':
        signOut();
        break;
      default:
        break;
    }
  }

  const menuItems = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: 'Sair',
      key: 'logout',
      icon: <ExportOutlined />,
    }
  ]

  const defaultOpenKeys = ['dashboard', 'logout']


  return (
    <Header className={styles.header}>
        <Link href='/calculadora' className={styles.logo}>
          Calculadora
        </Link>
      <Menu
        className={styles.menu}
        mode="horizontal"
        items={menuItems}
        defaultOpenKeys={defaultOpenKeys}
        onClick={handleMenuClick}
        overflowedIndicator={<MenuOutlined />}
      />
    </Header>
  )
}
