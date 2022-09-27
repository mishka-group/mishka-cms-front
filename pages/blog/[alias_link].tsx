import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import { post as postRequest, comments as commentsRequest, createComments } from '../../apps/mishka_content/content';
import PostTemplate from '../../apps/mishka_html/templates/client/blog/Post';
import { useState, FormEvent, RefObject, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { useRouter } from 'next/router';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
import { elementDisability } from '../../apps/extra/helper';

interface BlogPostTypes {
  post: { [key: string]: any };
}

const BlogPostPage: NextPage<BlogPostTypes> = ({ post }) => {
  const { data: session } = useSession();
  const [startComment, setStartComment] = useState(false);
  const [comments, setComments]: [Array<any>, Dispatch<SetStateAction<any>>] = useState([]);
  const [commentPageNumber, setCommentPageNumber] = useState(1);
  const [commentLoading, setCommentLoading] = useState(true);
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  useEffect(() => {
    if (session) {
      var commentTimeout = setTimeout(async () => {
        const cmReq = await commentsRequest(session.access_token as string, post.post_info.id, 'active');
        if (cmReq.status === 200) {
          setComments(cmReq.entries);
          setCommentPageNumber(cmReq.page_number);
        }
        if (cmReq.status === 401) {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }
        setCommentLoading(false);
      }, 5000);
    }

    return () => {
      clearTimeout(commentTimeout);
    };
  }, [session]);

  /**
   * It toggles the startComment state.
   */
  const toggleComment = () => {
    setStartComment(!startComment);
  };

  /**
   * It loads the next page of comments for a post
   */
  const loadNextPage = async () => {
    if (session) {
      const cmReq = await commentsRequest(session.access_token as string, post.post_info.id, 'active', commentPageNumber + 1);
      if (cmReq.status === 200) {
        setCommentPageNumber(cmReq.page_number);
        if (commentPageNumber === cmReq.total_pages) {
          elementDisability('showCommentMoreButton', true);
        } else {
          elementDisability('showCommentMoreButton', false);
          setComments((prev: any) => Array.from(new Set([...prev, ...cmReq.entries])));
        }
      }
      if (cmReq.status === 401) {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }
    } else {
      setAlertState(true, 'You must be logged in to post a comment.', 'danger');
      setTimeout(() => {
        document.querySelector('.alert')?.scrollIntoView();
      }, 300);
    }
  };

  const commentFormHandler = async (event: FormEvent<HTMLFormElement>, description: RefObject<HTMLInputElement>) => {
    // TODO: it shooud be changed because the api does not return a good params like all comments
    event.preventDefault();
    if (session && description.current?.value) {
      const commentResponse = await createComments(session.access_token as string, post.post_info.id, description.current?.value);
      if (commentResponse.status === 200) {
        setComments((prev: any) => Array.from(new Set([...[commentResponse.comment_info], ...prev])));
        toggleComment()

      } else if (commentResponse.status === 401) {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      } else {
        setAlertState(true, Object.values(commentResponse.errors!)[0], 'danger');
        setTimeout(() => {
          document.querySelector('.alert')?.scrollIntoView();
        }, 300);
      }
    }
  };

  return (
    <PostTemplate
      post={post}
      startComment={startComment}
      toggleComment={toggleComment}
      commentForm={commentFormHandler}
      comments={comments}
      commentLoading={commentLoading}
      loadNextPage={loadNextPage}
    />
  );
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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
