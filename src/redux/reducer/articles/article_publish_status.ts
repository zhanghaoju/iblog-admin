import { ARTICLE_PUBLISH_STATUS_UPDATE } from '@/redux/constants';
const userState = {
  articlePublishStatus: [],
};
export const ArticlePublishStatusUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_PUBLISH_STATUS_UPDATE:
      return {
        articlePublishStatus: action.articlePublishStatus,
      };
    default:
      return state;
  }
};
