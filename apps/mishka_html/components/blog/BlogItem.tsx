import type { NextPage } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';

type ObjectResponse<T> = { [key: string]: T };

const BlogItem: NextPage<ObjectResponse<any>> = ({ post, size }) => {
  return (
    <>
      <article className={`col-sm-${size} home-blog-posts-normal-with-body home-image-post`}>
        <article className="container-fluid home-image-post home-image-post">
          <Link href={`blog/${post.alias_link}`}>
            <a className="img-fluid client-home-normal-post-image">
              <Image src={`http://localhost:4000${post.main_image}`} alt={post.title} width="292" height="150" priority={true} />
            </a>
          </Link>

          <section className="col-sm-4 home-post-like-bookmarks">
            <div className="row">
              <div className="col-sm-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bookmark-check"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                  ></path>
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                </svg>
              </div>
              <div className="col-sm">
                <span className="badge bg-dark vazir client-blog-badge-category">
                  <Link href={`blog/category/${post.category_alias_link}`}>{post.category_title}</Link>
                </span>
              </div>
            </div>
          </section>

          <div className="space10"></div>
          <header className="home-blog-posts-normal-with-body-header bot-home-page-body">
            <h2 className="normal-home-posts-link">
              <Link href={`blog/${post.alias_link}`}>{post.title}</Link>
            </h2>
            <div className="space20"></div>
            {post.short_description}
          </header>
          <div className="space20"></div>
          <footer className="home-blog-posts-normal-with-body-footer">
            <div className="speacer10"> </div>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
              </svg>
              &nbsp; Updated at: <span>{post.updated_at}</span>
            </p>

            <div className="speacer10"> </div>
            <div>
              <span className='text-start'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-thermometer-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"></path>
                  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"></path>
                </svg>
                &nbsp; Priority: {post.priority}
              </span>

              <span>
                <span className="text-end float-right ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-suit-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"></path>
                  </svg>
                  &nbsp; {post.like_count}
                </span>
              </span>
            </div>

            <div className="space10"></div>
          </footer>
        </article>
        <div className="space10"></div>
      </article>
    </>
  );
};

export default BlogItem;
