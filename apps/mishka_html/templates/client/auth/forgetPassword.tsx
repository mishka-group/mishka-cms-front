import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Link from 'next/link';
import TextField from '../../../UIs/TextField';
import React, { FormEvent, RefObject } from 'react';

type RH = RefObject<HTMLInputElement>;

interface ForgetPasswordTemplateType {
  reset(event: FormEvent<HTMLFormElement>, email: RH): void;
}

const ForgetPasswordTemplate: NextPage<ForgetPasswordTemplateType> = (props) => {
  const emailRef: RH = React.createRef();

  return (
    <div id="clientMain" className="mb-5">
      <MainHeader />
      <ClinetMainMenu active="Login" />

      <div className="container">
        <section className="col mx-auto client-content">
          <div className="space40"></div>
          <main className="form-signin">
            <form id="ClientLoginForm" onSubmit={(event) => props.reset(event, emailRef)}>
              <div className="space40"></div>
              <div className="input-group input-group-lg ltr">
                <TextField name="email" placeholder="Your Email" type="email" ref={emailRef} />
              </div>
              <div className="space20"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Send
              </button>
              <div className="space20"></div>
              <Link href={'/auth/login'}>
                <a className="btn btn-outline-info">Back to Login</a>
              </Link>
              &nbsp;&nbsp;
              <Link href={'/auth/register'}>
                <a className="btn btn-outline-danger">Register</a>
              </Link>
            </form>
          </main>
          <div className="space40"></div>
        </section>
      </div>
    </div>
  );
};

export default ForgetPasswordTemplate;
