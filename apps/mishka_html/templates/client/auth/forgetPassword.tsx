import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Link from 'next/link';
import TextField from '../../../UIs/TextField';
import React, { FormEvent, RefObject } from 'react';
import Alert from '../../../components/notices/Alert';
import PasswordField from '../../../UIs/PasswordField';

type RH = RefObject<HTMLInputElement>;

interface ForgetPasswordTemplateType {
  reset(event: FormEvent<HTMLFormElement>, email: RH): void;
  confirmReset(event: FormEvent<HTMLFormElement>, passwordRef: RH, codeRef: RH): void;
  back(): void;
  whichForm: boolean;
}

const ForgetPasswordTemplate: NextPage<ForgetPasswordTemplateType> = ({ reset, whichForm, confirmReset, back }) => {
  const emailRef: RH = React.createRef();
  const codeRef: RH = React.createRef();
  const passwordRef: RH = React.createRef();

  const SendResetPasswordForm = () => {
    return (
      <form id="ClientLoginForm" onSubmit={(event) => reset(event, emailRef)}>
        <div className="space40"></div>
        <div className="input-group input-group-lg ltr">
          <TextField name="email" placeholder="Your Email" type="email" ref={emailRef} required={true} />
        </div>
        <div className="space20"></div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" id="resetButton">
          Send
        </button>
      </form>
    );
  };

  const ConfirmResetPasswordForm = () => {
    return (
      <form id="ClientLoginForm" onSubmit={(event) => confirmReset(event, passwordRef, codeRef)}>
        <div className="space40"></div>
        <div className="input-group input-group-lg ltr">
          <TextField name="code" placeholder="Reset code" type="text" ref={codeRef} required={true} />
        </div>
        <div className="space20"></div>
        <div className="input-group input-group-lg ltr">
          <PasswordField name="password" placeholder="Your New Password" ref={passwordRef} required={true} autoComplete="new-password" />
        </div>
        <div className="space20"></div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" id="resetButton">
          Send
        </button>
      </form>
    );
  };

  return (
    <div id="clientMain" className="mb-5">
      <MainHeader />
      <ClinetMainMenu active="Login" />
      <div className="container">
        <section className="col mx-auto client-content">
          <Alert />
          <div className="space40"></div>
          <main className="form-signin">
            {whichForm ? <ConfirmResetPasswordForm /> : <SendResetPasswordForm />}
            <div className="space20"></div>
            <Link href={'/auth/login'}>
              <a className="btn btn-outline-info">Back to Login</a>
            </Link>
            &nbsp;&nbsp;
            <Link href={'/auth/register'}>
              <a className="btn btn-outline-danger">Register</a>
            </Link>
            &nbsp;&nbsp;
            {whichForm && (
              <a onClick={back} className="btn btn-outline-light">
                Back to Forget Password
              </a>
            )}
          </main>
          <div className="space40"></div>
        </section>
      </div>
    </div>
  );
};

export default ForgetPasswordTemplate;
