import { CATEGORY_ADD } from '@/redux/constants';
const userState = {
  categories: {},
};
export const CategoryAddReducer = (state = userState, action: any) => {
  switch (action.type) {
    case CATEGORY_ADD:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
