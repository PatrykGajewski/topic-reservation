import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { PopupProps } from './models/props.model';
import { ButtonConfig } from './models/button-config.model';
import {
  CloseButton,
  FooterButton,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledHeaderText,
  StyledPopup,
  StyledPopupMask,
} from './styles';

export const Popup = (props: PopupProps) => (
  <StyledPopupMask>
    <StyledPopup>
      <StyledHeader>
        <StyledHeaderText>
          {props.header}
        </StyledHeaderText>
        <CloseButton
          onClick={props.handleClose}
        >
          <CloseIcon />
        </CloseButton>
      </StyledHeader>
      <StyledContent>
        {props.children}
      </StyledContent>
      <StyledFooter>
        {props.buttonsConfig.map((button: ButtonConfig, index: number) => (
          <FooterButton
            key={index}
            disabled={button.disabled}
            buttonType={button.buttonType}
            onClick={button.onClick}
          >
            {button.label}
          </FooterButton>
        ))}
      </StyledFooter>
    </StyledPopup>
  </StyledPopupMask>
);
