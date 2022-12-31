import { ARTICLE_STATUS_UPDATE } from '@/redux/constants';
const userState = {
  articleStatus: [],
};
export const ArticleStatusUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_STATUS_UPDATE:
      return {
        articleStatus: action.articleStatus,
      };
    default:
      return state;
  }
};
