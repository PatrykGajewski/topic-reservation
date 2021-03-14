import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ContainerWithHeader, ContainerWithHeaderRow } from '../components';
import { API } from '../../API';
import { ProjectsDataFetched, ProjectsDataFetching, ProjectsDataFetchingError } from '../../store/actions';
import { AppState } from '../../store/appState';
import { ProjectStatus } from '../../models/project';
import { ContentWrapper } from "./account/styles";

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
    background: ${(props) => props.color};
  }
`;

const GuideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StatusItem = styled.div`
  width: 50%;
  height: 25px;
  margin-bottom: 12px;
`;

const StatusIcon = styled.div`
  display: inline-block;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
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

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const fetchData = (userId: string) => async (dispatch: any) => {
  try {
    dispatch({ ...new ProjectsDataFetching() });
    const { data, error } = await API.get('/projects/userProjects');
    if (error) {
      console.error(error);
      dispatch({ ...new ProjectsDataFetchingError(error.message) });
    } else {
      dispatch({ ...new ProjectsDataFetched(data.data) });
    }
  } catch (error) {
    console.error(error);
    dispatch({ ...new ProjectsDataFetchingError(error.message) });
  }
};

const OwnedProjectsPage = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
    projects: state.projects,
    user: state.user,
  }));

  useEffect(() => {
    fetchData(stateData.user.id)(dispatch);
  }, []);

  return (
    <>
      {stateData.error && (
        <div>Error message: {stateData.error}</div>
      )}
      {stateData.loading && (
        <StyledContainer>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} // 3 secs
          />
        </StyledContainer>

      )}
      {stateData.success && (
        <ContentWrapper>
          <GuideContainer>
            <p>Project icon color meaning</p>
            <StatusItem>
              <StatusIcon color="blue" />Taken project
            </StatusItem>
            <StatusItem>
              <StatusIcon color="green" />Finished project
            </StatusItem>
          </GuideContainer>
          <ProjectsContainer>
            {stateData.projects.map((project) => (
              <ProjectWrapper
                color={project.status === ProjectStatus.FINISHED ? 'green' : 'blue'}
              >
                <ContainerWithHeader
                  header={project.type}
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
                    ${project.promoter.firstName}
                    ${project.promoter.lastName}                  
                  `}
                      />
                      <ContainerWithHeaderRow
                        header="University"
                        content={project.university.namePL.full}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ContainerWithHeaderRow
                        header="Added date"
                        content={new Date(project.createdAt).toLocaleDateString()}
                      />
                      {project.status === ProjectStatus.FINISHED && (
                        <ContainerWithHeader
                          header="Rating"
                          smallPadding
                          lightBorder
                          fitContent
                        >
                          <Grid container spacing={2} justify="center">
                            <Grid item>
                              <Rating
                                value={project.rating.value}
                                disabled
                              />
                            </Grid>
                            <Grid item>
                              Voices: {project.rating.votes}
                            </Grid>
                            <Grid item>
                              Rating: {project.rating.value}
                            </Grid>
                          </Grid>
                        </ContainerWithHeader>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <ContainerWithHeader
                        header="Tags"
                        smallPadding
                        lightBorder
                      >
                        {project.tags.map((tag) => (
                          <TagWrapper>{tag.labelPL}</TagWrapper>
                        ))}
                      </ContainerWithHeader>
                    </Grid>
                  </Grid>
                </ContainerWithHeader>
              </ProjectWrapper>
            ))}
          </ProjectsContainer>
        </ContentWrapper>
      )}
    </>
  );
};

export {
  OwnedProjectsPage,
};
