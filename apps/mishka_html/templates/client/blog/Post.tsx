import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import PostHeader from '../../../components/blog/PostHeader';
import PostTags from '../../../components/blog/PostTags';
import PostComments from '../../../components/blog/PostComments';
import { FormEvent, RefObject, MouseEvent } from 'react';

interface PostTemplateTypes {
  post: { [key: string]: any };
  startComment: boolean;
  commentLoading: boolean;
  comments: Array<any>;
  toggleComment(): void;
  commentForm(event: FormEvent<HTMLFormElement>, description: RefObject<HTMLInputElement>): void;
  loadNextPage(): void;
}

const PostTemplate: NextPage<PostTemplateTypes> = ({
  post,
  startComment,
  toggleComment,
  commentForm,
  comments,
  commentLoading,
  loadNextPage,
}) => {
  /**
   * It's a function that returns a React fragment that contains a button and a div. The button has a
   * data-bs-toggle attribute that toggles the div. The div contains a list of links
   * @returns A button and a list of links.
   */
  const PostLinks = () => {
    return (
      <>
        <button
          className="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="true"
          aria-controls="collapseExample"
        >
          Attached links
        </button>

        <div className="collapse" id="collapseExample">
          <div className="space20"></div>
          <ul>
            {post.post_info.links.map((item: { [key: string]: any }) => (
              <li key={item.id}>
                <a href={item.link} className="client-post-bot-link">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Blog" />
      <div className="container">
        <section className="col mx-auto client-content">
          <Alert />
          <article className="col mx-auto client-content vazir" id="client-main-article-of-blog-post">
            <PostHeader post={post} />
            <article className="blog-posts-description" id="client-blog-post-main-article">
              <div className="space30"></div>
              <div dangerouslySetInnerHTML={{ __html: post.post_info.description }} />
              {post.post_info.links.length !== 0 && (
                <>
                  <div className="space30"></div>
                  <PostLinks />
                </>
              )}
              <div className="space30"></div>
              <PostTags tags={post.post_info.blog_tags} />
            </article>
            <PostComments
              startComment={startComment}
              toggleComment={toggleComment}
              commentForm={commentForm}
              comments={comments}
              commentLoading={commentLoading}
              loadNextPage={loadNextPage}
            />
          </article>
        </section>
      </div>
    </div>
  );
};

export default PostTemplate;
