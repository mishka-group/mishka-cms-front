import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import type { CategoriesResponse, CategoryResponse } from '../../../../mishka_content/content';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import BlogItem from '../../../components/blog/BlogItem';
import Alert from '../../../components/notices/Alert';
import CategoriesMenu from '../../../components/blog/CategoriesMenu';
import { MouseEvent, useMemo } from 'react';

type ObjectResponse<T> = { [key: string]: T };

interface BlogsTemplateTypes {
  posts: Array<ObjectResponse<any>>;
  categories: CategoriesResponse;
  category: CategoryResponse;
  pageMore: boolean;
  pageLoading: boolean;
  loadNextPage(event: MouseEvent<HTMLElement>): void;
  subscribe(): void;
}

const CategoryTemplate: NextPage<BlogsTemplateTypes> = ({ posts, categories, loadNextPage, pageMore, pageLoading, category, subscribe }) => {
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

  const CategoryInformation = () => {
    return (
      <>
        <aside className="col-sm-12">
          <h1 className="vazir">Category: {category.category_info.title}</h1>
          <div className="space20"></div>
          <p className="category-side-short_description vazir">{category.category_info.short_description}</p>
          <div className="space20"></div>

          <a className="btn btn-outline-secondary btn-lg" onClick={subscribe}>Subscribe</a>
        </aside>
        <div className="space30"></div>
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
  );
};

export default CategoryTemplate;
