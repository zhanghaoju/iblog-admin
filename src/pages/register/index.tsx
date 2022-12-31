import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import * as BlogActions from '@/redux/actionCreator';
import './index.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const Register = (props: any) => {
  // 提交注册
  const onFinish = (values: any) => {
    props.BlogActions.asyncRegisterAction({
      username: values.username,
      password: values.password,
      verifyPassword: values.verifyPassword
    }).then((res: any) => {
      if (res.msg === '用户已存在') {
        return message.error('用户名已存在')
      }
      if (res.msg === '两次密码不相同') {
        return message.error('两次密码不相同')
      }
      message.success("注册成功,即将跳转到登录页面^_^")
      setTimeout(() => {
        props.history.push('/api/login')
      }, 2000)
    })
  };
  return (
    <div className="login">
      <Card style={{ width: '50%', margin: '0 auto' }} title="注册页面">
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
          <Form.Item name="verifyPassword" rules={[{ required: true, message: '确认密码不能为空！' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="确认密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              点击注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Register);
