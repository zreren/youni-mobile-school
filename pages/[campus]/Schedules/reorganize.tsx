import React from 'react';
import Header from '@/components/Header';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
import { Toast, Uploader } from 'react-vant';
interface ChangeType {
  id: number;
  label: string;
}
interface CCourseInput {
  title: string;
  isNess?: boolean;
  children?: any;
  data?: any;
  change?: (data: ChangeType) => void;
  renderData?: any;
}
export default function reorganize() {
  const CCourseInput = (props: CCourseInput) => {
    const { title, isNess, children, data, renderData } = props;
    const selectItem = (e) => {};
    return (
      <div className="w-full bg-white overflow-hidden text-right rounded-lg">
        <label className="flex justify-between w-full h-12 input-group ">
          <span className="text-sm font-medium bg-white text-blueTitle">
            {isNess === true ? <NessIcon className="mr-1"></NessIcon> : null}
            {title}
          </span>
          {/* <input */}
          {/*   type="text" */}
          {/*   placeholder="info@site.com" */}
          {/*   className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none" */}
          {/* /> */}
          {children ? children : null}
        </label>
      </div>
    );
  };
  const upload = async (file: File) => {
    try {
      const body = new FormData()
      body.append('source', file)
      const resp = await fetch('', {
        method: 'POST',
        body,
      })
      const json = await resp.json()
      // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
      return json.image
    } catch (error) {
      return { url: `demo_path/${file.name}` }
    }
  }
  return (
    <div className="w-full min-h-screen bg-[#F6F6F6]">
      <Header title="一键导入课表"></Header>
      <div className="p-4 space-y-4">
        <CCourseInput isNess title="学年&学期"></CCourseInput>
        <div className="h-[170px] w-full bg-white p-3 rounded-lg">
          <div className='text-[#37455C] text-sm font-medium'>上传课表图片</div>
          <div className='text-xs text-[#A9B0C0] mt-2'>
            上传清晰，图片内仅包含课表主要内容的图片，可以大
            大提升识别成功率哦！
          </div>
          <div className='mt-2'>
          <Uploader
                multiple
                upload={upload}
                maxCount={1}
                className="w-full h-full "
                maxSize={2500 * 1024}
                onOversize={() => Toast.info('文件大小不能超过15kb')}
              />
          </div>
        </div>
        <div className="w-full rounded-md h-10 bg-[#FFD036] text-[#8C6008] text-center flex justify-center items-center">
          下一步
        </div>
      </div>
    </div>
  );
}
