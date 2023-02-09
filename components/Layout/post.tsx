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
import { Loading } from 'react-vant';
import useRequest from '@/libs/request';
import { Popup } from 'react-vant';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import useFetch from '../../hooks/useFetch';
import { Toast } from 'react-vant';
import { areOptionsEqual } from '@mui/base';
function index(props) {
  const { id } = props;
  const { data, mutate } = useFetch(`/post/detail?id=${id}`, 'get');
  /**
   * @description 发送评论
   * @param e 评论内容
   */
  const sendComment = async (e) => {
    const { data } = await useRequest.post('/api/post/comment', {
      id: id,
      content: e,
    });
    if (data?.message) {
      Toast.success('评论成功');
      mutate({}, true);
    }
  };
  /**
   *
   * @param comment 评论内容
   * @param id 当父id不存在时，id为当前评论id，否则为父id
   * @param pid 父id
   */
  const sendChild = async (comment, id, pid) => {
    const { data } = await useRequest.post('/api/comment/comment', {
      pid: pid === null ? id : pid,
      replyId: pid === null ? null : id,
      content: comment,
    });
    if (data?.message) {
      Toast.success('评论成功');
      mutate({}, true);
    }
  };
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
  const [commentChild, setCommentChild] = useState({
    id: null,
    user: null,
    pid: null,
  });
  const commentComment = (e) => {
    setCommentChild(e);
  };
  function FooterDiscussionInputChild(props) {
    const [comment, setComment] = useState<string>('');
    const { user, id, pid } = props;
    const send = () => {
      if(comment === ''){
        Toast.fail('评论不能为空')
        return
      };
      props.send(comment, id, pid);
      setComment('');
    };
    return (
      <div className="sticky  z-30 bottom-0 flex   items-center w-full p-5 bg-white h-[60px]">
        <input
          placeholder={`回复${user?.nickName}`}
          value={comment}
          className="px-1 pl-4 w-full   h-9 bg-[#F7F8F9] rounded-full"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <div onClick={()=>{
          setCommentChild({
            id: null,
            user: null,
            pid: null,
          })
        }} className="text-sm text-[#798195] whitespace-nowrap ml-2 mr-2">
          返回
        </div>
        <div
          className="text-sm text-[#798195] whitespace-nowrap"
          onClick={() => {
            send();
          }}
        >
          发送
        </div>
      </div>
    );
  }
  return (
    <div className="mb-10">
      <Popup
        overlayClass={'Popup'}
        className="z-30 topIndexPlus rounded-full "
        visible={!data}
      >
        <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
          <Loading type="spinner" color="#FED64B" />
        </div>
      </Popup>
      <UserHeader
        className="sticky z-30 bg-white top-0"
        data={data?.data?.student}
      ></UserHeader>
      <div className="min-h-[380px]">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          height={520}
          className="mySwiper"
          onClick={() => {
            props.stop();
          }}
          onTouchStart={() => {
            props.stop();
          }}
          onTouchEnd={() => {
            props.start();
          }}
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
              <SwiperSlide>
                <CImage
                  onTouchStart={() => {
                    props.stop();
                  }}
                  item={item}
                ></CImage>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="p-5 bg-white mt-2">
        <div className="text-lg font-bold text-blueTitle">
          {data?.data?.title}
        </div>
        <div className="flex items-end mt-2 space-x-1 text-sm">
          <div className="text-2xl font-bold text-price">
            {!data?.data?.form?.prices?null:data?.data?.form?.prices?.text === "0"? "免费":
            data?.data?.form?.prices?.text
            }
            </div>
          <div className="text-sm text-price">{!data?.data?.form?.prices?null:data?.data?.form?.prices?.text === "0"?null:
          data?.data?.form?.prices?.priceUnit
          }</div>
          <div className="text-sm text-priceGray dele">{!data?.data?.form?.prices?null:data?.data?.form?.prices?.text === "0"?null:data?.data?.form?.prices?.showOldPrice?data?.data?.form?.prices?.oldPrice:null}</div>
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
        <UserInfo
          contact={data?.data?.contact}
          data={data?.data?.student}
        ></UserInfo>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div>
        <Map></Map>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5">
        <PostDiscussionInput></PostDiscussionInput>
        <Discussion
          commentComment={(e) => {
            commentComment(e);
          }}
          comments={data?.data?.comments}
        ></Discussion>
      </div>
      {commentChild?.id ? (
        <FooterDiscussionInputChild
          send={(comment, id, pid) => {
            sendChild(comment, id, pid);
          }}
          {...commentChild}
        ></FooterDiscussionInputChild>
      ) : (
        <FooterDiscussionInput
          send={(e) => {
            sendComment(e);
          }}
          data={data?.data}
        ></FooterDiscussionInput>
      )}
    </div>
  );
}

export default index;
