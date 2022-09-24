import type { NextPage } from 'next';

type ObjectResponse = { [key: string]: string | number };

const CategoriesMenu: NextPage<any> = ({ categories }) => {
  return (
    <>
      <aside className="col-sm-3 blog-menues">
        <div className="container category rtl vazir">
          <div className="speacer40"> </div>
          <div className="clearfix"> </div>
          <span className="float-start">
            <i className="fa fa-bars" aria-hidden="true"></i>Categories
          </span>
          <span className="float-end text-start">Posts</span>
          <div className="clearfix"> </div>
          <hr />
          <div className="speacer10"> </div>
          <div className="clearfix"> </div>

          {categories.categories.map((item: ObjectResponse) => (
            <div className="row category-li-bt" key={item.category_id}>
              <div className="col-sm cat-badges text-end">{item.post_count}</div>
              <div className="col-sm text-start">
                <a href="/blog/category/">{item.category_title}</a>
              </div>
            </div>
          ))}

          <div className="speacer10"> </div>
          <div className="clearfix"> </div>
        </div>
      </aside>
    </>
  );
};

export default CategoriesMenu;
