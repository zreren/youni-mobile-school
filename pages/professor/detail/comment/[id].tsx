import React, { useState } from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import Super from '../surper.svg';
import Like from '../Like.svg';
import DisLike from '../disLike.svg';
import Comments from '../Comments.svg';
import Discussion from '../discussion.svg';
import Union from "../Union.svg";
import PostDiscussionInput from '@/components/Input/PostDiscussionInput';
import Header from '@/components/Header';
export default function userComment() {
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
      <div className='w-full flex justify-between mt-2 mb-2'>
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
      <div className='w-full mt-2 flex justify-start space-x-3'>
        <div>
          <div className='bg-gray-500 rounded-full w-9 h-9'></div>
        </div>
        <div>
          <div className='font-medium'>测试用户1</div>
          <div className="text-xs text-secondGray mt-1">2022届 · B.Com Accounting</div>
          <div className='text-sm mt-1'>文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖 @测试用户2</div>
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
                        <div className='w-full mt-2 flex justify-start space-x-3'>
                          <div>
                            <div className='bg-gray-500 rounded-full w-6 h-6'></div>
                          </div>
                          <div>
                            <div className='font-medium'>测试用户1</div>
                            <div className="text-xs text-secondGray mt-1">2022届 · B.Com Accounting</div>
                            <div className='text-sm mt-1'>文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖 @测试用户2</div>
                            <DiscussionComponentFooter></DiscussionComponentFooter>
                          </div>
                        </div>
                      )
                    }) : item.children?.slice(0, 2).map((item) => {
                      return (
                        <div className='w-full mt-2 flex justify-start space-x-3'>
                          <div>
                            <div className='bg-gray-500 rounded-full w-6 h-6'></div>
                          </div>
                          <div>
                            <div className='font-medium'>测试用户1</div>
                            <div className="text-xs text-secondGray mt-1">2022届 · B.Com Accounting</div>
                            <div className='text-sm mt-1'>文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖文字跟帖 @测试用户2</div>
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
                    <div className='font-semibold text-primary text-xs' onClick={() => [setExpand(!expand)]}>
                    {expand ? '收起' : `查看全部 ${item?.children?.length - 2} 条回复`}
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
    <div className="bg-white p-4 rounded-lg  mb-4">
      <Header></Header>
      <div className="flex items-center mb-4">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div>
          <div className="text-lg ml-4 font-medium max-w-8 text-blueTitle">
            测试用户
          </div>
          <div className="text-gray-200 ml-4">2022届 · B.Com Accounting</div>
        </div>
      </div>
      <div>
        <div className="w-full   rounded-t-xl org-gradient2 relative h-8">
          <Super className="absolute right-1 bottom-0 z-10"></Super>
          <Union className="absolute right-0 bottom-0"></Union>
          <div className='pl-4 pt-2 course-evaluation'>课程评价</div>
        </div>
        <div className='bg-gradient-to-b from-yellow-50  p-4'>
          <div
            className="flex justify-between items-center comment-detail-header to-yellow-50 w-full "
          >
            <div>
              <div className="flex space-x-2 mb-1 mt-1">
                <div className="text-gray-300">课程名称:</div>
                <div className="text-blueTitle">ADMS 1000</div>
              </div>
              <div className="flex space-x-2 mb-1 mt-1">
                <div className="text-gray-300">最终成绩:</div>
                <div className="text-blueTitle">B+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
      </div>
      <div>
        <div className="mt-2 mb-2">
          这门课需要大量的练习和时间，但有可能做得好。
        </div>
        <div className="pb-2">
          <div className="text-sm font-bold text-blueTile">课程内容</div>
          <div className="text-sm tracking-wide	 font-extralight  text-blueTile leading-normal">
            这是普通化学序列的第一部分，在第一单元中涵盖了CHM1025的大部分内容。
          </div>
        </div>
        <div className="pb-2">
          <div className="text-sm font-bold text-blueTile">对课程的评价</div>
          <div className="text-sm tracking-wide	 font-extralight text-blueTile leading-normal">
            哈里斯博士是一位乐于助人、招人喜欢的教授。比起他的讲座视频，我更喜欢阅读教科书和额外的在线资源，但在面授和办公时间，他很细心，知识渊博。
          </div>
        </div>
        <div className="pb-2">
          <div className="text-sm font-bold text-blueTile">建议</div>
          <div className="text-sm tracking-wide	 font-extralight	 text-blueTile leading-normal">
            你不需要Studyedge来做好这门课，但无论如何，你必须投入时间来学习材料并学好它。如果你有一段时间没有上过化学课（对我来说是高二），我建议你上CHM1025。我的日常工作是使用讲座幻灯片、教科书、讲座视频和/或其他在线资源来做笔记，并在亲自授课前学习材料（我是在翻转课堂部分）。我有一个单独的笔记本，在讲课时做题。对于家庭作业，我记下了我所纠结的问题，并重新做了作业，直到我全部做对。我还在每个单元的谷歌文档中记录了我可能会忘记的提示和信息。为了准备考试，我复习了我在考试中遇到的问题/章节。
          </div>
        </div>
      </div>
      {/* <div className="flex justify-between mt-3">
        <div className="flex space-x-4 ">
          <div className="flex">
            <Like></Like>
            <div className="text-xs text-gray-300">600</div>
          </div>
          <div className="flex">
            <DisLike></DisLike>
            <div className="text-xs text-gray-300">600</div>
          </div>
          <div className="flex">
            <Comments></Comments>
            <div className="text-xs text-gray-300">600</div>
          </div>
        </div>
      </div> */}
      <div className="h-1 m-0 divider opacity-30"></div>
      <div className='space-y-8 mt-4'>
        <PostDiscussionInput></PostDiscussionInput>
        <Discussion></Discussion>
      </div>
    </div>
  );
}
