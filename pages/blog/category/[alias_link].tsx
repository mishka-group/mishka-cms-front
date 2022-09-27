import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import {
  posts as postsRequest,
  category as categoryRequest,
  PostsResponse,
  CategoriesResponse,
  categories,
  CategoryResponse,
  createSubscription,
  deleteSubscription,
} from '../../../apps/mishka_content/content';
import { ClientAlertState } from '../../../apps/mishka_html/components/state/ClientAlertState';
import { useState, useContext, MouseEvent } from 'react';
import CategoryTemplate from '../../../apps/mishka_html/templates/client/blog/Category';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { clientSideSessionAction } from '../../../apps/mishka_user/helper/authHelper';

interface CategoryTypes {
  posts: PostsResponse;
  categories: CategoriesResponse;
  category: CategoryResponse;
}

const CategoryPage: NextPage<CategoryTypes> = ({ posts, category, categories }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState(posts.entries);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageMore, setPageMore] = useState(true);
  const [subscribe, setSubscribe] = useState(false);
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  /**
   * It loads the next page of posts.
   * @param event - MouseEvent<HTMLElement>
   * @returns the value of the variable pageLoading.
   */
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

  /**
   * It subscribes the user to a category
   */
  const subscribeHandler = async () => {
    if (session) {
      const subscription = await createSubscription(session.access_token as string, category.category_info.id);
      if (subscription.status === 200) {
        setAlertState(true, subscription.message, 'success');
        // TODO: it is unsafe code should be changed after new version of API, It is temporary until a new version is released of API
        setSubscribe(true);
      } else if (subscription.status === 401) {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      } else if (subscription.status === 400) {
        // TODO: it is unsafe code should be changed after new version of API
        setAlertState(true, Object.values(subscription.errors!)[0], 'danger');
        setSubscribe(true);
      } else {
        setAlertState(true, Object.values(subscription.errors!)[0], 'danger');
      }
    } else {
      setAlertState(true, 'You must be logged in to subscribe in a category.', 'warning');
    }
  };

  /**
   * It's a function that unsubscribes a user from a category
   */
  const unSubscribeHandler = async () => {
    if (session) {
      const unSubscribe = await deleteSubscription(session.access_token as string, category.category_info.id);
      if (unSubscribe.status === 200) {
        setAlertState(true, unSubscribe.message, 'success');
        // TODO: it is unsafe code should be changed after new version of API, It is temporary until a new version is released of API
        setSubscribe(false);
      } else if (unSubscribe.status === 401) {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      } else {
        setAlertState(true, Object.values(unSubscribe.errors!)[0], 'danger');
      }
    } else {
      setAlertState(true, 'You must be logged in to Unsubscribe in a category.', 'warning');
    }
  };

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
        unSubscribe={unSubscribeHandler}
        subscribeStatus={subscribe}
      />
    </>
  );
};

export default CategoryPage;

/**
 * It gets the alias_link from the context, then it makes a request to the API to get the category
 * information, then it makes a request to the API to get the posts for that category, then it makes a
 * request to the API to get the categories, then it returns the props
 * @param {GetServerSidePropsContext} context - GetServerSidePropsContext
 * @returns The category, posts, and categories are being returned.
 */
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
