import React from 'react';

export default function CProgress() {
  return (
   <div>
     <div className='mb-4'>
      <div className='text-gray-500'>非常糟糕</div>
      <div className='flex items-center'>
        <progress
          className="progress progress-warning  h-3 w-full"
          value="70"
          max="100"
        ></progress>
        <div className='text-gray-400 text-sm ml-2' >5</div>
      </div>
    </div>
    <div className='mb-4'>
      <div className='text-gray-500'>勉勉强强</div>
      <div className='flex items-center'>
        <progress
          className="progress progress-warning  h-3 w-full"
          value="70"
          max="100"
        ></progress>
        <div className='text-gray-400 text-sm ml-2' >5</div>
      </div>
    </div>
   </div>
    
  );
}
