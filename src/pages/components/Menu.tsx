import styled from 'styled-components';

import { COLORS, FONT_SIZES } from './constants';

interface MenuPropsModel {
    itemsNumber: number;
    children: JSX.Element[],
}

const MenuContainer = styled.nav`
    width: 80%;
    margin-left: 20%;
`;

const Menu = styled.ul<MenuPropsModel>`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  
  li {
    width: calc(100% / ${(props) => props.itemsNumber});
    background-color: ${COLORS.backgrounds.menuItem};
    margin: 0 20px;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    transition: all 0.2s;
    
    a {
        color: ${COLORS.text.menuItem};
        text-decoration: none;
        font-size: ${FONT_SIZES.medium};
    }
  }
  
  li:hover {
    box-shadow: inset 0px 8px 24px 0px rgba(0,0,0,0.45);
    cursor: pointer;
  }
  
`;

export {
  Menu,
  MenuContainer,
};
