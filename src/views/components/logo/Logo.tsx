import React from 'react';
import { ResponsiveImage } from './styles';

const LogoPath:string = `${process.env.PUBLIC_URL}/assets/logo.png`;

export const Logo = () => (
  <ResponsiveImage src={LogoPath} alt="Diploma project reservation" />
);
