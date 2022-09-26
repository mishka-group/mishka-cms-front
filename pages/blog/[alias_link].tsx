import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import { post as postRequest, comments as commentsRequest, CommentsResponse } from '../../apps/mishka_content/content';
import PostTemplate from '../../apps/mishka_html/templates/client/blog/Post';
import { useState, FormEvent, RefObject, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { useRouter } from 'next/router';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
interface BlogPostTypes {
  post: { [key: string]: any };
}

const BlogPostPage: NextPage<BlogPostTypes> = ({ post }) => {
  const { data: session } = useSession();
  const [startComment, setStartComment] = useState(false);
  const [comments, setComments]: [Array<any>, Dispatch<SetStateAction<any>>] = useState([]);
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  useEffect(() => {
    if (session) {
      var commentTimeout = setTimeout(async () => {
        const cmReq = await commentsRequest(session.access_token as string, post.post_info.id, 'active');
        if (cmReq.status === 200) setComments(cmReq.entries);
        if (cmReq.status === 401) {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }
      }, 5000);
    }

    return () => {
      clearTimeout(commentTimeout);
    };
  }, [session]);

  const toggleComment = () => {
    setStartComment(!startComment);
  };

  const commentFormHandler = (event: FormEvent<HTMLFormElement>, description: RefObject<HTMLInputElement>) => {
    event.preventDefault();
    if (session && description.current?.value) {
      console.log(description.current?.value);
    }
  };

  return <PostTemplate post={post} startComment={startComment} toggleComment={toggleComment} commentForm={commentFormHandler} comments={comments} />;
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
