import React from 'react';
import { StyledContentWrapper } from './styles';
import { Props } from './models';

export const ContentWrapper = (props: Props) => (
  <StyledContentWrapper container item xs={12}>
    {props.children}
  </StyledContentWrapper>
);
