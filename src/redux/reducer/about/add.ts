import { ABOUT_ADD } from '@/redux/constants';
const userState = {
  about: {},
};
export const AboutAddReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ABOUT_ADD:
      return {
        about: action.about,
      };
    default:
      return state;
  }
};
