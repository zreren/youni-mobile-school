import React from 'react';
import UserHeader from '@/components/UserHeader';
import { useRef, useState, useEffect, useMemo } from 'react';
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
import useFetch from '@/hooks/useFetch';
import { Toast } from 'react-vant';
import { areOptionsEqual } from '@mui/base';
import { useRouter } from 'next/router';
import mapRequest from '@/libs/mapRequest';
import useUser from '@/hooks/useUser';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  selectLoginModelState,
  seLoginModelState,
  selectOpen,
} from '@/stores/authSlice';
import { useDispatch } from 'react-redux';

function index(props) {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(seLoginModelState(true));
  }, []);
  // const { id } = props;
  const id = router.query.id;
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
      Toast.success(t('评论成功'));
      mutate();
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
    if (data?.message === "success") {
      Toast.success(t('评论成功'));
      mutate();
    }else{
      Toast.fail(t('失败'));
    }
  };

  const { data: _commentData, mutate: mutateComment } = useFetch(
    '/comment/list',
    'page',
    {
      id: id,
      pageSize: 10,
      type: 2,
    },
  );
  useEffect(() => {
    mutateComment();
  }, [id]);
  const commentData = useMemo(
    () =>
      _commentData
        ? commentData
          ? [...commentData]
              .concat(_commentData)
              .filter((item) => item !== undefined)
          : [].concat(..._commentData).filter((item) => item !== undefined)
        : null,
    [_commentData, data],
  );
  useEffect(() => {
    console.log(commentData, 'commentData');
  }, [commentData]);

  interface MapLocation {
    point: number[];
    placename: string;
  }
  const Map = React.memo((props: any) => {
    if (!props?.data?.map) return;
    const TOKEN = Cons.TOKEN;
    const [maoSrc, setMapSrc] = React.useState<any>();
    const Location: MapLocation = React.useMemo(() => {
      try {
        return JSON.parse(props?.data?.location);
      } catch (error) {
        return false;
      }
    }, [props.data]);


    const point = useMemo(() => {
      console.log(Location, 'Location');
      if (!Location?.point) return null;
      const point = Location?.point;
      if (!point) return;
      const bbox_width = 0.005;
      const bbox_height = 0.005;
      const longitude1 = point[0] - bbox_width / 2;
      const latitude1 = point[1] - bbox_height / 2;
      const longitude2 = point[0] + bbox_width / 2;
      const latitude2 = point[1] + bbox_height / 2;
      if (!point) return null;
      return [longitude1, latitude1, longitude2, latitude2];
    }, [Location]);


    if (!Location.point) return;
    if (!point) return;

    useEffect(() => {
      // if(!point) return
      // if(!Location?.point) return
      if (Location?.point) {
        mapRequest
          .get(
            `styles/v1/mapbox/streets-v12/static/[${point}]/400x180?access_token=${TOKEN}`,
            {
              responseType: 'blob',
            },
          )
          ?.then(async (res) => {
            // const blob = await res.data.blob()
            const url = URL.createObjectURL(res.data);
            setMapSrc(url);
            console.log(url, 'Map');
            // setMapSrc(res.config.url)
          });
      }
    }, [Location?.point]);


    function openMaps(point: number[]) {
      var lat = point[1]; // 目标地点的纬度
      var lon = point[0]; // 目标地点的经度
      var isWeixinBrowser = /MicroMessenger/i.test(navigator.userAgent);
      if (isWeixinBrowser) {
        Toast.fail(t('当前在微信中，打开浏览器获得完全体验'));
        return;
      }
      var isIOS = /iP(ad|hone|od)/.test(navigator.userAgent); // 检测设备是否为iOS
      Toast.success(t('正在打开地图应用'));
      if (isIOS) {
        // 如果是iOS设备，则打开iOS自带地图应用程序
        window.location.href = 'http://maps.apple.com/?ll=' + lat + ',' + lon;
      } else {
        // 如果是Android设备，则尝试打开谷歌地图应用程序
        window.location.href = 'comgooglemaps://?q=' + lat + ',' + lon;
        setTimeout(() => {
          window.location.href =
            'androidamap://viewMap?sourceApplication=myapp&lat=' +
            lat +
            '&lon=' +
            lon;
        }, 500);

      }
    }
    // if(!mapContainer.current) return;
    return (
      <div className="w-full relative h-[185px] bg-white px-5 py-4 rounded-xl overflow-hidden 	">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <div />
          {maoSrc ? (
            <img src={maoSrc} className="w-full h-full "></img>
          ) : (
            <div className="w-full h-full bg-gray-100"></div>
          )}
        </div>
        <div className="absolute px-3 items-center  flex justify-between left-0 right-0 mx-auto z-1 w-[80%] h-[48px] bg-white/70 backdrop-blur-sm		 bottom-10 rounded-lg">
          <div className="flex items-center w-[90%]">
            <div className="mr-2">
              <MapIcon className="w-[14px] h-[14px]"></MapIcon>
            </div>
            <div className="text-xs text-[#798195]">{Location?.placename}</div>
          </div>
          {/* <a href={`comgooglemaps://?q=40.7127,-74.0059`}> */}
          <div
            onClick={() => {
              openMaps(Location?.point);
            }}
            className="bg-[#FFD036] w-12 h-6 text-xs rounded-full text-[#8C6008] whitespace-nowrap	flex justify-center items-center"
          >
            {t('导航')}
          </div>
          {/* </a> */}
        </div>
      </div>
    );
  });
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
      props.send(comment, id, pid);
      setComment('');
    };
    return (
      <div className="sticky  z-30 bottom-10 flex   items-center w-full p-5 bg-white h-[60px]">
        <input
          placeholder={`回复${user?.nickName}`}
          value={comment}
          className="px-1 pl-4 w-full   h-9 bg-[#F7F8F9] rounded-full"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>

        <div
          className="text-sm text-[#798195] whitespace-nowrap"
          onClick={() => {
            send();
          }}
        >
          {t('发送')}
        </div>
      </div>
    );
  }
  const inputRef = React.useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  };
  const { user } = useUser();
  return (
    <div className="mb-10 w-full h-full pb-10">
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
        className="fixed z-10   top-0 w-full"
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
            // props.stop();
          }}
          onTouchStart={() => {
            // props.stop();
          }}
          onTouchEnd={() => {
            // props.start();
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
                    // props.stop();
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

        <div className="flex justify-end space-x-2">
          <div className="mt-2 border border-[#DCDDE1] w-14 h-6 text-xs rounded-full text-[#A9B0C0] whitespace-nowrap	flex justify-center items-center">
            {t('举报')}
          </div>
          {data?.data?.user?.id === user?.id && (
            <div
              onClick={() => {
                router.push({
                  pathname: '/[campus]/post/addPost',
                  query: {
                    campus: router.query.campus,
                    id: data?.data?.id,
                    isEdit: true,
                    type: data?.data?.type,
                  },
                });
              }}
              className="mt-2 border border-[#DCDDE1] w-14 h-6 text-xs rounded-full text-[#A9B0C0] whitespace-nowrap	flex justify-center items-center"
            >
              {t('编辑')}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5 pt-4 pb-2">
        <UserInfo
          contact={data?.data?.form?.contact}
          data={data?.data?.user}
        ></UserInfo>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div>
        <Map data={data?.data?.form}></Map>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5">
        <PostDiscussionInput callDiscussion={focusInput}></PostDiscussionInput>
        <Discussion
          callDiscussion={focusInput}
          commentComment={(e) => {
            commentComment(e);
          }}
          comments={commentData}
        ></Discussion>
      </div>
      {commentChild?.id ? (
        <div className="fixed bottom-12 w-full">
          <FooterDiscussionInputChild
            send={(comment, id, pid) => {
              sendChild(comment, id, pid);
            }}
            {...commentChild}
          ></FooterDiscussionInputChild>
        </div>
      ) : (
        <div className="fixed bottom-12 w-full">
          <FooterDiscussionInput
            ref={inputRef}
            send={(e) => {
              sendComment(e);
            }}
            data={data?.data}
          ></FooterDiscussionInput>
        </div>
      )}
    </div>
  );
}

export default index;


export async function getServerSideProps({
  locale,
  }){

  return {
      props: {
          ...(await serverSideTranslations(locale, ['common',]))
      },
    }
  }