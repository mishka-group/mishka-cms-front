import type { NextPage } from 'next';
import React, { useState } from 'react';

// This type helps us to prevent duplicating AlertType in the whole file
export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
// This type is for React.createContext and it is a main structuer for local useState
type StateStructuerType = {
  alert: {
    status: boolean;
    alertMessage: string;
    alertType: AlertType;
  };
  setAlertState(status: boolean, alertMessage: string, alertType: AlertType): void;
  clearAlertState(): void;
};
// For managing useState properties, this type was created to pick off some properties and prevent duplicating
type SetAlertType = StateStructuerType['alert'];

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
  const [alert, setAlert] = useState<SetAlertType>({ status: false, alertMessage: '', alertType: 'info' });

  /**
   * It sets the state of the alert. Set a new alert into ClientAlertState context.
   * @param {boolean} status - boolean - This is the status of the alert. If it's true, the alert will
   * be shown. If it's false, the alert will be hidden.
   * @param {string} alertMessage - The message you want to display in the alert.
   * @param {AlertType} alertType - AlertType - This is an enum that I created to define the type of
   * alert.
   */
  const setAlertState = (status: boolean, alertMessage: string, alertType: AlertType) => {
    setAlert({ status: status, alertMessage: alertMessage, alertType: alertType });
  };

  /**
   * It sets the alert state to false, and clears the alert message and alert type
   * clean existed alert into ClientAlertState context
   */
  const clearAlertState = () => {
    setAlert({ status: false, alertMessage: '', alertType: 'info' });
  };

  // Creating a ready template to apply Context Provider. Because it is used in the entire system, it is called in the _app file.
  return <ClientAlertState.Provider value={{ alert, setAlertState, clearAlertState }}>{children}</ClientAlertState.Provider>;
};

export default ClientAlertStateProvider;
