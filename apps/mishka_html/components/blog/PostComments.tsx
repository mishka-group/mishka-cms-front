import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

interface PostCommentsTypes {
  startComment: boolean;
  toggleComment(): void;
}

const PostComments: NextPage<PostCommentsTypes> = ({ startComment, toggleComment }) => {
  const { data: session } = useSession();

  const CommentForm = () => {
    return (
      <>
        {startComment && (
          <aside className="col-sm client-post-comment-sending" id="client-blog-post-comment-sending-box">
            <form>
              <h3>Put your comment in the field below:</h3>
              <div className="space30"></div>
              <div className="space10"></div>
              <textarea className="form-control comment-form-client-post" id="client-blog-post-description" name="description"></textarea>
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
    </>
  );
};

export default PostComments;
