import { LOGINOUT } from '@/redux/constants';
const userState = {
  userinfo: {},
};
export const LoginOutReducer = (state = userState, action: any) => {
  switch (action.type) {
    case LOGINOUT:
      return {
        userinfo: action.userinfo,
      };
    default:
      return state;
  }
};
