import { SIGN_IN, SIGN_OUT } from "../actions/types.js";

const INTIAL_STATE = { isSignedIn: null, userId: null };

export const userReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { isSignedIn: false, userId: action.payload };
    default:
      return state;
  }
};
