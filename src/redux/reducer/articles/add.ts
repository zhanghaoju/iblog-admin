import { ARTICLE_ADD } from '@/redux/constants';
const userState = {
  article: {},
};
export const ArticleAddReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_ADD:
      return {
        article: action.article,
      };
    default:
      return state;
  }
};
