import React from 'react';
import styled from 'styled-components';

const LogoPath = `${process.env.PUBLIC_URL}/assets/logo.png`;

const ResponsiveImage = styled.img`
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
    height: auto;
`;

const Logo = () => (
  <ResponsiveImage src={LogoPath} alt="Diploma project reservation" />
);

export { Logo };
