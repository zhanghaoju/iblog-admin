import { TAG_DELETE } from '@/redux/constants';
const userState = {
  tagId: '',
};
export const TagDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case TAG_DELETE:
      return {
        tagId: action.tagId,
      };
    default:
      return state;
  }
};
