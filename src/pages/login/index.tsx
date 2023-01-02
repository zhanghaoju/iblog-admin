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
      } else {
        message.error('请检查用户名或密码后重新登录')
      }
    });
  };
  const handClick = () => {
    props.history.push('/admin/register');
  };
  // 用户名校验
  const validateName = (_rule: any, value: any, callback: any) => {
    console.log("value", value);
    if (value === "") {
      return Promise.reject('用户名不能为空')
    } else if (value.length < 2 || value.length > 20) {
      return Promise.reject('字符不能小于2大于20')
    } else {
      const reg = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/
      if (!reg.test(value)) {
        return Promise.reject('只能使用中文字符')
      } else {
        return Promise.resolve();
      }
    }
  }
  // 用户名校验
  const validatePassword = (_rule: any, value: any, callback: any) => {

    if (value === "") {
      return Promise.reject('密码不能为空')
    } else if (value.length < 6 || value.length > 20) {
      return Promise.reject('字符不能小于6大于20')
    } else {
      const reg = /^[A-Za-z0-9_]{6,20}$/
      if (!reg.test(value)) {
        return Promise.reject('必须是长度为6-20位,字母大小,下划线组成')
      } else {
        return Promise.resolve();
      }
    }
  }
  return (
    <div className="login">
      <Card style={{ width: '50%', margin: '0 auto' }} title="欢迎进入登录页面">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[

            {
              validator: validateName,
            }
          ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名 admin"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ validator: validatePassword }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码 123456"
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
