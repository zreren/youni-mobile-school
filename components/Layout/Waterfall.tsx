import React, { useEffect, useState } from 'react';
// import styles from './index.module.css';
import Display from '../PlayGround/display';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Post from './post';
import { InfiniteScroll, List } from 'antd-mobile';
import Display1 from '../PlayGround/display2';
import dynamic from 'next/dynamic';
import MasonryLayout from 'react-fast-masonry';
// import { Masonry } from "masonic";

const Masonry = dynamic(
  () => import('masonic').then((module) => module.Masonry),
  { ssr: false },
);

const dataList = [
  {
    id: 0,
    type: 'idle',
    title: '出闲置AirPods耳机二代占位占位占位',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 8618,
    img: 'https://source.unsplash.com/random/?food',
  },
  {
    id: 1,
    type: '新闻',
    title: '出闲置AirPods耳机二代占位占位占位',
    user: 'User name',
    like: 86181,
    img: 'https://source.unsplash.com/random/?love',
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
    img: 'https://source.unsplash.com/random/?computer',
  },
  {
    id: 3,
    type: '活动',
    title: 'CUA2023春节联晚会',
    price: '200',
    tag: [
      {
        name: '未开始',
        color: 'red',
      },
      { name: '校园活动', color: 'blue' },
    ],
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://source.unsplash.com/random/?coffee',
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
    img: 'https://source.unsplash.com/random/?school',
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
    img: 'https://source.unsplash.com/random/?city',
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
    img: 'https://source.unsplash.com/random/',
  },
  {
    id: 3,
    type: '推广',
    title: '',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://source.unsplash.com/random/',
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
  const { postData } = props;
  console.log(postData, 'postData in waterfull');
  const [data, setData] = useState<any[]>();
  const [postDetailShow, setPostDetailShow] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    if (postData) {
      setData(postData);
    }
  }, [postData]);

  const CardWithClick = React.useCallback(
    (props) => (
      <Display {...props} handleClick={() => setPostDetailShow(true)} />
    ),
    [],
  );

  //   const dataChildren = data?.map((item: any) => {
  //   return (
  //     // <li key={item.id} className={styles.item}>
  //     <div key={item.id}>
  //       <Display
  //         show={() => {
  //           setPostDetailShow(true);
  //         }}
  //         // onClick={() => {setPostDetailShow(true)}}
  //         data={item}
  //       ></Display>
  //     </div>
  //   );
  // });
  function loadMore() {
    const append = dataList;
    setData((val) => [...val, ...append]);
    setHasMore(append.length > 0);
  }
  const masonryOptions = {
    transitionDuration: 0,
  };

  const imagesLoadedOptions = { background: '.my-bg-image-el' };
  return (
    <div className="w-full h-full mx-0">
      <PostDetail
        setVisible={setPostDetailShow}
        visible={postDetailShow}
      ></PostDetail>
      <div className="mx-2">
        {/* @ts-ignore */}
        {data?.length > 0 ?<Masonry
          columnCount={2}
          columnGutter={2}
          columnWidth={150}
          items={data}
          render={CardWithClick}
        />:null}
        
      </div>
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
    </div>
  );
}
