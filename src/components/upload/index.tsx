import React, { useEffect, useState } from 'react'
import Item from './item'
import './index.less'


const UploadImage = (props: any) => {
  const {
    value,
    onChange,
  } = props
  interface IImage {
    _id?: string,
    imgUrl?: string,
  }

  // 初始的数组
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initImgs: Array<IImage> = [
    {
      _id: '',
      imgUrl: ''
    }
  ]
  // 定义数据
  const [imgsArr, setImgsArr] = useState(() => {
    return value ? value : initImgs // 如果value存在则赋值value否则赋值初始值
  })

  useEffect(() => {
    if (!value) {
      return setImgsArr(initImgs)
    } else {
      if (value) {
        setImgsArr(value)
      }
    }
  }, [value])
  // 获取传递过来的参数
  const onItemChange = (data: any) => {
    console.log('data', data);
    imgsArr.forEach((item: any, index: any) => {
      item[data.field] = data.value;
    });
    onChange(imgsArr);
  };

  return (
    <>
      {
        imgsArr && imgsArr?.map((item: any, index: any) => {
          return <Item
            key={index}
            {...item}
            onChange={onItemChange}
          />
        })
      }
    </>
  )
}

export default UploadImage
