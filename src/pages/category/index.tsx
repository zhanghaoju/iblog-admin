import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, FormInstance, Input, InputRef, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import './index.less'
import dayjs from 'dayjs';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  articleNum: Number,
  createTime: string;
  updateTime: string;
}
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
  index: number;
}
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
}
const ArticleCategory = (props: any) => {
  // 保存
  const handleSave = (record: any) => {
    // console.log("record", record);
    // console.log("list", list);
    let rawData: any = list.map((item: any) => {
      if (item._id === record._id) {
        return {
          _id: item._id,
          name: record.name,
          articleNum: record.articleNum,
          createTime: record.createTime,
          updateTime: record.updateTime
        }
      }
      return item
    })
    setList(rawData)
    // message.success("更新成功")
    // 执行更新
    props.BlogActions.asyncCategoryUpdateAction({
      name: record.name,
      id: record._id
    }).then(() => {
      // 刷新列表数据
      props.BlogActions.asyncCategoriesAction(currentPage, pageSize, "").then((res: any) => {
        // 获取分类
        let { data, totalCount, page, pageSize } = res.data
        setList(data);
        setTotal(totalCount)
        setCurrentPage(page)
        setPageSize(pageSize)
      })
    })
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      onCell: (record: DataType) => ({
        record,
        editable: true,
        dataIndex: 'name',
        title: '分类名称',
        handleSave: handleSave,
      }),
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
      key: 'articleNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      })
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
  // 分类列表
  const [list, setList] = useState([])
  // 分页总数
  const [total, setTotal] = useState(0)
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1)
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10)
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 获取分类列表数据
  useEffect(() => {
    props.BlogActions.asyncCategoriesAction(currentPage, pageSize, "").then((res: any) => {
      // 获取分类
      let { data, totalCount, page, pageSize } = res.data
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  }, [currentPage, pageSize, props.BlogActions])

  // 新增分类
  const showModal = () => {
    setIsModalOpen(true)
  }
  // 点击确定按钮
  const handleConfirm = async () => {
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();
    message.success("分类新增成功")
    form.resetFields();
    setIsModalOpen(false);
    props.BlogActions.asyncCategoryAddAction({
      name: data.title
    }).then((res: any) => {
      // 重新调用查询接口
      props.BlogActions.asyncCategoriesAction(currentPage, pageSize, "").then((res: any) => {
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
  // 删除分类
  const categoryDelete = (item: any) => {
    confirm({
      title: '你确定要删除吗?',
      icon:
        <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: any) => it._id !== item._id))
        message.success("分类删除成功")
        props.BlogActions.asyncCategoryDeleteAction(item._id).then(() => {
          props.BlogActions.asyncCategoriesAction(currentPage, pageSize, "").then((res: any) => {
            // 获取分类
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
    props.BlogActions.asyncCategoriesAction(currentPage, pageSize, value).then((res: any) => {
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
    props.BlogActions.asyncCategoriesAction(page, pageSize, params).then((res: any) => {
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
        <Button type='primary' onClick={showModal} className="btn">新增分类</Button>
        <Search className='search' allowClear placeholder="请输入分类名称" onSearch={onSearch} enterButton />
      </div>
      <Modal
        open={isModalOpen}
        title={(<div style={{ textAlign: 'left' }}>添加分类</div>)}
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
            rules={[{ required: true, message: '分类名称不能为空' }]}
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
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
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
export default connect(null, mapDispatchToProps)(ArticleCategory);
