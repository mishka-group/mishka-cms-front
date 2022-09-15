import type { NextPage } from 'next';
import styles from './ClinetMainMenu.module.css';
import ClientMainMenuItem from './ClientMainMenuItem';
import CollapseButton from '../../UIs/CollapseButton';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logout } from '../../../mishka_user/userAuthentication';
import { useContext, useEffect } from 'react';
import { ClientAlertState } from '../../../mishka_html/components/state/ClientAlertState';
import { clientSideSessionAction } from '../../../mishka_user/helper/authHelper';

type ClientMenuType = { active: string };

// TODO: change link and li to another componnet and using link
const ClinetMainMenu: NextPage<ClientMenuType> = ({ active }): JSX.Element => {
  const { data: session, status } = useSession();
  const { setAlertState, alert } = useContext(ClientAlertState);
  const { pathname } = useRouter();
  const router = useRouter();

  // TODO: If the MishkaCMS creats a menu manager we should change it with api in the future
  const menus = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'Blog', link: '/blogs' },
  ];

  const loginPreventer = ['/auth/login', '/auth/register', '/auth/reset'];

  // This way can help us to remove duplicate code in each file that needs to be checked,
  // This just runs once when we need to render whole the component
  useEffect(() => {
    async function activeSession(session: any, router: any, setAlertState: any) {
      await clientSideSessionAction(session, router, setAlertState);
    }

    if (session) {
      return () => {
        activeSession(session, router, setAlertState);
      };
    }
  }, []);

  // We send refresh token to server for logout action, and it deletes all access token of this refresh token which are alive
  const logOut = async () => {
    if (session && session.refresh_token) {
      logout(session.refresh_token as string);
    }
    await signOut({ callbackUrl: '/auth/login', redirect: true });
  };

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
                <CollapseButton target="navbarText" expanded={false} label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </CollapseButton>

                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    {menus.map(({ id, name, link }) => (
                      <ClientMainMenuItem key={id} active={active === name ? true : false} title={name} link={link} />
                    ))}

                    {/* We need login and Logout are allways part of the main menu, so we do not need to pass it into menu item */}
                    {session ? (
                      <li className="nav-item client-menu-nav-item" onClick={logOut}>
                        <a className="nav-link client-menu-nav-link">Logout</a>
                      </li>
                    ) : (
                      <li className="nav-item client-menu-nav-item">
                        <Link href="/auth/login">
                          <a className={`nav-link client-menu-nav-link ${loginPreventer.includes(pathname) ? 'active' : ''}`}>Login</a>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
            <div className="col-sm-2 text-start notif-ico-main-block ltr">{session && '1'}</div>
          </div>
          <hr className="menu-space-hr" />
        </section>
      </div>
    </>
  );
};

export default ClinetMainMenu;
