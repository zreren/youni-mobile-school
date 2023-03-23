import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';


const Puller = styled(Box)(({ theme }) => ({
    width: 33,
    height: 4,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export default Puller;