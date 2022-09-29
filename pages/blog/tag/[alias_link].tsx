import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import { useState, useContext, MouseEvent } from 'react';
import { tagPosts, PostsResponse } from '../../../apps/mishka_content/content';
import TagPostsTemplate from '../../../apps/mishka_html/templates/client/blog/TagPosts';
import { ClientAlertState } from '../../../apps/mishka_html/components/state/ClientAlertState';

interface TagTypes {
  posts: PostsResponse;
}

const TagPage: NextPage<TagTypes> = ({ posts }) => {
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
      const lastPosts = await tagPosts(1, content[0]?.alias_link || 0);
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

  return <TagPostsTemplate posts={content} pageMore={pageMore} pageLoading={pageLoading} loadNextPage={loadNextPage} />;
};

export default TagPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const alias_link = context.query.alias_link;
  if (typeof alias_link === 'string' && alias_link !== '') {
    const posts = await tagPosts(1, context.query.alias_link as string);

    if (posts.status === 200) {
      return {
        props: {
          posts: posts,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
