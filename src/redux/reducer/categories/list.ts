import { CATEGORY_LIST } from '@/redux/constants';
const userState = {
  categories: [],
};
export const CategoriesReducer = (state = userState, action: any) => {
  switch (action.type) {
    case CATEGORY_LIST:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
