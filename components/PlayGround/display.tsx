import React from 'react';
import Like from './Like.svg';
import classnames from 'classnames';
import { useRouter } from 'next/router';
export default function Display(props) {
  const { data } = props;
  const router = useRouter();
  const colorMap = {
    闲置: 'yellow-gradient',
    新闻: 'blue-gradient',
    转租: 'purple-gradient',
  };
  const textColorMap = {
    "red":"tag-red",
    "blue":"tag-blue",
  }
  return (
    <div className="w-full pl-0.5 pr-0.5">
      <div onClick={()=>{router.push(`./post/${data.id}`)}}>
        <img src={data.img} className="w-full rounded-xl" />
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
              <div className={classnames("border rounded-sm  border-price text-px10 p-0.25",
              textColorMap[item.color]
              )}>
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
  );
}
