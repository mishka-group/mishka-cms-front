import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import type { CategoriesResponse } from '../../../../mishka_content/content';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import BlogItem from '../../../components/blog/BlogItem';
import Alert from '../../../components/notices/Alert';
import CategoriesMenu from '../../../components/blog/CategoriesMenu';
import { MouseEvent, useMemo } from 'react';
import HeadTags from '../../../components/header/HeadTags';

type ObjectResponse<T> = { [key: string]: T };

interface BlogsTemplateTypes {
  posts: Array<ObjectResponse<any>>;
  categories: CategoriesResponse;
  pageMore: boolean;
  pageLoading: boolean;
  loadNextPage(event: MouseEvent<HTMLElement>): void;
}

const BlogsTemplate: NextPage<BlogsTemplateTypes> = ({ posts, categories, loadNextPage, pageMore, pageLoading }) => {
  const metaTags = {
    title: 'Blogs - MishkaCMS',
    description: 'This is description of Blogs',
    keywords: 'js, nextjs, react, cms, mishka, blogs',
    url: 'http://localhost:3000/blogs',
    image: 'http://localhost:4000/images/mylogo.png',
  };
  const blogItems = useMemo(() => posts.map((item) => <BlogItem post={item} key={item.id} size={4} />), [posts]);

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
              <CategoriesMenu categories={categories} />
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

export default BlogsTemplate;
