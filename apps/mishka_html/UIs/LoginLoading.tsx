import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ClientAlertState } from '../../mishka_html/components/state/ClientAlertState';

type LoginLoadingType = {
  msg?: string;
  timeout?: number
}
const LoginLoading: NextPage<LoginLoadingType> = (props) => {
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlertState(true, props.msg ? props.msg : 'You are already logged in', 'warning');
      router.replace('/');
    }, props.timeout ? props.timeout : 1000);

    return () => {
      clearTimeout(timeOut);
    };
  });

  return (
    <>
      <style jsx global>{`
        body {
          background: #40485d !important;
        }
        .spinner-grow {
          width: 15rem;
          height: 15rem;
          margin-top: 30px;
        }
      `}</style>
      <h1 className="text-center">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <div className="space20"></div>
        Loading...
      </h1>
    </>
  );
};

export default LoginLoading;
