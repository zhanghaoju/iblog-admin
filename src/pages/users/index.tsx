import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, FormInstance, Image, Input, InputRef, message, Modal, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import './index.less'
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key: React.Key;
  _id?: string;
  username?: string;
  avatar?: string;
  articleIds?: string[],
  createTime: string;
  updateTime: string;
}
const UserInfo = (props: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 100
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (_, record) => {
        return <Image width={50} height={50} src={record.avatar}></Image>
      }

    },
    {
      title: '来源',
      dataIndex: 'provider',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '收藏数量',
      dataIndex: 'articleIds',
      render: (_, record) => {
        return <Tag color='orange'>{record.articleIds?.length}</Tag>
      }
    },
    {
      title: '个人介绍',
      dataIndex: 'introduction',
      render: (text) => {
        return <Tooltip title={text}>{text}</Tooltip>
      }
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => {
        return <div>
          <Button type="primary" danger shape="circle" icon={
            <DeleteOutlined />} onClick={() => {
              categoryDelete(item)
            }} style={{ marginRight: '5px' }} />
        </div>
      }
    },
  ];
  // 表单数据
  const [form] = Form.useForm()
  // 用户列表
  const [list, setList] = useState([])
  // 分页总数
  const [total, setTotal] = useState(0)
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1)
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10)
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 获取用户列表数据
  useEffect(() => {
    props.BlogActions.asyncUserListAction(currentPage, pageSize, "").then((res: any) => {
      // 获取用户
      let { data, totalCount, page, pageSize } = res.data
      console.log('用户列表：', data);
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  }, [currentPage, pageSize, props.BlogActions])

  // 新增用户
  const showModal = () => {
    setIsModalOpen(true)
  }
  // 点击确定按钮
  const handleConfirm = async () => {
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();
    message.success("用户新增成功")
    form.resetFields();
    setIsModalOpen(false);
    props.BlogActions.asyncCategoryAddAction({
      name: data.title
    }).then((res: any) => {
      // 重新调用查询接口
      props.BlogActions.asyncUserListAction(currentPage, pageSize, "").then((res: any) => {
        let { data } = res.data
        setList(data)
      })
    })
  }
  // 关闭窗口
  const handleCancel = (e: any) => {
    form.resetFields();
    setIsModalOpen(false);
  };
  // 删除用户
  const categoryDelete = (item: any) => {
    confirm({
      title: '你确定要删除吗?',
      icon:
        <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: any) => it._id !== item._id))
        message.success("用户删除成功")
        props.BlogActions.asyncUserDeleteAction(item._id).then(() => {
          props.BlogActions.asyncUserListAction(currentPage, pageSize, "").then((res: any) => {
            // 获取用户
            let { data, totalCount, page, pageSize } = res.data
            setList(data);
            setTotal(totalCount)
            setCurrentPage(page)
            setPageSize(pageSize)
          })
        })

      },
    });
  }
  // 搜索
  const onSearch = (value: string) => {
    console.log("value", value);
    props.BlogActions.asyncUserListAction(currentPage, pageSize, value).then((res: any) => {
      let { data, totalCount, page, pageSize } = res.data
      console.log("data", data);

      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  };
  // 跳转页数据显示
  const onChangePage = (page: any, pageSize: any, params = "") => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncUserListAction(page, pageSize, params).then((res: any) => {
      // 获取列表数据
      let { data } = res.data
      setList(data);
      // 切换行
      setCurrentPage(page)
      // 根据页面数据显示页码
      setPageSize(pageSize)
    })
  }
  return (
    <div>
      <div className='cate_title'>
        <Button type='primary' onClick={showModal} className="btn">新增用户</Button>
        <Search className='search' allowClear placeholder="请输入用户名称" onSearch={onSearch} enterButton />
      </div>
      <Modal
        open={isModalOpen}
        title={(<div style={{ textAlign: 'left' }}>添加用户</div>)}
        okText="新增"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          console.log("点击我");
          handleConfirm()
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          className='userAddFrom'
        >
          <Form.Item
            name="title"
            label="名称"
            rules={[{ required: true, message: '用户名称不能为空' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={((item: any) => { return (item._id + Date.now()) })}
        pagination={false}
      />
      <MyPagination
        pageSize={pageSize}
        currentPage={currentPage}
        total={total}
        onChange={onChangePage}>
      </MyPagination>
    </div>
  )
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(UserInfo);
