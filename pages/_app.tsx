import type { AppProps } from 'next/app';
import Layout from '../apps/mishka_html/templates/layout/layout';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
}

export default MyApp;
