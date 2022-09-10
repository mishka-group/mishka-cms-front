import type { NextPage } from 'next';
import React, { useState } from 'react';

const stateStructuer = {
  alert: {
    status: false,
    alertMessage: '',
    alertType: 'info',
  },
  setAlertState: (status: boolean, alertMessage: string, alertType: string) => {},
};
export const ClientAlertState = React.createContext(stateStructuer);

const ClientAlertStateProvider: NextPage<{ children: JSX.Element }> = ({ children }) => {
  const [alert, setStatus] = useState({ status: false, alertMessage: '', alertType: 'info' });

  const setAlertState = (status: boolean, alertMessage: string, alertType: string) =>
    setStatus({ status: status, alertMessage: alertMessage, alertType: alertType });

  return <ClientAlertState.Provider value={{ alert, setAlertState }}>{children}</ClientAlertState.Provider>;
};

export default ClientAlertStateProvider;
