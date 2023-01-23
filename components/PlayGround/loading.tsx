import React from 'react';
import Like from './Like.svg';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import TimeIcon from './Time.svg';
import { Skeleton } from 'react-vant';
import Liked from './Liked.svg';
import { width } from '@mui/system';
import userequest from '@/libs/request'
export default function Display(props) {
  // if(!props.data) return;

  // const { data } = props;
  const router = useRouter();
  const colorMap = {
    idle: 'yellow-gradient',
    news: 'blue-gradient',
    sublet: 'purple-gradient',
    activity: 'pink-gradient',
    group: 'green-gradient',
    carpool: 'carpool-gradient',
  };
  interface imageSize {
    width: string | number;
    height: string | number;
  }
  const [imageSize, setSmageSize] = React.useState<imageSize>({
    width: '100%',
    height: '0rem',
  });


    return (
      <div className="w-full pl-0.5 pr-0.5 mb-2">
        <div
          style={{ position: 'relative', width: '100%' }}
          className="overflow-hidden"
        >
          <Skeleton
            loading={true}
            row={1}
            rowWidth={'100%'}
            rowHeight={200}
            style={{ width: '100%', padding: 0 }}
            round={false}
            className="rounded-xl w-full p-0 h-full"
          >
            {' '}
          </Skeleton>
          <Skeleton
            loading={true}
            row={1}
            round={true}
            rowWidth={'100%'}
            className="rounded-xl w-full p-0 h-full mt-2"
          >
          </Skeleton>
          <Skeleton
            loading={true}
            row={1}
            round={true}
            rowWidth={'100%'}
            className=" w-full p-0 h-full mt-2"
          >
          </Skeleton>
        </div>
       
      </div>
    )
  }
