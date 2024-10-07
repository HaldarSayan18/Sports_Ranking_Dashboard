import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import chat from '../../images/chat.svg';
import frame from '../../images/Frame.svg';
import imgDoe from '../../images/image_doe.svg';

const Nav = styled(AppBar)`
    background:transparent;
    height:50px;
    border:none;
    box-shadow:none;
    outline:none;
`
const Text = styled(Toolbar)`
    display: grid;
    justify-items: end;
    margin-right:50px;
    overflow:hidden;
`
const Typodiv = styled(Typography)`
    display: flex;
    justify-content:center;
    align-items:center;
    color:white;
    ${'' /* height:40px; */}
    width:100px;
    margin-top:-5px;
    font-size:16px;
    gap: 4px;
`
const Header2 = () => {
    return (
        <>
            <Nav position='static'>
                <Text>
                    <Typodiv variant="h6" >
                        <img src={chat} alt='' style={{marginLeft:"-50px"}}/>
                        <img src={frame} alt='' style={{marginLeft:"10px", marginRight:"10px"}}/>
                        <img src={imgDoe} alt='' style={{marginRight:"20px"}}/>
                        <text style={{width:"50px", display:"flex"}}>John Doe</text>
                        <KeyboardArrowDownIcon />
                    </Typodiv>
                </Text>
            </Nav>
        </>
    )
}
export default Header2;