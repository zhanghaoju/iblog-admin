import { ARTICLE_DELETE } from '@/redux/constants';
const userState = {
  detail: [],
};
export const ArticleDetailReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_DELETE:
      return {
        detail: action.detail,
      };
    default:
      return state;
  }
};
