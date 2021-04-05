import styled, { css, keyframes } from 'styled-components';
import { ButtonType } from '../models/button-type.model';

export const StyledPopupMask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #80808059;
  z-index: 888;
`;

interface StyledPopupProps {
  children: any,
}

export const StyledPopup = styled.div<StyledPopupProps>`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  border-radius: 12px;
  height: auto;
  overflow-y: hidden;
`;
const turnAnimation = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(180deg) }
`;
export const CloseButton = styled.button`
  display: block;
  position: absolute;
  top: 14px;
  right: 14px;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .2s;
  
  &:hover {
    box-shadow: 0px 0px 8px 2px #3f3f3f3d;
    animation-name:${turnAnimation};
    animation-duration: 0.4s;
  }
`;
const popupChildrenStyle = css`
  padding: 16px 28px;
`;
export const StyledHeader = styled.div`
  ${popupChildrenStyle}
  display: flex;
  position: relative;
  align-items: center;
  padding-right: 60px;
  height: 64px;
  box-sizing: border-box;
  box-shadow: #474747 0px 5px 12px -12px;
`;
export const StyledContent = styled.div`
  padding: 28px;
  height: calc(100% - 184px);
  overflow-y: scroll;
`;
export const StyledFooter = styled.div`
  ${popupChildrenStyle}
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
  box-sizing: border-box;
  box-shadow: #474747 0px -5px 12px -12px;
`;
export const StyledHeaderText = styled.span`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-size: 18px;
  overflow: hidden;
  whitespace: nowrap;
  text-overflow: ellipsis;
`;

interface FooterButtonProps {
  buttonType: ButtonType
  children: string,
}

export const FooterButton = styled.button<FooterButtonProps>`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  outline: none;
  border: none;
  padding: 10px 36px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all .2s;
  margin-left: 18px;
  background: ${(props) => {
    switch (props.buttonType) {
    case ButtonType.DANGER:
      return 'red';
    case ButtonType.PRIMARY:
      return '#77bf53';
    case ButtonType.SECONDARY:
      return '#c5c5c580';
    default:
      return '#3da8d9e6';
    }
  }};
  
  &:hover {
    box-shadow: 0px 0px 6px #55555580;
  }
`;
