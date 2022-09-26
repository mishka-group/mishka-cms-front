import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRef, RefObject, FormEvent, MouseEvent } from 'react';
import CommentItem from '../../components/blog/CommentItem';

interface PostCommentsTypes {
  startComment: boolean;
  toggleComment(): void;
  comments: Array<any>;
  commentForm(event: FormEvent<HTMLFormElement>, description: RefObject<HTMLInputElement>): void;
  commentLoading: boolean;
  loadNextPage(): void;
}

const PostComments: NextPage<PostCommentsTypes> = ({ startComment, toggleComment, commentForm, comments, commentLoading, loadNextPage }) => {
  const { data: session } = useSession();
  const descriptionRef: RefObject<any> = useRef();

  const ShowMoreButton = () => {
    if (comments.length !== 0 && !commentLoading) {
      return (
        <button className="btn btn-outline-secondary btn-lg" id="showCommentMoreButton" onClick={() => loadNextPage()}>
          Show more comments
        </button>
      );
    } else {
      return (
        <button disabled className="btn btn-outline-secondary btn-lg" id="showCommentMoreButton">
          Show more comments
        </button>
      );
    }
  };

  const Comments = () => {
    return (
      <>
        {comments.map((item: { [key: string]: any }) => (
          <CommentItem comment={item} key={item.id} />
        ))}

        <div className="space30"></div>
        <p className="text-center">
          <ShowMoreButton />
        </p>

        {commentLoading && (
          <div>
            <div className="space40"></div>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const CommentForm = () => {
    return (
      <>
        {startComment && (
          <aside className="col-sm client-post-comment-sending" id="client-blog-post-comment-sending-box">
            <form onSubmit={(event) => commentForm(event, descriptionRef)}>
              <h3>Put your comment in the field below:</h3>
              <div className="space30"></div>
              <div className="space10"></div>
              <textarea
                ref={descriptionRef}
                className="form-control comment-form-client-post"
                id="client-blog-post-description"
                name="description"
              />
              <div className="form-error-tag"></div>
              <div className="clearfix"></div>
              <div className="space30"></div>

              <p className="text-start vazir" id="form-btn">
                <button onClick={() => toggleComment()} className="btn btn-outline-secondary btn-lg">
                  Cancel
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-secondary btn-lg" type="submit">
                  Sent comment
                </button>
              </p>
              <div className="clearfix"></div>
            </form>
          </aside>
        )}
        <div className="space30"></div>
        <Comments />
      </>
    );
  };

  if (session && startComment) {
    return (
      <>
        <div className="space30"></div>
        <CommentForm />
      </>
    );
  }

  return (
    <>
      <div className="space30"></div>
      <aside className="col-sm client-post-comment-sending" id="client-blog-post-comment-sending-box">
        {session ? (
          <span onClick={() => toggleComment()}>Click to post a comment...</span>
        ) : (
          <span>You must be logged in to post a comment.</span>
        )}
        <span className="float-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-square"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
            ></path>
          </svg>
        </span>
      </aside>
      <div className="space30"></div>
      <Comments />
    </>
  );
};

export default PostComments;
