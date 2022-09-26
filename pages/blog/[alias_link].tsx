import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import { post as postRequest } from '../../apps/mishka_content/content';
import PostTemplate from '../../apps/mishka_html/templates/client/blog/Post';
import { useState, FormEvent, RefObject } from 'react';

interface BlogPostTypes {
  post: { [key: string]: any };
}

const BlogPostPage: NextPage<BlogPostTypes> = ({ post }) => {
  const [startComment, setStartComment] = useState(false)

  const toggleComment= () => {
    setStartComment(!startComment)
  }

  const commentFormHandler = (event: FormEvent<HTMLFormElement>, description: RefObject<HTMLInputElement>) => {
    event.preventDefault()
    console.log(description.current?.value)
  }

  return <PostTemplate post={post} startComment={startComment} toggleComment={toggleComment} commentForm={commentFormHandler}/>;
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alias_link = context.query.alias_link;
  if (typeof alias_link === 'string' && alias_link !== '') {
    const post = await postRequest(context.query.alias_link as string, 'active');

    if (post.status === 200) {
      return {
        props: {
          post: post,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
