import type { NextPage } from 'next';
import styles from './ClinetMainMenu.module.css';
import ClientMainMenuItem from './ClientMainMenuItem';
import CollapseButton from '../../UIs/CollapseButton';

type ClientMenuType = { active: string };

// TODO: change link and li to another componnet and using link
const ClinetMainMenu: NextPage<ClientMenuType> = ({ active }): JSX.Element => {
  // TODO: If the MishkaCMS creats a menu manager we should change it with api in the future
  const menus = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'Blog', link: '/blogs' },
    { id: 3, name: 'Login', link: '/auth/login' },
  ];

  // We need to have 2 color for body, the first one for Client side and the another one for Admin side
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
                <CollapseButton
                  target="navbarText"
                  expanded={false}
                  label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </CollapseButton>

                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    {menus.map(({ id, name, link }) => (
                      <ClientMainMenuItem
                        key={id}
                        active={active === name ? true : false}
                        title={name}
                        link={link}
                      />
                    ))}
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
