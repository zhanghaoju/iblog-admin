import { Layout, Dropdown, Avatar, message } from 'antd'
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
// import jwtDecode from 'jwt-decode';
import './index.less'
const { Header } = Layout
const TopHeader = (props: any) => {
  const changeCollapsed = () => {
    // 改变状态值
    props.ChangeCollapsed.changeCollapsed()
  };
  // 获取登录信息
  const handQuit = () => {
    props.BlogActions.asyncLoginOutAction().then(() => {
      // 清空token
      localStorage.removeItem('token')
      message.success("退出登录成功")
      // 跳转到登录页面
      props.history.push('/admin/login')
    })

  }
  const items: MenuProps['items'] = [
    {
      label: (
        <a href="https://www.antgroup.com">
          个人中心
        </a>
      ),
      key: 'person',
    },
    {
      label: (
        <div>
          <div onClick={handQuit}>退出登录</div>
        </div>
      ),
      key: '1',
      danger: true
    },
  ];
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {/* 获取状态 */}
      {props.isCollapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}
      <div style={{ float: 'right' }}>
        <Dropdown menu={{ items }} placement="bottom">
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
// 将dispatch方法映射为props
const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
    // 封装一个dispatch 函数
    ChangeCollapsed: bindActionCreators(BlogActions, dispatch),
  };
};
// 将状态映射为属性
const mapStateToProps = (state: any) => {
  return {
    userinfo: state.LoginReducer.userinfo,
    isCollapsed: state.SideMenuStateReducer.isCollapsed
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader));
