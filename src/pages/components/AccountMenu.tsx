import React from 'react';
import { Link } from 'react-router-dom';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';

import { COLORS, FONT_SIZES } from './constants';

const Container = styled.div`
    margin-right: 10px;
    margin-left: auto;
    display: flex;
    width: 300px;
    height: 45px;
    text-align: center;
`;

const Item = styled.div`
    width: 150px;
    
    a {
        display: block;
        border-radius:0 0 12px 12px;
        border-right: 1px solid black;
        padding: 6px 12px;
        box-sizing: border-box;
        font-size: ${FONT_SIZES.large};
        background: green;
        transition: all 0.2s;
        text-decoration: none;
        position: relative;
        color: ${COLORS.text.submenuItem};
        
        svg {
            transition: all 0.2s;
            position: absolute;
            top: 2px;
        }
    }
    
    &:hover {
        a {
            text-decoration: underline;
            
            svg {
                color: white;
            }
        }
    }
    
`;

const AccountMenu = () => (
  <Container>
    <Item>
      <Link to="/register"> Register <EmojiPeopleIcon /></Link>
    </Item>
    <Item>
      <Link to="/login"> LogIn <AccountCircleIcon /></Link>
    </Item>
  </Container>
);

export { AccountMenu };
