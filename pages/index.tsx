import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Main from '../apps/mishka_html/templates/client/home/Main';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
