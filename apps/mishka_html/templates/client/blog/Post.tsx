import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import PostHeader from '../../../components/blog/PostHeader';
import PostTags from '../../../components/blog/PostTags';
import PostComments from '../../../components/blog/PostComments';
import { FormEvent, RefObject } from 'react';

interface PostTemplateTypes {
  post: { [key: string]: any };
  startComment: boolean;
  comments: Array<any>;
  toggleComment(): void;
  commentForm(event: FormEvent<HTMLFormElement>, description: RefObject<HTMLInputElement>): void;
}

const PostTemplate: NextPage<PostTemplateTypes> = ({ post, startComment, toggleComment, commentForm, comments }) => {
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
              <div className="space30"></div>
              <PostTags tags={post.post_info.blog_tags} />
            </article>
            <PostComments startComment={startComment} toggleComment={toggleComment} commentForm={commentForm} comments={comments} />
          </article>
        </section>
      </div>
    </div>
  );
};

export default PostTemplate;
