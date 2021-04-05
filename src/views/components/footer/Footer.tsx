import React from 'react';
import { Grid, Icon } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import {
  FooterContainer, FooterText, IconsContainer, IconLink,
} from './styles';

export const Footer = (): JSX.Element => (
  <FooterContainer>
    <Grid container>
      <Grid item xs={12} sm={10}>
        <FooterText>
          {`© ${new Date().getFullYear()} Patryk Gajewski - All rights reserved`}
        </FooterText>
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconsContainer>
          <IconLink href="https://www.linkedin.com" target="_blank">
            <LinkedInIcon />
          </IconLink>
          <IconLink href="https://www.facebook.com/" target="_blank">
            <FacebookIcon />
          </IconLink>
        </IconsContainer>
      </Grid>
    </Grid>
    <IconsContainer />
  </FooterContainer>
);
