import { CATEGORY_DELETE } from '@/redux/constants';
const userState = {
  categoryId: '',
};
export const CategoryDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case CATEGORY_DELETE:
      return {
        categoryId: action.categoryId,
      };
    default:
      return state;
  }
};
