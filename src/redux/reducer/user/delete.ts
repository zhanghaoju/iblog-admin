import { USER_DELETE } from '@/redux/constants';
const userState = {
  userId: '',
};
export const UserDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case USER_DELETE:
      return {
        userId: action.userId,
      };
    default:
      return state;
  }
};
