import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { posts, PostsResponse } from '../../apps/mishka_content/content';
import BlogsTemplate from '../../apps/mishka_html/templates/client/blog/Blogs';

interface BlogsTypes {
  posts: PostsResponse;
}

const BlogsPage: NextPage<BlogsTypes> = ({ posts }) => {
  return (
    <>
      <BlogsTemplate posts={posts} />
    </>
  );
};

export default BlogsPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const postsParams = { page: 1, filters: { status: 'active' } };
  const lastPosts = await posts(postsParams);

  return {
    props: {
      posts: lastPosts,
    },
  };
};
