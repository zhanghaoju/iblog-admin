import { ARTICLE_DELETE } from '@/redux/constants';
const userState = {
  artId: '',
};
export const ArticleDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_DELETE:
      return {
        artId: action.artId,
      };
    default:
      return state;
  }
};
