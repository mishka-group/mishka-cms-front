import { useContext, useEffect } from 'react';
import {ClientAlertState} from '../state/ClientAlertState';

const ClientAlert = () => {
  const { alert, clearAlertState } = useContext(ClientAlertState);

  // This hook can help us to remove an alert after a Timeout, and we can some log sender in the future version.
  useEffect(() => {
    if (alert.status) {
      setTimeout(() => {
        clearAlertState()
      }, 50000);
    }
  }, [alert])

  // After determining an alert as a message or error, user can clean the state with click on a message or close button.
  return (
    <>
      {alert.status && <div onClick={clearAlertState} className={`col-md-12 container alert alert-${alert.alertType} alert-component`} role="alert">
        {alert.alertMessage}
        <button onClick={clearAlertState} type="button" className="btn-close float-end"></button>
      </div>}
    </>
  );
};

export default ClientAlert;