import React from 'react';
import { StyledFiltersContainer } from './styles';
import { Props } from './models';

export const BarContainer = (props: Props) => (
  <StyledFiltersContainer container item xs={3} lg={2}>
    {props.children}
  </StyledFiltersContainer>
);
