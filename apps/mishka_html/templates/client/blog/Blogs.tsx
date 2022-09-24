import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import type { PostsResponse, CategoriesResponse } from '../../../../mishka_content/content';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import BlogItem from '../../../components/blog/BlogItem';
import Alert from '../../../components/notices/Alert';
import CategoriesMenu from '../../../components/blog/CategoriesMenu';

interface BlogsTemplateTypes {
  posts: PostsResponse;
  categories: CategoriesResponse;
}

const BlogsTemplate: NextPage<BlogsTemplateTypes> = ({ posts, categories }) => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Blog" />
      <div className="container">
        <section className="col mx-auto client-content">
          <Alert />
          <div className="row">
          <CategoriesMenu categories={categories} />
            <article className="col-sm">
              <div className="row client-home-header-post-article-row">
                {posts.entries.map((item) => (
                  <BlogItem post={item} key={item.id} size={4} />
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogsTemplate;
