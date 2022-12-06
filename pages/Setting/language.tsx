import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import useLocalStorage from "@/hooks/useStore";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

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
            <ListItemText primary={"1"} />
          </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function account() {
  const LanguageSelect = () => {
    return (
      <div className="flex items-center text-gray-400">
        <div>简体中文</div>
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List1 = [
    {
      title: '应用语言',
      intro: '选择默认应用语言',
      action: <LanguageSelect></LanguageSelect>,
      event:()=>{setOpen(true)}
    },
    {
      title: '偏好语言',
      intro: '选择你熟悉的语言，以这些语言发布的内容将不会自动翻译。',
      action: <RightIcon></RightIcon>,
      event:()=>{}
    },
  ];
  const List2 = [
    {
      title: '翻译语言',
      intro: '你希望内容被翻译成哪一种语言',
      action: <LanguageSelect></LanguageSelect>,
      event:()=>{}
    },
    {
      title: '始终显示翻译',
      intro: '开启后，支持翻译的内容将始终以所选的翻译语言显示。',
      action: <IOSSwitch></IOSSwitch>,
      event:()=>{}
    },
  ];
  const [myItem, setMyItem] = useLocalStorage('my-item', null);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  return (
    <CommonLayout className="overflow-hidden">
      <Header title="语言"></Header>
      <Form header="语言设置" List={List1} ></Form>
      <Form header="翻译" List={List2}></Form>
      
      <SimpleDialog
       open={open}
       selectedValue={selectedValue}
       onClose={()=>{setOpen(false)}}
      ></SimpleDialog>
    </CommonLayout>
  );
}
