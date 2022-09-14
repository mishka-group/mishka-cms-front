import type { NextPage, GetServerSideProps } from 'next';
import Main from '../apps/mishka_html/templates/client/home/Main';
import { unstable_getServerSession, Session, NextAuthOptions } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { refreshToken } from '../apps/mishka_user/userAuthentication';
import { clientSideSessionAction } from '../apps/mishka_user/helper/authHelper';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { ClientAlertState } from '../apps/mishka_html/components/state/ClientAlertState';

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const router = useRouter();

  
  
  const click = async () => {
   await clientSideSessionAction(session, router, setAlertState);
  };

  const sessionClick = async () => {
   console.log(session)
  };

  return (
    <>
      <Main />
      <button onClick={click}>Clik me</button>
      <button onClick={sessionClick}>session</button>
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

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtaXNoa2FfdXNlciIsImV4cCI6MTY2NDMwNTYxNywiaWF0IjoxNjYzMTgxNjE3LCJpc3MiOiJtaXNoa2FfdXNlciIsImp0aSI6IjE4NTJlN2Y0LTY2OTUtNGUxNy05MmM0LTk4Nzk4M2I4MTUyMSIsIm5iZiI6MTY2MzE4MTYxNiwic29tZSI6ImNsYWltIiwic3ViIjoiZDU2NjU2OGMtMjI4NS00ZjZhLWE2MzgtM2FmZTIxNDRmOTJlIiwidG9rZW5faWQiOiI0NjM4NTQzYi02MDc0LTQ2ODItOGQzNy03NzhhZDI2ZmU4YWYiLCJ0eXAiOiJyZWZyZXNoIn0.6VTzKuAcrTIvltu1xIgHqahr6Wmo5QFjC6RT6dzHPhw"
