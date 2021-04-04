import React from 'react';
import styled, { css } from 'styled-components';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { Logo } from './Logo';

const LinkStyles = css`
    text-decoration: none;
    font-family: 'Source Sans Pro', sans-serif;
    display: block;
    text-align: center;
    padding: 8px 15px;
    background: #083b66;
    border: 2px solid #083b66;
    border-bottom: 2px solid white;
    color: white;
    font-size: 20px;
    font-weight: 700;
    transition: all 0.2s;
    
    &:hover {
        background: white;
        color: #083b66;
    }
`;

const StyledLink = styled(Link)`
    ${LinkStyles}
`;

const StyledHashLink = styled(HashLink)`
    ${LinkStyles}
`;

interface TopBarProps {
  isAuthenticated: boolean
}

// TODO complete link for auth page
const TopBar = (props: TopBarProps) => (
  <Grid container alignItems="center" style={{ background: '#083b66', height: 120 }}>
    <Grid item xs={12} sm={2}>
      <Link to="/">
        <Logo />
      </Link>
    </Grid>
    <Grid item xs={12} sm={10}>
      {props.isAuthenticated ? (
        <>
          <Grid container justify="flex-end">
            <Grid item sm={3} xs={12}><StyledLink to="/logout">Logout</StyledLink></Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item sm={3} xs={8}><StyledLink to="/">Account</StyledLink></Grid>
            <Grid item sm={3} xs={8}><StyledLink to="/owned">Owned projects</StyledLink></Grid>
            <Grid item sm={3} xs={8}><StyledLink to="/list">Projects list</StyledLink></Grid>
            <Grid item sm={3} xs={8}><StyledLink to="/promoters">Promoters ranking</StyledLink></Grid>
          </Grid>
        </>
      ) : (
        <>
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
        </>
      )}
    </Grid>
  </Grid>
);

export {TopBar};
