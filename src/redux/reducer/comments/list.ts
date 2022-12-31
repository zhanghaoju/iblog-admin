import { ARTICLE_COMMENT } from '@/redux/constants';
const userState = {
  comments: [],
};
export const CommentsReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_COMMENT:
      return {
        comments: action.comments,
      };
    default:
      return state;
  }
};
