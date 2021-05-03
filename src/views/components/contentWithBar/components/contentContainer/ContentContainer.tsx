import React from 'react';
import { StyledContentContainer } from './styles';
import { Props } from './models';

export const ContentContainer = (props: Props) => (
  <StyledContentContainer container item xs={9} sm={10}>
    {props.children}
  </StyledContentContainer>
);
