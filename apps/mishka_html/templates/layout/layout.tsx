import type { NextPage } from 'next';
import { useEffect } from 'react';
import Cright from '../../UIs/Cright';
import Head from 'next/head';
import { clientSideSessionAction } from '../../../extra/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Children = {
  children: JSX.Element;
};

// This place can be helpful if you have global UI, importing, styling or HEAD for SEO etc.
const Layout: NextPage<Children> = ({ children }): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check user token and dead session just for one time
    clientSideSessionAction(session, router).then();
    // Installing Bootstrap based on this post: https://blog.logrocket.com/handling-bootstrap-integration-next-js/
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

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
