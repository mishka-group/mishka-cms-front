import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { posts, PostsResponse, CategoriesResponse, categories } from '../../apps/mishka_content/content';
import BlogsTemplate from '../../apps/mishka_html/templates/client/blog/Blogs';

interface BlogsTypes {
  posts: PostsResponse;
  categories: CategoriesResponse;
}

const BlogsPage: NextPage<BlogsTypes> = ({ posts, categories }) => {
  return (
    <>
      <BlogsTemplate posts={posts} categories={categories}/>
    </>
  );
};

export default BlogsPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const postsParams = { page: 1, filters: { status: 'active' } };
  const lastPosts = await posts(postsParams);
  const lastCategories = await categories();

  return {
    props: {
      posts: lastPosts,
      categories: lastCategories,
    },
  };
};
