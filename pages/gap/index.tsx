import React from 'react'
const CScoreCard = () => {
    return (
        <div className="w-24 h-14">
            <div className="flex items-center justify-center w-full h-8 text-lg font-medium text-center bg-gray-200 rounded-t-lg text-blueTitle">
                3.2
            </div>
            <div className="w-full h-1.2/3 bg-gray-100 text-center text-gray-400">
                内容评分
            </div>
        </div>
    )
}
export default function index() {
    return (
        <div>
            <div className='relative w-full gap-bg h-80'>
                <div className='absolute p-4 bg-white rounded-full left-8 rotate-220'>
                    {/* @ts-ignore */}
                    <div className="radial-progress text-primary" style={{ "--value": 70 }}>
                        <div className='-rotate-220'>111</div>
                    </div>
                </div>
                <div className='w-full pt-10 pl-5 pr-5 '>
                    <div className='rounded-t-lg pink-linergradient-bg h-14'></div>
                    <div className='h-24 bg-white rounded-b-lg'>
                        <div className="flex justify-between p-4">
                            <CScoreCard></CScoreCard>
                            <CScoreCard></CScoreCard>
                            <CScoreCard></CScoreCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
