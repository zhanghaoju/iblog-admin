import { TAG_STATUS_UPDATE } from '@/redux/constants';
const userState = {
  tags: [],
};
export const TagStatusUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case TAG_STATUS_UPDATE:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
