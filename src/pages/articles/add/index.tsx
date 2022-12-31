import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Row, Col, message, Switch, Select, notification } from 'antd';
import './index.less'
import Save from '@/components/save';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import UploadImage from '@/components/upload';
import Editor from 'for-editor'
// import Markdown from '@/components/markdown';
const { TextArea } = Input;
const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}
const formItemLayoutTwo = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 24
  }
}
const ArticleAdd = (props: any) => {
  const [form] = Form.useForm();
  // 标签信息
  const [tagsList, setTagsList] = useState([])
  // 分类信息
  const [categoryList, setCategoryList] = useState([])
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(0)
  // 每页显示条数
  const [pageSize, setPageSize] = useState(0)
  // 上次保存时间
  const [updateTime, setUpdateTime] = useState()
  // 刷新
  const [isReFresh, setIsReFresh] = useState(false)
  // 是否选中
  const [isChecked, setIsChecked] = useState(true)
  // 定义ref
  const editorRef = useRef<any>()
  // 评论状态
  const [isComment, setIsComment] = useState(true)
  // 点赞状态
  const [isLike, setIsLike] = useState(true)
  // 收藏状态
  const [isCollect, setIsCollect] = useState(false)
  // 打赏状态
  const [isReward, setIsReward] = useState(false)
  // 获取分类列表
  useEffect(() => {
    props.BlogActions.asyncCategoriesAction(currentPage, pageSize, "").then((res: any) => {
      let { data } = res.data
      setCategoryList(data)
    })
  }, [currentPage, pageSize, props.BlogActions])
  // 获取标签列表
  useEffect(() => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
      let { data } = res.data
      setTagsList(data)
    })
  }, [currentPage, pageSize, props.BlogActions])
  // 添加图片
  const addImg = (file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    // 上传图片接口
    props.BlogActions.asyncFileUploadAction(formData).then((res: any) => {
      // console.log("上传文件返回的数据信息：", res);
      if (res) {
        // 如果返回值
        editorRef.current.$img2Url(file.name, res.url)
      }
    });
  }

  const onDraft = async () => {
    await form.validateFields()
    let formData = await form.getFieldsValue()
    formData.cover = formData.cover[0].imgUrl
    props.BlogActions.asyncArticleAddAction({
      ...formData,
      publishStatus: 2,
      status: 1,
      views: 0,
      comment: 0,
      like: 0,
      collect: 0,
      isCollect: isCollect,
      isReward: isReward,
      isComment: isComment,
      isLike: isLike,
    }).then((res: any) => {
      notification.info({
        message: '新增成功-保存到草稿',
        description:
          `跳转到文章列表`,
      });
      setTimeout(() => {
        props.history.push('/admin/article/list')
      }, 500)
    })

  }
  const onPublish = async () => {
    await form.validateFields()
    let formData = await form.getFieldsValue()
    // 表单数据
    formData.cover = formData.cover[0].imgUrl
    props.BlogActions.asyncArticleAddAction({
      ...formData,
      publishStatus: 1,
      status: 1,
      views: 0,
      comment: 0,
      like: 0,
      collect: 0,
      isCollect: isCollect,
      isReward: isReward,
      isComment: isComment,
      isLike: isLike,
    }).then(() => {
      notification.info({
        message: '新增成功-发布到线上',
        description:
          `即将跳转到文章列表`,
      });
      setTimeout(() => {
        props.history.push('/admin/article/list')
      }, 500)
    })
  }
  // 评论开启关闭
  const onCommentChange = (record: any) => {
    setIsComment(record)
  }
  // 点赞开启关闭
  const onLikeChange = (record: any) => {
    setIsLike(record)
  }
  // 收藏
  const onCollectChange = (record: any) => {
    setIsCollect(record)
  }
  // 打赏
  const onRewardChange = (record: any) => {
    setIsReward(record)
  }
  return (
    <>
      <Save time={updateTime} onDraft={onDraft} onPublish={onPublish} />
      <div className='about'>
        新增文章
        <Form
          form={form}
        >
          <Row>
            <Col span={12}>
              <Form.Item name='title' {...formItemLayout} label="文章标题" rules={[
                {
                  required: true,
                  message: '请输入文章标题'
                }
              ]}>
                <Input placeholder='请输入文章标题' />
              </Form.Item>
              <Form.Item
                label="分类"
                name="categories"
                {...formItemLayout}
                rules={[{ required: true, message: '分类不能为空' }]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="请选择分类信息"
                  optionFilterProp="children"
                >
                  {
                    categoryList.map((item: any) => (

                      <Option value={item.name} key={item._id}>
                        {item.name}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="标签"
                name="tags"
                {...formItemLayout}
                rules={[{ required: true, message: '标签不能为空' }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择对应的标签"
                  optionLabelProp="label"
                >
                  {
                    tagsList.map((item: any) => (
                      <Option value={item.name} key={item._id} label={item.name}>
                        {item.name}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item name='introduction' {...formItemLayout} label="文章简介" rules={[
                {
                  required: true,
                  message: '请输入文章简介'
                }
              ]}>
                <TextArea showCount rows={6} maxLength={500} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name='cover' {...formItemLayout} label="文章封面" rules={[
                {
                  required: true,
                  message: '请选择文章封面'
                }
              ]}>
                <UploadImage />
              </Form.Item>
              <Form.Item name='isComment' {...formItemLayout} label="评论">
                <Switch checked={isComment} onChange={onCommentChange} />
              </Form.Item>
              <Form.Item name='isLike' {...formItemLayout} label="点赞">
                <Switch checked={isLike} onChange={onLikeChange} />
              </Form.Item>
              <Form.Item name='isCollect' {...formItemLayout} label="收藏">
                <Switch checked={isCollect} onChange={onCollectChange} />
              </Form.Item>
              <Form.Item name='isReward' {...formItemLayout} label="打赏">
                <Switch checked={isReward} onChange={onRewardChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name='content' {...formItemLayoutTwo}>
                <Editor
                  preview={false}
                  subfield={false}
                  placeholder="请撰写文章"
                  ref={editorRef}
                  addImg={(file) => addImg(file)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ArticleAdd);
