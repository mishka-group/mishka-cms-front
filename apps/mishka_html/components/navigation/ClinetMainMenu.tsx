import type { NextPage } from 'next';
import styles from './ClinetMainMenu.module.css';

const ClinetMainMenu: NextPage = () => {
  return (
    <>
      <style jsx global>{`
        body {
          background: #40485d !important;
        }
      `}</style>

      <div className="container">
        <section className={styles.clientMenu}>
          <hr className="menu-space-hr" />
          <div className={`row grid`}>
            <nav className="col-sm navbar main-client-navbar navbar-expand-lg">
              <div className="mt-3">
                <button
                  className="navbar-toggler navbar-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                  aria-controls="navbarText"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item client-menu-nav-item">
                      <a
                        className="nav-link client-menu-nav-link active"
                        href=""
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item client-menu-nav-item">
                      <a className="nav-link client-menu-nav-link" href="">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item client-menu-nav-item">
                      <a className="nav-link client-menu-nav-link" href="">
                        Login
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="col-sm-2 text-start notif-ico-main-block ltr">
              1
            </div>
          </div>
          <hr className="menu-space-hr" />
        </section>
      </div>
    </>
  );
};

export default ClinetMainMenu;
