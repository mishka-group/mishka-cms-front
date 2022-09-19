export interface UserSettingTypes {
  userTokensState: any[] | never[];
  tokenToggle: boolean;
  activeToggle: boolean;
  deactiveToggle: boolean;
}

export const INITIAL_STATE: UserSettingTypes = {
  userTokensState: [],
  tokenToggle: false,
  activeToggle: false,
  deactiveToggle: false,
};

enum UserSettingActionTypes {
  SET_USER_TOKENS = 'SET_USER_TOKENS',
  SET_TOKEN_TOGGLE = 'SET_TOKEN_TOGGLE',
  SET_ACTIVE_TOGGLE = 'SET_ACTIVE_TOGGLE',
  SET_DEACTIVE_TOGGLE = 'SET_DEACTIVE_TOGGLE',
}

interface UserAction {
  type: UserSettingActionTypes;
  payload: any[];
  status: boolean;
}

/**
 * It takes in a state and an action, and returns a new state based on the action type
 * @param {UserSettingTypes} state - UserSettingTypes
 * @param {UserAction} action - UserAction
 * @returns The state is being returned.
 */
export const userSettingReducer = (state: UserSettingTypes, action: UserAction) => {
  switch (action.type) {
    case UserSettingActionTypes.SET_USER_TOKENS:
      return { ...state, userTokensState: action.payload };
    case UserSettingActionTypes.SET_TOKEN_TOGGLE:
      return { ...state, tokenToggle: action.status };
    case UserSettingActionTypes.SET_ACTIVE_TOGGLE:
      return { ...state, activeToggle: action.status };
    case UserSettingActionTypes.SET_DEACTIVE_TOGGLE:
      return { ...state, deactiveToggle: action.status };
    default:
      return state;
  }
};
