import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import { randomColor } from '@/utils/random';
import { TweenOneGroup } from 'rc-tween-one';
const App: React.FC = (props: any) => {
  const [tags, setTags] = useState(props.value || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const init = (arr: any) => {
    const newArr = arr?.map((item: any) => {
      return {
        name: item,
        color: randomColor()
      }
    })
    setTags(newArr)
  }
  useEffect(() => {
    init(props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value === undefined])
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: any) => {
      if (tag.name !== removedTag) {
        return tag
      }
    });
    setTags(newTags);
    props.onChange && props.onChange(newTags.map((item: any) => item.name))
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    // 去重
    const removeRepeat = (arr: any) => {
      let res = [];
      let obj: any = {};
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i].name]) {
          res.push(arr[i]);
          obj[arr[i].name] = true;
        }
      }
      return res;
    }

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags.push({
        name: inputValue,
        color: randomColor()
      })

    }
    let newTags = removeRepeat(tags)
    setTags(newTags)
    // 回传过去
    props.onChange && props.onChange(newTags.map((item: any) => item.name))
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    props.onChange && props.onChange(newTags)
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };
  return (
    <>
      <TweenOneGroup
        enter={{
          scale: 0.8,
          opacity: 0,
          type: 'from',
          duration: 100,
        }}
        leave={{
          opacity: 0,
          width: 0,
          scale: 0,
          duration: 200
        }}
        appear={false}
      >
        {tags?.map((tag: any, index: any) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={index}
                color={tag.color}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={`${tag.name}-${index}`}
              color={tag.color}
              closable={true}
              onClose={() => handleClose(tag.name)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag.name);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag.name}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={index}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </TweenOneGroup>


      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          color={tags && tags.color}
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 添加标签
        </Tag>
      )}
    </>
  );
};

export default App;
