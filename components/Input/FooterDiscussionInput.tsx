import React, { useRef, useState,useImperativeHandle,forwardRef } from 'react';
import StarIcon from './star.svg';
import DiscussionIcon from './DiscussionIcon.svg';
import useRequest from '@/libs/request';
import StarActive from './star-active.svg';
import classnames from 'classnames';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import { Toast } from 'react-vant';
import { useTranslation } from 'next-i18next'

interface FooterType {
  data: any;
  send: (comment: string) => void;
  [key: string]: any;
}


/**
 *
 * @param props
 * @returns
 */
 const  FooterDiscussionInput = forwardRef((props: FooterType,ref) =>{
  const [comment, setComment] = useState<string>('');
  const { data } = props;
  const { t } = useTranslation()
  const PostGroup = (props) => {
    const { data, isEdit,postId } = props;
    const [collectionId, setId] = useState(data?.id);
    const [isEditMethod, setIsEditMethod] = useState(isEdit);
    const starPost = async (id) => {
      // if (star) {
      //   setStar(false);
      const {data} = await  useRequest.post('/api/post/star', { id: id, collectionId: collectionId });
      if(data?.message === 'success'){
        Toast.success(t('收藏成功'));
        props.star();
      }
    };
    return (
      <div
        onClick={() => {
          starPost(postId);
        }}
        className="w-full px-5 py-4 space-y-3 rounded-lg border border-[#D9E7FF] bg-PostGroup"
      >
        <div className="flex justify-between">
          {' '}
          <div className="flex items-center space-x-2">
            <div className="text-blueTitle text-sm font-semibold">
              {data?.name}
            </div>
            <div
              className={classnames(
                'text-[10px] rounded-sm px-2  flex justify-center items-center',
                {
                  'text-white bg-[#52C41A]': data?.isPublic,
                  'text-blueTitle bg-[#D9E7FF]': !data?.isPublic,
                },
              )}
            >
              {data?.isPublic ? '公开' : '私密'}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SelectPostGroupItem = (props): JSX.Element => {
    const {
      open,
      isEdit,
      mutate,
      data
    }: { open: boolean; isEdit: boolean; mutate: any; data: any } = props;
    const { data: PostGroupData } = useFetch('/collection/list', 'get');
  
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
        className="z-30 topIndexPlus"
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
        <div className="h-[60vh] bg-white">
          <Puller></Puller>
  
          <div className="p-4 space-y-3 mt-3 mb-3">
            <div className="text-center">{t("请选择收藏夹")}</div>
            {PostGroupData?.data?.map((item) => {
              return (
                <PostGroup
                  postId={data?.id}
                  star={() => {
                    props.onClose();
                  }}
                  data={item}
                ></PostGroup>
              );
            })}
          </div>
        </div>
      </SwipeableDrawer>
    );
  };
  console.log(t('clickme'),"clickme")
  const [star, setStar] = useState<boolean>(data?.interactInfo?.stared);
  const defaultStar = data?.interactInfo?.stared;
  const send = (comment: string): void => {
    props.send(comment);
    setComment('');
  };
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({ // 暴露给父组件的方法
     focus: () => {
      inputRef?.current?.focus()
    },

 }))
  const focus = ()=>{
    inputRef.current.focus()
  }
  const focusInput = () => {
    props.ref.current.focus()
  }
  const starCount = React.useMemo(() => {
    if (defaultStar && !star) {
      return data?.interactInfo?.starCount - 1;
    }
    if (!defaultStar && star) {
      return data?.interactInfo?.starCount + 1;
    }
    return data?.interactInfo?.starCount;
  }, [star]);
  const [openList, setOpenList] = useState(false);
  const starPost = (id) => {
    if (star) {
      setStar(false);
      useRequest.post('/api/post/unstar', { id: id });
    } else {
      useRequest.post('/api/post/star', { id: id });
      setStar(true);
    }
  };

  return (
    <>
      <SelectPostGroupItem
        data={data}
        onClose={() => {
          setOpenList(false);
        }}
        onOpen={() => {
          setOpenList(true);
        }}
        open={openList}
      ></SelectPostGroupItem>
      <div className="sticky  z-30 topIndexPlus bottom-10 flex   items-center w-full p-5 bg-white h-[60px]">
        <div className="absolute flex  items-center font-medium left-7 text-sm text-[#798195]">
          <DiscussionIcon></DiscussionIcon>
          {data?.comments?.length}
        </div>
        <input
          placeholder={t("说点什么")}
          ref={inputRef}
          value={comment}
          className="px-4 pl-12 w-full   h-9 bg-[#F7F8F9] rounded-full"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        {comment?.length === 0 ? (
          <div
            className="flex items-center ml-4 space-x-1"
            onClick={() => {
              if(props.method === 'course') return
              setOpenList(true);
              // starPost(data?.id);
            }}
          >
            {star ? <StarActive></StarActive> : <StarIcon></StarIcon>}
            <div
              className={classnames('text-sm', {
                'text-[#FED64B]': star,
                'text-[#798195]': !star,
              })}
            >
              {' '}
              {starCount}
            </div>
          </div>
        ) : (
          <div
            className="text-sm text-[#798195] whitespace-nowrap"
            onClick={() => {
              send(comment);
            }}
          >
            {t("发送")}
          </div>
        )}
      </div>
    </>
  );
})

// const child = forwardRef(FooterDiscussionInput)
export default FooterDiscussionInput