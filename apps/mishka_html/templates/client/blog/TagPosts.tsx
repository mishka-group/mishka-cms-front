import type { NextPage } from 'next';
import { MouseEvent, useMemo } from 'react';
import Alert from '../../../components/notices/Alert';
import MainHeader from '../../../UIs/MainHeader';
import BlogItem from '../../../components/blog/BlogItem';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import HeadTags from '../../../components/header/HeadTags';

type ObjectResponse<T> = { [key: string]: T };

interface TagPostsTemplateTypes {
  posts: Array<ObjectResponse<any>>;
  pageMore: boolean;
  pageLoading: boolean;
  loadNextPage(event: MouseEvent<HTMLElement>): void;
}

const TagPostsTemplate: NextPage<TagPostsTemplateTypes> = ({ posts, pageLoading, loadNextPage, pageMore }) => {
  // TODO: It is a temporary code, and it will be deleted after changing API, tags information should be separated
  const metaTags = {
    title: `${posts[0]?.title || 'Tags'} - MishkaCMS`,
    description: `${posts[0]?.meta_description || ''}`,
    keywords: `${posts[0]?.meta_keywords || ''}`,
    url: `http://localhost:3000/blog/${posts[0]?.alias_link}`,
    image: `http://localhost:4000/${posts[0]?.post_main_image}`,
  };

  // TODO: It is a temporary code, and it will be deleted after changing API
  const convertTagPostsToPosts = (item: any) => {
    return {
      alias_link: item.post_alias_link,
      main_image: item.post_main_image,
      title: item.post_title,
      category_alias_link: item.category_alias_link,
      category_title: item.category_title,
      short_description: item.post_short_description,
      updated_at: item.post_updated_at,
      priority: item.post_priority,
      like_count: 0,
    };
  };

  const blogItems = useMemo(() => posts.map((item) => <BlogItem post={convertTagPostsToPosts(item)} key={item.post_id} size={3} />), [posts]);

  const ShowMore = () => {
    return (
      <>
        <div className="space40"></div>
        <p className="text-center">
          {pageLoading ? (
            <button disabled className="btn btn-outline-secondary btn-lg">
              Show more content
            </button>
          ) : (
            <button className="btn btn-outline-secondary btn-lg" onClick={(event) => loadNextPage(event)}>
              Show more content
            </button>
          )}
        </p>
        <div className="space40"></div>
      </>
    );
  };

  return (
    <>
      <HeadTags {...metaTags} />
      <div id="clientMain">
        <MainHeader />
        <ClinetMainMenu active="Blog" />
        <div className="container">
          <section className="col mx-auto client-content">
            <Alert />
            <div className="row">
              <article className="col-sm">
                <div className="row client-home-header-post-article-row" id="BlogsPosts">
                  {blogItems}
                </div>
              </article>
            </div>
            {pageMore && <ShowMore />}
          </section>
        </div>
      </div>
    </>
  );
};

export default TagPostsTemplate;
