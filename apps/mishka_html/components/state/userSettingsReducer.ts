export const INITIAL_STATE = {
  userTokensState: [],
  tokenToggle: false,
  activeToggle: false,
  deactiveToggle: false,
};

export const userSettingReducer = (state: any, action: {type: string, payload: boolean | any[]}) => {
  switch (action.type) {
    case 'SET_USER_TOKENS':
      return { ...state, userTokensState: action.payload };
    case 'SET_TOKEN_TOGGLE':
      return { ...state, tokenToggle: action.payload };
    case 'SET_ACTIVE_TOGGLE':
      return { ...state, activeToggle: action.payload };
    case 'SET_DEACTIVE_TOGGLE':
      return { ...state, deactiveToggle: action.payload };
    default:
      state;
  }
};
