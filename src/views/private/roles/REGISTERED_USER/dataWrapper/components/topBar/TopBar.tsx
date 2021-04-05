import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { Logo, StyledLink } from '../../../../../../components';
import { TopBarContainer } from '../../../../../../components/styles';

export const RegisteredUserTopBar = () => (
  <TopBarContainer container alignItems="center">
    <Grid item xs={12} sm={2}>
      <Link to="/">
        <Logo />
      </Link>
    </Grid>
    <Grid item xs={12} sm={10}>
      <Grid container justify="flex-end">
        <Grid item sm={3} xs={12}><StyledLink to="/logout">Logout</StyledLink></Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item sm={3} xs={8}><StyledLink to="/">Account</StyledLink></Grid>
        <Grid item sm={3} xs={8}><StyledLink to="/projects">Projects list</StyledLink></Grid>
        <Grid item sm={3} xs={8}><StyledLink to="/promoters">Promoters ranking</StyledLink></Grid>
      </Grid>
    </Grid>
  </TopBarContainer>
);
