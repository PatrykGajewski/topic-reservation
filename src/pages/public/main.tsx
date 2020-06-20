import React from 'react';
import styled, { css } from 'styled-components';
import { Grid } from '@material-ui/core';

import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import DvrIcon from '@material-ui/icons/Dvr';

import Visualisation from '../../img/visualisation.jpg';

const MainContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const headerStyles = css`
    font-family: 'Source Sans Pro', sans-serif;
    display: block;
`;

const HeaderBig = styled.span`
    font-weight: 700;
    font-size: 64px;
    ${headerStyles}
`;

const HeaderMedium = styled.span`
    font-weight: 400;
    font-size: 28px;
    ${headerStyles}
`;

const HeaderSmall = styled.span`
    font-weight: 300;
    font-size: 24px;
    ${headerStyles};
`;

const sectionStyles = css`
    width: 100%;
    padding: 40px 0;
    text-align: center;
`;

const DarkSection = styled.div`
    background-color: rgb(0, 15, 51);
    color: white;
    ${sectionStyles}
`;

const LightSection = styled.div`
    background-color: white;
    color: rgb(0, 15, 51);
    ${sectionStyles}
`;

const ScallableImg = styled.img`
    max-width: 100%;
    height: auto;
`;

export const MainPage = () => (
  <MainContent>
    <DarkSection>
      <HeaderMedium>Service roadmap</HeaderMedium>
      <HeaderBig>Let's start</HeaderBig>
    </DarkSection>
    <LightSection>
      <Grid container spacing={1} justify="space-evenly" alignItems="center">
        <Grid item xs={6}>
          <ScallableImg src={Visualisation} alt="Page visualisation" />
        </Grid>
        <Grid item xs={5}>
          <HeaderMedium> Diploma project reservation </HeaderMedium>
          <HeaderSmall>
              Is place where with minimal effort you are able to make reservation the diploma project.
              After topic reservation you might be sure that no one else will reserve selected topic.
              Here you will have opportunity to find lovely project topic that matches your requirements.
          </HeaderSmall>
        </Grid>
      </Grid>
    </LightSection>
    <DarkSection>
      <Grid container spacing={3} justify="space-around">
        <Grid item sm={3} xs={12}>
          <EmojiEventsIcon />
          <HeaderMedium> Success </HeaderMedium>
          <HeaderSmall>Easiest diploma reservation process. Gain confidence without leaving home.</HeaderSmall>
        </Grid>
        <Grid item sm={3} xs={12}>
          <EmojiFlagsIcon />
          <HeaderMedium> Notifications </HeaderMedium>
          <HeaderSmall> After every promoter update you will be notified immediately.</HeaderSmall>
        </Grid>
        <Grid item sm={3} xs={12}>
          <DvrIcon />
          <HeaderMedium> Your choose</HeaderMedium>
            <HeaderSmall> Choose project from university that you want.</HeaderSmall>
        </Grid>
      </Grid>
    </DarkSection>
  </MainContent>
);
