import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, FormInstance, Input, InputRef, message, Modal, Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
  status: boolean;
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
const ArticleTag = (props: any) => {
  // ??????
  const handleSave = (record: any) => {
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
    // message.success("????????????")
    // ????????????
    props.BlogActions.asyncTagUpdateAction({
      name: record.name,
      id: record._id
    }).then(() => {
      // ??????????????????
      props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
        // ????????????
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
      title: '????????????(???????????????)',
      dataIndex: 'name',
      key: 'name',
      onCell: (record: DataType) => ({
        record,
        editable: record.status,
        dataIndex: 'name',
        title: '????????????',
        handleSave: handleSave,
      }),
    },
    {
      title: '????????????',
      dataIndex: 'articleNum',
      key: 'articleNum',
    },
    {
      title: '????????????',
      dataIndex: 'articleNum',
      render: (_, record: any) => {
        return <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={record.status}
          onChange={(checked) => onChangeStatus(checked, record)} />
      }
    },
    {
      title: '????????????',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    {
      title: '????????????',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    {
      title: '??????',
      key: 'action',
      render: (item) => {
        return <div>
          <Button type="primary" danger shape="circle" icon={
            <DeleteOutlined />} onClick={() => {
              TagDelete(item)
            }} style={{ marginRight: '5px' }} disabled={item.status} />
        </div>
      }
    },
  ];
  // ????????????
  const [form] = Form.useForm()
  // ????????????
  const [list, setList] = useState([])
  // ????????????
  const [total, setTotal] = useState(0)
  // ???????????????
  const [currentPage, setCurrentPage] = useState(1)
  // ??????????????????
  const [pageSize, setPageSize] = useState(10)
  // ??????
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ????????????????????????
  useEffect(() => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
      // ????????????
      let { data, totalCount, page, pageSize } = res.data
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  }, [currentPage, pageSize, props.BlogActions])

  // ????????????
  const showModal = () => {
    setIsModalOpen(true)
  }
  // ??????????????????
  const handleConfirm = async () => {
    // ??????form??? ????????????????????????
    await form.validateFields();
    // ???????????????
    const data = form.getFieldsValue();
    message.success("??????????????????")
    form.resetFields();
    setIsModalOpen(false);
    props.BlogActions.asyncTagAddAction({
      name: data.title
    }).then((res: any) => {
      // ????????????????????????
      props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
        let { data } = res.data
        setList(data)
      })
    })
  }
  // ????????????
  const handleCancel = (e: any) => {
    form.resetFields();
    setIsModalOpen(false);
  };
  // ????????????
  const TagDelete = (item: any) => {
    confirm({
      title: '??????????????????????',
      icon:
        <ExclamationCircleOutlined />,
      onOk() {
        // ????????????????????????????????????????????????
        setList(list.filter((it: any) => it._id !== item._id))
        message.success("??????????????????")
        props.BlogActions.asyncTagDeleteAction(item._id).then(() => {
          props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
            // ????????????
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
  // ??????????????????
  const onChangeStatus = (checked: any, row: any) => {
    console.log("check", checked, row);
    row.status = !row.status
    setList([...list])
    props.BlogActions.asyncTagStatusUpdateAction({
      status: row.status,
      id: row._id
    }).then(() => {
      message.success("??????????????????")
      // props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
      //   setList(res.data)
      // })
    })
  }
  // ??????
  const onSearch = (value: string) => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, value).then((res: any) => {
      let { data, totalCount, page, pageSize } = res.data
      setList(data);
      setTotal(totalCount)
      setCurrentPage(page)
      setPageSize(pageSize)
    })
  };
  // ?????????????????????
  const onChangePage = (page: any, pageSize: any, params = "") => {
    // ???????????????????????????????????????
    props.BlogActions.asyncTagsAction(page, pageSize, params).then((res: any) => {
      // ??????????????????
      let { data } = res.data
      setList(data);
      // ?????????
      setCurrentPage(page)
      // ??????????????????????????????
      setPageSize(pageSize)
    })
  }
  return (
    <div>
      <div className='cate_title'>
        <Button type='primary' onClick={showModal} className="btn">????????????</Button>
        <Search className='search' allowClear placeholder="?????????????????????" onSearch={onSearch} enterButton />
      </div>
      <Modal
        open={isModalOpen}
        title={(<div style={{ textAlign: 'left' }}>????????????</div>)}
        okText="??????"
        cancelText="??????"
        onCancel={handleCancel}
        onOk={() => {
          console.log("?????????");
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
            label="??????"
            rules={[{ required: true, message: '????????????????????????' }]}
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
export default connect(null, mapDispatchToProps)(ArticleTag);
