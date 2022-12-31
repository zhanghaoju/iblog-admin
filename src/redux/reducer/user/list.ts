import { USER_LIST } from '@/redux/constants';
const userState = {
  users: [],
};
export const UserListReducer = (state = userState, action: any) => {
  switch (action.type) {
    case USER_LIST:
      return {
        users: action.users,
      };
    default:
      return state;
  }
};
