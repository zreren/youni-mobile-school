import React from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import Super from '../surper.svg';
import Like from '../Like.svg';
import DisLike from '../disLike.svg';
import Comments from '../Comments.svg';
import Discussion from '../discussion.svg';
export default function userComment() {
  return (
    <div className="bg-white p-4 rounded-lg  mb-4">
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
      {/* <Super></Super> */}
      <div
        className="flex justify-between items-center comment-detail-header to-yellow-50 w-full "
      >
        <div>
          <div className="flex space-x-2 mb-1 mt-1">
            <div className="text-gray-200">课程名称:</div>
            <div className="text-blueTitle">ADMS 1000</div>
          </div>
          <div className="flex space-x-2 mb-1 mt-1">
            <div className="text-gray-200">最终成绩:</div>
            <div className="text-blueTitle">B+</div>
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
      <div className="flex justify-between mt-3">
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
        <div>
          <Discussion></Discussion>
        </div>
      </div>
    </div>
  );
}
