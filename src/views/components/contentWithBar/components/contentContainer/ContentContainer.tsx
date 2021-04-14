import React from 'react';
import { StyledContentContainer } from './styles';
import { Props } from './models';

export const ContentContainer = (props: Props) => (
  <StyledContentContainer container xs={9}>
    {props.children}
  </StyledContentContainer>
);
