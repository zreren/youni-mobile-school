import React, { useEffect, useMemo } from 'react';
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
import mapRequest from '@/libs/mapRequest';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Switch } from 'react-vant';
// import useRequest from "@/libs/request";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import classnames from 'classnames';
import Waterfall from '@/components/Layout/Waterfall';
import TopicIcon from './topic.svg';
import { useRouter } from 'next/router';


const PostGroupDetail = (props) => {
  const { data,isEdit,mutate } = props;
  const cancelStarPost = async (id)=>{
    console.log("PostGroupDetail",id,data?.id)
    await  useRequest.post("/api/post/unstar",{
      id:id,
      collectionId:data?.id
    })
    Toast.success("移除成功")
    mutate()
  }
  useEffect(()=>{
    console.log(isEdit,"isEdit")
  },[isEdit])
  if (!data) return;
  return (
    <div className="w-full h-screen">
      <div className="w-full h-[126px] bg-[#F7F8F9] p-5 pt-6 mb-2">
        <div className="flex items-center">
            <div className=' '>
              <TopicIcon></TopicIcon>
            </div>
          {
          <div className="ml-4 text-[#37455C] font-semibold text-lg">
            {props?.topicName}
          </div>
          }          
        </div>
        <div>
        </div>
      </div>
      {data?.posts?.length > 0 ?<Waterfall
            key={data?.id + data?.posts?.length}
            cancelStarPost={(id)=>{cancelStarPost(id)}}
            postData={data?.posts?.map((item) => {
              return { ...item, user: { nickName: data?.user?.nickName } };
            })}
          ></Waterfall>:<div className='text-[#898E97] flex justify-center'>该文集暂时没有内容</div>}
    </div>
  );
};

const PostGroupDrawer = (props) => {
  const { open,isEdit,mutate}: { open: boolean,isEdit:boolean,mutate:any} = props;
  const [id, setId] = useState(props?.id);
  const Puller = styled(Box)(({ theme }) => ({
    width: 33,
    height: 4,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));
  return (
    <SwipeableDrawer
      className="z-20 bottom-footer-theTop"
      disableDiscovery={true}
      disableSwipeToOpen={true}
      onClose={() => {
        props.onClose();
      }}
      onOpen={() => {
        props.onOpen();
      }}
      open={open}
      anchor="bottom"
    >
      <div className="h-[96vh]">
        <Puller></Puller>
        <PostGroupDetail topicName={props.topicName} mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail>
      </div>
    </SwipeableDrawer>
  );
};

function index(props) {
  const { id } = props;
  const { data, mutate } = useFetch(`/post/detail?id=${id}`, 'get');
  const router = useRouter();
  const campus = router.query.campus;
  const {data:_commentData,mutate:mutateComment} = useFetch('/comment/list','page',{
    id: id,
    pageSize : 10,
    type :  2
  })
  const commentData = useMemo(() => 
  _commentData? commentData?
   [...commentData].concat(_commentData).filter((item)=>item !== undefined):[].concat(..._commentData).filter((item)=>item !== undefined): null
   ,[_commentData,data])
   useEffect(()=>{
    console.log(commentData,"commentData")
   },[commentData])

   useEffect(()=>{
    if(id===0) return
    if(data?.data?.type !== 'course_recommend'){
      window.history.replaceState({}, '', `/${campus}/post/${id}`);
    }else{
      window.history.replaceState({}, '', `/${campus}/recommend/${id}`);

    }
   },[id,])

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
      mutateComment();
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
      mutateComment();
    }
  };

  interface MapLocation  {
    point: number[];
    placename: string;
  }
  const Map = React.memo((props:any) => {
    if(!props?.data?.map) return;
    const TOKEN = Cons.TOKEN;
    const [maoSrc,setMapSrc] = React.useState<any>()
    const Location:MapLocation = React.useMemo(()=>{
       try {
        return JSON.parse(props?.data?.location)
       } catch (error) {
          return false
       }
    },[props.data])
    const point = useMemo(()=>{
      if(!props?.data?.map) return;
      if(!Location) return
      const point = Location?.point;
      if(!point) return
      const bbox_width = 0.005;
      const bbox_height = 0.005;
      const longitude1 = point[0] - (bbox_width / 2)
      const latitude1 = point[1] - (bbox_height / 2)
      const longitude2 = point[0] + (bbox_width / 2)
      const latitude2 = point[1] + (bbox_height / 2)
      return [longitude1,latitude1,longitude2,latitude2]
    },[Location])
    if(!Location.point) return
    if(!point) return

    useEffect(()=>{
      // if(!point) return
      // if(!Location?.point) return
      if(Location?.point){
        mapRequest.get(
          `styles/v1/mapbox/streets-v12/static/[${point}]/400x180?access_token=${TOKEN}`,
          {
            responseType: 'blob'
          }
        )?.then(async(res)=>{
          // const blob = await res.data.blob()
          const url = URL.createObjectURL(res.data);
          setMapSrc(url);
          console.log(url,'Map')
          // setMapSrc(res.config.url)
        })
      }
    },[Location?.point])
    function openMaps(point:number[]) {
      var lat = point[1]; // 目标地点的纬度
      var lon = point[0]; // 目标地点的经度
      var isWeixinBrowser = /MicroMessenger/i.test(navigator.userAgent);
      if(isWeixinBrowser){
        Toast.fail('当前在微信中，打开浏览器获得完全体验')
        return;
      }
      var isIOS = /iP(ad|hone|od)/.test(navigator.userAgent); // 检测设备是否为iOS
      Toast.success('正在打开地图应用')
      if (isIOS) {
        // 如果是iOS设备，则打开iOS自带地图应用程序
        window.location.href = "http://maps.apple.com/?ll=" + lat + "," + lon;
      } else {
        // 如果是Android设备，则尝试打开谷歌地图应用程序
        window.location.href = "comgooglemaps://?q=" + lat + "," + lon;
        setTimeout(() => {
          window.location.href = "androidamap://viewMap?sourceApplication=myapp&lat=" + lat + "&lon=" + lon;
        }, 500);
        // try {
        //   window.location.href = "comgooglemaps://?q=" + lat + "," + lon;
        // } catch (error) {
        //   try {
        //     window.location.href = "baidumap://map/geocoder?location=" + lat + "," + lon;
        //   } catch (error) {
        //    try {
        //     window.location.href = "iosamap://viewMap?sourceApplication=myapp&lat=" + lat + "&lon=" + lon;
        //    } catch (error) {
        //     Toast.fail('你的手机没有地图应用,无法导航')
        //    }
        //   }
        // }
        
      }
    }
    // if(!mapContainer.current) return;
    return (
      <div className="w-full relative h-[185px] bg-white px-5 py-4 rounded-xl overflow-hidden 	">
        <div className="w-full h-full overflow-hidden rounded-xl">
        <div  />
        {
          maoSrc? <img src={maoSrc} className="w-full h-full "></img>  : <div className='w-full h-full bg-gray-100'></div>
        }
         
        </div>
        <div className="absolute px-3 items-center  flex justify-between left-0 right-0 mx-auto z-10 w-[80%] h-[48px] bg-white/70 backdrop-blur-sm		 bottom-10 rounded-lg">
          <div className="flex items-center w-[90%]">
            <div className="mr-2">
              <MapIcon className="w-[14px] h-[14px]"></MapIcon>
            </div>
            <div className="text-xs text-[#798195]">
              {Location?.placename}
            </div>
          </div>
          {/* <a href={`comgooglemaps://?q=40.7127,-74.0059`}> */}
          <div onClick={()=>{openMaps(Location?.point)}} className="bg-[#FFD036] w-12 h-6 text-xs rounded-full text-[#8C6008] whitespace-nowrap	flex justify-center items-center">
            导航
          </div>
         {/* </a> */}
        </div>
      </div>
    );
  });

  const PostTag = (props) => {
    const { tag } = props;
    return <div onClick={()=>{props.check(tag)}}  className="mt-2 text-[#2347D9] text-sm">{tag}</div>;
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
      if (comment === '') {
        Toast.fail('评论不能为空');
        return;
      }
      props.send(comment, id, pid);
      setComment('');
    };
    return (
      <div className="sticky  z-30   bottom-10 flex   items-center w-full p-5 bg-white h-[60px]">
        <input
          placeholder={`回复${user?.nickName}`}
          value={comment}
          className="px-1 pl-4 w-full   h-9 bg-[#F7F8F9] rounded-full"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <div
          onClick={() => {
            setCommentChild({
              id: null,
              user: null,
              pid: null,
            });
          }}
          className="text-sm text-[#798195] whitespace-nowrap ml-2 mr-2"
        >
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
  const inputRef = React.useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  }
  const [openDetail, setOpenDetail] = useState(false);
  const [topicName,setTopicName] = useState()
  const [detailId, setDetailId] = useState(1);
  const { data: collectionData } = useFetch(
    '/collection/detail',
    'get',
    {
      id: detailId,
    },
  );

  return (
    <div className="mb-10 ">
      <PostGroupDrawer
      topicName={topicName}
      onOpen={() => {
        setOpenDetail(true);
      }}
      onClose={() => {
        setOpenDetail(false);
      }}
      data={collectionData?.data}
      open={openDetail}
      ></PostGroupDrawer>
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
       returnClick={()=>{props.returnClick()}}
        className="sticky z-30 bg-white top-0"
        data={data?.data?.user}
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
                  onTouchStart={(e) => {
                    e.preventDefault();
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
            {!data?.data?.form?.prices
              ? null
              : data?.data?.form?.prices?.text === '0'
              ? '免费'
              : data?.data?.form?.prices?.text}
          </div>
          <div className="text-sm text-price">
            {!data?.data?.form?.prices
              ? null
              : data?.data?.form?.prices?.text === '0'
              ? null
              : data?.data?.form?.prices?.pricesUnit}
          </div>
          <div className="text-sm text-priceGray dele line-through">
            {!data?.data?.form?.prices
              ? null
              : data?.data?.form?.prices?.text === '0'
              ? null
              : data?.data?.form?.prices?.showOldPrice
              ? data?.data?.form?.prices?.oldPrice + data?.data?.form?.prices?.pricesUnit
              : null}
          </div>
        </div>
        <div className="mt-4 post-content">{data?.data?.body}</div>
        <div className="flex items-center space-x-2">
          {data?.data?.topic?.map((item, index) => {
            return <PostTag check={(item)=>{
              setOpenDetail(true);
              setTopicName(item);
            }} key={index} tag={item}></PostTag>;
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
          contact={data?.data?.form.contact}
          data={data?.data?.user}
        ></UserInfo>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div>
        <Map data={data?.data?.form}></Map>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5">
        <PostDiscussionInput
         callDiscussion={focusInput}
        ></PostDiscussionInput>
        <Discussion
          callDiscussion={focusInput}
          commentComment={(e) => {
            commentComment(e);
          }}
          comments={commentData}
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
          ref={inputRef}
          data={data?.data}
        ></FooterDiscussionInput>
      )}
    </div>
  );
}

export default index;
