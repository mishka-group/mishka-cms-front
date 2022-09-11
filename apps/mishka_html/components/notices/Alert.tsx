import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { ClientAlertState } from '../state/ClientAlertState';

const Alert: NextPage = () => {
  // We deleted Context customer because our function uses useContext in functional component
  const { alert, clearAlertState } = useContext(ClientAlertState);

  // This hook can help us to remove an alert after a Timeout, and we can some log sender in the future version.
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (alert.status) {
      timeOut = setTimeout(() => {
        clearAlertState();
      }, 30000);
    }
    // This is cleanup for timeout to help you clean memory and rebind new timeout if you have new flash message
    return () => {
      clearTimeout(timeOut);
    };
  }, [alert]);

  // After determining an alert as a message or error, user can clean the state with click on a message or close button.
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
