import { ARTICLE_UPDATE } from '@/redux/constants';
const userState = {
  artId: [],
};
export const ArticleUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_UPDATE:
      return {
        artId: action.artId,
      };
    default:
      return state;
  }
};
