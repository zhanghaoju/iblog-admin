import { combineReducers } from 'redux';
import { LoginReducer } from './login';
import { LoginOutReducer } from './login/loginout';
import { SideMenuStateReducer } from './collapsed';
import { LoadingReducer } from './loading';
import { CategoriesReducer } from './categories/list';
import { CategoryAddReducer } from './categories/add';
import { CategoryDeleteReducer } from './categories/delete';
import { CategoryUpdateReducer } from './categories/update';
import { TagsReducer } from './tags/list';
import { TagAddReducer } from './tags/add';
import { TagDeleteReducer } from './tags/delete';
import { TagUpdateReducer } from './tags/update';
import { TagStatusUpdateReducer } from './tags/status_update';
import { AboutListReducer } from './about/list';
import { AboutAddReducer } from './about/add';
import { AboutUpdateReducer } from './about/update';
import { UserListReducer } from './user/list';
import { UserDeleteReducer } from './user/delete';
import { CommentsReducer } from './comments/list';
import { CommentDeleteReducer } from './comments/delete';
import { CommentStatusUpdateReducer } from './comments/update';
import { ArticleListReducer } from './articles/list';
import { ArticleAddReducer } from './articles/add';
import { ArticleStatusUpdateReducer } from './articles/article_status';
import { ArticlePublishStatusUpdateReducer } from './articles/article_publish_status';
import { ArticleDetailReducer } from './articles/detail';
import { ArticleUpdateReducer } from './articles/update';
import { ArticleDeleteReducer } from './articles/delete';
import { ArticleCollectUpdateReducer } from './articles/article_collect';
import { FileUploadReducer } from './upload/index';
const RootReducer = combineReducers({
  LoginReducer,
  LoginOutReducer,
  SideMenuStateReducer,
  LoadingReducer,
  CategoriesReducer,
  CategoryAddReducer,
  CategoryDeleteReducer,
  CategoryUpdateReducer,
  TagsReducer,
  TagAddReducer,
  TagDeleteReducer,
  TagUpdateReducer,
  TagStatusUpdateReducer,
  AboutListReducer,
  AboutAddReducer,
  AboutUpdateReducer,
  UserListReducer,
  UserDeleteReducer,
  CommentsReducer,
  CommentDeleteReducer,
  CommentStatusUpdateReducer,
  ArticleListReducer,
  ArticleStatusUpdateReducer,
  ArticlePublishStatusUpdateReducer,
  ArticleDetailReducer,
  ArticleUpdateReducer,
  ArticleDeleteReducer,
  ArticleCollectUpdateReducer,
  FileUploadReducer,
  ArticleAddReducer,
});
export default RootReducer;
