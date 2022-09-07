import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import type { NextPage } from 'next';
import Image from 'next/image';
import loginImage from '../../../../../public/icons8-login-as-user-80.png';
import TextField from '../../../UIs/TextField';
import PasswordField from '../../../UIs/PasswordField';

// We do not use Layout concept, because it is not useful for the project has many different globally UIs
// But the stuff like {<MainHeader /> etc} can be merged into another file to prevent copy and pasting
// But we cover this as a concept to let another program use it if they want
const LoginTemplates: NextPage = (props) => {
  // TODO: token or user session exist?
  // TODO: if exist is valid? based on accsess token time
  // TODO: try to load Google recaptcha and CSRF with next or with server API in next version
  // TODO: useState for disable forme submit 
  // TODO: useRef to get form fields curent value
  return (
    <div id="clientMain" className="mb-5">
      <MainHeader />
      <ClinetMainMenu active="Login" />

      <div className="container">
        <section className="col mx-auto client-content">
          <div className="space40"></div>
          <main className="form-signin">
            <form id="ClientLoginForm">
              <Image src={loginImage} alt="Login" width={80} height={80} />
              <div className="space10"></div>
              <h1 className="h3 mb-3 fw-normal">Please Enter</h1>
              <div className="space40"></div>
              <div className="input-group input-group-lg ltr">
                <TextField name="email" placeholder="Email" type="email" />
              </div>
              <div className="space20"></div>
              <div className="input-group input-group-lg ltr">
                <PasswordField name="password" placeholder="Password"/>
              </div>
              <div className="form-error-tag">
                <div className="space20"></div>
                <div className="clearfix"></div>
              </div>
              <div className="space20"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Login To WebSite
              </button>
              <div className="space20"></div>
              <a className="btn btn-outline-info">Register</a>
              &nbsp;&nbsp;
              <a className="btn btn-outline-danger">Forget Password</a>
            </form>
          </main>

          <div className="space40"></div>
        </section>
      </div>
    </div>
  );
};

export default LoginTemplates;
