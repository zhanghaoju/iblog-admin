import { Card, Button } from 'antd'
import { ClockCircleOutlined, RedoOutlined, SaveOutlined, RollbackOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react'
import './index.less'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs';
const Save = (props: any) => {
  const { time, showBack, onRefresh, onSave, onBack, onDraft, onPublish } = props
  const message = time ? `上次保存时间：${dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')}` : `暂无操作`
  const goBack = () => {
    // 返回上一步
    props.history.goBack()
  }
  const width = props.isCollapsed ? `calc(100% - 128px)` : `calc(100% - 248px)`;

  return (
    <div>
      <Card className='save_card' bordered={false} style={{ width: width }}>
        <div className='save'>
          <div>
            <ClockCircleOutlined />
            <span>{message}</span>
          </div>
          <div className='save_right'>
            {
              showBack && <Button onClick={onBack || goBack} type="primary" ghost icon={<RollbackOutlined />} className="save_right_btn">返回</Button>
            }
            {
              onBack && <Button onClick={onBack} type="primary" ghost icon={<ArrowLeftOutlined />} className="save_right_btn">返回</Button>
            }
            {/* 当存在该方法时显示刷新操作并执行 */}
            {
              onRefresh && <Button onClick={onRefresh} type="primary" ghost icon={<RedoOutlined />} className="save_right_btn">刷新</Button>
            }

            {
              onSave && <Button onClick={onSave} icon={<SaveOutlined />} className="save_right_btn">保存</Button>
            }
            {
              onDraft && <Button onClick={onDraft} icon={<SaveOutlined />} className="save_right_btn">保存草稿</Button>
            }
            {
              onPublish && <Button onClick={onPublish} icon={<SaveOutlined />} className="save_right_btn">发布文章</Button>
            }


          </div>
        </div>

      </Card>
    </div >
  )
}
const mapStateToProps = (state: any) => {
  return {
    isCollapsed: state.SideMenuStateReducer.isCollapsed
  }
}
export default connect(mapStateToProps, null)(withRouter(Save));
