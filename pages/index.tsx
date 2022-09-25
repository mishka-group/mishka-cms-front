import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ClientAlertState } from '../apps/mishka_html/components/state/ClientAlertState';
import MainTemplate from '../apps/mishka_html/templates/client/home/Main';
import { posts, PostsResponse } from '../apps/mishka_content/content';
import { clientSideSessionAction } from '../apps/mishka_user/helper/authHelper';

interface HomeTypes {
  posts: PostsResponse;
  featuredPosts: PostsResponse;
}

const Home: NextPage<HomeTypes> = ({ posts, featuredPosts }) => {
  const { data: session } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const router = useRouter();

  return (
    <>
      <MainTemplate posts={posts} featuredPosts={featuredPosts} />
    </>
  );
};

/**
 * It gets the posts from the API and returns them as props, which is an object that
 * contains the posts and last featured posts
 * @param {GetServerSidePropsContext} context - GetServerSidePropsContext
 * @returns The props object is being returned.
 */
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // Getting response and server side Session
  // const { req }: { req: GetServerSidePropsContext['req'] } = context;
  // const { res }: { res: GetServerSidePropsContext['res'] } = context;
  // const serverSideSessionCheck: Session | null = await unstable_getServerSession(req, res, authOptions as NextAuthOptions);
  const postsParams = { page: 1, filters: { status: 'active' } };
  const lastPosts = await posts(postsParams);
  const lastFeaturedPosts = await posts({ ...postsParams, filters: { priority: 'featured', status: 'active' } });

  return {
    props: {
      posts: lastPosts,
      featuredPosts: lastFeaturedPosts,
    },
  };
};

export default Home;
