import React,{useState} from 'react'

export default function index() {
    const comments = [
        {
          id: 1,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the first comment',
          children: [
            {
              id: 2,
              createdAt: '2022-12-07',
              updatedAt: '2022-12-07',
              content: 'This is the first reply to the first comment',
              children: [],
              parent: 1,
              evaluation: {},
              student: {},
              deletedAt: null
            },
            {
              id: 3,
              createdAt: '2022-12-07',
              updatedAt: '2022-12-07',
              content: 'This is the second reply to the first comment',
              children: [],
              parent: 1,
              evaluation: {},
              student: {},
              deletedAt: null
            },
            {
              id: 4,
              createdAt: '2022-12-07',
              updatedAt: '2022-12-07',
              content: 'This is the third reply to the first comment',
              children: [],
              parent: 1,
              evaluation: {},
              student: {},
              deletedAt: null
            }
          ],
          parent: null,
          evaluation: {},
          student: {},
          deletedAt: null
        },
        {
          id: 5,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the second comment',
          children: [
            {
              id: 6,
              createdAt: '2022-12-07',
              updatedAt: '2022-12-07',
              content: 'This is the first reply to the second comment',
              children: [],
              parent: 5,
              evaluation: {},
              student: {},
              deletedAt: null
            },
            {
              id: 7,
              createdAt: '2022-12-07',
              updatedAt: '2022-12-07',
              content: 'This is the second reply to the second comment',
              children: [],
              parent: 5,
              evaluation: {},
              student: {},
              deletedAt: null
            },
            {
              id: 8,
              createdAt: '2022-12-07',
              updatedAt: '2022-12-07',
              content: 'This is the third reply to the second comment',
              children: [],
              parent: 5,
              evaluation: {},
              student: {},
              deletedAt: null
            }
          ],
          parent: null,
          evaluation: {},
          student: {},
          deletedAt: null
        }
      ];
      const DiscussionComponentFooter = () => {
        return (
          <div className='flex justify-between w-full mt-2 mb-2'>
            <div className='flex items-center space-x-2'>
              <div className='text-xs text-lightGray'>4小时前</div>
              <div className='text-xs font-semibold text-secondGray'>回复</div>
            </div>
            <div className='flex space-x-2'>
              <div className="flex items-center text-xs">15</div>
              <div className='flex items-center text-xs'>3</div>
            </div>
          </div>
        )
      }
      const DiscussionComponent = ({ children }) => {
        return (
          <div className='flex justify-start w-full mt-2 space-x-3'>
            <div>
              <div className='bg-gray-500 rounded-full w-9 h-9 animate-pulse'></div>
            </div>
            <div>
              <div className='font-medium text-userColor'>测试用户1</div>
              <div className="mt-1 text-xs text-secondGray">2022届 · B.Com Accounting</div>
              <div className='mt-1 text-sm text-postContent'>文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖 @测试用户2</div>
              <DiscussionComponentFooter></DiscussionComponentFooter>
              <div>{children}</div>
            </div>
          </div>
        )
      }
      const Discussion = () => {
        return (
          <div>
            {
              comments.map((item) => {
                const [expand, setExpand] = useState(false);
                return (
                  <div>
                    <DiscussionComponent>
                      <div className=''>
                        {expand ? item.children?.map((item) => {
                          return (
                            <div className='flex justify-start w-full mt-2 space-x-3'>
                              <div>
                                <div className='w-6 h-6 bg-gray-500 rounded-full'></div>
                              </div>
                              <div>
                                <div className='font-medium text-userColor'>测试用户1</div>
                                <div className="mt-1 text-xs text-secondGray">2022届 · B.Com Accounting</div>
                                <div className='mt-1 text-sm text-postContent'>文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖 @测试用户2</div>
                                <DiscussionComponentFooter></DiscussionComponentFooter>
                              </div>
                            </div>
                          )
                        }) : item.children?.slice(0, 2).map((item) => {
                          return (
                            <div className='flex justify-start w-full mt-2 space-x-3'>
                              <div>
                                <div className='w-6 h-6 bg-gray-500 rounded-full'></div>
                              </div>
                              <div>
                                <div className='font-medium text-userColor'>测试用户1</div>
                                <div className="mt-1 text-xs text-secondGray">2022届 · B.Com Accounting</div>
                                <div className='mt-1 text-sm text-postContent'>文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖 @测试用户2</div>
                                <DiscussionComponentFooter></DiscussionComponentFooter>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className='flex space-x-3'>
                        <div>
                          <div className='w-6 h-6'></div>
                        </div>
                        <div className='text-xs font-semibold text-primary' onClick={() => [setExpand(!expand)]}>
                          {expand ? "收起" : "查看全部 3 条回复"}
                        </div>
                      </div>
                    </DiscussionComponent>
                  </div>
                )
              })
            }
          </div >
        )
    
      }

    return (
        <div>
            <div className='my-4 text-sm font-semibold text-blueTitle'>评论 7</div>
            <div className='w-full mb-3 bg-border h-px1'></div>
            <Discussion></Discussion>
        </div>
    )
}
