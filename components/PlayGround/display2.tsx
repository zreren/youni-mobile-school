import React from 'react';
import Like from './Like.svg';


export default function Display2() {
  return (
    <div className="w-full pl-0.5 pr-0.5">
      <div className='rounded-xl'>
        <img src="https://fakeimg.pl/250x180/" className="w-full rounded-xl" />
      </div>
      <div className="mt-2">
        <div className="inline-block p-1 mr-2 text-xs rounded-sm yellow-gradient">
          闲置
        </div>
        <span className="text-sm text-blueTitle">
          出闲置AirPods耳机二代占位占位占位
        </span>
      </div>
      <div className="flex items-end mt-2 space-x-1 text-sm">
        <div className="text-price">200</div>
        <div className="text-xs text-price">CAD</div>
        <div className="text-xs text-priceGray dele">348CAD</div>
      </div>
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center space-x-1">
          <div className="bg-gray-500 rounded-full w-px18 h-px18"></div>
          <div className='ext-xs text-priceGray'>User name</div>
        </div>
        <div className="flex items-center text-xs text-priceGray">
          <Like></Like>
          <div>8,618</div>
        </div>
      </div>
    </div>
  );
}
