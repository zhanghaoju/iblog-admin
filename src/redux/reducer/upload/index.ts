import { FILE_UPLOAD } from '@/redux/constants';
const userState = {
  files: {},
};
export const FileUploadReducer = (state = userState, action: any) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        files: action.files,
      };
    default:
      return state;
  }
};
