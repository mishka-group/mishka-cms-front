import type { NextPage } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';

type ObjectResponse<T> = { [key: string]: T };

const BlogFeaturedItems: NextPage<ObjectResponse<any>> = ({ posts }) => {
  return (
    <>
      <div className="row">
        <article className="col-sm-6 top-home-page-normal-post-article">
          <article className="container-fluid home-image-post rtl client-home-featured-post-article">
            <Link href={`blog/${posts[0].alias_link}`}>
              <a className="img-fluid client-home-featured-post-image">
                <Image
                  src={`http://localhost:4000${posts[0].main_image}`}
                  alt={posts[0].title}
                  id={posts[0].id}
                  width="620"
                  height="330"
                  priority={true}
                />
              </a>
            </Link>

            <section className="home-post-like-bookmarks-header-type-banner">
              <Link href={`blog/${posts[0].alias_link}`}>
                <a>
                  <div className="col-sm-2 client-home-like-bookmark">
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

                    <span className="text-left float-left  ">
                      {posts[0].like_count}
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
                    </span>
                  </div>
                  <div className="space10"></div>
                </a>
              </Link>

              <header className="home-blog-posts-normal-with-body-header">
                <h2 className="featured-posts-link">
                  <Link href={`blog/${posts[0].alias_link}`}>{posts[0].title}</Link>
                </h2>
                <div className="space10"></div>
                {posts[0].short_description}
              </header>
            </section>
          </article>
        </article>

        <article className="col-sm-6 top-home-page-normal-post-article">
          <div className="row">
            <article className="col-sm-6 rtl client-home-normal-post-article">
              <Link href={`blog/${posts[1].alias_link}`}>
                <a className="img-fluid client-home-normal-post-image">
                  <Image
                    src={`http://localhost:4000${posts[1].main_image}`}
                    alt={posts[1].title}
                    id={posts[1].id}
                    width="305"
                    height="150"
                    priority={true}
                  />
                </a>
              </Link>
              <section className="home-post-like-bookmarks-header-type">
                <Link href={`blog/${posts[1].alias_link}`}>
                  <a>
                    <div className="col-sm-3 client-home-like-bookmark">
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

                      <span className="text-left float-left  ">
                        {posts[1].like_count}
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
                      </span>
                    </div>
                    <div className="space10 title-spacer-top-home-articels"></div>
                  </a>
                </Link>
                <header className="home-blog-posts-normal-with-body-header">
                  <h2 className="featured-posts-link">
                    <Link href={`blog/${posts[1].alias_link}`}>{posts[1].title}</Link>
                  </h2>
                </header>
              </section>
            </article>

            <article className="col-sm-6 rtl client-home-normal-post-article">
              <Link href={`blog/${posts[2].alias_link}`}>
                <a className="img-fluid client-home-normal-post-image">
                  <Image
                    src={`http://localhost:4000${posts[2].main_image}`}
                    alt={posts[2].title}
                    id={posts[2].id}
                    width="305"
                    height="150"
                    priority={true}
                  />
                </a>
              </Link>
              <section className="home-post-like-bookmarks-header-type">
                <Link href={`blog/${posts[2].alias_link}`}>
                  <a>
                    <div className="col-sm-3 client-home-like-bookmark">
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

                      <span className="text-left float-left  ">
                        {posts[2].like_count}
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
                      </span>
                    </div>
                    <div className="space10 title-spacer-top-home-articels"></div>
                  </a>
                </Link>
                <header className="home-blog-posts-normal-with-body-header">
                  <h2 className="featured-posts-link">
                    <Link href={`blog/${posts[2].alias_link}`}>{posts[2].title}</Link>
                  </h2>
                </header>
              </section>
            </article>
          </div>

          <div className="space30 home-spacer-top-page"></div>

          <div className="row">
            <article className="col-sm-6  rtl client-home-normal-post-article">
              <Link href={`blog/${posts[3].alias_link}`}>
                <a className="img-fluid client-home-normal-post-image">
                  <Image
                    src={`http://localhost:4000${posts[3].main_image}`}
                    alt={posts[3].title}
                    id={posts[3].id}
                    width="305"
                    height="150"
                    priority={true}
                  />
                </a>
              </Link>
              <section className="home-post-like-bookmarks-header-type">
                <Link href={`blog/${posts[3].alias_link}`}>
                  <a>
                    <div className="col-sm-3 client-home-like-bookmark">
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

                      <span className="text-left float-left  ">
                        {posts[3].like_count}
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
                      </span>
                    </div>
                    <div className="space10 title-spacer-top-home-articels"></div>
                  </a>
                </Link>
                <header className="home-blog-posts-normal-with-body-header">
                  <h2 className="featured-posts-link">
                    <Link href={`blog/${posts[3].alias_link}`}>{posts[3].title}</Link>
                  </h2>
                </header>
              </section>
            </article>

            <article className="col-sm-6  rtl client-home-normal-post-article">
              <Link href={`blog/${posts[4].alias_link}`} className="img-fluid client-home-normal-post-image">
                <a>
                  <Image
                    src={`http://localhost:4000${posts[4].main_image}`}
                    alt={posts[4].title}
                    id={posts[4].id}
                    width="305"
                    height="150"
                    priority={true}
                  />
                </a>
              </Link>
              <section className="home-post-like-bookmarks-header-type">
                <Link href={`blog/${posts[4].alias_link}`}>
                  <a>
                    <div className="col-sm-3 client-home-like-bookmark">
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

                      <span className="text-left float-left  ">
                        {posts[4].like_count}
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
                      </span>
                    </div>
                    <div className="space10 title-spacer-top-home-articels"></div>
                  </a>
                </Link>
                <header className="home-blog-posts-normal-with-body-header">
                  <h2 className="featured-posts-link">
                    <Link href={`blog/${posts[4].alias_link}`}>{posts[4].title}</Link>
                  </h2>
                </header>
              </section>
            </article>
          </div>
        </article>
      </div>
      <div className="space20"></div>
    </>
  );
};

export default BlogFeaturedItems;
