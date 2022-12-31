import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
const Home = (props: any) => {
  useEffect(() => {
    props.BlogActions.asyncCategoriesAction().then((res: any) => {
      console.log("列表数据：", res);
      // setList(res.data)
    })
  }, [props.BlogActions])
  return (
    <div>
      首页
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Home);
