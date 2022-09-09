import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Main from '../apps/mishka_html/templates/client/home/Main';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session)
  
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
