import React from 'react';
import {Grid} from '@material-ui/core';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ForumIcon from '@material-ui/icons/Forum';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import Whatweare from '../../../../img/whatweare.png';
import Vision from '../../../../img/vision.jpg';
import Participation from '../../../../img/participation.jpg';
import News from '../../../../img/news.png';
import {
  DarkSection,
  HeaderBig,
  HeaderMedium,
  HeaderSmall,
  IconWrapper,
  LightSection,
  MainContent,
  ScalableImg,
  StyledUl
} from "./styles";

export const MainPage = () => (
  <MainContent>
    <DarkSection>
      <HeaderMedium>About us</HeaderMedium>
      <HeaderBig>What we are</HeaderBig>
    </DarkSection>
    <LightSection>
      <Grid container spacing={1} justify="space-evenly" alignItems="center">
        <Grid item xs={5}>
          <ScalableImg src={Whatweare} alt="What we are" />
        </Grid>
        <Grid item xs={6}>
          <HeaderBig> Startup project </HeaderBig>
          <HeaderSmall>
              Diploma project reservation is place where with minimal effort you are able to make reservation
              of the diploma project. Before reservation you easily might read opinions about promoter
              that added diploma project. Here you find all promoters that still have empty student slots.
              Possible is also suggest promoter own diploma topic using directly proposition to promoter.
          </HeaderSmall>
        </Grid>
      </Grid>
    </LightSection>
    <DarkSection>
      <Grid container spacing={3} justify="space-around">
        <Grid item sm={3} xs={12}>
          <IconWrapper>
            <AccessAlarmIcon />
          </IconWrapper>
          <HeaderMedium> Save time </HeaderMedium>
          <HeaderSmall>Fastest diploma reservation process</HeaderSmall>
        </Grid>
        <Grid item sm={3} xs={12}>
          <IconWrapper>
            <ForumIcon />
          </IconWrapper>
          <HeaderMedium>Keep in contact</HeaderMedium>
          <HeaderSmall>Easiest way to stay in contact with you project promoter</HeaderSmall>
        </Grid>
        <Grid item sm={3} xs={12}>
          <IconWrapper>
            <StarHalfIcon />
          </IconWrapper>
          <HeaderMedium> Promoters ranking </HeaderMedium>
          <HeaderSmall>Choose the best promoter to your diploma project</HeaderSmall>
        </Grid>
      </Grid>
    </DarkSection>
    <LightSection id="vision">
      <HeaderMedium>Our Vision</HeaderMedium>
      <HeaderBig>Our point of view</HeaderBig>
    </LightSection>
    <DarkSection>
      <Grid container spacing={1} justify="space-evenly" alignItems="center">
        <Grid item xs={6}>
          <HeaderBig> Plan </HeaderBig>
          <HeaderSmall>
                 It will be great to make one platform where every student might reserve diploma project in a while.
                 Each student that left opinion about the diploma project promoter help others from audience. It will
                 be also some kind of additional prize for the best promoters under the sun. To achive that effect
                 a lot of work is still before our team.
          </HeaderSmall>
        </Grid>
        <Grid item xs={5}>
          <ScalableImg src={Vision} alt="Our vision" />
        </Grid>
      </Grid>
    </DarkSection>
    <LightSection id="participation">
      <HeaderMedium>Participation</HeaderMedium>
      <HeaderBig>Become part of us</HeaderBig>
    </LightSection>
    <DarkSection>
      <Grid container spacing={1} justify="space-evenly" alignItems="center">
        <Grid item xs={5}>
          <ScalableImg src={Participation} alt="Participation" />
        </Grid>
        <Grid item xs={6}>
          <HeaderBig> Community </HeaderBig>
          <HeaderSmall>
            If your's University in not available yet you can easily register your University.
            Then we will contact with your University and if the University will accept our rules you might reserve
            diploma project on our platform. To register university you might me student or promoter.
            Add to involved University list may take up to 2 months.
          </HeaderSmall>
        </Grid>
      </Grid>
    </DarkSection>
    <LightSection id="news">
      <HeaderMedium> latest </HeaderMedium>
      <HeaderBig>News</HeaderBig>
    </LightSection>
    <DarkSection>
      <Grid container spacing={1} justify="space-evenly" alignItems="center">
        <Grid item xs={6}>
          <HeaderBig> Newest information </HeaderBig>
          <StyledUl>
            <li>
              <HeaderSmall>
              Project presentation in Cracow
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                  Politechnika Krakowska joined to the project
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Uniwersytet Pedagogiczny joined to the project
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Project presentation in Germany
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Politechnika Warszawska joined to the project
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Politechnika Gdańska joined to the project
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Project presentation in Czech Republic
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Akademia Górniczo Hutnicza joined to the project
              </HeaderSmall>
            </li>
            <li>
              <HeaderSmall>
                Uniwersytet Rzeszowski joined to the project
              </HeaderSmall>
            </li>
          </StyledUl>
        </Grid>
        <Grid item xs={5}>
          <ScalableImg src={News} alt="News" />
        </Grid>
      </Grid>
    </DarkSection>
  </MainContent>
);
