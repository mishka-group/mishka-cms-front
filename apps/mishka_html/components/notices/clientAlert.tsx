import { useContext } from 'react';
import {ClientAlertState} from '../state/ClientAlertState';

const ClientAlert = () => {
  const { alert } = useContext(ClientAlertState);

  return (
    <>
      {alert.status && <div className={`alert alert-${alert.alertType}`} role="alert">
        {alert.alertMessage}
      </div>}
    </>
  );
};

export default ClientAlert;
