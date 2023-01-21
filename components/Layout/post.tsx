import React from 'react';
import UserHeader from '@/components/UserHeader';
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Discussion from '@/components/Discussion';
import UserInfo from '@/components/UserInfo';
import Image from 'next/image';
import MapIcon from './mapIcon.svg';
import PostDiscussionInput from '@/components/Input/PostDiscussionInput';
import FooterDiscussionInput from '@/components/Input/FooterDiscussionInput';
import { Skeleton } from 'react-vant';
import useRequest from '@/libs/request';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import useFetch from '../../hooks/useFetch';
import { areOptionsEqual } from '@mui/base';
function index(props) {
  const { id } = props;
  const { data } = useFetch(`/post/detail?id=${id}`, 'get');
  // const {data:postData} = data
  const sendComment = (e) => {
    useRequest.post('/api/post/comment', {
      id: id,
      content: e
    })
  }
  const Map = () => {
    return (
      <div className="w-full relative h-[185px] bg-white px-5 py-4 rounded-xl overflow-hidden 	">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <img src="/assets/map.png" className="w-full h-full "></img>
        </div>
        <div className="absolute px-3 items-center  flex justify-between left-0 right-0 mx-auto z-30 w-[80%] h-[48px] bg-white/70 backdrop-blur-sm		 bottom-10 rounded-lg">
          <div className="flex items-center w-[90%]">
            <div className="mr-2">
              <MapIcon className="w-[14px] h-[14px]"></MapIcon>
            </div>
            <div className="text-xs text-[#798195]">
              8 Northtown Way, Toronto, Ontario M2N 7A1, Canada
            </div>
          </div>
          <div className="bg-[#FFD036] w-12 h-6 text-xs rounded-full text-[#8C6008] whitespace-nowrap	flex justify-center items-center">
            导航
          </div>
        </div>
      </div>
    );
  };
  const PostTag = (props) => {
    const { tag } = props;
    return <div className="mt-2 text-[#2347D9] text-sm">#{tag}</div>;
  };
  // const UserHeader = ()=>{
  //   return (
  //     <div className="flex items-center mb-4">
  //       <div className="avatar placeholder">
  //         <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
  //           <img src="https://placeimg.com/192/192/people" />
  //         </div>
  //       </div>
  //       <div>
  //         <div className="ml-4 text-sm FONT_MEDIUM max-w-8 text-blueTitle">
  //           测试用户
  //         </div>
  //         <div className="ml-4 text-xs text-gray-200">2022届 · B.Com Accounting</div>
  //       </div>
  //     </div>
  //   )
  // }
  const CImage = (props) => {
    const { item } = props;
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return (
      <Skeleton
        round={false}
        className="h-[500px] p-0"
        rowHeight={'100%'}
        loading={loading}
      >
        <img
          height={500}
          // sizes="100%"
          src={`${Cons.BASEURL}${item}`}
          className="w-screen h-[500px] object-cover"
          // objectFit="cover"
          alt=""
        />
      </Skeleton>
    );
  };
  return (
    <div className="mb-10">
      <UserHeader data={data?.data?.student}></UserHeader>
      <div className="min-h-[380px]">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          height={520}
          className="mySwiper"
          onClick={() => { props.stop() }}
          onTouchStart={() => { props.stop() }}
          onTouchEnd={() => { props.start() }}
        >
          {/* <SwiperSlide>
            <Image
              layout='fill'
              src="https://fakeimg.pl/250x280"
              className="w-screen"
              alt=""
            />
          </SwiperSlide> */}
          {data?.data?.preview?.map((item, index) => {
            // const [loading, setLoading] = useState(true);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 1000);
            return (
              <SwiperSlide >
                
                  <CImage
                    onTouchStart={() => { props.stop() }} item={item}></CImage>

              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="p-5 bg-white">
        <div className="text-lg font-bold text-blueTitle">
          {data?.data?.title}
        </div>
        <div className="flex items-end mt-2 space-x-1 text-sm">
          <div className="text-2xl font-bold text-price"> 200</div>
          <div className="text-sm text-price">CAD</div>
          <div className="text-sm text-priceGray dele">348CAD</div>
        </div>
        <div className="mt-4 post-content">{data?.data?.body}</div>
        <div className="flex items-center space-x-1">
          {data?.data?.topic?.map((item, index) => {
            return <PostTag key={index} tag={item}></PostTag>;
          })}
        </div>

        <div className="flex justify-end">
          <div className="mt-2 border border-[#DCDDE1] w-14 h-6 text-xs rounded-full text-[#A9B0C0] whitespace-nowrap	flex justify-center items-center">
            举报
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5 pt-4 pb-2">
        <UserInfo></UserInfo>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div>
        <Map></Map>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5">
        <PostDiscussionInput></PostDiscussionInput>
        <Discussion comments={data?.data?.comments}></Discussion>
      </div>
      <FooterDiscussionInput send={(e) => { sendComment(e) }} data={data?.data}></FooterDiscussionInput>
    </div>
  );
}
export default React.memo(index)