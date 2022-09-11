import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Link from 'next/link';
import Image from 'next/image';
import loginImage from '../../../../../public/icons8-login-as-user-80.png';
import TextField from '../../../UIs/TextField';
import PasswordField from '../../../UIs/PasswordField';
import React, { FormEvent, RefObject } from 'react';
import ClientAlert from '../../../components/notices/clientAlert';

type RH = RefObject<HTMLInputElement>;

interface RegisterTemplateType {
  register(event: FormEvent<HTMLFormElement>, fullName: RH, username: RH, email: RH, password?: RH): void;
  formError: any
}

const RegisterTemplate: NextPage<RegisterTemplateType> = (props) => {
  const fullNameRef: RH = React.createRef();
  const usernameRef: RH = React.createRef();
  const emailRef: RH = React.createRef();
  const passwordRef: RH = React.createRef();

  return (
    <div id="clientMain" className="mb-5">
      <MainHeader />
      <ClinetMainMenu active="Login" />

      <div className="container">
        <section className="col mx-auto client-content">
          <ClientAlert />
          <div className="space40"></div>
          <main className="form-signin">
            <form id="ClientLoginForm" onSubmit={(event) => props.register(event, fullNameRef, usernameRef, emailRef, passwordRef)}>
              <Image src={loginImage} alt="Login" width={80} height={80} />
              <div className="space10"></div>
              <h1 className="h3 mb-3 fw-normal">Create a new user account</h1>
              <div className="space40"></div>
              <div className="input-group input-group-lg ltr">
                <TextField name="fullName" placeholder="Your Full name" type="text" ref={fullNameRef} />
              </div>
              <div className="space20"></div>
              <div className="input-group input-group-lg ltr">
                <TextField name="username" placeholder="Your Username" type="text" ref={usernameRef} />
              </div>
              <div className="space20"></div>
              <div className="input-group input-group-lg ltr">
                <TextField name="email" placeholder="Your Email" type="email" ref={emailRef} />
              </div>
              <div className="space20"></div>
              <div className="input-group input-group-lg ltr">
                <PasswordField name="password" placeholder="Your Password" ref={passwordRef} />
              </div>
              <div className="form-error-tag">
                <div className="space20"></div>
                <div className="clearfix"></div>
              </div>
              <div className="space20"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Register
              </button>
              <div className="space20"></div>
              <Link href={'/auth/login'}>
                <a className="btn btn-outline-info">Back to Login</a>
              </Link>
              &nbsp;&nbsp;
              <Link href={'/auth/reset'}>
                <a className="btn btn-outline-danger">Forget Password</a>
              </Link>
            </form>
          </main>
          <div className="space40"></div>
        </section>
      </div>
    </div>
  );
};

export default RegisterTemplate;
