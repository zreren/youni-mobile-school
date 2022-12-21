import React from 'react';
import styles from './index.module.css';
import Display from '../PlayGround/display';
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
    img: 'https://fakeimg.pl/250x180/',
  },
  {
    id: 2,
    type: '转租',
    title: '出闲置AirPods耳机二代占位占位占位',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/250x180/',
  },
  {
    id: 3,
    type: '活动',
    title: 'CUA2023春节联欢晚会欢晚会',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/250x180/',
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
    title: '出闲置AirPods耳机二代占位占位占位',
    price: '200',
    unit: 'CAD',
    oldPrice: '348CAD',
    user: 'User name',
    like: 86182,
    img: 'https://fakeimg.pl/250x180/',
  },
];
export default function Waterfall() {
  return (
    <div className="w-full h-full mx-0">
      <ul className="w-full p-1">
        {dataList.map((item: any) => {
          return (
            <li key={item.id} className={styles.item}>
              <Display data={item}></Display>
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
