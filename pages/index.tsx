import type { NextPage, GetServerSideProps } from 'next';
import Main from '../apps/mishka_html/templates/client/home/Main';
import { unstable_getServerSession, Session, NextAuthOptions } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';

const Home: NextPage = (props) => {
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

  console.log(session);
  
  return {
    props: {},
  };
};

export default Home;
