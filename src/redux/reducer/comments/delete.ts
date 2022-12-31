import { COMMENT_DELETE } from '@/redux/constants';
const userState = {
  commId: '',
};
export const CommentDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case COMMENT_DELETE:
      return {
        commId: action.commId,
      };
    default:
      return state;
  }
};
