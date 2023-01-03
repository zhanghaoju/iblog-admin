import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Switch, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, CheckOutlined, CloseOutlined, CloudUploadOutlined, EditOutlined, EyeOutlined, CloudDownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import './index.less'
import { statusPublish } from '@/utils/constants';
import e from 'express';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key: React.Key;
  _id?: string;
  username?: string;
  avatar?: string;
  articleIds?: string[],
  tags?: string[];
  views?: number;
  comment?: number;
  like?: number;
  collect?: number;
  publishStatus?: number
  createTime: string;
  updateTime: string;
}
const ArticleList = (props: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 100
    },
    {
      title: '封面',
      dataIndex: 'cover',
      render: (_, record: any) => {
        return (
          <Image width={50} height={50} src={record.cover}></Image>
        );
      },
    },
    {
      title: '简介',
      dataIndex: 'introduction',
    },
    {
      title: '分类',
      dataIndex: 'categories',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record: any) => {
        let result = [];
        for (let i = 0; i < record.tags.length; i += 3) {
          result.push(record.tags.slice(i, i + 3)); // i=0 0-3 i=3 3-6
        }
        return result.map((item, index) => {
          return (
            <div style={{ marginBottom: 10 }} key={index}>
              {item.map((sub: any) => (
                <Tag style={{ marginRight: 10 }} key={sub}>
                  {sub}
                </Tag>
              ))}
            </div>
          );
        });
      },
    },
    {
      title: '查看/评论/点赞/收藏',
      dataIndex: 'views',
      align: 'center',
      render: (_, record) => {
        return `${record.views}/${record.comment}/${record.like}/${record.collect}`
      }
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={record.status}
          onChange={(checked) => onChangeStatus(checked, record)}
        />
      }
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      width: 100,
      render: (_, record: any) => {
        const published: any = {
          1: '已发布',
          2: '未发布'
        }
        const enums: any = {
          1: 'success',
          2: 'error',
        }
        return (
          <Space direction="vertical">
            <Badge status={enums[record.publishStatus]} text={published[record.publishStatus]} />
          </Space >
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (time => {
        return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => {
        return <div>
          <Button type="primary" ghost shape="circle" onClick={() => {
            onChangePublishStatus(record)
          }} style={{ marginRight: '5px' }}>
            {
              record.publishStatus === 1 ? <CloudDownloadOutlined /> : <CloudUploadOutlined />
            }
          </Button>
          <Button type="primary" ghost shape="circle" icon={
            <EyeOutlined />} onClick={() => {
              onPreview(record)
            }} style={{ marginRight: '5px' }} />
          {
            record.publishStatus === 2 && <><Button type="primary" ghost shape="circle" icon={
              <EditOutlined />} onClick={() => {
                props.history.push(`/admin/article/update/${record._id}`)
              }} style={{ marginRight: '5px' }} />
              <Button type="primary" danger ghost shape="circle" icon={
                <DeleteOutlined />} onClick={() => {
                  categoryDelete(record)
                }} style={{ marginRight: '5px' }} /></>
          }

        </div>
      }
    },
  ];
  // 表单数据
  const [form] = Form.useForm()
  // 文章列表
  const [list, setList] = useState([])
  // 分页总数
  const [total, setTotal] = useState(0)
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1)
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10)
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 收藏状态
  const [collect, setCollect] = useState<any>()
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, "", 0, 0).then((res: any) => {
      // 获取文章
      let { data, totalCount, page, pageSize } = res.data

      let collectArr = data.map((item: any) => item.isCollect)
      let newArr = []
      let map = new Map()
      for (let i = 0; i < collectArr.length; i++) {
        // 如果 map里面不包含，就设置进去
        if (!map.has(collectArr[i])) {
          map.set(collectArr[i], true)
          newArr.push(collectArr[i])
        }
      }
      let collect = newArr[0]
      setCollect(collect)
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  }, [currentPage, pageSize, props.BlogActions])

  // 新增文章
  const handleArticleAdd = () => {
    props.history.push(`/admin/article/insert`)
  }
  // 点击确定按钮
  const handleConfirm = async () => {
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();
    message.success("文章新增成功")
    form.resetFields();
    setIsModalOpen(false);
    props.BlogActions.asyncCategoryAddAction({
      name: data.title
    }).then((res: any) => {
      // 重新调用查询接口
      props.BlogActions.asyncArticleListAction(currentPage, pageSize, "", 0, 0).then((res: any) => {
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
  // 发布
  const onChangePublishStatus = (record: any) => {
    console.log("发布状态修改");
    console.log("check", record);
    if (record.publishStatus === 2) {
      record.publishStatus = 1
      console.log("record", record.publishStatus);

      props.BlogActions.asyncArticlePublishStatusUpdateAction({
        publishStatus: record.publishStatus,
        id: record._id
      }).then(() => {
        message.success('文章发布成功')
      })
    } else {
      record.publishStatus = 2
      console.log("record", record.publishStatus);

      props.BlogActions.asyncArticlePublishStatusUpdateAction({
        publishStatus: record.publishStatus,
        id: record._id
      }).then(() => {
        message.success('文章下线成功')
      })
    }

  }
  // 查看
  const onPreview = (record: any) => {
    console.log("查看");
  }
  // 更新文章状态
  const onChangeStatus = (checked: any, row: any) => {
    console.log("check", Number(checked), row);
    row.status = Number(checked)
    setList([...list])
    message.success("状态更新成功")
    props.BlogActions.asyncArticleStatusUpdateAction({
      status: Number(checked),
      id: row._id
    })
  }
  // 删除文章
  const categoryDelete = (item: any) => {
    confirm({
      title: '你确定要删除吗?',
      icon:
        <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: any) => it._id !== item._id))
        message.success("文章删除成功")
        props.BlogActions.asyncArticleDeleteAction(item._id).then(() => {
          props.BlogActions.asyncArticleListAction(currentPage, pageSize, "", 0, 0).then((res: any) => {
            // 获取文章
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
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, value, 0, 0).then((res: any) => {
      let { data, totalCount, page, pageSize } = res.data
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  };
  // 发布状态搜索
  const handleChange = (publishStatus: number, a: any) => {
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, "", 0, publishStatus).then((res: any) => {
      let { data, totalCount, page, pageSize } = res.data
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  };
  // 跳转页数据显示
  const onChangePage = (page: any, pageSize: any, params = "") => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncArticleListAction(page, pageSize, params).then((res: any) => {
      // 获取列表数据
      let { data } = res.data
      setList(data);
      // 切换行
      setCurrentPage(page)
      // 根据页面数据显示页码
      setPageSize(pageSize)
    })
  }
  // 弹窗提示
  const onClickConfirm = () => {
    setCollect(!collect)
    collect ? <Button type='primary' onClick={onClickConfirm} className="btn">开启收藏</Button> : <Button type='primary' onClick={onClickConfirm} className="btn">关闭收藏</Button>
    props.BlogActions.asyncArticleCollectUpdateAction({
      isCollect: !collect
    }).then(() => {
      message.success(`${collect ? "关闭收藏" : "开启收藏"}成功`)
    })
  }
  return (
    <div>
      <div className='cate_title'>
        <div>
          <Button type='primary' onClick={handleArticleAdd} className="btn">新增文章</Button>
          <Popconfirm
            title="请确认你的操作"
            onConfirm={onClickConfirm}
            onCancel={() => { }}
            okText={collect ? `关闭收藏` : `开启收藏`}
            cancelText="取消"
          >
            <Button type='primary' className="btn">{collect ? "关闭" : "开启"}收藏</Button>
          </Popconfirm>

        </div>
        <div>
          <span>发布状态：</span>
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={handleChange}
            options={statusPublish}
          >
          </Select>
          <Search className='search' allowClear placeholder="请输入文章名称" onSearch={onSearch} enterButton />
        </div>
      </div>
      <Modal
        open={isModalOpen}
        title={(<div style={{ textAlign: 'left' }}>添加文章</div>)}
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
            rules={[{ required: true, message: '文章名称不能为空' }]}
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
export default connect(null, mapDispatchToProps)(ArticleList);
