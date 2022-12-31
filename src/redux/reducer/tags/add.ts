import { TAG_ADD } from '@/redux/constants';
const userState = {
  tags: {},
};
export const TagAddReducer = (state = userState, action: any) => {
  switch (action.type) {
    case TAG_ADD:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
