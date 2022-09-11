import type { NextPage } from 'next';
import React, { useState } from 'react';

type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type StateStructuerType = {
  alert: {
    status: boolean;
    alertMessage: string;
    alertType: AlertType;
  };
  setAlertState(status: boolean, alertMessage: string, alertType: AlertType): void;
  clearAlertState(): void;
};

type setAlertType = StateStructuerType['alert'];

// This is our Alert state schema
const stateStructuer: StateStructuerType = {
  alert: {
    status: false,
    alertMessage: '',
    alertType: 'info',
  },
  setAlertState: (status: boolean, alertMessage: string, alertType: AlertType) => {},
  clearAlertState: () => {},
};

export const ClientAlertState = React.createContext(stateStructuer);

// This is our Alert state context for query
// ---------------------
// Our resource:
// - https://dev.to/ramonak/react-context-api-updating-context-from-a-nested-component-in-functional-components-with-hooks-and-class-components-a7a
// - https://dmitripavlutin.com/react-context-and-usecontext/
// - https://stackoverflow.com/questions/68691724/usecontext-working-not-working-with-nested-component
// - https://danspratling.dev/blog/managing-nested-state-with-usecontext
// ---------------------

const ClientAlertStateProvider: NextPage<{ children: JSX.Element }> = ({ children }) => {
  // This is the local state and action function to bind the state concerned, it is same like stateStructuer schema but without setter functions
  const [alert, setAlert] = useState<setAlertType>({ status: false, alertMessage: '', alertType: 'info' });

  // Set a new alert into ClientAlertState context
  const setAlertState = (status: boolean, alertMessage: string, alertType: AlertType) => {
    setAlert({ status: status, alertMessage: alertMessage, alertType: alertType });
  };

  // clean existed alert into ClientAlertState context
  const clearAlertState = () => {
    setAlert({ status: false, alertMessage: '', alertType: 'info' });
  };

  // Creating a ready template to apply Context Provider. Because it is used in the entire system, it is called in the _app file.
  return <ClientAlertState.Provider value={{ alert, setAlertState, clearAlertState }}>{children}</ClientAlertState.Provider>;
};

export default ClientAlertStateProvider;
