import { CHANGE_COLLAPSED } from '@/redux/constants';
const userState = {
  isCollapsed: false,
};
export const SideMenuStateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case CHANGE_COLLAPSED:
      return {
        isCollapsed: !state.isCollapsed,
      };
    default:
      return state;
  }
};
