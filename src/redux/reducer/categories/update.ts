import { CATEGORY_UPDATE } from '@/redux/constants';
const userState = {
  categories: [],
};
export const CategoryUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case CATEGORY_UPDATE:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
