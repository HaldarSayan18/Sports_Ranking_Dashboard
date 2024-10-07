import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Nav = styled(AppBar)`
    background:black;
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
    color:#ffd232;
    ${'' /* height:40px; */}
    width:100px;
    margin-top:-5px;
    font-size:16px;
    gap: 4px;
`
const Header = () => {
    return (
        <>
            <Nav position='static'>
                <Text>
                    <Typodiv variant="h6" >
                        <LanguageIcon />
                        Eng
                        <KeyboardArrowDownIcon />
                    </Typodiv>
                </Text>
            </Nav>
        </>
    )
}

export default Header;
