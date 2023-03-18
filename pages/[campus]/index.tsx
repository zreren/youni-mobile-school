import React, { useEffect, useMemo } from 'react';
import HeaderLayout from '@/components/PageComponents/Home/HeaderLayout';
import MenuAtSchool from '@/components/PageComponents/Home/MenuAtSchool';
import ad from './components/ad.png';
import Image from 'next/image';
import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Swiper, Toast } from 'react-vant';
import classnames from 'classnames';
import Header from '@/components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@/stores/authSlice';
import Waterfall from '@/components/Layout/Waterfall';
import LoadingWaterfall from '@/components/Layout/WaterfallLoading';
import PostCategory from '@/components/Menu/post-category';
import useRequest from '@/libs/request';
import { Dialog, PullRefresh } from 'react-vant';
import { Skeleton } from 'react-vant';
import useLanguage from '@/hooks/useLanguage';
import { Flex, Loading } from 'react-vant';
// import Header from '@/components/Header';
import Post from './post/post';
import useFetch from '../../hooks/useFetch';
import { useLocalStorage } from 'react-use';
import { Popup } from 'react-vant';
import { useRouter } from 'next/router';
import { enableZoom } from '@/libs/enableZoom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import useUser from '@/hooks/useUser';
const PostDetail = (props) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={props.visible}
      onClose={() => {
        props.setVisible(false);
      }}
      onOpen={() => {
        props.setVisible(true);
      }}
      className="h-screen"
    >
      <div className="w-screen h-screen">
        <Post></Post>
      </div>
    </SwipeableDrawer>
  );
};

const RedCountyList = (props) => {
  const { arg, data, otherData } = props;
  const [select, setSelect] = useState('Canada');
  const CountryButton = (props1) => {
    const { title, id } = props1;
    return (
      <div
        onClick={() => {
          props.setCountryId(id);
          props.setVisible(false);
          props.setSelectSchool(true);
        }}
        className="z-50 p-2 text-sm text-center h-9 bg-bg"
      >
        {title}
      </div>
    );
  };
  return (
    <div className="">
      <SwipeableDrawer
        anchor="left"
        open={props.visible}
        onClose={() => {
          props.setVisible(false);
        }}
        onOpen={() => {
          props.setVisible(true);
        }}
        className="h-screen"
      >
        <Header
          returnClick={() => {
            props.setVisible(false);
          }}
          title={'选择国家和地区'}
          className="shadow-none"
        ></Header>
        <div className="w-screen h-screen p-4 pt-6 space-y-4 bg-bg">
          <div className="w-full h-auto overflow-visible red-gradient card">
            <div className="relative w-full h-full p-4">
              <div className="absolute right-3 -top-3">
                <Image src="/assets/hot.png" width={73} height={83}></Image>
              </div>
              <div className="text-base font-medium text-white">
                热门国家和地区
              </div>
              <div className="z-50 grid grid-cols-3 gap-2 pt-2">
                {data?.map((item) => {
                  return (
                    <CountryButton
                      id={item.id}
                      title={item.name}
                    ></CountryButton>
                  );
                })}
              </div>
            </div>
          </div>
          {otherData?.map((item) => {
            return (
              <div className="w-full h-auto overflow-visible bg-white card">
                <div className="relative w-full h-full p-4">
                  <div className="text-base font-medium ">{item.name}</div>
                  <div className="z-50 grid grid-cols-3 gap-2 pt-2">
                    {item.countries.map((item) => {
                      return (
                        <CountryButton
                          title={item.name}
                          id={item.id}
                        ></CountryButton>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

function SchoolPage(props) {
  console.log(props, 'SchoolPage');
  const [isSelect, setIsSelect] = useState(false);
  const [schoolSelect, setSelectSchool] = useState(false);
  const [postDetailShow, setPostDetailShow] = useState(false);
  const [campusIdMap, setCampusIdMap] = useLocalStorage(
    props?.post?.alias,
    props?.post?.id,
  );
  const { user ,loggedOut} = useUser();

  const [category, setCategory] = useState('idle');
  const pathname = useMemo(() => {
    const follow_list = '/post/follow_list';
    const home_list = '/post/home_list';
    const recommend_list = '/post/recommend_list';
    if (category === 'follow_list') {
      return follow_list;
    }
    if (category === 'recommend_list') {
      return recommend_list;
    }
    return home_list;
  }, [category]);
  const {
    data: _postData,
    error,
    mutate,
    isLoading,
  } = useFetch(pathname, 'page', {
    type: pathname === '/post/home_list' ? category : null,
    pageSize: 20,
  });

  useEffect(()=>{
    console.log(loggedOut,"loggedOut")
  },[loggedOut])
  const postData = useMemo(() => {
    return _postData ? postData ? [...postData].concat(..._postData) : [].concat(..._postData) : null;
  }, [_postData, category]);
  useEffect(() => {
    console.log(postData, 'postData');
  }, [postData]);
  const dispatch = useDispatch();
  // ()=>{
  //   if(loggedOut){
  //     return (
  //       {
  //         label: '关注',
  //         value: 'follow_list',
  //       }
  //     )
  //   }
  // },
  const headerMenuList = useMemo(()=>{
    if(loggedOut){
      return [
          {
            label: '闲置',
            value: 'idle',
          },
          {
            label: '活动',
            value: 'activity',
          },
          {
            label: '新闻',
            value: 'news',
          },
          {
            label: '转租',
            value: 'sublet',
          },
          {
            label: '拼车',
            value: 'carpool',
          },
          {
            label: '二手书',
            value: 'book',
          },
          {
            label: '课程配置',
            value: 'course_recommend',
          },
        ]
      }else{
        return [
          {
            label: '推荐',
            value: 'recommend_list',
          },
          {
            label: '关注',
            value: 'follow_list',
          },
          {
            label: '闲置',
            value: 'idle',
          },
          {
            label: '活动',
            value: 'activity',
          },
          {
            label: '新闻',
            value: 'news',
          },
          {
            label: '转租',
            value: 'sublet',
          },
          {
            label: '拼车',
            value: 'carpool',
          },
          {
            label: '二手书',
            value: 'book',
          },
          {
            label: '课程配置',
            value: 'course_recommend',
          },
        ]
      }
  },[loggedOut])
  useEffect(()=>{
    console.log(headerMenuList,"headerMenuList")
    // setCategory(headerMenuList[0].label)
  },[headerMenuList])
  const [reRender, setreRender] = useState(1);
  const onRefresh = (showToast) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (showToast) {
          mutate();
          Toast.info('刷新成功');
        }
        resolve(true);
      }, 1000);
    });
  };
  const { data: hotCountryList, error: hotCountryListError } = useFetch(
    '/country/hot',
    'get',
  );
  const { data: otherCountryList, error: otherCountryListError } = useFetch(
    '/country/query_by_area',
    'get',
  );

  const [imageSize, setSmageSize] = React.useState({
    width: '1000%',
    height: '0rem',
  });

  const router = useRouter();
  // useEffect(() => {
  useEffect(() => {
    mutate();
  }, [category]);
  const { data: carouselData } = useFetch('/campus/carousels', 'get', {
    id: campusIdMap,
  });
  React.useEffect(() => {
    setCampusIdMap(props?.post?.id);
    dispatch(setAuthState(true));
  }, []);
  const [countryId, setCountryId] = useState();
  const SchoolList = (props) => {
    const { arg, countryId } = props;
    const [select, setSelect] = useState();
    const [selectSchool, setSelectSchool] = useLocalStorage('school', null);
    const { data: countryData, mutate } = useFetch('/country/campuses', 'get', {
      countryId: countryId,
    });
    useEffect(() => {
      setSelect(countryData?.data?.[0]?.id);
    }, [countryData]);
    const schoolList = useMemo(() => {
      return countryData?.data
        ?.filter((item) => {
          return item.id === select;
        })
        .map((item) => {
          return item.campuses;
        })[0];
    }, [countryData, countryId, select]);
    useEffect(() => {
      mutate();
    }, [countryId]);
    console.log(schoolList, 'schoolList');
    return (
      <div className="">
        <Popup
          overlayClass={'Popup'}
          className="z-30 topIndexPlus rounded-full "
          visible={!countryData}
        >
          <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
            <Loading type="spinner" color="#FED64B" />
          </div>
        </Popup>
        <SwipeableDrawer
          anchor="left"
          open={props.visible}
          onClose={() => {
            props.setVisible(false);
          }}
          onOpen={() => {
            props.setVisible(true);
          }}
          className="h-screen"
        >
          <div className="flex w-screen h-screen">
            <Header
              returnClick={() => {
                props.setVisible(false);
              }}
              title={schoolList?.name}
              className="shadow-none"
            ></Header>
            <div className="w-1/5 h-full pt-10 min-w-30 bg-bg">
              {countryData?.data?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setSelect(item.id);
                    }}
                    className={classnames('p-4 h-14', {
                      'text-yellow-400': select === item.id,
                    })}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <div className="w-4/5 h-full mt-14">
              {schoolList?.map((item) => {
                console.log(item, 'schoolList Item');
                return (
                  <div
                    className="min-h-[48px] pt-3 pl-4"
                    onClick={() => {
                      router.push({
                        pathname: '/[campus]',
                        query: { campus: item.alias },
                      });
                      // setSelectSchool(item.alias)
                      props.setVisible(false);
                    }}
                  >
                    <div className="flex items-center min-h-[16px] w-full space-x-2">
                      <div className=" whitespace-pre-wrap">
                        {' '}
                        {item[useLanguage('name')]}
                      </div>
                      <div className="p-1 text-xs bg-bg">{item.shortName}</div>
                    </div>
                    <div className="text-xs text-lightGray">{item.alias}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    );
  };
  useEffect(() => {
    setPostDetailShow(false);
  }, [router.pathname]);
  const [loading, setLoading] = useState(true);
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = postData ? helloRef : goodbyeRef;
  const [loadingState,setLoadingState] = useState(false)
  useEffect(()=>{
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false)
    }, 1000);
  },[category,postData])
  return (
    <div className="w-screen  pb-10">
      <PostDetail
        setVisible={setPostDetailShow}
        visible={postDetailShow}
      ></PostDetail>
      <RedCountyList
        setVisible={setIsSelect}
        visible={isSelect}
        setCountryId={(id) => {
          setCountryId(id);
        }}
        data={hotCountryList?.data}
        otherData={otherCountryList?.data}
        setSelectSchool={setSelectSchool}
      ></RedCountyList>
      <SchoolList
        setVisible={setSelectSchool}
        countryId={countryId}
        visible={schoolSelect && !isSelect}
      ></SchoolList>
      <PullRefresh
        onRefresh={() => onRefresh(true)}
        onRefreshEnd={() => console.log('onRefreshEnd')}
      >
        <HeaderLayout
          selectSchool={() => {
            setIsSelect(true);
          }}
          school={props.post[useLanguage('name')]}
        ></HeaderLayout>
        <MenuAtSchool></MenuAtSchool>
        <div className="w-full pl-5 pr-5">
          <Swiper autoplay={3000}>
            {loading ? (
              <Swiper.Item>
                <Skeleton
                  loading={true}
                  row={1}
                  rowWidth={'100%'}
                  rowHeight={70}
                >
                  {' '}
                </Skeleton>
              </Swiper.Item>
            ) : null}
            {carouselData?.data.map((item, index) => {
              return (
                <Swiper.Item>
                  <Image
                    src={
                      item.image.indexOf('http') > -1
                        ? item.image
                        : `${Cons.BASEURL}${item.image}`
                    }
                    width="100%"
                    height={imageSize.height}
                    layout="responsive"
                    alt=""
                    onLoadingComplete={(target) => {
                      setSmageSize({
                        width: '100%',
                        height: '20rem',
                      });
                      if (index === 0) {
                        setLoading(false);
                      }
                    }}
                    objectFit="contain"
                  ></Image>
                </Swiper.Item>
              );
            })}
          </Swiper>
        </div>
        <div className="p-5">
          <PostCategory
            changeType={(e) => {
              setCategory(e);
            }}
            headerMenuList={headerMenuList}
          ></PostCategory>
        </div>
        <div className="mb-10">
          <SwitchTransition mode="out-in">
            <CSSTransition
              in={isLoading}
              classNames="fade"
              timeout={60}
              key={category}
              addEndListener={(done) => {
                nodeRef?.current?.addEventListener("transitionend", done, false);
              }}
            >
              <div ref={nodeRef}>
                {/* {postData?.data? ( */}
                {postData && !isLoading && !loadingState ? (
                  <Waterfall
                    key={category + postData?.length}
                    postData={postData}
                    show={() => {
                      setPostDetailShow(true);
                    }}
                    onClick={() => {}}
                  ></Waterfall>
                ) : <LoadingWaterfall
                key={category}
                show={() => {
                  setPostDetailShow(true);
                }}
                onClick={() => {}}
              ></LoadingWaterfall>}
                {!postData && !isLoading ? (
                  <div className="text-[#A9B0C0] mt-10 flex justify-center items-center w-full">
                    暂无内容
                  </div>
                ) : null}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </PullRefresh>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  console.log(params, 'getServerSideProps params');
  const { data } = await useRequest.get(`/api/campus/query`, {
    params: {
      name: params.campus,
    },
  });
  console.log(data, 'data');
  return {
    props: {
      post: data?.data[0],
    },
  };
}
export default SchoolPage;
