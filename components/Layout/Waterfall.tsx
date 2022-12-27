import React, { useState } from 'react';
import styles from './index.module.css';
import Display from '../PlayGround/display';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Post from './post';
import Display1 from '../PlayGround/display2';
const dataList = [
  {
    id: 0,
    type: '闲置',
    title: '出闲置AirPods耳机二代占位占位占位',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 8618,
    img: 'https://fakeimg.pl/250x150/',
  },
  {
    id: 1,
    type: '新闻',
    title: '出闲置AirPods耳机二代占位占位占位',
    user: 'User name',
    like: 86181,
    img: 'https://fakeimg.pl/250x280/',
  },
  {
    id: 2,
    type: '转租',
    title: '出闲置AirPods耳机二代占位rere占位',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/250x240/',
  },
  {
    id: 3,
    type: '活动',
    title: 'CUA2023春节联晚会',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/250x220/',
  },
  {
    id: 3,
    type: 'Carpool',
    title: '伦敦 到 多伦多多',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/250x180/',
  },
  {
    id: 3,
    type: '转租',
    title: '出闲置AirPods耳机二代占位占位占位',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    tag: [
      {
        name: 'tag1',
        color: 'red',
      },
      { name: 'tag2', color: 'blue' },
    ],
    img: 'https://fakeimg.pl/250x180/',
  },
  {
    id: 3,
    type: '转租',
    title: '出闲置AirPods耳机二代占位占位占位1111',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/350x180/',
  },
];
const PostDetail = (props) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={props.visible}
      onClose={() => {
        props.setVisible(false);
      }}
      onOpen={() => {
        props.setVisible(true);
      }}
      className="h-screen"
    >
      <div className="w-screen h-screen">
        <Post></Post>
      </div>
    </SwipeableDrawer>
  );
};
export default function Waterfall(props) {
  const [postDetailShow, setPostDetailShow] = useState(false);
  return (
    <div className="w-full h-full mx-0">
      <PostDetail
        setVisible={setPostDetailShow}
        visible={postDetailShow}
      ></PostDetail>
      <ul className="w-full p-1">
        {dataList.map((item: any) => {
          return (
            <li key={item.id} className={styles.item}>
              <Display
                show={() => {
                  setPostDetailShow(true)
                }}
                // onClick={() => {setPostDetailShow(true)}}
                data={item}
              ></Display>
            </li>
          );
        })}

        {/* <li className={styles.item}><Display1></Display1></li>
        <li className={styles.item}><Display></Display></li>
        <li className={styles.item}><Display></Display></li> */}
      </ul>
    </div>
  );
}
