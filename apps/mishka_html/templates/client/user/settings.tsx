import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { createRef, RefObject, useEffect, FormEvent } from 'react';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import MainHeader from '../../../UIs/MainHeader';
import PasswordField from '../../../UIs/PasswordField';
import TextField from '../../../UIs/TextField';

type RH = RefObject<HTMLInputElement>;

interface SettingsTemplateTypes {
  editProfile(fullName: RH): void;
  changePassword(event: FormEvent<HTMLFormElement>, oldPassword: RH, newPassword: RH): void;
  showTokens(): void;
  deleteToken(token: string): void;
  deactive(): void;
}

const SettingsTemplate: NextPage<SettingsTemplateTypes> = ({ editProfile, changePassword }) => {
  const { data: session } = useSession();
  const fullNameRef: RH = createRef();
  const oldPasswordRef: RH = createRef();
  const newPasswordRef: RH = createRef();

  useEffect(() => {
    // It is good for UX, let user see his name if he/her, if he/her wants so changes it, after changing the name and submit the page will be reloaded
    (document.getElementById('fullName') as HTMLInputElement).value = session?.user?.name || '';
  }, []);

  return (
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
                    <PasswordField name="currentPassword" placeholder="Put your current password" ref={oldPasswordRef} required={false} autoComplete="new-password" />
                  </div>
                  <br />
                  <div className="input-group input-group-lg ltr">
                    <PasswordField name="newPassword" placeholder="Put your new password" ref={newPasswordRef} required={false} autoComplete="new-password" />
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
              <button type="submit" className="col-sm-5 btn btn-outline-danger mt-3">
                Show Your tokens
              </button>
              <div className="col-sm"></div>
              <button type="submit" className="col-sm-5 btn btn-outline-light mt-3">
                Deactive Account
              </button>
            </div>
          </div>

          <div className="space40"></div>
        </section>
      </div>
    </div>
  );
};

export default SettingsTemplate;
