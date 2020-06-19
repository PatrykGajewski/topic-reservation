import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div``;

const LogoPath = process.env.PUBLIC_URL + '/assets/logo.png';

const LogoContainer = () => (
  <LogoWrapper>
    <img src={LogoPath} alt="Diploma project reservation" />
  </LogoWrapper>
);

export { LogoContainer };
