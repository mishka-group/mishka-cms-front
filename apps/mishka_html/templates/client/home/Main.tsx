import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import type { PostsResponse } from '../../../../mishka_content/content';
import BlogItem from '../../../components/blog/BlogItem';
import BlogFeaturedItems from '../../../components/blog/BlogFeaturedItems';
import Link from 'next/link';

// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

interface HomeTemplateTypes {
  posts: PostsResponse;
  featuredPosts: PostsResponse;
}

const ShowMore = () => {
  return (
    <>
      <div className="space40"></div>
      <p className="text-center">
        <Link href="/blogs">
          <a className="btn btn-outline-secondary btn-lg">Show more content</a>
        </Link>
      </p>
      <div className="space40"></div>
    </>
  );
};

const MainTemplate: NextPage<HomeTemplateTypes> = ({ posts, featuredPosts }) => {
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
              <BlogItem post={item} key={item.id} size={3} />
            ))}
          </div>

          <ShowMore />
        </section>
      </div>
    </div>
  );
};

export default MainTemplate;
