import React from 'react';
import Loader from 'react-loader-spinner';
import { LoaderWrapper } from './styles';

export const PageLoader = () => (
  <LoaderWrapper>
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} // 3 secs
    />
  </LoaderWrapper>
);
