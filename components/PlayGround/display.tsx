import React from 'react';
import Like from './Like.svg';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import TimeIcon from "./time.svg";
export default function Display(props) {
  const { data } = props;
  const router = useRouter();
  const colorMap = {
    闲置: 'yellow-gradient',
    新闻: 'blue-gradient',
    转租: 'purple-gradient',
    活动: 'pink-gradient',
    进群: 'green-gradient',
    Carpool: 'carpool-gradient',
  };

  const Normal = () =>{
    return (
      <div className="w-full pl-0.5 pr-0.5">
      <div
        onClick={() => {
          props.handleClick();
        }}
        style={{ position: "relative", width: "100%"}}
      >
        <Image
          layout="responsive"
          objectFit="cover"
          blurDataURL={data.img}
          placeholder="blur"
          src={data.img}
          width={imageSize.width}
          height={imageSize.height}
          onLoadingComplete={target => {
            setSmageSize({
              width: target.naturalWidth,
              height: target.naturalHeight
            });
           }}
          className="rounded-xl"
        />
      </div>
      <div className="mt-2">
        <div
          className={classnames(
            'inline-block p-1 mr-2 text-xs rounded-sm',
            colorMap[data.type],
          )}
        >
          {data.type}
        </div>
        <span className="text-sm text-blueTitle">{data.title}</span>
      </div>
      {data.price ? (
        <div className="flex items-end mt-2 space-x-1 text-sm">
          <div className="text-price"> {data.price}</div>
          <div className="text-xs text-price">{data.unit}</div>
          <div className="text-xs text-priceGray dele">{data.oldPrice}</div>
        </div>
      ) : (
        <div className="flex items-end mt-2 space-x-1 text-sm"></div>
      )}
      {data.tag ? (
        <div className="flex items-end mt-2 space-x-1 text-sm">
          {data.tag.map((item) => {
            return (
              <div
                className={classnames(
                  'border rounded-sm  border-price text-px10 p-0.25',
                  textColorMap[item.color],
                )}
              >
                {item.name}{' '}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-end mt-2 space-x-1 text-sm"></div>
      )}
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center space-x-1">
          <div className="bg-gray-500 rounded-full w-px18 h-px18"></div>
          <div className="ext-xs text-priceGray">{data.user}</div>
        </div>
        <div className="flex items-center text-xs text-priceGray">
          <Like></Like>
          <div>{data.like}</div>
        </div>
      </div>
    </div>
    )
  }
  const Ad = () =>{
    return (
      <div className="w-full pl-0.5 pr-0.5">
      <div
        onClick={() => {
          props.handleClick();
        }}
        style={{ position: "relative", width: "100%"}}
      >
        <div className='border border-gray-400 rounded-sm text-white absolute top-2 left-2 z-30'>推广</div>
        <Image
          layout="responsive"
          objectFit="cover"
          blurDataURL={data.img}
          placeholder="blur"
          src={data.img}
          width={imageSize.width}
          height={imageSize.height}
          onLoadingComplete={target => {
            setSmageSize({
              width: target.naturalWidth,
              height: target.naturalHeight
            });
           }}
          className="rounded-xl"
        />
      </div>
    </div>
    )
  }
  const componentsMap = {
    闲置: <Normal />,
    新闻: <Normal />,
    转租: <Normal />,
    活动: <Normal />,
    进群: <Normal />,
    Carpool: <Normal />,
    推广: <Ad />,
  }
  const textColorMap = {
    red: 'tag-red',
    blue: 'tag-blue',
  };
  const [imageSize, setSmageSize] = React.useState({
    width: 1,
    height: 1
   });

  if(data.type === '推广'){
    return <div className="w-full pl-0.5 pr-0.5">
    <div
      onClick={() => {
        props.handleClick();
      }}
      style={{ position: "relative", width: "100%"}}
      className="mb-2"
    >
      <div className='border border-gray-400 rounded-md text-white absolute top-2 left-2 z-30 px-1'>推广</div>
      <Image
        layout="responsive"
        objectFit="cover"
        blurDataURL={data.img}
        placeholder="blur"
        src={data.img}
        width={imageSize.width}
        height={imageSize.height}
        onLoadingComplete={target => {
          setSmageSize({
            width: target.naturalWidth,
            height: target.naturalHeight
          });
         }}
        className="rounded-xl"
      />
    </div>
  </div>
  }else{
    return <div className="w-full pl-0.5 pr-0.5">
    <div
      onClick={() => {
        props.handleClick();
      }}
      style={{ position: "relative", width: "100%"}}
      className="rounded-xl overflow-hidden"
    >
      <Image
        layout="responsive"
        objectFit="cover"
        blurDataURL={data.img}
        placeholder="blur"
        src={data.img}
        width={imageSize.width}
        height={imageSize.height}
        onLoadingComplete={target => {
          setSmageSize({
            width: target.naturalWidth,
            height: target.naturalHeight
          });
         }}
        className=""
      />
      {data.type === '活动' ?
      <div className='bg-[#F7F8F9] text-[#798195]  space-x-2 bottom-0 h-16 w-[100%] z-30 px-2 flex justify-center items-center'>
        <div> <TimeIcon></TimeIcon></div>
        <div>
          <div className='text-xs'>2023年1月13日 16:58 开始</div>
          <div className='text-xs'>2023年1月13日 16:58 开始</div>
        </div>
      </div>
      :null}
      {data.type === 'Carpool' ?
      <div className='bg-[#F7F8F9] text-[#798195]  space-x-2 bottom-0 h-16 w-[100%] z-30 px-2 flex justify-center items-center'>
         <div>
         <TimeIcon></TimeIcon>
         </div>
        <div>
          <div className='text-xs  whitespace-nowrap'>2022年11月26日 16:58 出发</div>
        </div>
      </div>
      :null}
    </div>
    <div className="mt-2">
      <div
        className={classnames(
          'inline-block p-1 mr-2 text-xs rounded-sm',
          colorMap[data.type],
        )}
      >
        {data.type}
      </div>
      <span className="text-sm text-blueTitle">{data.title}</span>
    </div>
    {data.price ? (
      <div className="flex items-end mt-2 space-x-1 text-sm">
        <div className="text-price"> {data.price}</div>
        <div className="text-xs text-price">{data.unit}</div>
        <div className="text-xs text-priceGray dele">{data.oldPrice}</div>
      </div>
    ) : (
      <div className="flex items-end mt-2 space-x-1 text-sm"></div>
    )}
    {data.tag ? (
      <div className="flex items-end mt-2 space-x-1 text-sm">
        {data.tag.map((item) => {
          return (
            <div
              className={classnames(
                'border rounded-sm  border-price text-px10 p-0.25',
                textColorMap[item.color],
              )}
            >
              {item.name}{' '}
            </div>
          );
        })}
      </div>
    ) : (
      <div className="flex items-end mt-2 space-x-1 text-sm"></div>
    )}
    <div className="flex items-center justify-between mt-2 mb-2">
      <div className="flex items-center space-x-1">
        <div className="bg-gray-500 rounded-full w-px18 h-px18"></div>
        <div className="ext-xs text-priceGray">{data.user}</div>
      </div>
      <div className="flex items-center text-xs text-priceGray">
        <Like></Like>
        <div>{data.like}</div>
      </div>
    </div>
  </div>
  }
}
