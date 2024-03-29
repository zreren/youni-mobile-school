import React from 'react';
import Like from './Like.svg';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import TimeIcon from './Time.svg';
import { Skeleton } from 'react-vant';
import Liked from './Liked.svg';
import { width } from '@mui/system';
import userequest from '@/libs/request';
import { Minus } from '@react-vant/icons';
import { useTranslation } from 'next-i18next';

export default function Display(props) {
  // if(!props.data) return;
  const {t} = useTranslation()
  const { data, isEdit } = props;
  console.log(data, 'Displayprops');
  const router = useRouter();
  const colorMap = {
    idle: 'yellow-gradient',
    news: 'blue-gradient',
    sublet: 'purple-gradient',
    activity: 'pink-gradient',
    group: 'green-gradient',
    carpool: 'carpool-gradient',
    book: 'yellow-gradient',
    course_recommend : 'yellow-gradient',
  };
  const typeMap = {
    idle: '闲置',
    news: '新闻',
    sublet: '转租',
    activity: '活动',
    group: '群聊',
    carpool: '拼车',
    book: '二手书',
    course_recommend : '课程推荐',
  }
  interface imageSize {
    width: string | number;
    height: string | number;
  }
  const [imageSize, setSmageSize] = React.useState<imageSize>({
    width: '100%',
    height: '0rem',
  });

  const textColorMap = ['tag-red', 'tag-blue'];
  const [loading, setLoading] = React.useState(true);
  const [like, setLike] = React.useState(data?.interactInfo?.liked);
  const defaultLikeCount = data?.interactInfo?.likeCount;
  const cancelStart = (id: number) => {
    props.cancelStarPost(id);
  };
  const LikeCount = React.useMemo(() => {
    if (!defaultLikeCount && like) {
      return Number(data?.interactInfo?.likeCount) + 1;
    }
    if (defaultLikeCount && !like) {
      return Number(data?.interactInfo?.likeCount) - 1;
    }
    return data?.interactInfo?.likeCount;
  }, [like]);
  const handleLike = async (id) => {
    setLike(!like);
    userequest.post('/api/post/like', {
      id: id,
    });
  };
  if (data.type === '推广') {
    return (
      <div className="w-full pl-0.5 pr-0.5">
        <div
          onClick={() => {
            props.handleClick(data.id);
          }}
          style={{ position: 'relative', width: '100%' }}
          className="mb-2"
        >
          <div className="border border-gray-400 rounded-md text-white absolute top-2 left-2 z-30 px-1">
            推广
          </div>
          <Skeleton
            loading={loading}
            row={1}
            rowWidth={'100%'}
            rowHeight={200}
            style={{ width: '100%', padding: 0 }}
            round={false}
            className="rounded-xl w-full p-0 h-full"
          >
            {' '}
          </Skeleton>
          <Image
            layout="responsive"
            objectFit="cover"
            blurDataURL={data.img}
            placeholder="blur"
            src={data.img}
            width={imageSize.width}
            height={imageSize.height}
            onLoadingComplete={(target) => {
              setLoading(false);
              setSmageSize({
                width: target.naturalWidth,
                height: target.naturalHeight,
              });
            }}
            className="rounded-xl"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full pl-0.5 pr-0.5 relative">
        {isEdit ? (
          <div
            onClick={() => {
              cancelStart(data?.id);
            }}
            className="absolute shadow flex justify-center items-center -right-2 -top-2 z-30 text-white w-6 h-6 bg-red-500 rounded-full"
          >
            <Minus></Minus>
          </div>
        ) : null}
        <div
          style={{ position: 'relative', width: '100%' }}
          className="rounded-xl overflow-hidden"
        >
          <Skeleton
            loading={loading}
            row={1}
            rowWidth={'100%'}
            rowHeight={200}
            style={{ width: '100%', padding: 0 }}
            round={false}
            className="rounded-xl w-full p-0 h-full"
          >
            {' '}
          </Skeleton>
          {
            data?.preview.length >= 1? <Image
            layout="responsive"
            objectFit="cover"
            blurDataURL={`${Cons.BASEURL}${data?.preview?.[0]}`}
            placeholder="blur"
            src={`${Cons.BASEURL}${data?.preview?.[0]}`}
            width={imageSize.width}
            height={imageSize.height}
            onClick={() => {
              if(data.type === 'course_recommend'){
                props.openCourseRecommend(data.id);
                return;
              }
              props.handleClick(data.id);
            }}
            onLoadingComplete={(target) => {
              setLoading(false);
              setSmageSize({
                width: target.naturalWidth,
                height: target.naturalHeight,
              });
            }}
            className=""
          /> : null
          }
         
          {data.type === 'activity' ? (
            <div className="bg-[#F7F8F9] text-[#798195] bottom-0 h-16 w-[100%] z-30 px-2 flex justify-center items-center">
              <div>
                {' '}
                <TimeIcon></TimeIcon>
              </div>
              <div>
                <div className="text-xs whitespace-nowrap scale-90">
                  {data.form.startTime}
                </div>
                <div className="text-xs whitespace-nowrap scale-90">
                  {data.form.endTime}
                </div>
              </div>
            </div>
          ) : null}
          {data.type === 'carpool' ? (
            <div className="bg-[#F7F8F9] text-[#798195]   bottom-0 h-16 w-[100%] z-30  flex justify-center items-center">
              <div>
                <TimeIcon></TimeIcon>
              </div>
              <div>
                <div className="text-xs scale-90 whitespace-nowrap">
                  {data.form.startTime}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-2">
          <div
            className={classnames(
              'inline-block p-1 mr-2 text-xs rounded-sm',
              colorMap[data.type],
            )}
          >
            {t(typeMap[data.type])}
          </div>
          <span className="text-sm text-blueTitle">{data.title}</span>
        </div>
        {data.form.prices ? (
          <div className="flex items-end mt-2 space-x-1 text-sm">
            <div className="text-price"> {data.form?.prices?.text === "0" ?
          "免费" :  data.form?.prices?.text 
          }</div>
            <div className="text-xs text-price">{
            data.form?.prices?.text === "0" ? null :
            data.form?.prices?.pricesUnit}</div>
            <div className="text-xs text-priceGray dele line-through">
              {!data.form?.prices?.showOldPrice || data.form?.prices?.text === "0" ? null : data.form?.prices?.oldPrice + ' ' +  data.form?.prices?.pricesUnit}
            </div>
          </div>
        ) : (
          <div className="flex items-end mt-2 space-x-1 text-sm"></div>
        )}
        {data.topic ? (
          <div className="flex items-end mt-2 space-x-1 text-sm">
            {data.topic.map((item, index) => {
              return (
                <div
                  className={classnames(
                    'border rounded-sm  border-price text-px10 p-0.25',
                    textColorMap[index % 2],
                  )}
                >
                  {item}{' '}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-end mt-2 space-x-1 text-sm"></div>
        )}
        {
          data?.user?.nickName ?        <div className="flex items-center justify-between mt-2 mb-2">
          <div className="flex items-center space-x-1">
            <div className="overflow-hidden w-[18px] h-[18px] rounded-full bg-neutral-focus text-neutral-content">
            <img src={`${Cons.BASEURL}${data?.user?.avatar}`} />
            </div>
            <div className="text-xs text-priceGray">
              {data?.user?.nickName}
            </div>
          </div>
          <div
            className="flex items-center text-xs text-priceGray"
            onClick={() => {
              handleLike(data?.id);
            }}
          >
            {like ? <Liked></Liked> : <Like></Like>}
            <div className={classnames({ 'text-red-400': like })}>
              {LikeCount}
            </div>
          </div>
        </div> : null
        }

      </div>
    );
  }
}
