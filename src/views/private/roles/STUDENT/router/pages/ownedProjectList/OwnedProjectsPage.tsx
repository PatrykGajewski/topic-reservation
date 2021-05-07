import React, { useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import { SectionRow, SectionWithHeader } from 'views/private/components';
import MessageIcon from '@material-ui/icons/Message';
import { cloneDeep } from 'lodash';
import { Tag } from 'models/tags';
import EditIcon from '@material-ui/icons/Edit';
import { ProjectStatus } from '../../../../../../../models/project/models';
import { ButtonType, Popup } from '../../../../../../components';
import { AppState } from '../../../../../../../store/appState';

import { Project } from '../../../../../../../models/project';
import { ContentWrapper, StyledIconButton } from '../../../../REGISTERED_USER/router/pages/account/styles';
import {
  ButtonsContainer, ProjectsContainer, ProjectWrapper, StyledContainer, TagWrapper,
  HighlightedText,
} from './styles';
import { _updateProject } from './services';
import { UpdateUserProjectsList } from '../../../../../../../store/actions';
import {
  mapProjectDegreeToText,
  mapProjectStatusToColor,
  mapProjectStatusToText,
  mapProjectTypeToText,
} from '../../../../../../../utils/mappers';
import { PromoterOpinionForm } from './forms';
import { PromoterOpinionFormValues } from './forms/promotersOpinion/models/form-values.model';
import { Opinion } from '../../../../EMPLOYEE/router/pages/promotersRanking/services';
import { _createOpinion, _updateOpinion } from '../../../services';
import { ViewState } from '../../../../../../../models/other';
import {ProjectForm, ProjectFormValues} from "../projectList/forms";
import {SelectOption} from "../../../../../../../models/forms";
import { projectDegreeOptions, projectTypeOptions } from "../../../../EMPLOYEE/router/pages";
import {SimplifiedUser} from "../../../../../../../models/user";

const getCurrentSubjectOpinion = (subjectId: string, opinions: Opinion[]): Opinion | null => (
  opinions.find((opinion: Opinion) => opinion.subject.id === subjectId) || null
);

const OwnedProjectsPage = () => {
  const dispatch = useDispatch();
  const [viewState, setViewState] = useState<ViewState>(ViewState.OK);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModelOpen, setEditModalOpen] = useState<boolean>(false);
  // NOTE below project might be deleted or edited
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  const [opinionSubject, setOpinionSubject] = useState<Project | null>(null);
  const [opinionModal, setOpinionModal] = useState<boolean>(false);
  const opinionButtonRef = useRef<HTMLButtonElement | null>(null);
  const editProjectBtnRef = useRef<HTMLButtonElement | null>(null);

  const stateData = useSelector((state: AppState) => ({
    projects: state.userProjects,
    user: state.user,
    degrees: state.degrees,
    university: state.universities[0],
    promoters: state.promoters,
    tags: state.tags,
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

  const createPromoterOpinion = (values: PromoterOpinionFormValues) => {
    if (opinionSubject) {
      setViewState(ViewState.LOADING);
      _createOpinion({
        targetId: opinionSubject.promoter.id,
        content: values.content,
        projectId: opinionSubject.id,
        grade: values.grade,
      })
        .then((opinion: Opinion) => {
          const updatedProjectIndex: number = stateData.projects.findIndex((project: Project) => project.id === opinionSubject.id);

          if (updatedProjectIndex !== -1) {
            const updateProjectList: Project[] = cloneDeep(stateData.projects);
            updateProjectList[updatedProjectIndex].promoter.opinions.push(opinion);
            dispatch({ ...new UpdateUserProjectsList(updateProjectList) });
          }

          setOpinionModal((prev) => !prev);
          toast.success('Opinions has been added');
          setViewState(ViewState.OK);
        })
        .catch(() => {
          toast.error('Cannot add opinion');
        });
    }
  };

  const updatePromoterOpinion = (values: PromoterOpinionFormValues) => {
    if (opinionSubject) {
      const opinionToEdit: Opinion | undefined = opinionSubject.promoter.opinions.find((opinion: Opinion) => opinion.subject.id === opinionSubject.id);
      if (opinionToEdit) {
        setViewState(ViewState.LOADING);
        _updateOpinion({
          opinionId: opinionToEdit.id,
          content: values.content,
          grade: values.grade,
        })
          .then((opinion: Opinion) => {
            const updatedProjectIndex: number = stateData.projects.findIndex((project: Project) => project.id === opinionSubject.id);

            if (updatedProjectIndex !== -1) {
              const updatedOpinionIndex: number = stateData.projects[updatedProjectIndex].promoter.opinions.findIndex((eachOpinion: Opinion) => eachOpinion.id === opinion.id);
              if (updatedOpinionIndex !== -1) {
                const updateProjectList: Project[] = cloneDeep(stateData.projects);
                updateProjectList[updatedProjectIndex].promoter.opinions[updatedOpinionIndex] = opinion;
                dispatch({ ...new UpdateUserProjectsList(updateProjectList) });
              }
            }

            setOpinionModal((prev) => !prev);
            setViewState(ViewState.OK);
            toast.success('Opinion has been updated');
          })
          .catch(() => {
            toast.error('Cannot update promoter opinion');
          });
      } else {
        console.error('Cannot find opinion that should be edited');
      }
    }
  };

  const handleProjectUpdate = (values: ProjectFormValues) => {
    // TODO finish project update
    console.log(values);
    setEditModalOpen((prev) => !prev);
  };

  const currentSubjectOpinion: Opinion | null = opinionSubject ? getCurrentSubjectOpinion(opinionSubject.id, opinionSubject.promoter.opinions) : null;

  return (
    <>
      {viewState === ViewState.LOADING && (
        <StyledContainer>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </StyledContainer>
      )}
      {viewState === ViewState.OK && (
        <ContentWrapper>
          <ProjectsContainer>
            {stateData.projects.map((project: Project) => (
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
                        header="Topic"
                        content={project.topic}
                      />
                      <SectionRow
                        header="Description"
                        content={project.description}
                      />
                      <SectionRow
                        header="Work type"
                        content={mapProjectTypeToText(project.type)}
                      />
                      <SectionRow
                        header="Degree"
                        content={mapProjectDegreeToText(project.degree)}
                      />
                      <SectionRow
                        header="Status"
                        content={mapProjectStatusToText(project.status)}
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
                      {project.tags.length > 0 && (
                        <SectionWithHeader
                          header="Tags"
                          smallPadding
                          lightBorder
                        >
                          {project.tags.map((tag: Tag) => (
                            <TagWrapper>{tag.labelPL}</TagWrapper>
                          ))}
                        </SectionWithHeader>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={1} container>
                    <ButtonsContainer>
                      {project.status === ProjectStatus.FINISHED && (
                        <StyledIconButton onClick={() => {
                          setOpinionSubject(project);
                          setOpinionModal((prev) => !prev);
                        }}
                        >
                          <MessageIcon />
                        </StyledIconButton>
                      )}
                      {project.status === ProjectStatus.DRAFT && (
                        <StyledIconButton onClick={() => handleEdit(project)}>
                          <EditIcon />
                        </StyledIconButton>
                      )}
                      {project.status === ProjectStatus.RESERVED && (
                        <StyledIconButton onClick={() => handleDeleteOwnership(project)}>
                          <DeleteIcon />
                        </StyledIconButton>
                      )}
                    </ButtonsContainer>
                  </Grid>
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
          {editModelOpen
          && editedProject
          && (
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
                  onClick: () => {
                    if (editProjectBtnRef.current) {
                      editProjectBtnRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <ProjectForm
                initialValues={{
                  topic: editedProject.topic,
                  description: editedProject.description,
                  degree: editedProject.degree,
                  type: editedProject.type,
                  tags: editedProject.tags.map((tag: Tag) => tag.id),
                  department: editedProject.department.id,
                  university: editedProject.university.id,
                  cathedral: editedProject.cathedral.id,
                  promoter: editedProject.promoter.id,
                }}
                departments={stateData.university.departments}
                onSubmit={handleProjectUpdate}
                promoters={stateData.promoters
                  .map((promoter: SimplifiedUser): SelectOption => ({ label: `${promoter.firstName} ${promoter.lastName}`, value: promoter.id }))}
                degreeOptions={projectDegreeOptions}
                typeOptions={projectTypeOptions}
                handleClose={() => setEditModalOpen((prev) => !prev)}
                submitBtnRef={editProjectBtnRef}
                tagsOptions={stateData.tags
                  .map((tag: Tag):SelectOption => ({ label: tag.labelPL, value: tag.id }))}
                departmentsOptions={stateData.university.departments
                  .map((department): SelectOption => ({ label: department.namePL.full, value: department.id }))}
                universitiesOptions={[{ label: stateData.university.namePL.full, value: stateData.university.id }]}
               />
            </Popup>
          )}
        </ContentWrapper>
      )}
      {opinionModal
      && opinionSubject
      && (
        currentSubjectOpinion
          ? (
            <Popup
              header="Edit promoter opinion"
              handleClose={() => setOpinionModal((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setOpinionModal((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Update',
                  disabled: false,
                  onClick: () => {
                    if (opinionButtonRef.current) {
                      opinionButtonRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <PromoterOpinionForm
                initialValues={{
                  content: currentSubjectOpinion.content,
                  grade: currentSubjectOpinion.grade,
                }}
                project={opinionSubject}
                onSubmit={updatePromoterOpinion}
                submitBtnRef={opinionButtonRef}
                degrees={stateData.degrees}
              />
            </Popup>
          )
          : (
            <Popup
              header="Add promoter opinion"
              handleClose={() => setOpinionModal((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setOpinionModal((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Create',
                  disabled: false,
                  onClick: () => {
                    if (opinionButtonRef.current) {
                      opinionButtonRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <PromoterOpinionForm
                initialValues={{
                  content: '',
                  grade: 5,
                }}
                project={opinionSubject}
                onSubmit={createPromoterOpinion}
                submitBtnRef={opinionButtonRef}
                degrees={stateData.degrees}
              />
            </Popup>
          )
      )}
    </>
  );
};

export {
  OwnedProjectsPage,
};
