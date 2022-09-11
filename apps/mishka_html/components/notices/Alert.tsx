import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { ClientAlertState } from '../state/ClientAlertState';

const Alert: NextPage = () => {
  // We deleted Context customer because our function uses useContext in functional component
  const { alert, clearAlertState } = useContext(ClientAlertState);

  // This hook can help us to remove an alert after a Timeout, and we can some log sender in the future version.
  useEffect(() => {
    if (alert.status) {
      setTimeout(() => {
        clearAlertState();
      }, 50000);
    }
  }, [alert]);

  return (
    <>
      {alert.status && (
        <div onClick={clearAlertState} className={`col-md-12 container alert alert-${alert.alertType} alert-component`} role="alert">
          {alert.alertMessage}
          <button onClick={clearAlertState} type="button" className="btn-close float-end"></button>
        </div>
      )}
    </>
  );
};

export default Alert;
