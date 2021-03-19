import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  ButtonType, ContainerWithHeader, ContainerWithHeaderRow, Popup,
} from '../../components';
import { AppState } from '../../../store/appState';
import { ProjectModel, ProjectStatus } from '../../../models/project';
import { ContentWrapper, StyledIconButton } from '../account/styles';
import {
  ButtonsContainer,
  HighlightedText,
  ProjectsContainer,
  ProjectWrapper,
  StyledContainer,
  TagWrapper,
} from './styles';
import { _fetchProjects, _updateProject } from './services';
import {
  ProjectsDataFetched,
  ProjectsDataFetching,
  ProjectsDataFetchingError,
  UpdateProjectsList,
} from '../../../store/actions';

const mapProjectStatusToColor = (status: ProjectStatus): string => {
  switch (status) {
  case ProjectStatus.FINISHED:
    return '#08bc0852';
  case ProjectStatus.RESERVED:
    return '#ffc70054';
  default:
    return '#0783d973';
  }
};

const OwnedProjectsPage = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModelOpen, setEditModalOpen] = useState<boolean>(false);
  // NOTE below project might be deleted or edited
  const [editedProject, setEditedProject] = useState<ProjectModel | null>(null);
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
    projects: state.projects,
    user: state.user,
  }));

  const fetchProjects = () => {
    dispatch({ ...new ProjectsDataFetching() });
    _fetchProjects()
      .then((projects: ProjectModel[]) => {
        dispatch({ ...new ProjectsDataFetched(projects) });
      })
      .catch((err) => {
        dispatch({ ...new ProjectsDataFetchingError(err.message) });
      });
  };

  const updateProject = async (projectId: string, updates: any): Promise<any> => (
    new Promise(((resolve, reject) => {
      _updateProject(projectId, updates)
        .then((updatedProject: ProjectModel) => {
          const updatedProjectsList: ProjectModel[] = cloneDeep(stateData.projects);
          const updatedProjectIndex: number = updatedProjectsList.map((project: ProjectModel) => project.id).indexOf(projectId);
          if (updatedProjectIndex !== -1) {
            updatedProjectsList[updatedProjectIndex] = updatedProject;
            dispatch({ ...new UpdateProjectsList(updatedProjectsList) });
            resolve();
          }
          reject(new Error('Cannot find updated element'));
        })
        .catch((err) => {
          reject(new Error(err));
        });
    }))
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteOwnership = (project: ProjectModel) => {
    setDeleteModalOpen((prev) => !prev);
    setEditedProject(project);
  };

  const handleEdit = (project: ProjectModel) => {
    setEditModalOpen((prev) => !prev);
    setEditedProject(project);
  };

  const deleteOwnership = () => {
    if (editedProject !== null) {
      updateProject(editedProject.id, {
        owners: editedProject.owners.filter((owner) => owner.id !== stateData.user.id),
      }).then(() => {
        toast.success('Project ownerships deleted');
      }).catch((e) => {
        toast.error('Cannot delete ownership');
      }).finally(() => {
        setDeleteModalOpen((prev) => !prev);
      });
    } else {
      console.log('Cannot find edited project');
      setDeleteModalOpen((prev) => !prev);
    }
  };

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
          <ProjectsContainer>
            {stateData.projects.map((project) => (
              <ProjectWrapper
                bgColor={mapProjectStatusToColor(project.status)}
              >
                <ContainerWithHeader
                  noMargin
                  header={project.type}
                >
                  <Grid container>
                    <Grid container item xs={11}>
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
                      {project.tags.length > 0 && (
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
                      )}
                    </Grid>
                    {project.status !== ProjectStatus.FINISHED && (
                      <Grid item xs={1}>
                        <ButtonsContainer>
                          <StyledIconButton onClick={() => handleDeleteOwnership(project)}>
                            <DeleteIcon />
                          </StyledIconButton>
                          <StyledIconButton onClick={() => handleEdit(project)}>
                            <EditIcon />
                          </StyledIconButton>
                        </ButtonsContainer>
                      </Grid>
                    )}
                  </Grid>
                </ContainerWithHeader>
              </ProjectWrapper>
            ))}
          </ProjectsContainer>
          {deleteModalOpen && editedProject && (
            <Popup
              header="Confirm deleting ownership"
              handleClose={() => setDeleteModalOpen((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setDeleteModalOpen((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Confirm',
                  disabled: false,
                  onClick: deleteOwnership,
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <div>Are you sure you want delete ownership from project that topic is:
                <HighlightedText>{`${editedProject.topic}`}</HighlightedText>?
              </div>
            </Popup>
          )}
          {editModelOpen && editedProject && (
            <Popup
              header="Edit project"
              handleClose={() => setEditModalOpen((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setEditModalOpen((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Save',
                  disabled: false,
                  onClick: () => setEditModalOpen((prev) => !prev),
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <div>
                form here
              </div>
            </Popup>
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export {
  OwnedProjectsPage,
};
