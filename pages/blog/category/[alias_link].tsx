import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import {
  posts as postsRequest,
  category as categoryRequest,
  PostsResponse,
  CategoriesResponse,
  categories,
  CategoryResponse,
} from '../../../apps/mishka_content/content';
import { ClientAlertState } from '../../../apps/mishka_html/components/state/ClientAlertState';
import { useState, useContext, MouseEvent } from 'react';
import CategoryTemplate from '../../../apps/mishka_html/templates/client/blog/Category';

interface CategoryTypes {
  posts: PostsResponse;
  categories: CategoriesResponse;
  category: CategoryResponse;
}

const CategoryPage: NextPage<CategoryTypes> = ({ posts, category, categories }) => {
  const [content, setContent] = useState(posts.entries);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageMore, setPageMore] = useState(true);
  const { setAlertState } = useContext(ClientAlertState);

  const loadNextPage = async (event: MouseEvent<HTMLElement>) => {
    if (pageLoading) return;

    event.preventDefault();
    if (pageNumber + 1 > posts.total_pages) {
      setPageMore(false);
    } else {
      setPageLoading(true);
      const lastPosts = await postsRequest({
        ...{ page: 1, filters: { status: 'active', category_id: category.category_info.id } },
        page: pageNumber + 1,
      });
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

  const subscribeHandler = () => {
    console.log("hi subscribe")
  }

  return (
    <>
      <CategoryTemplate
        posts={content}
        categories={categories}
        pageMore={pageMore}
        pageLoading={pageLoading}
        loadNextPage={loadNextPage}
        category={category}
        subscribe={subscribeHandler}
      />
    </>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const alias_link = context.query.alias_link;
  if (typeof alias_link === 'string' && alias_link !== '') {
    const cat = await categoryRequest(context.query.alias_link as string);

    if (cat.status === 200) {
      const lastPosts = await postsRequest({ page: 1, filters: { status: 'active', category_id: cat.category_info.id } });
      const lastCategories = await categories();

      return {
        props: {
          category: cat,
          posts: lastPosts,
          categories: lastCategories,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
