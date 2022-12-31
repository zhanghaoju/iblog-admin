import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as authActions from '@/redux/actionCreator';
import './index.less';
function Login(props: any) {
  const onFinish = (values: any) => {
    console.log('获取输入的登录信息：', values);
    props.authActions.asyncLoginAction({
      username: values.username,
      password: values.password,
    }).then((res: any) => {
      console.log("登录成功后的数据：", res);
      if (res.code === 0) {
        message.success("登录成功，跳转到首页")
        props.history.replace("/admin/home")
      }
    });
  };
  const handClick = () => {
    props.history.push('/admin/register');
  };
  return (
    <div className="login">
      <Card style={{ width: '50%', margin: '0 auto' }} title="欢迎进入登录页面">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空！' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '密码不能为空！' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              点击登录
            </Button>
            <p style={{ float: 'right', color: '#1890FF', cursor: 'pointer' }} onClick={handClick}>
              没有账号？点我注册
            </p>
            {/* 忘记密码 */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Login);
