import React from 'react'
const CScoreCard = () => {
    return (
        <div className="w-24 h-14">
            <div className="w-full text-blueTitle flex items-center justify-center text-lg h-8 bg-gray-200 text-center rounded-t-lg font-medium">
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
            <div className='gap-bg h-80 w-full relative'>
                <div className='absolute left-8 bg-white rounded-full p-4 rotate-220'>
                    <div className="radial-progress text-primary" style={{ "--value": 70 }}>
                        <div className='-rotate-220'>111</div>
                    </div>
                </div>
                <div className='w-full pl-5 pr-5 pt-10 '>
                    <div className='pink-linergradient-bg rounded-t-lg h-14'></div>
                    <div className='bg-white h-24 rounded-b-lg'>
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
