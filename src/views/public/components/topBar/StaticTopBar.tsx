import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/logo/Logo';
import { StyledLink } from '../../../components/styles/StyledLink';
import { StyledHashLink } from '../../../components/styles';
import { TopBarContainer } from "../../../components/styles";

export const StaticTopBar = () => (
  <TopBarContainer container alignItems="center">
    <Grid item xs={12} sm={2}>
      <Link to="/">
        <Logo />
      </Link>
    </Grid>
    <Grid item xs={12} sm={10}>
      <Grid container justify="flex-end">
        <Grid item sm={3} xs={6}><StyledLink to="/login">Login</StyledLink></Grid>
        <Grid item sm={3} xs={6}><StyledLink to="/register">Register</StyledLink></Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item sm={3} xs={8}><StyledLink to="/">Home</StyledLink></Grid>
        <Grid item sm={3} xs={8}><StyledHashLink to="/#vision">Vision</StyledHashLink></Grid>
        <Grid item sm={3} xs={8}><StyledHashLink to="/#participation">Participation</StyledHashLink></Grid>
        <Grid item sm={3} xs={8}><StyledHashLink to="/#news">News</StyledHashLink></Grid>
      </Grid>
    </Grid>
  </TopBarContainer>
);
