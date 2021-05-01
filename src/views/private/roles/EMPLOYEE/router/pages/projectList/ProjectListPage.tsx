import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { cloneDeep } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ChatIcon from '@material-ui/icons/Chat';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ViewState } from 'models/other';
import {
  BarContainer, BarElement, ContentContainer, ContentWrapper,
} from 'views/components/contentWithBar';

import { AppState } from '../../../../../../../store/appState';

import {
  Project, ProjectDegree, ProjectStatus, ProjectType, Tag,
} from '../../../../../../../models/project';
import { SelectOption } from '../../../../../../../models/forms';
import { StyledErrorItem, StyledErrorList } from './styles';
import { _createProject } from './services';
import { UpdateAvailableProjectsTable, UpdateUserProjectsList } from '../../../../../../../store/actions';
import { SimpleSelect } from '../../../../../../components/forms';
import { StyledIconButton } from '../../../../REGISTERED_USER/router/pages/account/styles';
import { ButtonType, Popup } from '../../../../../../components';
import { ProjectForm, ProjectFormValues } from './forms';
import { University } from '../../../../../../../models/university';
import { mapProjectStatusToOptions, mapProjectTypeToOptions } from '../../../../../../../utils/mappers';
import { mapProjectDegreeToOptions } from '../../../../../../../utils/mappers/map-project-degree-to-options';
import { EmptyStateContainer } from '../../../../../components/initialDataError/styles';
import { ProjectsTable } from '../../../../STUDENT/router/pages/ownedProjectList/components';
import { StyledContainer } from '../../../../STUDENT/router/pages/ownedProjectList';
import { APISecured, MultiResponse } from '../../../../../../../API';
import {
  _deleteProject, _fetchProjects, _updateProject, FetchProjectsResponse,
} from '../../../services';
import { MultipleSelect } from '../../../../../../components/forms/multiple-select';
import {SimplifiedUser} from "../../../../../../../models/user";

const projectTypeOptions: SelectOption[] = mapProjectTypeToOptions();
const projectDegreeOptions: SelectOption[] = mapProjectDegreeToOptions();
const projectStatusOptions: SelectOption[] = mapProjectStatusToOptions();
const groupProjectOptions: SelectOption[] = [
  {
    label: 'Tak',
    value: 'true',
  },
  {
    label: 'Nie',
    value: 'false',
  },
];

export enum RoleInProject {
  PROMOTER = 'PROMOTER',
  REVIEWER = 'REVIEWER',
  OWNER = 'OWNER',
  ANY = 'ANY'
}

const roleInProjectOptions: SelectOption[] = [
  { label: 'Promotor', value: RoleInProject.PROMOTER },
  { label: 'Recenzent', value: RoleInProject.REVIEWER },
  { label: 'Wszystkie', value: RoleInProject.ANY },
];

export interface PageConfig {
  pageIndex: number;
  total: number;
  rowsPerPage: number;
}

const ProjectListPage = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    userProjects: state.userProjects,
    tableConfig: state.projectsListView.table,
    user: state.user,
    tags: state.tags,
    universities: state.universities,
    promoters: state.promoters,
    students: state.students,
  }));

  const [university, setUniversity] = useState<University | null>(null);
  useEffect(() => {
    setUniversity(stateData.universities[0]);
  }, [stateData.universities]);

  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchString, setSearchString] = useState<string>(stateData.tableConfig.searchString);
  const [projectsTypes, setProjectsTypes] = useState<ProjectType[]>(stateData.tableConfig.projectsTypes);
  const [projectsDegrees, setProjectsDegrees] = useState<ProjectDegree[]>(stateData.tableConfig.projectsDegrees);
  const [projectsStatuses, setProjectsStatuses] = useState<ProjectStatus[]>(stateData.tableConfig.projectsStatuses);
  const [roleInProjects, setRoleInProjects] = useState<RoleInProject>(stateData.tableConfig.roleInProjects);
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    pageIndex: stateData.tableConfig.pageIndex,
    total: stateData.tableConfig.total,
    rowsPerPage: stateData.tableConfig.rowsPerPage,
  });

  const [projectFormModalOpen, setProjectFormModalOpen] = useState<boolean>(false);
  const projectSubmitBtnRef = useRef<HTMLButtonElement | null>(null);
  const projectEditSubmitBtnRef = useRef<HTMLButtonElement | null>(null);

  const [templateUploadModal, setTemplateUploadModal] = useState<boolean>(false);
  const [templateToUpload, setTemplateToUpload] = useState<File | null>(null);
  const [templateErrors, setTemplateErrors] = useState<string[]>([]);
  const [invalidTemplate, setInvalidTemplate] = useState<boolean>(false);

  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [projectEditModalOpen, setProjectEditModalOpen] = useState<boolean>(false);

  const fetchProjects = () => {
    setViewState(ViewState.LOADING);
    setViewState(ViewState.ERROR);
    _fetchProjects({
      projectsTypes,
      projectsDegrees,
      projectsStatuses,
      roleInProjects,
      searchString,
      skip: pageConfig.pageIndex * pageConfig.rowsPerPage,
      limit: pageConfig.rowsPerPage,
    })
      .then((res: FetchProjectsResponse) => {
        setProjects(res.projects);
        setPageConfig((prev: PageConfig) => ({
          total: res.total,
          pageIndex: prev.pageIndex,
          rowsPerPage: prev.rowsPerPage,
        }));
        setViewState(ViewState.OK);
      })
      .catch(() => {
        setViewState(ViewState.ERROR);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [pageConfig.pageIndex]);

  const handleFiltersSubmit = () => {
    fetchProjects();
    dispatch({
      ...new UpdateAvailableProjectsTable({
        total: pageConfig.total,
        pageIndex: pageConfig.pageIndex,
        rowsPerPage: pageConfig.rowsPerPage,
        searchString,
        projectsTypes,
        projectsStatuses,
        projectsDegrees,
        roleInProjects,
      }),
    });
  };

  const handleRemoveFilters = () => {
    setSearchString(stateData.tableConfig.searchString);
    setProjectsTypes(stateData.tableConfig.projectsTypes);
    setPageConfig((prev: PageConfig) => ({
      pageIndex: stateData.tableConfig.pageIndex,
      total: 0,
      rowsPerPage: prev.rowsPerPage,
    }));
  };

  const handleDeleteProject = (project: Project) => {
    setViewState(ViewState.LOADING);
    _deleteProject(project.id)
      .then((deletedProject: Project) => {
        setProjects((prev) => prev.filter((prevProject) => prevProject.id !== project.id));
        setPageConfig((prev) => ({
          ...prev,
          total: prev.total - 1,
        }));
        toast.success('Project has been deleted');
        setViewState(ViewState.OK);
      })
      .catch(() => {
        toast.error('Project reservation error');
        setViewState(ViewState.ERROR);
      });
  };

  const handleSubmitProjectForm = (values: ProjectFormValues): void => {
    _createProject({
      topic: values.topic,
      description: values.description,
      tags: values.tags,
      type: values.type,
      degree: values.degree,
      userId: stateData.user.id,
      promoterId: values.promoter,
      universityId: values.university,
      departmentId: values.department,
      cathedralId: values.cathedral,
    })
      .then((res: Project) => {
        console.log(res);
        toast.success('Project has been created');
        setProjectFormModalOpen((prev) => !prev);
      })
      .catch(() => {
        toast.error('Cannot create project');
      });
  };

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileExtension: string | null = (e.target.files && e.target.files.length && e.target.files[0].type.split('/')[1]) || null;

    if (e.target.files) {
      if (fileExtension && ['vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(fileExtension)) {
        setTemplateToUpload(e.target.files[0]);
        if (invalidTemplate) {
          setInvalidTemplate(false);
        }
      } else {
        toast.error('You can upload only xlsx file');
      }
    }
  };

  const handleTemplateUpload = () => {
    if (templateToUpload) {
      const form = new FormData();
      form.append('template', templateToUpload);
      form.append('name', templateToUpload.name);
      form.append('size', templateToUpload.size.toString());
      form.append('type', templateToUpload.type);

      APISecured.post('/projects/uploadTemplate', form)
        .then((res: MultiResponse<Project>) => {
          dispatch({ ...new UpdateUserProjectsList([...stateData.userProjects, ...res.data.entries]) });
          setTemplateUploadModal((prev) => !prev);
          toast.success(`${res.data.entries.length} thesis have been added`);
          setTemplateErrors([]);
        })
        .catch((e) => {
          setTemplateErrors((e.response && e.response.data && e.response.data.message) || ['Duplications found']);
          setInvalidTemplate(true);
          toast.error('You have to correct given template');
        });
    }
  };

  const handleTemplateModalClose = () => {
    setTemplateUploadModal((prev) => !prev);
    setTemplateErrors([]);
    setTemplateToUpload(null);
  };

  const restoreDefaultFilters = () => {
    setSearchString('');
    setRoleInProjects(RoleInProject.ANY);
    setProjectsTypes([]);
    setProjectsDegrees([]);
    setProjectsStatuses([]);
    setPageConfig((prev: PageConfig) => ({
      pageIndex: 0,
      total: 0,
      rowsPerPage: prev.rowsPerPage,
    }));
  };

  const handleRowPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageConfig((prev) => ({
      pageIndex: 0,
      total: prev.total,
      // @ts-ignore
      rowsPerPage: e.target.value as number,
    }));
  };

  const handlePageChange = (e: any, page: number) => {
    setPageConfig((prev: any) => ({
      pageIndex: page,
      total: prev.total,
      rowsPerPage: prev.rowsPerPage,
    }));
  };

  const handleEditProject = (project: Project) => {
    setEditedProject(cloneDeep(project));
    setProjectEditModalOpen((prev) => !prev);
  };

  const handleSubmitEditForm = (values: ProjectFormValues): void => {
    if (editedProject) {
      console.log(values);
      _updateProject(editedProject.id, values)
        .then((updatedProject: Project) => {
          setProjectEditModalOpen((prev) => !prev);
          setProjects((prev) => {
            const updatedProjects: Project[] = cloneDeep(prev);
            const updatedProjectIndex: number = updatedProjects.findIndex((project: Project) => project.id === updatedProject.id);
            if (updatedProjectIndex !== -1) {
              updatedProjects[updatedProjectIndex] = updatedProject;
            }
            return updatedProjects;
          });
          toast.success('Project successfully updated');
        })
        .catch((err) => {
          toast.error('Cannot update project');
        });
    }
  };

  const filtersNotSubmitted: boolean = stateData.tableConfig.searchString !== searchString
    || stateData.tableConfig.projectsTypes !== projectsTypes
    || stateData.tableConfig.projectsStatuses !== projectsStatuses
    || stateData.tableConfig.projectsDegrees !== projectsDegrees
    || stateData.tableConfig.roleInProjects !== roleInProjects;

  const notDefaultFilters: boolean = stateData.tableConfig.searchString !== ''
    || stateData.tableConfig.projectsTypes.length !== 0
    || stateData.tableConfig.projectsStatuses.length !== 0
    || stateData.tableConfig.projectsDegrees.length !== 0
    || stateData.tableConfig.roleInProjects !== RoleInProject.ANY;

  return (
    <>
      {viewState === ViewState.LOADING && (
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
      {viewState === ViewState.OK && (
        <ContentWrapper>
          <BarContainer>
            <Grid container alignContent="flex-start">
              <BarElement item xs={12}>
                <MultipleSelect
                  id="projectsTypes"
                  labelId="projectTypesLabel"
                  label="Select projects types"
                  selectedOptions={projectsTypes}
                  handleChange={(value: string[]) => { setProjectsTypes(value as ProjectType[]); }}
                  options={projectTypeOptions}
                />
              </BarElement>
              <BarElement item xs={12}>
                <MultipleSelect
                  id="projectsDegrees"
                  labelId="projectsDegreesLabel"
                  label="Select projects degrees"
                  selectedOptions={projectsDegrees}
                  handleChange={(value: string[]) => { setProjectsDegrees(value as ProjectDegree[]); }}
                  options={projectDegreeOptions}
                />
              </BarElement>
              <BarElement item xs={12}>
                <MultipleSelect
                  id="projectsStatuses"
                  labelId="projectsStatusesLabel"
                  label="Select projects statuses"
                  options={projectStatusOptions}
                  selectedOptions={projectsStatuses}
                  handleChange={(values: string[]) => setProjectsStatuses(values as ProjectStatus[])}
                />
              </BarElement>
              <BarElement item xs={12}>
                <SimpleSelect
                  id="roleInProjects"
                  labelId="roleInProjectsLabel"
                  label="Select role in projects"
                  selectedOption={roleInProjectOptions.find((option: SelectOption) => option.value === roleInProjects) as SelectOption}
                  handleChange={(value: string) => {
                    setRoleInProjects(value as RoleInProject);
                  }}
                  options={roleInProjectOptions}
                />
              </BarElement>
              <BarElement item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="search"
                  label="Search by thesis topic"
                  value={searchString}
                  onChange={(e) => setSearchString(e.currentTarget.value)}
                />
              </BarElement>
              <BarElement item xs={12}>
                <Button
                  onClick={handleFiltersSubmit}
                  variant="outlined"
                  color="primary"
                >Apply filters
                </Button>
              </BarElement>
              <BarElement item xs={12}>
                {filtersNotSubmitted && (
                  <Button
                    onClick={handleRemoveFilters}
                    variant="outlined"
                  >Remove filters
                  </Button>
                )}
              </BarElement>
              <BarElement item xs={12}>
                {notDefaultFilters && (
                  <Button
                    onClick={restoreDefaultFilters}
                    variant="outlined"
                  >Restore default
                  </Button>
                )}
              </BarElement>
            </Grid>
            <Grid item container xs={12} alignItems="flex-end">
              <Grid item xs={4} justify="center">
                <StyledIconButton onClick={() => setProjectFormModalOpen((prev) => !prev)}>
                  <AddCircleOutlineIcon />
                </StyledIconButton>
              </Grid>
              <Grid item xs={4} justify="center">
                <StyledIconButton onClick={() => setTemplateUploadModal((prev) => !prev)}>
                  <CloudUploadIcon />
                </StyledIconButton>
              </Grid>
              <Grid item xs={4} justify="center">
                <a
                  href={`${process.env.PUBLIC_URL}/templates/en_template.xlsx`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <StyledIconButton>
                    <CloudDownloadIcon />
                  </StyledIconButton>
                </a>
              </Grid>
            </Grid>
          </BarContainer>
          <ContentContainer>
            {projects.length > 0 ? (
              <ProjectsTable
                projects={projects}
                rowActions={[
                  {
                    id: 'delete',
                    label: 'Delete',
                    action: handleDeleteProject,
                  },
                  {
                    id: 'edit',
                    label: 'Edit',
                    action: handleEditProject,
                  },
                ]}
                count={pageConfig.total}
                page={pageConfig.pageIndex}
                onChangePage={handlePageChange}
                rowsPerPage={pageConfig.rowsPerPage}
                onChangeRowsPerPage={handleRowPerPageChange}
              />
            ) : (
              <EmptyStateContainer>
                <div>
                  <ChatIcon />
                </div>
                <p>No project found. Please change filters</p>
              </EmptyStateContainer>
            )}
          </ContentContainer>
          {projectFormModalOpen
          && university
          && university.departments.length
          && university.departments[0].cathedrals.length
          && stateData.promoters.length
          && (
            <Popup
              header="Create new thesis"
              handleClose={() => setProjectFormModalOpen((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setProjectFormModalOpen((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Create',
                  disabled: false,
                  onClick: () => {
                    if (projectSubmitBtnRef.current !== null) {
                      projectSubmitBtnRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <ProjectForm
                initialValues={{
                  topic: '',
                  description: '',
                  type: ProjectType.RESEARCH_WORK,
                  tags: [],
                  department: university.departments[0].id,
                  university: university.id,
                  cathedral: university.departments[0].cathedrals[0].id,
                  promoter: stateData.user.id,
                  degree: ProjectDegree.ASSOCIATE_DEGREE,
                  reviewers: [],
                  status: ProjectStatus.AVAILABLE,
                  groupProject: 'false',
                  owners: [],
                }}
                tagsOptions={stateData.tags
                  .map((tag: Tag):SelectOption => ({ label: tag.labelPL, value: tag.id }))}
                departmentsOptions={university.departments
                  .map((department): SelectOption => ({ label: department.namePL.full, value: department.id }))}
                universitiesOptions={[{ label: university.namePL.full, value: university.id }]}
                employeesOptions={stateData.promoters
                  .map((promoter: SimplifiedUser): SelectOption => ({ label: `${promoter.firstName} ${promoter.lastName}`, value: promoter.id }))}
                degreeOptions={projectDegreeOptions}
                typeOptions={projectTypeOptions}
                onSubmit={handleSubmitProjectForm}
                handleClose={() => setProjectFormModalOpen((prev) => !prev)}
                submitBtnRef={projectSubmitBtnRef}
                departments={university.departments}
                statusOptions={projectStatusOptions}
                groupProjectOptions={groupProjectOptions}
                ownerOptions={stateData.students
                  .map((student: SimplifiedUser): SelectOption => ({ label: `${student.firstName} ${student.lastName}`, value: student.id }))}
              />
            </Popup>
          )}
          {templateUploadModal && (
            <Popup
              header="Upload excel with topics"
              handleClose={handleTemplateModalClose}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: handleTemplateModalClose,
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Upload',
                  disabled: invalidTemplate,
                  onClick: handleTemplateUpload,
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <p>When you uploads template filled up with thesis remember that</p>
              <ul>
                <li>you will be assign as thesis promoter</li>
                <li>reviewers list will be empty</li>
              </ul>
              <input
                name="templateInput"
                type="file"
                onChange={onFileUploadChange}
                accept=".xlsx"
              />
              {templateErrors.length > 0 && (
                <div>
                  <p> Last uploaded template errors: </p>
                  <StyledErrorList>
                    {templateErrors.map((error: string, index: number) => (
                      <StyledErrorItem
                        key={index}
                      >{error}
                      </StyledErrorItem>
                    ))}
                  </StyledErrorList>
                </div>
              )}
            </Popup>
          )}
          {projectEditModalOpen
          && editedProject
          && university
          && university.departments.length
          && university.departments[0].cathedrals.length
          && stateData.promoters.length
          && (
            <Popup
              header="Edit thesis"
              handleClose={() => setProjectEditModalOpen((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setProjectEditModalOpen((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Update',
                  disabled: false,
                  onClick: () => {
                    if (projectEditSubmitBtnRef.current !== null) {
                      projectEditSubmitBtnRef.current.click();
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
                  type: editedProject.type,
                  tags: editedProject.tags.map((tag: Tag) => tag.id),
                  department: editedProject.department.id,
                  university: editedProject.university.id,
                  cathedral: editedProject.cathedral.id,
                  promoter: editedProject.promoter.id,
                  degree: editedProject.degree,
                  status: editedProject.status,
                  reviewers: editedProject.reviewers.map((reviewer: SimplifiedUser) => reviewer.id),
                  owners: editedProject.owners.map((owner) => owner.id),
                  groupProject: `${editedProject.groupProject}`,
                }}
                tagsOptions={stateData.tags
                  .map((tag: Tag):SelectOption => ({ label: tag.labelPL, value: tag.id }))}
                departmentsOptions={university.departments
                  .map((department): SelectOption => ({ label: department.namePL.full, value: department.id }))}
                universitiesOptions={[{ label: university.namePL.full, value: university.id }]}
                employeesOptions={stateData.promoters
                  .map((promoter: SimplifiedUser): SelectOption => ({ label: `${promoter.firstName} ${promoter.lastName}`, value: promoter.id }))}
                degreeOptions={projectDegreeOptions}
                typeOptions={projectTypeOptions}
                onSubmit={handleSubmitEditForm}
                handleClose={() => setProjectFormModalOpen((prev) => !prev)}
                submitBtnRef={projectEditSubmitBtnRef}
                departments={university.departments}
                statusOptions={projectStatusOptions}
                groupProjectOptions={groupProjectOptions}
                ownerOptions={stateData.students
                  .map((student: SimplifiedUser): SelectOption => ({ label: `${student.firstName} ${student.lastName}`, value: student.id }))}
              />
            </Popup>
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export {
  ProjectListPage,
};
