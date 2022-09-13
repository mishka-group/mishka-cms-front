import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import Cright from '../../UIs/Cright';
import Head from 'next/head';
import { clientSideSessionAction } from '../../../mishka_user/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ClientAlertState } from '../../../mishka_html/components/state/ClientAlertState';

type Children = {
  children: JSX.Element;
};

// This place can be helpful if you have global UI, importing, styling or HEAD for SEO etc.
const Layout: NextPage<Children> = ({ children }): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  useEffect(() => {
    // Installing Bootstrap based on this post: https://blog.logrocket.com/handling-bootstrap-integration-next-js/
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

   // Force the use not see the Auth pages because it is just for new users without session
  useEffect(() => {
    // Check user token and dead session just for one time
    return () => {
      clientSideSessionAction(session, router, setAlertState);
    };
  }, [session, router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
      <Cright />
    </>
  );
};

export default Layout;
