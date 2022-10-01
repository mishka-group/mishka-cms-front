import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import type { CategoriesResponse, CategoryResponse } from '../../../../mishka_content/content';
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
  category: CategoryResponse;
  pageMore: boolean;
  pageLoading: boolean;
  subscribeStatus: boolean;
  loadNextPage(event: MouseEvent<HTMLElement>): void;
  subscribe(): void;
  unSubscribe(): void;
}

const CategoryTemplate: NextPage<BlogsTemplateTypes> = ({
  posts,
  categories,
  loadNextPage,
  pageMore,
  pageLoading,
  category,
  subscribe,
  unSubscribe,
  subscribeStatus,
}) => {
  const metaTags = {
    title: `${category.category_info.title} - MishkaCMS`,
    description: `${category.category_info.meta_description || category.category_info.short_description}`,
    keywords: `${category.category_info.meta_keywords || ''}`,
    url: `http://localhost:3000/blog/category/${category.category_info.alias_link}`,
    image: `http://localhost:4000/${category.category_info.main_image}`,
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

  // TODO: after changing API we need to know the user is Subscribed or not
  const CategoryInformation = () => {
    return (
      <>
        <aside className="col-sm-12">
          <h1 className="vazir">Category: {category.category_info.title}</h1>
          <div className="space20"></div>
          <p className="category-side-short_description vazir">{category.category_info.short_description}</p>
          <div className="space20"></div>
          {subscribeStatus ? (
            <a className="btn btn-outline-secondary btn-lg" onClick={unSubscribe}>
              UnSubscribe
            </a>
          ) : (
            <a className="btn btn-outline-secondary btn-lg" onClick={subscribe}>
              Subscribe
            </a>
          )}
        </aside>
        <div className="space30"></div>
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
            <CategoryInformation />
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

export default CategoryTemplate;
