import React from 'react';

export default function CProgress(Props) {
  const { data } = Props;
  return (
    <div>
      <div className="mb-2 mt-2">
        <div className="text-gray-500">{data.item}</div>
        <div className="flex items-center">
          <progress
            className="progress progress-warning  h-3 w-full"
            value={data.percent * 20}
            max="100"
          ></progress>
          <div className="text-gray-400 text-sm ml-2">{data.percent}</div>
        </div>
      </div>
    </div>
  );
}
