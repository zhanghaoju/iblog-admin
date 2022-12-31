import { COMMENT_AUDIT_STATUS } from '@/redux/constants';
const userState = {
  comment: [],
};
export const CommentStatusUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case COMMENT_AUDIT_STATUS:
      return {
        comment: action.comment,
      };
    default:
      return state;
  }
};
