import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

interface PopupProps {
  children: any,
  header: string,
  handleClose: () => void;
}

const StyledPopupMask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #80808059;
`;

interface StyledPopupProps {
  children: any,
}

const StyledPopup = styled.div<StyledPopupProps>`
    background: #e0e0e0;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    border-radius: 12px;
    max-height: calc(100% - 40px);
    padding: 20px;
`;

const CloseButton = styled.button`
  margin-right: 0;
  margin-left: auto;
  display: block;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: none;
  outline: none;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
  box-shadow: 2px -2px 8px #55555580;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  transition: all .2s;
  font-size: 16px;
  
  &:hover {
    background: #f0c2c24f;
  }
`;

const PopupHeader = styled.span`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-size: 18px;
  overflow: hidden;
  whitespace: nowrap;
  text-overflow: ellipsis;
`;

interface FooterButtonProps {
  primary?: boolean
  children: string,
}

export const Footer = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: 0;
`;

export const FooterButton = styled.button<FooterButtonProps>`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  outline: none;
  border: none;
  border: grey;
  padding: 8px 24px;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 1px 1px 3px #55555580;
  margin-left: 15px;
  background: ${(props) => (props.primary ? '#ffc671' : '#ffffff80')};
  
  &:hover {
    background: ${(props) => (props.primary ? '#f8ba5d' : '#ffffff99')};
  }
`;

const Popup = (props: PopupProps) => (
  <StyledPopupMask>
    <StyledPopup>
      <Grid container>
        <Grid item xs={10}>
          <PopupHeader>
            {props.header}
          </PopupHeader>
        </Grid>
        <Grid item xs={2}>
          <CloseButton
            onClick={props.handleClose}
          >X
          </CloseButton>
        </Grid>
      </Grid>
      {props.children}
    </StyledPopup>
  </StyledPopupMask>
);

export {
  Popup,
};
