import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Link from 'next/link';
import Image from 'next/image';
import loginImage from '../../../../../public/icons8-login-as-user-80.png';
import TextField from '../../../UIs/TextField';
import PasswordField from '../../../UIs/PasswordField';
import React, { FormEvent, RefObject } from 'react';
import Alert from '../../../components/notices/Alert';
import HeadTags from '../../../components/header/HeadTags';

type RH = RefObject<HTMLInputElement>;

interface RegisterTemplateType {
  register(event: FormEvent<HTMLFormElement>, fullName: RH, username: RH, email: RH, password?: RH): void;
  formError: object;
  formChenge(event: FormEvent<HTMLFormElement>, fullName: RH, username: RH, email: RH): void;
}

const RegisterTemplate: NextPage<RegisterTemplateType> = ({ register, formError, formChenge }) => {
  const fullNameRef: RH = React.createRef();
  const usernameRef: RH = React.createRef();
  const emailRef: RH = React.createRef();
  const passwordRef: RH = React.createRef();

  const metaTags = {
    title: `Register - MishkaCMS`,
    description: `This is Register`,
    keywords: `This is Register keywords}`,
    url: `http://localhost:3000/auth/register`,
    image: `http://localhost:4000/images/icons8-login-as-user-80.png`,
  };

  return (
    <>
      <HeadTags {...metaTags} />
      <div id="clientMain" className="mb-5">
        <MainHeader />
        <ClinetMainMenu active="Login" />
        <div className="container">
          <section className="col mx-auto client-content">
            <Alert />
            <div className="space40"></div>
            <main className="form-signin">
              <form
                id="ClientLoginForm"
                className="needs-validation"
                onSubmit={(event) => register(event, fullNameRef, usernameRef, emailRef, passwordRef)}
                onChange={(event) => formChenge(event, fullNameRef, usernameRef, emailRef)}
              >
                <Image src={loginImage} alt="Login" width={80} height={80} />
                <div className="space10"></div>
                <h1 className="h3 mb-3 fw-normal">Create a new user account</h1>
                <div className="space40"></div>
                <div className="input-group input-group-lg ltr">
                  <TextField name="full_name" placeholder="Your Full name" type="text" ref={fullNameRef} formError={formError} required={true} />
                </div>
                <div className="space20"></div>
                <div className="input-group input-group-lg ltr">
                  <TextField name="username" placeholder="Your Username" type="text" ref={usernameRef} formError={formError} required={true} />
                </div>
                <div className="space20"></div>
                <div className="input-group input-group-lg ltr">
                  <TextField name="email" placeholder="Your Email" type="email" ref={emailRef} formError={formError} required={true} />
                </div>
                <div className="space20"></div>
                <div className="input-group input-group-lg ltr">
                  <PasswordField name="password" placeholder="Your Password" ref={passwordRef} formError={formError} required={false} />
                </div>
                <div className="form-error-tag">
                  <div className="space20"></div>
                  <div className="clearfix"></div>
                </div>
                <div className="space20"></div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" id="registerButton" disabled>
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
    </>
  );
};

export default RegisterTemplate;
