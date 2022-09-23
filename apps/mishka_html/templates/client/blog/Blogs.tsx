import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import type { PostsResponse } from '../../../../mishka_content/content';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import BlogItem from '../../../components/blog/BlogItem';
import Alert from '../../../components/notices/Alert';

interface BlogsTemplateTypes {
  posts: PostsResponse;
}

const BlogsTemplate: NextPage<BlogsTemplateTypes> = ({ posts }) => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Blog" />
      <div className="container">
        <section className="col mx-auto client-content">
          <Alert />
          {/* TODO: it needs side menu */}
          <div className="row client-home-header-post-article-row">
            {posts.entries.map((item) => (
              <BlogItem post={item} key={item.id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogsTemplate;
