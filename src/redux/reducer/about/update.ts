import { ABOUT_UPDATE } from '@/redux/constants';
const userState = {
  about: [],
};
export const AboutUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ABOUT_UPDATE:
      return {
        about: action.about,
      };
    default:
      return state;
  }
};
