import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import useLocalStorage from '@/hooks/useStore';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button>
          <ListItemText primary={'1'} />
        </ListItem>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function account() {
  // if(typeof window === 'undefined') return (<div>ssr disable</div>);
  const [language, setLanguage] = useLocalStorage('language', 'cn');
  const [defaultLanguage, setDefaultLanguage] = useState('cn');
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    setDefaultLanguage(language);
  }, [language]);
  const LanguageSelect = (props) => {
    const [school, setSchool] = useState('cn');
    const { value, onChange } = props;
    return (
      // <div className="flex items-center text-gray-400">
      //   <div>简体中文</div>
      //   <RightIcon></RightIcon>
      // </div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        className="w-full p-0"
        value={value}
        sx={{
          boxShadow: 'none',
          padding: 0,
          '.MuiOutlinedInput-input': { padding: 0 },
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
            'border-width': 0,
            'border-color': 'transparent',
          },
        }}
        label="select school"
        onChange={(e) => {
          props.onChange(e.target.value);
          router.push(router.asPath, router.asPath, { locale: e.target.value });
        }}
      >
        <MenuItem value={'cn'}>简体中文</MenuItem>
        <MenuItem value={'en'}>English</MenuItem>
      </Select>
    );
  };
  const List1 = [
    {
      title: t('应用语言'),
      intro: t('选择默认应用语言'),
      action: (
        <LanguageSelect
          value={defaultLanguage}
          onChange={(v) => {
            setLanguage(v);
          }}
        ></LanguageSelect>
      ),
      event: () => {
        setOpen(true);
      },
    },
    {
      title: t('偏好语言'),
      intro: t('选择你熟悉的语言，以这些语言发布的内容将不会自动翻译。'),
      action: <LanguageSelect></LanguageSelect>,
      event: () => {},
    },
  ];
  const List2 = [
    {
      title: t('翻译语言'),
      intro: t('你希望内容被翻译成哪一种语言'),
      action: <LanguageSelect></LanguageSelect>,
      event: () => {},
    },
    {
      title: t('始终显示翻译'),
      intro: t('开启后，支持翻译的内容将始终以所选的翻译语言显示。'),
      action: <IOSSwitch></IOSSwitch>,
      event: () => {},
    },
  ];
  const [myItem, setMyItem] = useLocalStorage('my-item', null);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  return (
    <CommonLayout className="overflow-hidden">
      <Header
        returnClick={() => {
          router.push('/Profile');
        }}
        title={t('语言')}
      ></Header>
      <Form header={t('语言设置')} List={List1}></Form>
      <Form header={t('翻译')} List={List2}></Form>
    </CommonLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
