import type { NextPage } from 'next';

const LoginLoading: NextPage = () => {
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
