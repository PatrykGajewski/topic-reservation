import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { ContainerWithHeader, ContainerWithHeaderRow } from '../components';

const ProjectsContainer = styled.div`
  position: relative;
  
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 55px;
    height: 100%;
    width: 10px;
    background: grey;
  }

`;

const ProjectWrapper = styled.div`
  position: relative;
  margin-left: 100px;
  
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: -65px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: black;
  }
  
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: -55px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: white;
  }
`;

const TagWrapper = styled.div`
  display: inline-block;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  background: yellow;
  width: fit-content
  box-sizing: border-box;
  padding: 2px 5px;
  margin: 5px;
`;

interface Tag {
  id: string,
  desc: string,
}

interface OwnedProject {
  topic: string,
  promoter: {
    id: string,
    firstName: string,
    lastName: string,
    highestTitle: {
      id: string,
      fullTitle: string,
      shortcut: string,
    }
  },
  university: {
    id: string,
    full: string,
    shortcut: string,
  },
  tags: Tag[],
  startDate: string,
  endDate: string,
  projectRating: {
    id: string,
    total: number,
    value: number,
  }
  projectType: {
    degree: string,
  }
}

interface OwnedProjectsProps {
  projects: OwnedProject[],
}
const OwnedProjectsPage = (props: OwnedProjectsProps) => (
  <ProjectsContainer>
    {props.projects.map((project) => (
      <ProjectWrapper>
        <ContainerWithHeader
          header={project.projectType.degree}
        >
          <Grid container>
            <Grid item xs={6}>
              <ContainerWithHeaderRow
                header="Topic"
                content={project.topic}
              />
              <ContainerWithHeaderRow
                header="Promoter"
                content={`
                    ${project.promoter.highestTitle.shortcut}
                    ${project.promoter.firstName}
                    ${project.promoter.lastName}                  
                  `}
              />
              <ContainerWithHeaderRow
                header="University"
                content={project.university.full}
              />
            </Grid>
            <Grid item xs={6}>
              <ContainerWithHeaderRow
                header="TakenDate"
                content={project.startDate}
              />
              <ContainerWithHeaderRow
                header="TakenDate"
                content={project.endDate}
              />
              <ContainerWithHeader
                header="Rating"
                smallPadding
                lightBorder
                fitContent
              >
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Rating
                      value={project.projectRating.value}
                      disabled
                    />
                  </Grid>
                  <Grid item>
                    Voices: {project.projectRating.total}
                  </Grid>
                  <Grid item>
                    Rating: {project.projectRating.value}
                  </Grid>
                </Grid>
              </ContainerWithHeader>
            </Grid>
            <Grid item xs={12}>
              <ContainerWithHeader
                header="Tags"
                smallPadding
                lightBorder
              >
                {project.tags.map((tag) => (
                  <TagWrapper>{tag.desc}</TagWrapper>
                ))}
              </ContainerWithHeader>
            </Grid>
          </Grid>
        </ContainerWithHeader>
      </ProjectWrapper>
    ))}
  </ProjectsContainer>
);

export {
  OwnedProjectsPage,
};
