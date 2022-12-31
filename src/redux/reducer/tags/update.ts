import { TAG_UPDATE } from '@/redux/constants';
const userState = {
  tags: [],
};
export const TagUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case TAG_UPDATE:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
