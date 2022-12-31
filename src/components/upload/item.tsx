import React, { useEffect, useState } from 'react';
import { Upload, Button, Input, Modal, Form, Spin, Message } from '@arco-design/web-react';
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
import "@arco-design/web-react/dist/css/arco.css";
import './index.less'
import { imagesType } from '@/utils/constants';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
const Item = (props: any) => {
  const { onChange, imgUrl } = props
  // 文件
  const [imageUrl, setImageUrl] = useState<any>(imgUrl || '');
  // form
  const [form] = Form.useForm()
  // 窗口显示隐藏
  const [visible, setVisible] = useState(false)
  // loading
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setImageUrl(imgUrl)
    form.setFieldsValue({
      imgUrl
    })
  }, [form, imgUrl])
  const onCancel = () => {
    setVisible(false);
  }
  const onOk = async () => {
    await form.validate();
    const values = form.getFields();
    onChange({
      field: 'imgUrl',
      value: values.imgUrl
    });
    onCancel();
  }
  const beforeUpload = async (file: any) => {
    // 上传图片格式
    const isImage = imagesType.includes(file.type)
    if (!isImage) {
      return Message.warning('请上传jpg,jpeg,png,gif格式的图片')
    }
    // 校验
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      return Message.warning('请上传2MB以内的图片')
    }
    // loading
    setLoading(true)
    setImageUrl('')
    const formData = new FormData()
    formData.append('file', file)
    // 上传图片接口
    props.BlogActions.asyncFileUploadAction(formData).then((res: any) => {
      console.log("上传文件返回的数据信息：", res);

      if (res) {
        // 如果返回值
        setImageUrl(res.url)
        onChange({
          field: 'imgUrl',
          value: res.url
        });
        setLoading(false)
      }
      return false
    })
  }
  const uploadButton = <div className='arco-upload-trigger-picture'>
    <div className='arco-upload-trigger-picture-text'>
      {
        loading ? <Spin /> : <IconPlus />
      }
      <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
    </div>
  </div>
  return (
    <div className='item'>
      <div className='item_content'>
        <div className='item_upload'>
          <Upload
            showUploadList={false}
            name="file"
            listType="picture-card"
            beforeUpload={beforeUpload}
          >
            {
              imageUrl ? <div className='arco-upload-list-item-picture custom-upload-avatar'>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={imageUrl} />
                <div className='arco-upload-list-item-picture-mask'>
                  <IconEdit />
                </div>
              </div> : (uploadButton)
            }
          </Upload>
          <Button className='btn-input' onClick={() => setVisible(true)} type="primary">输入链接</Button>
        </div >
        <Modal
          title={(
            <div style={{ textAlign: 'left' }}>图片链接 </div>
          )}
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          <Form
            form={form}
          >
            <Form.Item label='图片链接' field='imgUrl' rules={[{ required: true, message: '请输入图片链接' }]}>
              <Input placeholder='请输入图片链接' />
            </Form.Item>

          </Form>
        </Modal>
      </div >
    </div >
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Item);
