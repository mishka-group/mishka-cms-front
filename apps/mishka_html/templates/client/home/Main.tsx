import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import type { PostsResponse } from '../../../../mishka_content/content';
import BlogItem from '../../../components/blog/BlogItem';
import BlogFeaturedItems from '../../../components/blog/BlogFeaturedItems';

// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

interface HomeTemplateTypes {
  posts: PostsResponse;
  featuredPosts: PostsResponse;
}

const Main: NextPage<HomeTemplateTypes> = ({ posts, featuredPosts }) => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Home" />
      <div className="container">
        <section className="col mx-auto client-content">
          <Alert />
          <BlogFeaturedItems posts={featuredPosts.entries} />
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

export default Main;
