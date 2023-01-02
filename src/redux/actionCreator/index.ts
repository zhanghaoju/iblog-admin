import { message } from 'antd';
import api from '@/api';
import {
  USER_LOGIN,
  LOGINOUT,
  CHANGE_COLLAPSED,
  CATEGORY_LIST,
  CATEGORY_ADD,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
  TAG_LIST,
  TAG_ADD,
  TAG_UPDATE,
  TAG_DELETE,
  TAG_STATUS_UPDATE,
  ABOUT_LIST,
  ABOUT_ADD,
  ABOUT_UPDATE,
  USER_LIST,
  USER_DELETE,
  ARTICLE_COMMENT,
  COMMENT_DELETE,
  COMMENT_AUDIT_STATUS,
  ARTICLE_LIST,
  ARTICLE_ADD,
  ARTICLE_STATUS_UPDATE,
  ARTICLE_PUBLISH_STATUS_UPDATE,
  ARTICLE_UPDATE,
  ARTICLE_DETAIL,
  ARTICLE_DELETE,
  ARTICLE_COLLECT_UPDATE,
  FILE_UPLOAD,
} from '@/redux/constants';
import jwtDecode from 'jwt-decode';
// 登录
export function asyncLoginAction(data: any) {
  return async (dispatch: any) => {
    const res = await api.Login(data);
    console.log('res', res);
    if (res.data === null) {
      message.error('用户名或密码错误，请再次确认');
      return;
    } else {
      // 将token存储存到本地
      localStorage.setItem('token', res.data.token);
      // 解析token
      let userToken = jwtDecode(res.data.token);
      dispatch({
        type: USER_LOGIN,
        userToken: userToken,
      });
      return res;
    }
  };
}
// 登出
export const asyncLoginOutAction = () => {
  return async (dispatch: any) => {
    const res = await api.loginOut();
    dispatch({
      type: LOGINOUT,
      userinfo: res,
    });
  };
};
// 侧边栏展示和隐藏
export const changeCollapsed = () => {
  return (dispatch: any) => {
    dispatch({
      type: CHANGE_COLLAPSED,
    });
  };
};
// 获取分类
export const asyncCategoriesAction = (page: any, pageSize: any, name: any) => {
  return async (dispatch: any) => {
    const res = await api.getCategories(page, pageSize, name);
    // console.log('获取数据', res);
    dispatch({
      type: CATEGORY_LIST,
      categories: res,
    });
    return res;
  };
};

// 新增分类
export const asyncCategoryAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.categoryAdd(data);
    dispatch({
      type: CATEGORY_ADD,
      categories: {},
    });
    return res;
  };
};
// 删除分类
export const asyncCategoryDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.categoryDelete(id);
    dispatch({
      type: CATEGORY_DELETE,
      categoryId: '',
    });
    return res;
  };
};
// 更新分类
export const asyncCategoryUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.categoryUpdate(params);
    dispatch({
      type: CATEGORY_UPDATE,
      categories: res,
    });
    return res;
  };
};
// 获取标签
export const asyncTagsAction = (page: any, pageSize: any, name: any) => {
  return async (dispatch: any) => {
    const res = await api.getTagList(page, pageSize, name);
    // console.log('获取标签数据', res);
    dispatch({
      type: TAG_LIST,
      tags: res.data,
    });
    return res;
  };
};
// 新增标签
export const asyncTagAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.tagAdd(data);
    dispatch({
      type: TAG_ADD,
      tags: {},
    });
    return res;
  };
};
// 删除标签
export const asyncTagDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.tagDelete(id);
    dispatch({
      type: TAG_DELETE,
      tagId: '',
    });
    return res;
  };
};
// 更新标签
export const asyncTagUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.tagUpdate(params);
    dispatch({
      type: TAG_UPDATE,
      tags: res,
    });
    return res;
  };
};
// 更新状态
export const asyncTagStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.tagStatusUpdate(params);
    dispatch({
      type: TAG_STATUS_UPDATE,
      tags: res,
    });
    return res;
  };
};
// 获取关于信息
export const asyncAboutListAction = () => {
  return async (dispatch: any) => {
    const res = await api.getAboutList();
    // console.log('获取数据', res.data);
    dispatch({
      type: ABOUT_LIST,
      about: res.data,
    });
    return res;
  };
};
// 新增关于
export const asyncAboutAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.aboutAdd(data);
    dispatch({
      type: ABOUT_ADD,
      about: {},
    });
    return res;
  };
};
// 更新标签
export const asyncAboutUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.aboutUpdate(params);
    dispatch({
      type: ABOUT_UPDATE,
      about: res,
    });
    return res;
  };
};
// 用户列表
export const asyncUserListAction = (page: any, pageSize: any, name: any) => {
  return async (dispatch: any) => {
    const res = await api.getUserInfo(page, pageSize, name);
    // console.log('获取数据', res);
    dispatch({
      type: USER_LIST,
      users: res,
    });
    return res;
  };
};
// 删除用户
export const asyncUserDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.userDelete(id);
    dispatch({
      type: USER_DELETE,
      userId: '',
    });
    return res;
  };
};
// 评论列表
export const asyncCommentsAction = (
  page: any,
  pageSize: any,
  articleTitle: any,
  auditStatus: any
) => {
  return async (dispatch: any) => {
    const res = await api.getComments(page, pageSize, articleTitle, auditStatus);
    // console.log('获取数据', res);
    dispatch({
      type: ARTICLE_COMMENT,
      comments: res,
    });
    return res;
  };
};
// 删除评论
export const asyncCommentDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.commentDelete(id);
    dispatch({
      type: COMMENT_DELETE,
      commId: '',
    });
    return res;
  };
};
// 评论审核状态
export const asyncCommentStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.commentStatusUpdate(params);
    dispatch({
      type: COMMENT_AUDIT_STATUS,
      comment: res,
    });
    return res;
  };
};
// 文章列表
export const asyncArticleListAction = (
  page: any,
  pageSize: any,
  title: any,
  status: any,
  publishStatus: any
) => {
  return async (dispatch: any) => {
    const res = await api.getArticleList(page, pageSize, title, status, publishStatus);
    // console.log('获取数据', res);
    dispatch({
      type: ARTICLE_LIST,
      articles: res,
    });
    return res;
  };
};
// 新增文章
export const asyncArticleAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.articleAdd(data);
    dispatch({
      type: ARTICLE_ADD,
      article: {},
    });
    return res;
  };
};
// 修改文章状态
export const asyncArticleStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleStatusUpdate(params);
    dispatch({
      type: ARTICLE_STATUS_UPDATE,
      articleStatus: res,
    });
    return res;
  };
};
// 修改文章发布状态
export const asyncArticlePublishStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articlePublishStatusUpdate(params);
    dispatch({
      type: ARTICLE_PUBLISH_STATUS_UPDATE,
      articlePublishStatus: res,
    });
    return res;
  };
};
// 文章修改
export const asyncArticleUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleUpdate(params);
    dispatch({
      type: ARTICLE_UPDATE,
      artId: res,
    });
    return res;
  };
};
// 获取文章详情
export const asyncArticleDetailAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.articleDetail(id);
    dispatch({
      type: ARTICLE_DETAIL,
      detail: res,
    });
    return res;
  };
};
// 删除文章
export const asyncArticleDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.articleDelete(id);
    dispatch({
      type: ARTICLE_DELETE,
      artId: '',
    });
    return res;
  };
};
// 文章开启关闭收藏
export const asyncArticleCollectUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleCollectUpdate(params);
    dispatch({
      type: ARTICLE_COLLECT_UPDATE,
      collect: res,
    });
    return res;
  };
};
// 上传文件
export const asyncFileUploadAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.upload(params);
    dispatch({
      type: FILE_UPLOAD,
      files: res,
    });
    return res;
  };
};
