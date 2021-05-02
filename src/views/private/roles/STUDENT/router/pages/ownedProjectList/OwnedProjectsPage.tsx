import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { SectionRow, SectionWithHeader } from 'views/private/components';
import { ProjectReview, ProjectStatus } from '../../../../../../../models/project/models';
import { ButtonType, Popup } from '../../../../../../components';
import { AppState } from '../../../../../../../store/appState';

import { Project } from '../../../../../../../models/project';
import { ContentWrapper, StyledIconButton } from '../../../../REGISTERED_USER/router/pages/account/styles';
import {
  ButtonsContainer,
  HighlightedText,
  ProjectsContainer,
  ProjectWrapper,
  StyledContainer,
  TagWrapper,
} from './styles';
import { _updateProject } from './services';
import { UpdateUserProjectsList } from '../../../../../../../store/actions';
import { mapProjectStatusToColor, mapProjectTypeToText } from '../../../../../../../utils/mappers';

const OwnedProjectsPage = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModelOpen, setEditModalOpen] = useState<boolean>(false);
  // NOTE below project might be deleted or edited
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
    projects: state.userProjects,
    user: state.user,
  }));

  const updateProject = async (projectId: string, updates: any): Promise<any> => (
    new Promise(((resolve, reject) => {
      _updateProject(projectId, updates)
        .then((updatedProject: Project) => {
          const updatedProjectsList: Project[] = stateData.projects.filter((project) => project.id !== projectId);
          if (stateData.projects.length - updatedProjectsList.length === 1) {
            dispatch({ ...new UpdateUserProjectsList(updatedProjectsList) });
            resolve();
          }
          reject(new Error('Updated more than one or less than one project'));
        })
        .catch((err) => {
          reject(new Error(err));
        });
    }))
  );

  const handleDeleteOwnership = (project: Project) => {
    setDeleteModalOpen((prev) => !prev);
    setEditedProject(project);
  };

  const handleEdit = (project: Project) => {
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
                borderColor={mapProjectStatusToColor(project.status)}
              >
                <Grid container>
                  <Grid
                    container
                    item
                    xs={11}
                    style={{
                      backgroundColor: 'white',
                      padding: '12px 16px',
                    }}
                  >
                    <Grid item xs={6}>
                      <SectionRow
                        header="Work type"
                        content={mapProjectTypeToText(project.type)}
                      />
                      <SectionRow
                        header="Topic"
                        content={project.topic}
                      />
                      <SectionRow
                        header="Content"
                        content={project.description}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SectionRow
                        header="Promoter"
                        content={`${project.promoter.firstName} ${project.promoter.lastName}`}
                      />
                      <SectionRow
                        header="University"
                        content={project.university.namePL.full}
                      />
                      <SectionRow
                        header="Department"
                        content={project.department.namePL.full}
                      />
                      <SectionRow
                        header="Cathedral"
                        content={project.cathedral.namePL}
                      />
                      <SectionRow
                        header="Creation date"
                        content={new Date(project.createdAt).toLocaleDateString()}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {project.status === ProjectStatus.FINISHED && (
                        <>
{/*                          {project.reviews.map((review: ProjectReview) => (
                            <div
                              key={review.id}
                            >
                              <p>{`${review.reviewer.firstName} ${review.reviewer.lastName}`}</p>
                              <p>{review.content}</p>
                              <p>{review.grade}</p>
                            </div>
                          ))}*/}
                        </>
                      )}
                    </Grid>
                    {project.tags.length > 0 && (
                      <Grid item xs={12}>
                        <SectionWithHeader
                          header="Tags"
                          smallPadding
                          lightBorder
                        >
                          {project.tags.map((tag) => (
                            <TagWrapper>{tag.labelPL}</TagWrapper>
                          ))}
                        </SectionWithHeader>
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
              <div />
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
