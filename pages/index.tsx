import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { unstable_getServerSession, Session, NextAuthOptions } from 'next-auth';
import MainTemplate from '../apps/mishka_html/templates/client/home/Main';
import { posts, PostsResponse } from '../apps/mishka_content/content';
import { authOptions } from './api/auth/[...nextauth]';

interface HomeTypes {
  posts: PostsResponse;
  featuredPosts: PostsResponse;
}

const Home: NextPage<HomeTypes> = ({ posts, featuredPosts }) => {
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
  let header = {};
  // Getting response and server side Session
  const { req }: { req: GetServerSidePropsContext['req'] } = context;
  const { res }: { res: GetServerSidePropsContext['res'] } = context;
  const serverSideSessionCheck: Session | null = await unstable_getServerSession(req, res, authOptions as NextAuthOptions);
  const postsParams = { page: 1, filters: { status: 'active' } };

  if (serverSideSessionCheck) {
    header = {
      Authorization: `Bearer ${serverSideSessionCheck.access_token}`,
    };
  }
  const lastPosts = await posts(postsParams, header);
  const lastFeaturedPosts = await posts({ ...postsParams, filters: { priority: 'featured', status: 'active' } }, header);

  return {
    props: {
      posts: lastPosts,
      featuredPosts: lastFeaturedPosts,
    },
  };
};

export default Home;
