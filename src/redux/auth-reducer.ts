// @ts-nocheck
import { httpAuthorized } from "../utils";
export type AuthUserActionType = {
  type: "SET-USER-INFO";
  user_id: string;
};

export type LogoutUserActionType = {
  type: "LOGOUT-USER";
  user_id: string;
};

export type UserInfoType = {
  user_id: string;
  email: string;
  username: string;
  statusCode: number;
};

type ActionsType = AuthUserActionType | LogoutUserActionType;

const initialState = {
  userInfo: { statusCode: 401 },
};
export const authReducer = (
  state = initialState,
  action: ActionsType
): Array<UserInfoType> => {
  switch (action.type) {
    case "SET-USER-INFO": {
      return { ...state, userInfo: action.userInfo };
    }
    case "LOGOUT-USER": {
      return { ...state, userInfo: action.userInfo };
    }
  }
  return state;
};

export const authUserAC = () => {
  return (dispatch) => {
    httpAuthorized("/auth")
      .then((userInfo) => {
        dispatch(setUserInfoAC(userInfo));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
export const setUserInfoAC = (userInfo: UserInfoType): AuthUserActionType => {
  return {
    type: "SET-USER-INFO",
    userInfo,
  };
};
export const logoutUserAC = (): LogoutUserActionType => {
  return {
    type: "LOGOUT-USER",
    userInfo: { statusCode: 401 },
  };
};
