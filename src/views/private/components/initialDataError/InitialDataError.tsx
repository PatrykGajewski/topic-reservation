import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import CachedIcon from '@material-ui/icons/Cached';
import { Props } from './models';
import { EmptyStateContainer } from './styles';

export const InitialDataError = (props: Props) => (
  <EmptyStateContainer>
    <ChatIcon />
    <p>{props.text}</p>
    <button onClick={props.fetchInitialData}>
      <CachedIcon />
    </button>
  </EmptyStateContainer>
);
