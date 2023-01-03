import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Row, Col, message } from 'antd';
import './index.less'
import BlogTags from './components/tags'
import Save from '@/components/save';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}
const About = (props: any) => {
  const [form] = Form.useForm();
  const [about, setAbout] = useState<any>()
  // 上次保存时间
  const [updateTime, setUpdateTime] = useState()
  const [isReFresh, setIsReFresh] = useState(false)
  useEffect(() => {
    props.BlogActions.asyncAboutListAction().then((res: any) => {
      let { data } = res
      setAbout(data)
      setUpdateTime(data.updateTime)
      // 将值设置进表单数据中
      data ? form.setFieldsValue(data) : form.setFieldsValue({
        tags: []
      })
    })
  }, [form, props.BlogActions])
  // 保存
  const submit = async () => {
    await form.validateFields();
    const val = await form.getFieldsValue();
    // 修改和添加是在一块的
    about && about._id ? props.BlogActions.asyncAboutUpdateAction({
      id: about._id,
      tags: val.tags,
      desc: val.desc
    }).then((res: any) => {
      message.success('更新成功')
    }) : props.BlogActions.asyncAboutAddAction({
      tags: val.tags,
      desc: val.desc
    }).then((res: any) => {
      message.success('新增成功')
    })
  }
  // 点击刷新时重新调用接口
  const onRefresh = () => {
    setIsReFresh(true)
    message.success('刷新成功')
    props.BlogActions.asyncAboutListAction().then((res: any) => {
      // 将值设置进表单数据中
      form.setFieldsValue(res.data)
    })
  }
  return (
    <>
      <Save time={updateTime} onRefresh={onRefresh} onSave={submit} />
      <div className='about'>
        关于
        <Card>
          <Form
            form={form}
            {...formItemLayout}
          >
            <Row>
              <Col span={18}>
                <Form.Item name='tags' label="标签云" rules={[
                  {
                    required: true,
                    message: '请添加标签'
                  }
                ]}>
                  <BlogTags />
                </Form.Item>
                <Form.Item name='desc' label="详细介绍" rules={[
                  {
                    required: true,
                    message: '请输入详细介绍'
                  }
                ]}>
                  <TextArea showCount rows={6} maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(About);
