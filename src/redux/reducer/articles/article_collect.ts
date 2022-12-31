import { ARTICLE_COLLECT_UPDATE } from '@/redux/constants';
const userState = {
  collect: [],
};
export const ArticleCollectUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_COLLECT_UPDATE:
      return {
        collect: action.collect,
      };
    default:
      return state;
  }
};
