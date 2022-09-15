import type { NextPage, GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession, Session, NextAuthOptions } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { clientSideSessionAction } from '../apps/mishka_user/helper/authHelper';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ClientAlertState } from '../apps/mishka_html/components/state/ClientAlertState';
import Main from '../apps/mishka_html/templates/client/home/Main';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const router = useRouter();  
  

  return (
    <>
      <Main />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req }: { req: GetServerSidePropsContext['req'] } = context;
  const { res }: { res: GetServerSidePropsContext['res'] } = context;

  const session: Session | null = await unstable_getServerSession(req, res, authOptions as NextAuthOptions);

  // console.log(session);

  return {
    props: {},
  };
};

export default Home;