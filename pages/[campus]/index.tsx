import React, { useEffect, useMemo } from 'react';
import HeaderLayout from '@/components/PageComponents/Home/HeaderLayout';
import MenuAtSchool from '@/components/PageComponents/Home/MenuAtSchool';
import ad from './components/ad.png';
import Image from 'next/image';
import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
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
  const { arg ,data,otherData} = props;
  const [select, setSelect] = useState('Canada');
  const CountryButton = (props1) => {
    const { title ,id } = props1;
    return (
      <div
        onClick={() => {
          props.setCountryId(id)
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
                      <CountryButton id={item.id} title={item.name}></CountryButton>
                  )
                })}

              </div>
            </div>
          </div>
          {
            otherData?.map((item)=>{
              return (
                <div className="w-full h-auto overflow-visible bg-white card">
                <div className="relative w-full h-full p-4">
                  <div className="text-base font-medium ">{item.name}</div>
                  <div className="z-50 grid grid-cols-3 gap-2 pt-2">
                    {item.countries.map((item)=>{
                        return (
                          <CountryButton title={item.name} id={item.id}></CountryButton>
                        )
                    })}
                  </div>
                </div>
              </div>
              )
            }
          )}
         
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
  const [campusIdMap, setCampusIdMap] = useLocalStorage(props?.post?.alias, props?.post?.id);
  // const [postData, setPostData] = useState({});
  const dispatch = useDispatch();
  const headerMenuList = [
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
    // {
    //   label: '转租',
    //   value: 're',
    // },
    {
      label: '拼车',
      value: 'carpool',
    },
    {
      label: '关注',
    },
    {
      label: '推荐',
    },
  ];
  const [reRender, setreRender] = useState(1);
  const onRefresh = (showToast) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (showToast) {
          // Toast.info('刷新成功')
        }
        // setreRender(reRender+1)
        // setCount(count + 1)
        resolve(true);
      }, 1000);
    });
  };
  const {data:hotCountryList,error:hotCountryListError} = useFetch('/country/hot','get');
  const {data:otherCountryList,error:otherCountryListError} = useFetch('/country/query_by_area','get');
  const [loading, setLoading] = useState(true);
  const [imageSize, setSmageSize] = React.useState({
    width: '1000%',
    height: '0rem',
  })
  const router = useRouter();
  const [category, setCategory] = useState('idle');
  // useEffect(() => {
  const { data: postData, error } = useFetch(
    `/post/home_list?type=${category}`,
    'get',
  );

  React.useEffect(() => {
    setCampusIdMap(props?.post?.id);
    // setCampusIdMap([...campusIdMap, {
    //   [props?.post?.alias]: props?.post?.id
    // }])
    dispatch(setAuthState(true));
  }, []);
  const [countryId, setCountryId] = useState();
  const SchoolList = (props) => {
    const { arg ,countryId } = props;
    const [select, setSelect] = useState();
    const {data:countryData,mutate} = useFetch('/country/campus','get',{
      countryId:countryId
    });
    useEffect(()=>{
      setSelect(countryData?.data?.[0]?.id)
    },[countryData])
    const schoolList = useMemo(()=>{
      return countryData?.data?.filter((item)=>{
        return item.id === select;
      }).map((item)=>{return item.campuses})[0]
    },[countryData,countryId,select]);
    useEffect(()=>{
      mutate()
    },[countryId])
    console.log(schoolList,"schoolList")
    const countryList = [
      { label: '中国', value: 'Canada' },
      { label: '中国', value: 'China' },
    ];
    // if(countryData?.data?.length === 0){
    //   return (
    //     // <div>No</div>
    //   )
    // }
    return (
      <div className="">
         {/* <Popup
        overlayClass={'Popup'}
        className="z-30 topIndexPlus rounded-full "
        visible={!countryData}
      >
        <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
          <Loading type="spinner" color="#FED64B" />
        </div>
      </Popup> */}
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
                console.log(item,'schoolList Item')
                return (
                  <div
                    className="h-12 pt-3 pl-4"
                    onClick={() => {
                      router.push({
                        pathname: '/[campus]',
                        query: { campus: item.alias },
                      })
                      props.setVisible(false);
                    }}
                  >
                    <div className="flex items-center h-4 space-x-2">
                      <div> {item[useLanguage('name')]}</div>
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
  if(!Post){
    return <div>loading</div>
  }
  return (
    <div className="w-screen  pb-10">
      <PostDetail
        setVisible={setPostDetailShow}
        visible={postDetailShow}
      ></PostDetail>
      <RedCountyList
        setVisible={setIsSelect}
        visible={isSelect}
        setCountryId={(id)=>{setCountryId(id)}}
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
          <Skeleton loading={loading} row={1} rowWidth={'100%'} rowHeight={70}>
            {' '}
          </Skeleton>
          <Image
            src={ad}
            width="100%"
            height={imageSize.height}
            layout="responsive"
            alt=""
            onLoadingComplete={(target) => {
              setSmageSize({
                width: '100%',
                height: '20rem',
              });
              setLoading(false);
            }}
            objectFit="contain"
          ></Image>
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
          {/* {postData?.data? ( */}
          {postData?.data ? (
            <Waterfall
              key={category}
              postData={postData?.data}
              show={() => {
                setPostDetailShow(true);
              }}
              onClick={() => {}}
            ></Waterfall>
          ) : null}
          {!postData?.data && postData?.code === 1102 ? (
            <div className="text-[#A9B0C0] mt-10 flex justify-center items-center w-full">
              暂无内容
            </div>
          ) : null}
          {!postData?.data && postData?.code !== 1102 ? (
            <LoadingWaterfall
              key={category}
              show={() => {
                setPostDetailShow(true);
              }}
              onClick={() => {}}
            ></LoadingWaterfall>
          ) : null}
          {error ? 'error' : null}
          {/* ):null} */}
        </div>
      </PullRefresh>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  console.log(params, 'getServerSideProps params');
  const { data } = await useRequest.get(`/api/campus/query`,{
    params:{
      name:params.campus
    }
  });
  // if(!data?.data[0]){
  //   return {
  //     notFound:true
  //   }
  // }
  return {
    props: {
      post: data?.data[0],
    },
  };
}
export default SchoolPage;
