import type { AppProps } from 'next/app';
import Layout from '../apps/mishka_html/templates/layout/layout';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';
import ClientAlertStateProvider from '../apps/mishka_html/components/state/ClientAlertState';
import { Session } from 'next-auth';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ClientAlertStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClientAlertStateProvider>
    </SessionProvider>
  );
}

export default MyApp;
