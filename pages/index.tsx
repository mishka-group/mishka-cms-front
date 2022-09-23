import type { NextPage, GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession, Session, NextAuthOptions } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ClientAlertState } from '../apps/mishka_html/components/state/ClientAlertState';
import Main from '../apps/mishka_html/templates/client/home/Main';
import { posts, PostsResponse } from '../apps/mishka_content/content';
import { clientSideSessionAction } from '../apps/mishka_user/helper/authHelper';

interface HomeTypes {
  posts: PostsResponse;
}

const Home: NextPage<HomeTypes> = ({ posts }) => {
  const { data: session } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const router = useRouter();

  // TODO: it should be deleted, the page needs to be friendly with SEO does not need any token or sth just load content directly
  if (posts.status == 401) {
    clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
  }

  return (
    <>
      <Main posts={posts} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req }: { req: GetServerSidePropsContext['req'] } = context;
  const { res }: { res: GetServerSidePropsContext['res'] } = context;

  const serverSideSessionCheck: Session | null = await unstable_getServerSession(req, res, authOptions as NextAuthOptions);
  const lastPosts = await posts((serverSideSessionCheck?.access_token as string) || 'null', {
    page: 1,
    filters: {
      status: 'active',
    },
  });

  return {
    props: {
      posts: lastPosts,
    },
  };
};

export default Home;
