import React from 'react'

export default function PostDiscussionInput() {
  return (
    <div className='flex w-full h-9'>
        <div className='rounded-full w-9 min-w-[2.25rem] h-9 bg-slate-400'></div>
        <input placeholder='看到这了，要不要说点什么...' className='px-4 w-full ml-2 h-full bg-[#F7F8F9] rounded-full'></input>
    </div>
  )
}
