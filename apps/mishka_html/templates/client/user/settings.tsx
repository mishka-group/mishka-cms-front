import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { createRef, RefObject, useEffect, FormEvent } from 'react';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import MainHeader from '../../../UIs/MainHeader';
import PasswordField from '../../../UIs/PasswordField';
import TextField from '../../../UIs/TextField';
import HeadTags from '../../../components/header/HeadTags';

type RH = RefObject<HTMLInputElement>;

interface SettingsTemplateTypes {
  editProfile(fullName: RH): void;
  changePassword(event: FormEvent<HTMLFormElement>, oldPassword: RH, newPassword: RH): void;
  showTokens(): void;
  deleteTokens(): void;
  deactive(): void;
  activeAccount(): void;
  confirmActiveAccount(code: RH): void;
  userTokes: any[];
  tokenToggle: boolean;
  activeToggle: boolean;
  confirmDeactiveAccount(code: RH): void;
  deactiveToggle: boolean;
}

const SettingsTemplate: NextPage<SettingsTemplateTypes> = ({
  editProfile,
  changePassword,
  showTokens,
  deactive,
  deleteTokens,
  userTokes,
  tokenToggle,
  activeAccount,
  confirmActiveAccount,
  activeToggle,
  confirmDeactiveAccount,
  deactiveToggle,
}) => {
  const { data: session } = useSession();
  const fullNameRef: RH = createRef();
  const oldPasswordRef: RH = createRef();
  const newPasswordRef: RH = createRef();
  const activeCodeRef: RH = createRef();
  const deactiveCodeRef: RH = createRef();

  const metaTags = {
    title: `UserSettings - MishkaCMS`,
    description: `This is UserSettings`,
    keywords: `This is UserSettings keywords}`,
    url: `http://localhost:3000/user/settings`,
    image: `http://localhost:4000/images/icons8-login-as-user-80.png`,
  };

  /* Good for UX, let user see his name if he/her, if he/her wants so changes it, after changing the
  name and submit the page will be reloaded */
  useEffect(() => {
    // It is good for UX, let user see his name if he/her, if he/her wants so changes it, after changing the name and submit the page will be reloaded
    (document.getElementById('fullName') as HTMLInputElement).value = session?.user?.name || '';
  }, []);

  /**
   * It's a function that returns a div with a label, a text field, and a button
   * @returns A react component that contains a form to confirm deactivation of an account.
   */
  const ConfirmDectivationCode = () => {
    return (
      <>
        <div className="col-sm-6 container">
          <div className="space40"></div>
          <div className="row">
            <label className="col-sm-12 form-label">Deactivation Code:</label>
            <div className="col-sm-9 mt-3">
              <div className="input-group input-group-lg ltr">
                <TextField name="code" placeholder="Enter your activation code" ref={deactiveCodeRef} type="text" required={true} />
              </div>
            </div>
            <button
              id="changeNameButton"
              onClick={() => confirmDeactiveAccount(deactiveCodeRef)}
              name="changeNameButton"
              className="col-sm-2 btn btn-primary mt-3"
            >
              Change
            </button>
          </div>
          <div className="space40"></div>
        </div>
      </>
    );
  };

  const ConfirmActivationCode = () => {
    return (
      <>
        <div className="col-sm-6 container">
          <div className="space40"></div>
          <div className="row">
            <label className="col-sm-12 form-label">Activation Code:</label>
            <div className="col-sm-9 mt-3">
              <div className="input-group input-group-lg ltr">
                <TextField name="code" placeholder="Enter your activation code" ref={activeCodeRef} type="text" required={true} />
              </div>
            </div>
            <button
              id="changeNameButton"
              onClick={() => confirmActiveAccount(activeCodeRef)}
              name="changeNameButton"
              className="col-sm-2 btn btn-primary mt-3"
            >
              Change
            </button>
          </div>
          <div className="space40"></div>
        </div>
      </>
    );
  };

  const ShowUserTokns = () => {
    return (
      <>
        <div className="col-sm-8 container">
          <div className="space40"></div>
          <div className="col container tokens-table">
            <div className="col text-end">
              <a className="btn btn-outline-danger" onClick={() => deleteTokens()}>
                Revoke all tokens
              </a>
            </div>
            <div className="space20"></div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Expire time</th>
                  <th scope="col">Create time</th>
                  <th scope="col">Last used</th>
                  <th scope="col">Type</th>
                  <th scope="col">OS</th>
                </tr>
              </thead>
              <tbody>
                {userTokes &&
                  userTokes.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{item.access_expires_in}</td>
                      <td>{item.create_time}</td>
                      <td>{item.last_used}</td>
                      <td>{item.os}</td>
                      <td>{item.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="space40"></div>
        </div>
      </>
    );
  };

  return (
    <>
      <HeadTags {...metaTags} />

      <div id="clientSettings" className="mb-5">
        <MainHeader />
        <ClinetMainMenu active="Settings" />
        <div className="container">
          <section className="col mx-auto client-content">
            <Alert />
            <div className="space40"></div>
            <div className="col-sm-6 container">
              <div className="text-center">
                <h1>User Settings</h1>
                <div className="bd-callout bd-callout-info">
                  On this page, you can change your user information and also view some information about your account.
                </div>
              </div>
              <div className="space20"></div>
              <div className="row">
                <label className="col-sm-12 form-label">Full Name:</label>
                <div className="col-sm-9 mt-3">
                  <div className="input-group input-group-lg ltr">
                    <TextField name="fullName" placeholder="Change your Full name" ref={fullNameRef} type="text" required={true} />
                  </div>
                </div>
                <button
                  id="changeNameButton"
                  onClick={() => editProfile(fullNameRef)}
                  name="changeNameButton"
                  className="col-sm-2 btn btn-primary mt-3"
                >
                  Change
                </button>
              </div>

              <div className="space40"></div>

              <div className="row">
                <label className="col-sm-12 form-label">Change Password:</label>
                <form onSubmit={(event) => changePassword(event, oldPasswordRef, newPasswordRef)}>
                  {/* It is because we want to clear warning from chrome */}
                  <input hidden type="text" id="username" name="username" autoComplete="username" />
                  <div className="col-sm-9 mt-3">
                    <div className="input-group input-group-lg ltr">
                      <PasswordField
                        name="currentPassword"
                        placeholder="Put your current password"
                        ref={oldPasswordRef}
                        required={false}
                        autoComplete="new-password"
                      />
                    </div>
                    <br />
                    <div className="input-group input-group-lg ltr">
                      <PasswordField
                        name="newPassword"
                        placeholder="Put your new password"
                        ref={newPasswordRef}
                        required={false}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <button type="submit" className="col-sm-2 btn btn-primary mt-3">
                    Change
                  </button>
                </form>
              </div>
            </div>

            <div className="space40"></div>

            <div className="col-sm-6 container">
              <div className="row">
                <button onClick={showTokens} type="submit" className="col-sm-4 btn btn-outline-danger mt-3">
                  Show Your tokens
                </button>
                <div className="col-sm"></div>
                <button onClick={activeAccount} type="submit" className="col-sm-3 btn btn-outline-warning mt-3">
                  Active Account
                </button>
                <div className="col-sm"></div>
                <button onClick={deactive} type="submit" className="col-sm-4 btn btn-outline-light mt-3">
                  Deactive Account
                </button>
              </div>
            </div>

            {tokenToggle && userTokes && userTokes.length > 0 && <ShowUserTokns />}
            {activeToggle && <ConfirmActivationCode />}
            {deactiveToggle && <ConfirmDectivationCode />}

            <div className="space40"></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SettingsTemplate;
