import { USER_LOGIN } from '@/redux/constants';
const userState = {
  userToken: {},
};
export const LoginReducer = (state = userState, action: any) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        userToken: action.userToken,
      };
    default:
      return state;
  }
};
