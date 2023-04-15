import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import PostCategory from '@/components/Menu/add-post-category';
import Header from '@/components/Header';
import YouniForm from '@/components/Form/Form';
import CateGoryIcon from './categoryIcon.svg';
import RightIcon from '@/public/assets/right.svg';
import { Uploader } from 'react-vant';
import AddUploaderIcon from './addUploaderIcon.svg';
import { DatetimePicker, Field } from 'react-vant';
import { Input, Form, Cell } from 'react-vant';
import { Button, Picker, Space } from 'react-vant';
import Org from './assets/actives/org.svg';
// import MapIcon from './/mapIcon.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import classnames from 'classnames';
import { Dialog } from 'react-vant';
import Box from '@mui/material/Box';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import { Switch } from 'react-vant';
import StartTime from './assets/actives/startTime.svg';
import EndTime from './assets/actives/endTime.svg';
import DraftIcon from './draft.svg';
import NoteIcon1 from './note1.svg';
import NoteIcon2 from './note2.svg';
import NoteIcon3 from './note3.svg';
import Map from './assets/actives/map.svg';
import Location from './assets/actives/location.svg';
import Prices from './assets/actives/youniprice.svg';
import TypeIcon from './assets/actives/type.svg';
import HouseTypeIcon from './assets/actives/houseType.svg';
import Contact from './assets/actives/contact.svg';
import useRequest from '@/libs/request';
import useFetch from '@/hooks/useFetch';
import { NumberKeyboard, hooks, Toast } from 'react-vant';
import { update } from 'lodash';
import mapRequest from '@/libs/mapRequest';
import MediaIcon from './assets/actives/media.svg';
import SeatIcon from './assets/actives/seat.svg';
import useLanguage from '@/hooks/useLanguage';
import IOSSwitch from '@/components/Input/ios';
import CourseIcon from './assets/actives/course.svg';
import DeliveryRadio from './assets/actives/deliveryRadio.svg';
import { set } from 'react-hook-form';
import { json } from 'stream/consumers';
import { useRouter } from 'next/router';
import AddCourse from './addCourse';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function addPost() {
  const { t } = useTranslation();
  const Footer = () => {
    const getDomAndHide = () => {
      const dom = document.getElementById('bottom-navigation');
      if (!dom) return;
      dom.style.display = 'none';
    };
    useEffect(() => {
      const dom = document.getElementById('bottom-navigation');
      if (!dom) {
        setTimeout(() => {
          getDomAndHide();
        }, 500);
        return;
      }
      dom.style.display = 'none';
      return () => {
        dom.style.display = 'block';
      };
    }, []);
    return (
      <div className="w-full shadow-footer bg-white h-[60px] space-x-4 flex justify-between fixed bottom-2 px-5 py-2">
        <div
          className="flex flex-col items-center  w-[40px]"
          onClick={() => {
            submitPost(form, true);
          }}
        >
          <DraftIcon></DraftIcon>
          <div className="text-[10px] text-[#798195] whitespace-nowrap">
            {t('存草稿')}
          </div>
        </div>
        <div
          onClick={() => {
            submitPost(form.getFieldsValue(), false);
          }}
          className="bg-[#FFD036] cursor-pointer  text-white rounded-full w-full h-10 flex justify-center items-center"
        >
          {t('发布')}
        </div>
      </div>
    );
  };
  const upload = async (file) => {
    console.log(file, 'file');
    try {
      const body = new FormData();
      body.append('file', file);
      const { data: resp } = await useRequest.post('/api/upload', body);
      const json = resp;
      console.log(json?.data, 'json');
      // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
      return {
        url: Cons.BASEURL + json?.data?.filename,
        name: json?.data?.filename,
      };
    } catch (error) {
      console.log(error, 'error');
      return { url: `demo_path/${file.name}` };
    }
  };

  const headerMenuList = [
    {
      label: t('闲置'),
      key: 'idle',
    },
    {
      label: t('活动'),
      key: 'activity',
    },
    {
      label: t('转租'),
      key: 'sublet',
    },
    {
      label: t('群聊'),
      key: 'group',
    },
    {
      label: t('拼车'),
      key: 'carpool',
    },
    {
      label: t('课程配置'),
      key: 'course_recommend',
    },
    {
      label: t('二手书'),
      key: 'book',
    },
  ];

  const item = {
    title: t('选择分类'),
    intro: '',
    Icon: null,
    action: <RightIcon></RightIcon>,
  };
  const IconList = {
    // "youni:seat": <Seat></Seat>,
    'youni:org': <Org></Org>,
    'youni:startTime': <StartTime></StartTime>,
    'youni:endTime': <EndTime></EndTime>,
    'youni:location': <Location></Location>,
    'youni:price': <Org></Org>,
    'youni:note': <Org></Org>,
    'youni:switch': <Org></Org>,
    'youni:prices': <Prices></Prices>,
    'youni:contact': <Contact></Contact>,
    'youni:map': <Map></Map>,
    'youni:link': <Org></Org>,
    'youni:type': <TypeIcon></TypeIcon>,
    'youni:houseType': <HouseTypeIcon></HouseTypeIcon>,
    'youni:discussion': <MediaIcon></MediaIcon>,
    'youni:seat': <SeatIcon></SeatIcon>,
    'youni:book': <CourseIcon></CourseIcon>,
    'youni:swap': <DeliveryRadio></DeliveryRadio>,
  };
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [form] = Form.useForm();
  const [type, setType] = React.useState(headerMenuList[0].key);
  const router = useRouter();
  useEffect(() => {
    console.log(router, 'router');
    if (router.query.type) {
      setType(router.query.type as string);
    }
  }, [router]);
  const { data: campusData, mutate: campusDataMutate } = useFetch(
    '/campus/query',
    'get',
    {
      name: router.query.campus,
    },
  );
  const [topicVisible, setTopicVisible] = useState(false);

  useEffect(() => {
    campusDataMutate();
  }, [router.query.campus]);
  const campusID = useMemo(() => {
    return campusData?.data?.[0]?.id;
  }, [campusData, router, topicVisible]);
  const [previews, setPreviews] = React.useState([]);
  // useEffect(() => {
  //   // if(form.get){
  //   getCurrentLocation();
  //   // }
  // }, []);
  const [baseLocation, setBaseLocation] = useState<any>();
  const PickLocation = (props: any) => {
    const { data } = props;
    const [local, setLocal] = useState(false);
    const [localList, setLocalList] = useState([]);
    useEffect(() => {
      try {
        const obj = JSON.parse(form.getFieldValue('location'));
        setPlaceName(obj.placename);
      } catch (error) {}
    }, [navigator.geolocation]);
    const getCurrentLocation = async () => {
      const TOKEN =
        'pk.eyJ1IjoieW91bmljbHViIiwiYSI6ImNsY2M5ZHVydDNqdTAzeGxrazJuNzhzbWoifQ.wWLnf7hdCNENhcFEuY3vPw';
      let location;
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        const theLocation = `${position.coords.longitude},${position.coords.latitude}`;
        // const res = await fetch(`${BASEURL}${theLocation}.json?access_token=${TOKEN}`)
        const { data } = await mapRequest.get(
          `geocoding/v5/mapbox.places/${theLocation}.json?access_token=${TOKEN}`,
        );

        console.log(data, 'defaultData');
        const defaultData = JSON.stringify({
          point: data?.features[0].center,
          placename: data?.features[0].text,
        });
        form.setFieldValue('location', defaultData);
        setLocalList(data?.features);
        // setPlaceName(data?.features[0].text);
        // return  await fetch(`${BASEURL}${theLocation}.json?access_token=${TOKEN}`)
      });
    };
    const selectPoint = (item) => {
      console.log('select', item);
      const obj = JSON.stringify({
        point: item?.center,
        placename: item?.place_name,
      });
      form.setFieldValue('location', obj);
      // setPlaceName(item?.place_name);
      setLocal(false);
    };
    const placeName = useMemo(() => {
      try {
        const res = JSON.parse(form.getFieldValue('location'));
        return res.placename;
      } catch (error) {
        return 'Located...';
      }
    }, [local, localList]);
    useEffect(() => {
      // setBaseLocation(navigator.geolocation);
      getCurrentLocation();
    }, [navigator.geolocation]);
    // useEffect
    return (
      <div>
        <div
          onClick={() => {
            setLocal(true);
          }}
        >
          {/* {'located'} */}
          {form.getFieldValue('location')?.length > 6
            ? JSON?.parse(form.getFieldValue('location')).placename
            : null || 'locate...'}
        </div>
        <div>
          <SwipeableDrawer
            className="z-20"
            disableDiscovery={true}
            disableSwipeToOpen={true}
            onClose={() => {
              setLocal(false);
            }}
            onOpen={() => {}}
            open={local}
            anchor="bottom"
          >
            <div className="h-[96vh]">
              <Puller></Puller>
              {/* <SignIn></SignIn> */}
              <div className="p-5">
                <div
                  className="w-full flex items-center min-h-[60px]"
                  onClick={() => {
                    form.setFieldValue('location', 'none');
                    setLocal(false);
                  }}
                >
                  <div className="text-gray-500 font-semibold text-sm">
                    {t('不显示')}
                  </div>
                </div>
                <div className="h-1 m-0 divider opacity-30"></div>
                {localList?.map((item) => {
                  return (
                    <div
                      className="w-full flex flex-col justify-center  min-h-[60px]"
                      onClick={() => {
                        selectPoint(item);
                      }}
                    >
                      <div className="text-gray-500 font-semibold text-sm">
                        {item.text}
                      </div>
                      <div className="text-gray-400 font-medium text-sm">
                        {item.place_name}
                      </div>
                      <div className="h-1 m-0 divider opacity-30"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SwipeableDrawer>
        </div>
      </div>
    );
  };
  {
    /* <PickLocation></PickLocation> */
  }
  const customComponents = {
    input: <Input placeholder="请输入"></Input>,
    time: (
      <DatetimePicker popup type="datetime">
        {(val: Date) => (val ? val.toDateString() : t('请选择日期'))}
      </DatetimePicker>
    ),
    location: (
      <PickLocation location={form.getFieldValue('location')}></PickLocation>
    ),
    prices: (
      <div>
        {form.getFieldValue('prices')?.text === 0 ||
        form.getFieldValue('prices')?.text === '0'
          ? '免费'
          : form.getFieldValue('prices')?.text || '点击输入价格信息'}
      </div>
      // <Form.Item name="text" key="text" valuePropName="text">
      // <Input placeholder="请输入"></Input>
      // </Form.Item>
    ),
    contact: <div>请选择联系方式</div>,
    Switch: <Switch activeColor="#FFD036" size={20} inactiveColor="#dcdee0" />,
  };
  const { data: dynamicForm, mutate } = useFetch('/post/dynamicForm', 'get', {
    type: type,
  });
  useEffect(() => {
    console.log('dynamicForm render ++');
  }, [dynamicForm]);
  const Keyboard = () => {
    return (
      <div className="bg-[#F9FAFB] text-[#798195] w-screen h-12  z-30 fixed bottom-0 flex justify-around items-center">
        <div
          className="flex items-center space-x-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <NoteIcon1></NoteIcon1>
          <div>地点</div>
        </div>
        <div className="flex items-center space-x-1">
          {' '}
          <NoteIcon1></NoteIcon1>
          <div>快捷模版</div>
        </div>
        <div className="flex items-center space-x-1">
          <NoteIcon1></NoteIcon1>
          <div>其他人</div>
        </div>
      </div>
    );
  };
  const { width, height } = useWindowSize();
  const [KeyboardShow, setKeyboardShow] = useState(false);
  type Callback<T> = (prev: T | undefined) => void;
  type Config = {
    immediate: boolean;
  };
  const [topic, setTopic] = useState<any>();
  function useWatch<T>(
    dep: T,
    callback: Callback<T>,
    config: Config = { immediate: false },
  ) {
    const { immediate } = config;

    const prev = useRef<T>();
    const inited = useRef(false);
    const stop = useRef(false);

    useEffect(() => {
      const execute = () => callback(prev.current);

      if (!stop.current) {
        if (!inited.current) {
          inited.current = true;
          if (immediate) {
            execute();
          }
        } else {
          execute();
        }
        prev.current = dep;
      }
    }, [dep]);

    return () => {
      stop.current = true;
    };
  }
  const submitPost = async (form, draft) => {
    console.log(
      topic?.map((item) => {
        return {
          id: item.id || null,
          name: item.name,
        };
      }),
    );
    // if (
    //   !Object.keys(form).some((element) => {
    //     if (
    //       form[element] === '' ||
    //       form[element] === null ||
    //       form[element] === undefined ||
    //       !form[element]
    //     ) {
    //       Toast.fail('请完善表单');
    //       return true;
    //     }
    //   })
    // ) {
    //   return false;
    // }
    // form?.forEach((element) => {
    //   if (element === '' || element === null || !element) {
    //     Toast.fail('请完善表单');
    //     return;
    //   }
    // });
    if (!title || !previews || !content || previews.length < 1) {
      Toast.fail(t('请完善表单'));
      return;
    }
    if (router.query.isEdit) {
      try {
        const { data } = await useRequest.post('/api/post/update', {
          id: router.query.id,
          form: { ...form },
          draft: draft,
          title: title,
          body: content,
          topics: topic?.map((item) => item.name),
          preview: previews,
          type: type,
          contact: form.contact?.filter((item) => item.public === true),
          campusId: campusID,
        });
        if (data.message === 'success') {
          Toast.success(t('修改成功'));
        } else {
          Toast.fail(t('修改失败'));
        }
      } catch (error) {
        Toast.fail(error);
      }
    } else {
      try {
        const { data } = await useRequest.post('/api/post/create', {
          form: { ...form },
          draft: draft,
          title: title,
          body: content,
          topics: topic?.map((item) => item.name),
          preview: previews,
          type: type,
          contact: form.contact?.filter((item) => item.public === true),
          campusId: campusID,
        });
        if (data.message === 'success') {
          Toast.success(t('发布成功'));
        } else {
          Toast.fail(t('发布失败'));
        }
      } catch (error) {
        Toast.fail(error);
      }
    }
  };
  const changeCategory = (val) => {
    setType(val);
  };
  useEffect(() => {
    mutate();
  }, [type]);
  const addPreviews = (items) => {
    console.log(items, 'addPreviews');
    setPreviews(items.map((item) => item.name));
  };
  useWatch(height, (pre) => {
    if (pre && pre < height) {
      setKeyboardShow(true);
    } else {
      setKeyboardShow(false);
    }
  });
  const Puller = styled(Box)(({ theme }) => ({
    width: 33,
    height: 4,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));
  const [pricesUnit, setPricesUnit] = useState<string>('CAD');
  // const Puller = styled(Box)(({ theme }) => ({
  //   width: 30,
  //   height: 6,
  //   backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  //   borderRadius: 3,
  //   position: 'absolute',
  //   top: 8,
  //   left: 'calc(50% - 15px)',
  // }));
  const { data: contactList } = useFetch('/profile/contact', 'get');
  const [contactListTemp, setContactListTemp] = useState(contactList?.data);
  useEffect(() => {
    setContactListTemp(contactList?.data);
  }, [contactList]);
  const ContactModel = (props) => {
    const { visible, open, close, confirm, data } = props;
    if (!data) return;
    const [_contactListTemp, _setContactListTemp] = useState(
      form.getFieldValue('contact') ? form.getFieldValue('contact') : data,
    );
    function _Form(props) {
      let { header, List } = props;
      if (!List) {
        List = [
          {
            title: t('标题'),
            action: 'text',
            intro: t('请输入'),
            Icon: null,
          },
        ];
      }

      return (
        <div className="w-full h-full">
          <div className="mb-4 text-xs text-[#798195]">{header}</div>
          {List?.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div
                className="items-start text-sm justify-between mb-4"
                onClick={item.event}
              >
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    {item.Icon ? <Icon className="mt-1"></Icon> : null}
                    <div className="mb-2 text-sm font-medium  text-[#798195]">
                      {item.title}
                    </div>
                  </div>
                  <div>{item.action}</div>
                </div>
                <div className="text-xs text-[#37455C]">{item.intro}</div>
              </div>
            );
          })}
          <div className="h-1 m-0 divider opacity-30"></div>
        </div>
      );
    }
    const onCloseModel = () => {
      setContactVisible(_contactListTemp);
      close();
    };
    useEffect(() => {
      form.setFieldValue('contact', _contactListTemp);
      // setContactListTemp(_contactListTemp)
      console.log(contactListTemp, 'contactListTemp');
    }, [_contactListTemp]);
    const PhoneComponent = (props) => {
      const { data, type } = props;
      const dataFetch = React.useMemo(() => {
        if (data) return;
        if (!_contactListTemp) return;
        return _contactListTemp?.filter((item, index) => {
          return item.type === type;
        })[0];
      }, [data]);
      const [value, setValue] = useState(data?.value || dataFetch?.value);
      const [isPublic, setPublic] = useState<boolean>(
        data?.public || dataFetch?.public,
      );
      // useEffect(()=>{
      //   updateContactItem()
      // },[isPublic])
      const updateContactItem = (bool?: boolean) => {
        console.log(bool, 'bool');

        if (!value) {
          Toast.fail(`t("请输入")${type}`);
          setPublic(false);
          return;
        }
        const update = {
          type: type,
          value: value,
          public: bool !== null ? bool : isPublic,
          id: data?.id || dataFetch?.id,
          createdAt: data?.createdAt || dataFetch?.createdAt,
          updateAt: data?.updatedAt || dataFetch?.updatedAt,
        };
        _setContactListTemp((pre) => {
          const newPre = pre.filter((item) => {
            return item.id !== update.id;
          });
          return [...newPre, update];
        });
        // if (!data && !dataFetch) {
        //   useRequest.post('/api/profile/contact/create', {
        //     type: type,
        //     value: value,
        //     public: bool !== null ? bool : isPublic,
        //   });
        // }
        // if (data && !dataFetch) {
        //   useRequest.post('/api/profile/contact/update', {
        //     type: type,
        //     value: value,
        //     public: bool !== null ? bool : isPublic,
        //     id: data?.id,
        //   });
        // }
        // if (dataFetch && !data) {
        //   useRequest.post('/api/profile/contact/update', {
        //     type: dataFetch?.type,
        //     value: value,
        //     public: bool !== null ? bool : isPublic,
        //     id: dataFetch?.id,
        //   });
        // }
      };
      return (
        <div
          className={classnames('flex space-x-2 contact', {
            contact: isPublic,
            'contact-false': !isPublic,
          })}
        >
          <Input
            value={value}
            type="tel"
            onChange={(tel) => setValue(tel)}
            placeholder={
              useLanguage('name') === 'ename'
                ? `Please enter your ${type}`
                : `请输入${type}`
            }
            onBlur={() => {
              updateContactItem(isPublic);
            }}
            align="right"
            className="text-blueTitle font-medium"
            // className='align-right'
          />
          <IOSSwitch
            onChange={(e) => {
              // e.preventDefault();
              if (isPublic) {
                updateContactItem(false);
                setPublic(false);
              } else {
                updateContactItem(true);
                setPublic(true);
              }
            }}
            value={isPublic}
          ></IOSSwitch>
        </div>
      );
    };
    const phoneItem = React.useMemo(() => {
      return _contactListTemp?.filter((item, index) => {
        return item.type === 'phone';
      })[0];
    }, [contactList]);
    const emailItem = React.useMemo(() => {
      return _contactListTemp?.filter((item, index) => {
        return item.type === 'email';
      })[0];
    }, [contactList]);
    const List1 = [
      {
        title: t('电话'),
        intro: '',
        action: (
          <PhoneComponent type={t('电话')} data={phoneItem}></PhoneComponent>
        ),
      },
      {
        title: t('短信'),
        intro: '',
        action: <PhoneComponent type={t('短信')}></PhoneComponent>,
      },
      {
        title: t('邮箱'),
        intro: '',
        action: (
          <PhoneComponent type={t('邮箱')} data={emailItem}></PhoneComponent>
        ),
      },
      {
        title: t('微信'),
        action: <PhoneComponent type={t('微信')}></PhoneComponent>,
      },
      {
        title: 'WhatsApp',
        action: <PhoneComponent type={'WhatsApp'}></PhoneComponent>,
      },
      {
        title: 'Discord',
        action: <PhoneComponent type={'Discord'}></PhoneComponent>,
      },
      {
        title: 'Telegram',
        action: <PhoneComponent type={'Telegram'}></PhoneComponent>,
      },
    ];
    return (
      <SwipeableDrawer
        className="z-10 "
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={() => {
          onCloseModel();
        }}
        onOpen={open}
        open={visible}
        anchor="bottom"
      >
        <div className="w-full h-2/3 bg-white p-4 pb-20">
          <Puller></Puller>
          <div className="text-xs text-[#A9B0C0] pt-3">
            {t('此处联系方式仅针对本次推文生效')}
          </div>
          <_Form header="" List={List1}></_Form>
        </div>
      </SwipeableDrawer>
    );
  };
  const PricesModel = (props) => {
    const { visible, open, close, confirm } = props;
    const [currentInPut, setCurrentInPut] = useState<string>();
    const [state, updateState] = hooks.useSetState({
      text: form?.getFieldValue('prices')?.text || '',
      unit: form?.getFieldValue('prices')?.unit || '',
      pricesUnit: form?.getFieldValue('prices')?.pricesUnit || pricesUnit,
      oldPrice: form?.getFieldValue('prices')?.oldPrice || '',
      showOldPrice: form?.getFieldValue('prices')?.showOldPrice || false,
      service: form?.getFieldValue('prices')?.service || [],
    });
    useEffect(() => {
      console.log(form.getFieldValue('prices'), 'form');
      // updateState({
      //   text: form.getFieldValue('text'),
      //   unit: form.getFieldValue('unit'),
      //   oldPrice: form.getFieldValue('oldPrice'),
      //   showOldPrice: form.getFieldValue('showOldPrice'),
      //   service: form.getFieldValue('service'),
      // });
    }, [form]);
    const deleteInput = () => {
      if (!currentInPut) return;
      updateState({
        [currentInPut]: state[currentInPut]?.slice(
          0,
          state[currentInPut].length - 1,
        ),
      });
    };
    const onInput = (v) => {
      // Toast.success(v);
      if (v === 'CAD') {
        updateState({ pricesUnit: 'USD' });
        setPricesUnit('USD');
      }
      if (v === 'USD') {
        setPricesUnit('CAD');
        updateState({ pricesUnit: 'CAD' });
      }
      if (v === '完成') {
        close();
      }
      updateState({
        [currentInPut]: state[currentInPut] + v,
      });
    };
    const serviceList = [
      { title: t('包水') },
      { title: t('包电') },
      { title: t('包网') },
      { title: t('包气') },
      { title: t('含管理费') },
      { title: t('包铲雪') },
      { title: t('包除草') },
      { title: t('包清洁') },
      { title: t('包做饭') },
    ];
    const ServicesItem = (props) => {
      const { title, defaultSelect, change } = props;
      const [select, setSelect] = useState(defaultSelect);
      useEffect(() => {
        if (select) {
          props.change(title);
        } else {
          props.remove(title);
        }
      }, [select]);
      return (
        <div
          onClick={() => {
            setSelect(!select);
          }}
          className={classnames(
            'bg-bg m-1  text-xs font-light h-6 px-1 py-1  rounded',
            {
              'text-yellow-500': select,
              'text-gray-600': !select,
            },
          )}
        >
          {title}
        </div>
      );
    };
    const columns = [
      { text: '日', value: 0 },
      { text: '周', value: 1 },
      { text: '月', value: 2 },
      { text: '季', value: 3 },
      { text: '年', value: 4 },
      // { text: '南通', value: 5 },
      // { text: '宿迁', value: 6 },
      // { text: '泰州', value: 7 },
      // { text: '无锡', value: 8 },
    ];
    return (
      <SwipeableDrawer
        className="z-10 "
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={close}
        onOpen={open}
        open={visible}
        anchor="bottom"
      >
        <div className="h-[480px] ">
          <Puller></Puller>
          <div className="p-5 mt-2 ">
            <div className="flex prices">
              <div className="flex w-full space-x-4 items-center">
                <div className="whitespace-nowrap text-[#37455C] text-sm">
                  {t('价格')}
                </div>
                <div className="flex items-end">
                  <div className="w-[70px]">
                    <Input
                      onFocus={() => {
                        setCurrentInPut('text');
                      }}
                      type={'number'}
                      value={state.text}
                      readOnly
                      onChange={(text) => updateState({ text })}
                      placeholder={currentInPut === 'text' ? '|' : t('输入价格')}
                      className="text-lg"
                    />
                  </div>
                  <div className="text-sm text-[#FF4241]">{pricesUnit}</div>
                </div>
              </div>
              <div className="flex w-full space-x-4 items-center">
                <div className="whitespace-nowrap text-[#37455C] text-sm">
                  {t('单位')}
                </div>
                <div>
                  <Picker
                    popup={{
                      round: true,
                    }}
                    value={state.unit}
                    title="标题"
                    columns={columns}
                    className="z-20"
                    columnsFieldNames={{ text: 'text' }}
                    onConfirm={(v) => {
                      updateState({ unit: v });
                    }}
                  >
                    {(val: string, _: any, actions) => {
                      return (
                        <Field
                          readOnly
                          clickable
                          value={_?.text || ''}
                          placeholder={t('选择单位')}
                          onClick={() => actions.open()}
                        />
                      );
                    }}
                  </Picker>
                </div>
              </div>
            </div>
            <div className="h-1 m-0 mt-2 divider opacity-30"></div>
            <div className="flex justify-between items-center">
              <div className="flex w-full space-x-4 items-center">
                <div className="whitespace-nowrap text-[#37455C] text-sm">
                  {t('原价')}
                </div>
                <div className="flex items-end">
                  <div className="w-[70px]">
                    <Input
                      onFocus={() => {
                        setCurrentInPut('oldPrice');
                      }}
                      type={'number'}
                      value={state.oldPrice}
                      readOnly
                      onChange={(text) => updateState({ oldPrice: text })}
                      placeholder={
                        currentInPut === 'oldPrice' ? '|' : '输入原价'
                      }
                      className="text-lg text-[#798195]"
                    />
                  </div>
                  <div className="text-sm text-[#798195]">{pricesUnit}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="whitespace-nowrap text-[#798195] text-sm">
                  {t('显示原价')}
                </div>
                <Switch
                  onChange={(val) => {
                    updateState({ showOldPrice: val });
                  }}
                  checked={state.showOldPrice}
                  activeColor="#FFD036"
                  size={20}
                  inactiveColor="#dcdee0"
                />
              </div>
              {/* swith */}
            </div>
            <div className="h-1 m-0 mt-2 divider opacity-30"></div>
            <div className="flex items-center mt-2">
              <div className="whitespace-nowrap text-[#37455C] text-sm mr-4">
                {t('服务')}
              </div>
              <div className="flex  flex-wrap w-6/10 mb-3">
                {serviceList.map((item) => {
                  return (
                    <ServicesItem
                      title={item.title}
                      defaultSelect={
                        state.service?.indexOf(item.title) > -1 ? true : false
                      }
                      remove={(e) => {
                        updateState({
                          service: state.service.filter((item) => {
                            return item !== e;
                          }),
                        });
                      }}
                      change={(e) => {
                        updateState({
                          service: [...new Set(state.service), e],
                        });
                      }}
                    ></ServicesItem>
                  );
                })}
              </div>
            </div>
          </div>
          <NumberKeyboard
            theme="custom"
            onDelete={() => {
              deleteInput();
            }}
            extraKey={[pricesUnit, '.']}
            closeButtonText="完成"
            visible={true}
            onClose={() => {
              confirm(state);
              close();
            }}
            className="-translate-y-8"
            // onChange={()=>{close();Toast.success('完成')}}
            onInput={onInput}
            // onDelete={onDelete}
          />
          {/* <div className='h-[20px]'></div> */}
        </div>
      </SwipeableDrawer>
    );
  };
  const IdeaPricesModel = (props) => {
    const { visible, open, close, confirm } = props;
    const [currentInPut, setCurrentInPut] = useState<string>();
    const [state, updateState] = hooks.useSetState({
      text: form?.getFieldValue('prices')?.text || '',
      unit: form?.getFieldValue('prices')?.unit || '',
      pricesUnit: form?.getFieldValue('prices')?.pricesUnit || pricesUnit,
      oldPrice: form?.getFieldValue('prices')?.oldPrice || '',
      showOldPrice: form?.getFieldValue('prices')?.showOldPrice || false,
      service: form?.getFieldValue('prices')?.service || [],
    });
    useEffect(() => {
      console.log(form.getFieldValue('prices'), 'form');
      // updateState({
      //   text: form.getFieldValue('text'),
      //   unit: form.getFieldValue('unit'),
      //   oldPrice: form.getFieldValue('oldPrice'),
      //   showOldPrice: form.getFieldValue('showOldPrice'),
      //   service: form.getFieldValue('service'),
      // });
    }, [form]);
    const deleteInput = () => {
      if (!currentInPut) return;
      updateState({
        [currentInPut]: state[currentInPut]?.slice(
          0,
          state[currentInPut].length - 1,
        ),
      });
    };
    const onInput = (v) => {
      // Toast.success(v);
      if (v === 'CAD') {
        updateState({ pricesUnit: 'USD' });
        setPricesUnit('USD');
      }
      if (v === 'USD') {
        setPricesUnit('CAD');
        updateState({ pricesUnit: 'CAD' });
      }
      if (v === '完成') {
        close();
      }
      updateState({
        [currentInPut]: state[currentInPut] + v,
      });
    };
    const serviceList = [
      { title: '当面交易' },
      { title: '包邮' },
      { title: '快递' },
    ];
    const ServicesItem = (props) => {
      const { title, defaultSelect, change } = props;
      const [select, setSelect] = useState(defaultSelect);
      useEffect(() => {
        if (select) {
          props.change(title);
        } else {
          props.remove(title);
        }
      }, [select]);
      return (
        <div
          onClick={() => {
            setSelect(!select);
          }}
          className={classnames(
            'bg-bg m-1  text-xs font-light h-6 px-1 py-1  rounded',
            {
              'text-yellow-500': select,
              'text-gray-600': !select,
            },
          )}
        >
          {title}
        </div>
      );
    };
    const columns = [
      { text: '日', value: 0 },
      { text: '周', value: 1 },
      { text: '月', value: 2 },
      { text: '季', value: 3 },
      { text: '年', value: 4 },
      // { text: '南通', value: 5 },
      // { text: '宿迁', value: 6 },
      // { text: '泰州', value: 7 },
      // { text: '无锡', value: 8 },
    ];
    return (
      <SwipeableDrawer
        className="z-10 "
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={close}
        onOpen={open}
        open={visible}
        anchor="bottom"
      >
        <div className="h-[440px] ">
          <Puller></Puller>
          <div className="p-5 mt-2 ">
            <div className="flex prices">
              <div className="flex w-full space-x-4 items-center">
                <div className="whitespace-nowrap text-[#37455C] text-sm">
                  {t('价格')}
                </div>
                <div className="flex items-end">
                  <div className="w-[70px]">
                    <Input
                      onFocus={() => {
                        setCurrentInPut('text');
                      }}
                      type={'number'}
                      value={state.text}
                      readOnly
                      onChange={(text) => updateState({ text })}
                      placeholder={currentInPut === 'text' ? '|' : '输入价格'}
                      className="text-lg"
                    />
                  </div>
                  <div className="text-sm text-[#FF4241]">{pricesUnit}</div>
                </div>
              </div>
            </div>
            <div className="h-1 m-0 mt-2 mb-2 divider opacity-30"></div>
            <div className="flex justify-between items-center">
              <div className="flex w-full space-x-4 items-center">
                <div className="whitespace-nowrap text-[#37455C] text-sm">
                  {t('原价')}
                </div>
                <div className="flex items-end">
                  <div className="w-[70px]">
                    <Input
                      onFocus={() => {
                        setCurrentInPut('oldPrice');
                      }}
                      type={'number'}
                      value={state.oldPrice}
                      readOnly
                      onChange={(text) => updateState({ oldPrice: text })}
                      placeholder={
                        currentInPut === 'oldPrice' ? '|' : '输入原价'
                      }
                      className="text-lg text-[#798195]"
                    />
                  </div>
                  <div className="text-sm text-[#798195]">{pricesUnit}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="whitespace-nowrap text-[#798195] text-sm">
                  {t('显示原价')}
                </div>
                <Switch
                  onChange={(val) => {
                    updateState({ showOldPrice: val });
                  }}
                  checked={state.showOldPrice}
                  activeColor="#FFD036"
                  size={20}
                  inactiveColor="#dcdee0"
                />
              </div>
              {/* swith */}
            </div>
            <div className="h-1 m-0 mt-2 divider opacity-30"></div>
            <div className="flex items-center mt-2">
              <div className="whitespace-nowrap text-[#37455C] text-sm mr-4">
                {t('方式')}
              </div>
              <div className="flex items-center   h-full space-x-4">
                {/* <div className="text-sm text-blueTittle]">当面交易</div> */}
                <div className="ml-8 h-full flex items-center justify-end pr-1 rounded-lg">
                  <div className="border-[#DCDDE1] border  overflow-hidden  rounded-lg  h-[28px]   flex ">
                    <div
                      onClick={() => {
                        updateState({ service: '当面交易' });
                      }}
                      className={classnames(
                        'w-full whitespace-nowrap flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                        {
                          'bg-slate-50 text-[#FFD036]':
                            state.service === '当面交易',
                        },
                      )}
                    >
                     {t('当面交易')}
                    </div>
                    <div
                      onClick={() => {
                        updateState({ service: '包邮' });
                      }}
                      className={classnames(
                        'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                        {
                          'bg-slate-50 text-[#FFD036]':
                            state.service === '包邮',
                        },
                      )}
                    >
                      {t("包邮")}
                    </div>
                    <div
                      onClick={() => {
                        updateState({ service: '快递' });
                      }}
                      className={classnames(
                        'w-full rounded-none flex  px-2 justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
                        {
                          'bg-slate-50 text-[#FFD036]':
                            state.service === '快递',
                        },
                      )}
                    >
                      {t('快递')}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NumberKeyboard
            theme="custom"
            onDelete={() => {
              deleteInput();
            }}
            extraKey={[pricesUnit, '.']}
            closeButtonText={t('完成')}
            visible={true}
            onClose={() => {
              confirm(state);
              close();
            }}
            className="-translate-y-8"
            // onChange={()=>{close();Toast.success('完成')}}
            onInput={onInput}
            // onDelete={onDelete}
          />
          {/* <div className='h-[20px]'></div> */}
        </div>
      </SwipeableDrawer>
    );
  };

  const ActivePricesModel = (props) => {
    const { visible, open, close, confirm } = props;
    const [currentInPut, setCurrentInPut] = useState<string>();
    const [state, updateState] = hooks.useSetState({
      text: form?.getFieldValue('prices')?.text || '',
      unit: form?.getFieldValue('prices')?.unit || '',
      pricesUnit: form?.getFieldValue('prices')?.pricesUnit || pricesUnit,
      oldPrice: form?.getFieldValue('prices')?.oldPrice || '',
      showOldPrice: form?.getFieldValue('prices')?.showOldPrice || false,
      service: form?.getFieldValue('prices')?.service || [],
    });
    useEffect(() => {
      console.log(form.getFieldValue('prices'), 'form');
      // updateState({
      //   text: form.getFieldValue('text'),
      //   unit: form.getFieldValue('unit'),
      //   oldPrice: form.getFieldValue('oldPrice'),
      //   showOldPrice: form.getFieldValue('showOldPrice'),
      //   service: form.getFieldValue('service'),
      // });
    }, [form]);
    const deleteInput = () => {
      if (!currentInPut) return;
      updateState({
        [currentInPut]: state[currentInPut]?.slice(
          0,
          state[currentInPut].length - 1,
        ),
      });
    };
    const onInput = (v) => {
      // Toast.success(v);
      if (v === 'CAD') {
        updateState({ pricesUnit: 'USD' });
        setPricesUnit('USD');
      }
      if (v === 'USD') {
        setPricesUnit('CAD');
        updateState({ pricesUnit: 'CAD' });
      }
      if (v === '完成') {
        close();
      }
      updateState({
        [currentInPut]: state[currentInPut] + v,
      });
    };
    const serviceList = [
      { title: '当面交易' },
      { title: '包邮' },
      { title: '快递' },
    ];
    const ServicesItem = (props) => {
      const { title, defaultSelect, change } = props;
      const [select, setSelect] = useState(defaultSelect);
      useEffect(() => {
        if (select) {
          props.change(title);
        } else {
          props.remove(title);
        }
      }, [select]);
      return (
        <div
          onClick={() => {
            setSelect(!select);
          }}
          className={classnames(
            'bg-bg m-1  text-xs font-light h-6 px-1 py-1  rounded',
            {
              'text-yellow-500': select,
              'text-gray-600': !select,
            },
          )}
        >
          {title}
        </div>
      );
    };
    const columns = [
      { text: '日', value: 0 },
      { text: '周', value: 1 },
      { text: '月', value: 2 },
      { text: '季', value: 3 },
      { text: '年', value: 4 },
      // { text: '南通', value: 5 },
      // { text: '宿迁', value: 6 },
      // { text: '泰州', value: 7 },
      // { text: '无锡', value: 8 },
    ];
    return (
      <SwipeableDrawer
        className="z-10 "
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={close}
        onOpen={open}
        open={visible}
        anchor="bottom"
      >
        <div className="h-[380px] ">
          <Puller></Puller>
          <div className="p-5 mt-2 ">
            <div className="h-1 m-0 mt-2 mb-2 divider opacity-30"></div>
            <div className="flex justify-between items-center">
              <div className="flex w-full space-x-4 items-center">
                <div className="whitespace-nowrap text-[#37455C] text-sm">
                {t('活动价格')}
                </div>
                <div className="flex items-end">
                  <div className="w-[70px]">
                    <Input
                      onFocus={() => {
                        setCurrentInPut('oldPrice');
                      }}
                      type={'number'}
                      value={state.oldPrice}
                      readOnly
                      onChange={(text) => updateState({ oldPrice: text })}
                      placeholder={
                        currentInPut === 'oldPrice' ? '|' : '活动价格'
                      }
                      className="text-lg text-[#798195]"
                    />
                  </div>
                  <div className="text-sm text-[#798195]">{pricesUnit}</div>
                </div>
              </div>
              {/* swith */}
            </div>
            <div className="h-1 m-0 mt-2 divider opacity-30"></div>
          </div>
          <NumberKeyboard
            theme="custom"
            onDelete={() => {
              deleteInput();
            }}
            extraKey={[pricesUnit, '.']}
            closeButtonText={t("完成")}
            visible={true}
            onClose={() => {
              confirm(state);
              close();
            }}
            className="-translate-y-8"
            // onChange={()=>{close();Toast.success('完成')}}
            onInput={onInput}
            // onDelete={onDelete}
          />
          {/* <div className='h-[20px]'></div> */}
        </div>
      </SwipeableDrawer>
    );
  };
  const DeliveryRadioMenu = () => {
    const [state, setState] = useState(t('实体书'));
    useEffect(() => {
      form.setFieldValue('delivery', state);
    }, [state]);
    return (
      <div className="ml-8 h-full flex items-center justify-end pr-1 rounded-lg">
        <div className="border-[#DCDDE1] border  overflow-hidden  rounded-lg  h-[28px]   flex ">
          <div
            onClick={() => {
              setState(t('实体书'));
            }}
            className={classnames(
              'w-full whitespace-nowrap flex justify-center px-2 items-center text-center text-[#A9B0C0]',
              {
                'bg-slate-50 text-[#FFD036]': state === t('实体书'),
              },
            )}
          >
            {t('实体书')}
          </div>
          <div
            onClick={() => {
              setState(t('电子书'));
            }}
            className={classnames(
              'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
              {
                'bg-slate-50 text-[#FFD036]': state === t('电子书'),
              },
            )}
          >
            {t('电子书')}
          </div>
          <div></div>
        </div>
      </div>
    );
  };
  const [placeName, setPlaceName] = useState();
  const dynamicFormData = React.useMemo(
    () => dynamicForm?.data ?? [],
    [dynamicForm],
  );
  const [pricesVisible, setPricesVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [activePricesVisible, setActivePricesVisible] = useState(false);
  const [ideaPricesVisible, setIdeaPricesVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);



  /**
   * 获取详情
   */
  const { data, mutate: detailMutate } = useFetch('/post/detail', 'get', {
    id: router.query.id,
  });
  useEffect(() => {
    if (router.query.isEdit) {
      setType(router.query.type as string);
      detailMutate();
      if (router.query.type === 'course_recommend') {
        // add course config
      }
    }
  }, []);
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data?.data?.form);
      setSwitchValue(data?.data?.form?.map);
      setTopic(
        data?.data?.topics.map((item) => {
          return { id: item.id, name: item.name };
        }),
      );
      setTitle(data?.data?.title);
      setContent(data?.data?.body);
      setPreviews(data?.data?.preview);
    }
  }, [data]);
  const DynamicForm = React.useCallback(
    (props: any) => {
      const data = React.useMemo(
        () => dynamicForm?.data ?? [],
        [props.dynamicForm],
      );
      useEffect(() => {
        console.log('DynamicForm render count ++');
      }, []);
      return data?.map((item) => {
        const [state, setState] = useState(form.getFieldValue(item.dataIndex));
        // const Node = React.useCallback(()=>{
        //   console.log('render count ++')
        //   return customComponents[item.type]
        // },[]);
        useEffect(() => {
          console.log('data render count ++');
        }, []);
        const Label = () => {
          const Icon = () => {
            return IconList[item.icon] ? IconList[item.icon] : <div></div>;
          };
          return (
            <div className="flex items-center space-x-4">
              <Icon></Icon>
              <div>{(t(item.label))}</div>
            </div>
          );
        };
        return (
          <Form.Item
            name={item.dataIndex}
            label={<Label></Label>}
            key={item.dataIndex}
            // children={()=>{
            //   return <Node></Node>
            // }}
            trigger="onConfirm"
            valuePropName="checked"
            onClick={
              item.type === 'time'
                ? (_, action) => {
                    console.log(_, 'action');
                    action.current?.open();
                  }
                : () => {
                    if (item.type === 'prices' && type === 'sublet') {
                      setPricesVisible(true);
                    }
                    if (item.type === 'prices' && type === 'idle') {
                      setIdeaPricesVisible(true);
                    }
                    if (item.type === 'prices' && type === 'book') {
                      setIdeaPricesVisible(true);
                    }
                    if (item.type === 'prices' && type === 'activity') {
                      setActivePricesVisible(true);
                    }
                    if (item.type === 'contact') {
                    }
                  }
            }
          >
            {item.type === 'location' && (
              <PickLocation location={''} placeName={placeName}></PickLocation>
            )}
            {item.type === 'time' && (
              <DatetimePicker
                minDate={new Date()}
                onChange={(data) => {
                  console.log(data, 'DatetimePicker');
                  setState(data);
                }}
                value={state}
                popup
                type="datetime"
              >
                {(val: Date, _, actions) =>
                  val ? (
                    val.toDateString()
                  ) : (
                    <div
                      onClick={() => {
                        actions.open();
                      }}
                    >
                      {'请选择日期' || val.toDateString()}
                    </div>
                  )
                }
              </DatetimePicker>
            )}
            {item.type === 'Switch' && (
              <Switch
                onChange={(e) => {
                  form.setFieldValue(item.dataIndex, e);
                }}
                defaultChecked={form.getFieldValue(item.dataIndex)}
                // checked={form.getFieldValue(item.index)}
                activeColor="#FFD036"
                size={20}
                inactiveColor="#dcdee0"
              />
            )}
            {item.type === 'input' && (
              <Input
                defaultValue={form.getFieldValue(item.dataIndex)}
                placeholder={t("请输入")}
                value={form.getFieldValue(item.dataIndex)}
                onChange={(v) => {
                  form.setFieldValue(item.dataIndex, v);
                }}
              ></Input>
            )}
            {item.type === 'type' && (
              <Input
                placeholder="请输入"
                onChange={(v) => {
                  form.setFieldValue(item.dataIndex, v);
                }}
              ></Input>
            )}
            {item.type === 'contact' && (
              <div
                onClick={() => {
                  setContactVisible(true);
                }}
              >
                {t('请选择联系方式')}
              </div>
            )}
            {item.type === 'prices' && (
              <div>
                {form.getFieldValue('prices')?.text === 0 ||
                form.getFieldValue('prices')?.text === '0'
                  ? t('免费')
                  : form.getFieldValue('prices')?.text || t('点击输入价格信息')}
              </div>
            )}

            {item.type === 'deliveryRadio' && (
              <DeliveryRadioMenu></DeliveryRadioMenu>
            )}
            {/* {
            ite
          } */}
          </Form.Item>
        );
      });
    },
    // (pre) => {if(form.validateFields)}
    [dynamicForm, placeName, form, form.getFieldValue('startTime')],
  );
  const TopicDrawer = useCallback(
    (props: any) => {
      const { data, visible } = props;
      const [local, setLocal] = useState(visible);
      const [localList, setLocalList] = useState([]);
      const selectPoint = (item) => {
        console.log('select', item);
        // if (topic?.indexOf(item) >= 0) {
        //   const index = topic?.indexOf(item);
        //   const res = topic?.slice().splice(index, 1);
        //   setTopic(res);
        //   Toast.fail('已移除');
        //   return;
        // }
        setTopic((pre) => {
          if (!pre) return [item];
          if (pre.indexOf(item) >= 0) {
            Toast.fail(t('已移除该话题'));
            return pre.filter((value, index, self) => {
              return value !== item;
            });
          }
          // const uniqueArray = pre.filter((value, index, self) => {
          // return self.indexOf(value) === index;
          // });
          Toast.success(`${t('已加入')}${item.name}${t('话题')}`);
          return [...pre, item];
        });

        // form.setFieldValue('location', obj);
        // setPlaceName(item?.place_name);
        setLocal(false);
      };
      // const topList = ['# 热门话题', '# 最新话题', '# 最热话题', '# 闲置'];
      const [topName, setTopName] = useState('');
      // const campusID = useMemo(() => {
      //   return campusData?.data?.[0]?.id;
      // }, [campusData,router,topicVisible]);
      const { data: _topicList, mutate: _topicListMutate } = useFetch(
        '/campus/topic/list',
        'page',
        {
          pageSize: 100,
          campusId: campusID,
          name: topName,
        },
      );
      useEffect(() => {
        _topicListMutate();
      }, [campusID, topName, topicVisible]);
      const topList = React.useMemo(
        () =>
          _topicList
            ? topList
              ? [...topList].concat(..._topicList)
              : [].concat(..._topicList)
            : null,
        [_topicList, campusID, topName, router, topicVisible],
      );

      const placeName = useMemo(() => {
        try {
          const res = JSON.parse(form.getFieldValue('location'));
          return res.placename;
        } catch (error) {
          return 'Located...';
        }
      }, [local, localList]);
      // useEffect
      return (
        <div>
          <div
            onClick={() => {
              setLocal(true);
            }}
          >
            {/* {form.getFieldValue('location').length > 6 ? JSON?.parse(form.getFieldValue('location')).placename : null || 'locate...'} */}
          </div>
          <div>
            <SwipeableDrawer
              className="z-20"
              disableDiscovery={true}
              disableSwipeToOpen={true}
              onClose={() => {
                props.onClose();
              }}
              onOpen={() => {}}
              open={visible}
              anchor="bottom"
            >
              <div className="h-[60vh]">
                <Puller></Puller>
                {/* <SignIn></SignIn> */}
                <div className="p-5">
                  <div className="h-1 mt-3 mb-2 divider opacity-30"></div>
                  <input
                    className="bg-bg mb-3 h-10 hover:outline-none  input border-none input-bordered w-full input-md"
                    value={topName}
                    onChange={(e) => {
                      setTopName(e.target.value);
                    }}
                  ></input>
                  {topList?.length > 1
                    ? topList?.map((item) => {
                        return (
                          <div
                            className="w-full flex flex-col justify-center "
                            onClick={() => {
                              selectPoint(item);
                            }}
                          >
                            <div className="text-gray-500 font-semibold text-sm">
                              # {item?.name}
                            </div>
                            {/* <div className="text-gray-400 font-medium text-sm">
                        {item.place_name}
                      </div> */}
                            <div className="h-1 m-0 divider opacity-30 mt-3 mb-3"></div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </SwipeableDrawer>
          </div>
        </div>
      );
    },
    [topicVisible],
  );
  const handleSetTitle = React.useCallback((value) => {
    setTitle(value);
  }, []);

  const submitCourseConfig = async (e, draft?) => {
    console.log(
      {
        ...e,
        draft: draft,
        title: title,
        body: content,
        topics: topic?.map((item) => item.name),
        preview: ['/upload/bg-202303091736764.png'],
        type: type,
        contact: [],
      },
      'submitCourseConfig',
    );
    if (!title || !content) {
      Toast.fail(t('请完善标题和内容'));
      return;
    }
    if (!topic) {
      Toast.fail(t('至少添加一个话题'));
      return;
    }
    if (!e.form.term) {
      Toast.fail(t('至少选择一学期'));
      return;
    }
    try {
      const { data } = await useRequest.post('/api/post/create', {
        ...e,
        draft: draft,
        title: title,
        body: content,
        topics: topic?.map((item) => item.name),
        preview: ['/upload/bg-202303091736764.png'],
        type: type,
        contact: ['微信'],
        campusId: campusID,
      });
      if (data.message === 'success') {
        Toast.success('发布成功');
      } else {
        Toast.fail('发布失败');
      }
    } catch (error) {
      Toast.fail(error);
    }
    console.log(e, 'get form');
  };
  return (
    <>
      <div className="mb-0 mt-12">
        <Header className="shadow-none"></Header>

        <div className="items-start justify-between p-5 py-0 pt-6">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <CateGoryIcon></CateGoryIcon>
              {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
              <div className="text-blueTitle">{item.title}</div>
            </div>
            <div>{item.action}</div>
          </div>
          <div className="text-xs text-gray-300">{item.intro}</div>
        </div>
        <div className="p-5">
          <PostCategory
            change={(e) => {
              changeCategory(headerMenuList[e].key);
            }}
            id={
              headerMenuList
                .map((item, index) => {
                  if (item.key === type) {
                    return index;
                  }
                })
                .filter((item) => item !== undefined)[0]
            }
            // value={type}
            headerMenuList={headerMenuList}
            className="mt-0"
          ></PostCategory>
        </div>
        {/* <AddCourse></AddCourse> */}
      </div>
      <>
        {type === 'course_recommend' ? (
          <div className="min-h-screen ">
            <TopicDrawer
              visible={topicVisible}
              onClose={() => {
                setTopicVisible(false);
              }}
            ></TopicDrawer>
            <div className="px-5 post-title">
              <Input
                placeholder={t('填写标题获得更多流量～')}
                value={title}
                onChange={handleSetTitle}
                clearable
                clearTrigger="always"
                className="text-2xl font-bold"
              />
            </div>
            <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
            <div className="px-5 mt-4">
              <Input.TextArea
                placeholder={t('添加正文')}
                value={content}
                onChange={setContent}
                autoSize={{ minHeight: 180, maxHeight: 180 }}
              />

              <div className="flex items-center my-2 space-x-2">
                {topic?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        setTopic((pre) => {
                          if (!pre) return [item];
                          if (pre.indexOf(item) >= 0) {
                            return pre.filter((value, index, self) => {
                              return value !== item;
                            });
                          }
                        });
                      }}
                      className="text-[#2347D9] text-sm"
                    >
                      {`# ${item.name}`}
                    </div>
                  );
                })}
              </div>
              <div className="flex space-x-[10px] mb-2 ">
                <div
                  onClick={() => {
                    setTopicVisible(true);
                  }}
                  className="text-[#B38314] rounded bg-[#FFFBD9] px-2 text-xs py-1"
                >
                  {t('# 话题 ')}
                </div>
                <div
                  onClick={() => {
                    setTopic((pre) => {
                      if (!pre) return [{ id: null, name: t('# 约克大学') }];
                      if (
                        pre.indexOf({ id: null, name: t('# 约克大学') }) >= 0
                      ) {
                        Toast.fail(t('已移除该话题'));
                        return pre.filter((value, index, self) => {
                          return value.name !== t('# 约克大学');
                        });
                      }
                      // const uniqueArray = pre.filter((value, index, self) => {
                      //   return self.indexOf(value) === index;
                      // });
                      Toast.success(t(`已加入${'# 约克大学'} ${t('话题')}`));
                      return [...pre, { id: null, name: t('# 约克大学') }];
                    });
                  }}
                  className="text-[#798195] rounded bg-[#F3F4F6] px-2 text-xs py-1"
                >
                  {t('# 约克大学')}{' '}
                </div>
              </div>
            </div>
            <div className="bg-[#F6F6F6] w-full h-3"></div>
            <AddCourse
              value={data?.data?.form?.courseData}
              termList={data?.data?.form?.termList}
              submit={(e) => {
                submitCourseConfig(e);
              }}
            ></AddCourse>
          </div>
        ) : (
          <div className="mb-0 pb-10">
            {KeyboardShow ? <Keyboard></Keyboard> : null}
            <TopicDrawer
              visible={topicVisible}
              onClose={() => {
                setTopicVisible(false);
              }}
            ></TopicDrawer>
            <ContactModel
              data={contactListTemp}
              onClose={() => {
                setContactVisible(false);
              }}
              visible={contactVisible}
              close={() => {
                setContactVisible(false);
              }}
            ></ContactModel>
            <PricesModel
              visible={pricesVisible}
              onClose={() => {
                setPricesVisible(false);
              }}
              close={() => {
                setPricesVisible(false);
              }}
              confirm={(e) => {
                form.setFieldValue('prices', e);
              }}
            ></PricesModel>
            <IdeaPricesModel
              visible={ideaPricesVisible}
              onClose={() => {
                setIdeaPricesVisible(false);
              }}
              close={() => {
                setIdeaPricesVisible(false);
              }}
              confirm={(e) => {
                form.setFieldValue('prices', e);
              }}
            ></IdeaPricesModel>
            <ActivePricesModel
              visible={activePricesVisible}
              onClose={() => {
                setActivePricesVisible(false);
              }}
              close={() => {
                setActivePricesVisible(false);
              }}
              confirm={(e) => {
                form.setFieldValue('prices', e);
              }}
            ></ActivePricesModel>
            {/* <Keyboard></Keyboard> */}
            {/* <div className="p-5">
              <PostCategory
                change={(e) => {
                  changeCategory(headerMenuList[e].key);
                }}
                id={
                  headerMenuList
                    .map((item, index) => {
                      if (item.key === type) {
                        return index;
                      }
                    })
                    .filter((item) => item !== undefined)[0]
                }
                // value={type}
                headerMenuList={headerMenuList}
                className="mt-0"
              ></PostCategory>
            </div> */}
            <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
            <div className="px-5 py-3">
              <Uploader
                accept="*"
                upload={upload}
                value={previews?.map((item, index) => {
                  return {
                    name: item,
                    url: `${Cons.BASEURL}${item}`,
                  };
                })}
                uploadIcon={<AddUploaderIcon></AddUploaderIcon>}
                onChange={(items) => {
                  addPreviews(items);
                }}
              />
            </div>
            <div className="px-5 post-title">
              <Input
                placeholder={t('填写标题获得更多流量～')}
                value={title}
                onChange={handleSetTitle}
                clearable
                clearTrigger="always"
                className="text-2xl font-bold"
              />
            </div>
            <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
            <div className="px-5 mt-4">
              <Input.TextArea
                placeholder={t('添加正文')}
                value={content}
                onChange={setContent}
                autoSize={{ minHeight: 180, maxHeight: 180 }}
              />
              <div className="flex items-center my-2 space-x-2">
                {topic?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        setTopic((pre) => {
                          if (!pre) return [item];
                          if (pre.indexOf(item) >= 0) {
                            return pre.filter((value, index, self) => {
                              return value !== item;
                            });
                          }
                        });
                      }}
                      className="text-[#2347D9] text-sm"
                    >
                      # {item.name}
                    </div>
                  );
                })}
              </div>
              <div className="flex space-x-[10px] mb-2 ">
                <div
                  onClick={() => {
                    setTopicVisible(true);
                  }}
                  className="text-[#B38314] rounded bg-[#FFFBD9] px-2 text-xs py-1"
                >
                  {t('# 话题 ')}
                </div>
                <div
                  onClick={() => {
                    setTopic((pre) => {
                      if (!pre) return [{ id: null, name: t('约克大学') }];
                      if (pre.indexOf({ id: null, name: t('约克大学') }) >= 0) {
                        Toast.fail(t('已移除该话题'));
                        return pre.filter((value, index, self) => {
                          return value.name !== t('约克大学');
                        });
                      }
                      // const uniqueArray = pre.filter((value, index, self) => {
                      //   return self.indexOf(value) === index;
                      // });
                      Toast.success(t(`已加入 # ${'约克大学'} ${t('话题')}`));
                      return [...pre, { id: null, name: t('约克大学') }];
                    });
                  }}
                  className="text-[#798195] rounded bg-[#F3F4F6] px-2 text-xs py-1"
                >
                  {t('# 约克大学 ')}
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
            <div className="px-5 mt-4 post-form pb-10">
              <Form
                form={form}
                onFinish={(v) => {
                  submitPost(v, false);
                  console.log(v);
                }}
              >
                {
                  //  dynamicFormData?.map((item) => {
                  //   const Node = ()=>{
                  //     return customComponents[item.type]
                  //   };
                  //   const Label = () => {
                  //     const Icon = () => {
                  //       return IconList[item.icon] ? IconList[item.icon] : <div></div>;
                  //     };
                  //     return (
                  //       <div className="flex items-center space-x-4">
                  //         <Icon></Icon>
                  //         <div>{item.label}</div>
                  //       </div>
                  //     );
                  //   };
                  //   return (
                  //     <Form.Item
                  //       name={item.dataIndex}
                  //       label={<Label></Label>}
                  //       key={item.dataIndex}
                  //       // children={()=>{
                  //       //   return <Node></Node>
                  //       // }}
                  //       valuePropName="checked"
                  //       onClick={
                  //         item.type === 'time'
                  //           ? (_, action) => {
                  //               action.current?.open();
                  //             }
                  //           : () => {
                  //               if (item.type === 'prices') {
                  //                 setPricesVisible(true);
                  //               }
                  //               if (item.dataIndex === 'contact') {
                  //                 setContactVisible(true);
                  //               }
                  //             }
                  //       }
                  //     >
                  //       {/* {item.type === 'location' && (
                  //         <PickLocation location={''} placeName={placeName}></PickLocation>
                  //       )}
                  //       {item.type !== 'location' && customComponents[item.type]} */}
                  //       {customComponents[item.type]}
                  //     </Form.Item>
                  //   );
                  // })
                }
                <DynamicForm
                  data={form}
                  placeName={placeName}
                  dynamicForm={dynamicForm}
                ></DynamicForm>
              </Form>
              <div className="mb-8"></div>
            </div>
            <Footer></Footer>
          </div>
        )}
      </>
    </>
  );
}


export async function getServerSideProps({
  locale,
  }){

  return {
      props: {
          ...(await serverSideTranslations(locale, ['common',]))
      },
    }
  }