import type { NextPage } from 'next';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import MainHeader from '../../../UIs/MainHeader';
import PasswordField from '../../../UIs/PasswordField';
import TextField from '../../../UIs/TextField';
import loginImage from '../../../../../public/icons8-login-as-user-80.png';
import Image from 'next/image';

const SettingsTemplate: NextPage = () => {
  return (
    <div id="clientMain" className="mb-5">
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
                  <TextField name="fullName" placeholder="Change your Full name" type="email" required={true} />
                </div>
              </div>
              <button type="submit" className="col-sm-2 btn btn-primary mt-3">
                Change
              </button>
            </div>

            <div className="space40"></div>

            <div className="row">
              <label className="col-sm-12 form-label">Change Password:</label>
              <div className="col-sm-9 mt-3">
                <div className="input-group input-group-lg ltr">
                  <PasswordField name="currentPassword" placeholder="Put your current password" required={false} autoComplete="new-password" />
                </div>
                <br />
                <div className="input-group input-group-lg ltr">
                  <PasswordField name="newPassword" placeholder="Put your new password" required={false} autoComplete="new-password" />
                </div>
              </div>

              <button type="submit" className="col-sm-2 btn btn-primary mt-3">
                Change
              </button>
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
