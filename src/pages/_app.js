import { ConfigProvider } from 'antd';
import Head from 'next/head';
import {ErrorBoundary} from 'react-error-boundary'
import Script from 'next/script'
import { AuthProvider } from '../context/Auth';
import ErrorFallback from '../components/ErrorFallback';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            fontSizeHeading1: 32,
            fontSizeHeading2: 24,
            fontSizeHeading3: 20,
            fontSizeHeading4: 16
          },
        }}
      >
        <Head>
          <title>Calculadora</title>
        </Head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-VN96W3LXSW"/>
        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-VN96W3LXSW');
            `,
          }}
        />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ConfigProvider>
    </AuthProvider>
  )
}
