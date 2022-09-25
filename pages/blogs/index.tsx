import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState, MouseEvent, useContext } from 'react';
import { posts as postRequest, PostsResponse, CategoriesResponse, categories } from '../../apps/mishka_content/content';
import BlogsTemplate from '../../apps/mishka_html/templates/client/blog/Blogs';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';

interface BlogsTypes {
  posts: PostsResponse;
  categories: CategoriesResponse;
}

const POST_INITIATE = { page: 1, filters: { status: 'active' } };

const BlogsPage: NextPage<BlogsTypes> = ({ posts, categories }) => {
  const [content, setContent] = useState(posts.entries);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageMore, setPageMore] = useState(true);
  const { setAlertState } = useContext(ClientAlertState);

  /**
   * It's a function that loads the next page of posts from the server
   * @param event - MouseEvent<HTMLElement>
   * @returns the value of the function.
   */
  const loadNextPage = async (event: MouseEvent<HTMLElement>) => {
    if (pageLoading) return;

    event.preventDefault();
    if (pageNumber + 1 > posts.total_pages) {
      setPageMore(false);
    } else {
      setPageLoading(true);
      const lastPosts = await postRequest({ ...POST_INITIATE, page: pageNumber + 1 });
      if (lastPosts.status === 200) {
        setPageNumber((prev) => prev + 1);
        setContent((prev) => Array.from(new Set([...prev, ...lastPosts.entries])));
      } else {
        setAlertState(true, lastPosts.message, 'danger');
        document.querySelector('.alert')?.scrollIntoView();
      }

      setPageLoading(false);
    }
  };

  return (
    <>
      <BlogsTemplate posts={content} categories={categories} pageMore={pageMore} pageLoading={pageLoading} loadNextPage={loadNextPage} />
    </>
  );
};

export default BlogsPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const lastPosts = await postRequest(POST_INITIATE);
  const lastCategories = await categories();

  return {
    props: {
      posts: lastPosts,
      categories: lastCategories,
    },
  };
};