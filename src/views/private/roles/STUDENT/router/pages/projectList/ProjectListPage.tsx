import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ChatIcon from '@material-ui/icons/Chat';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AppState } from '../../../../../../../store/appState';
import {
  ContentWrapper, BarContainer, BarElement, ContentContainer,
} from '../../../../../../components/contentWithBar';
import {
  projectStatusOptions, projectDegreeOptions, projectTypeOptions, PageConfig, RoleInProject,
} from '../../../../EMPLOYEE/router/pages';

import {
  Project, ProjectDegree, ProjectStatus, ProjectType, Tag,
} from '../../../../../../../models/project';
import { SelectOption } from '../../../../../../../models/forms';
import { _createProject, _reserveProject } from './services';
import { ViewState } from '../../../../../../../models/other';
import { UpdateAvailableProjectsTable, UpdateUserProjectsList } from '../../../../../../../store/actions';
import { StyledContainer } from '../ownedProjectList';
import { ProjectsTable } from '../ownedProjectList/components';
import { StyledIconButton } from '../../../../REGISTERED_USER/router/pages/account/styles';
import { ButtonType, Popup } from '../../../../../../components';
import { ProjectForm, ProjectFormValues } from './forms';
import { University } from '../../../../../../../models/university';
import { EmptyStateContainer } from '../../../../../components/initialDataError/styles';
import { SimplifiedUser } from '../../../../../../../models/user';
import { _fetchProjects, FetchProjectsResponse } from '../../../../EMPLOYEE/services';
import { MultipleSelect } from '../../../../../../components/forms/multiple-select';

export const ProjectListPage = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    userProjects: state.userProjects,
    tableConfig: state.projectsListView.table,
    user: state.user,
    tags: state.tags,
    universities: state.universities,
    promoters: state.promoters,
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
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    pageIndex: stateData.tableConfig.pageIndex,
    total: stateData.tableConfig.total,
    rowsPerPage: stateData.tableConfig.rowsPerPage,
  });

  const [projectFormModalOpen, setProjectFormModalOpen] = useState<boolean>(false);
  const projectSubmitBtnRef = useRef<HTMLButtonElement | null>(null);

  const fetchProjects = () => {
    setViewState(ViewState.LOADING);
    _fetchProjects({
      projectsTypes,
      projectsDegrees,
      projectsStatuses,
      roleInProjects: RoleInProject.ANY,
      searchString,
      skip: pageConfig.pageIndex * pageConfig.rowsPerPage,
      limit: pageConfig.rowsPerPage,
    })
      .then((res: FetchProjectsResponse) => {
        setProjects(res.projects);
        setPageConfig((prev: PageConfig) => ({
          ...prev,
          total: res.total,
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

  const handleFiltersSubmit = () => {
    fetchProjects();
    dispatch({
      ...new UpdateAvailableProjectsTable({
        total: pageConfig.total,
        pageIndex: pageConfig.pageIndex,
        searchString,
        projectsTypes,
        projectsDegrees,
        projectsStatuses,
        roleInProjects: RoleInProject.ANY,
        rowsPerPage: pageConfig.rowsPerPage,
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

  const handleReserveProject = (project: Project) => {
    setViewState(ViewState.LOADING);
    _reserveProject(project.id)
      .then((reservedProject: Project) => {
        dispatch({ ...new UpdateUserProjectsList([...stateData.userProjects, reservedProject]) });
        toast.success('Project has been reserved');
        setViewState(ViewState.OK);
        fetchProjects();
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
      tag: values.tag,
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

  const handlePageChange = (e: any, page: number) => {
    setPageConfig((prev: any) => ({
      pageIndex: page,
      total: prev.total,
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

  const restoreDefaultFilters = () => {
    setSearchString('');
    setProjectsTypes([]);
    setProjectsDegrees([]);
    setProjectsStatuses([]);
    setPageConfig((prev: PageConfig) => ({
      pageIndex: 0,
      total: 0,
      rowsPerPage: prev.rowsPerPage,
    }));
  };

  const filtersNotSubmitted: boolean = stateData.tableConfig.searchString !== searchString
    || stateData.tableConfig.projectsTypes !== projectsTypes
    || stateData.tableConfig.projectsStatuses !== projectsStatuses
    || stateData.tableConfig.projectsDegrees !== projectsDegrees;

  const notDefaultFilters: boolean = stateData.tableConfig.searchString !== ''
    || stateData.tableConfig.projectsTypes.length !== 0
    || stateData.tableConfig.projectsStatuses.length !== 0
    || stateData.tableConfig.projectsDegrees.length !== 0;

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
              <Grid container item xs={4} justify="center">
                <StyledIconButton onClick={() => setProjectFormModalOpen((prev) => !prev)}>
                  <AddCircleOutlineIcon />
                </StyledIconButton>
              </Grid>
            </Grid>
          </BarContainer>
          <ContentContainer>
            {projects.length > 0 ? (
              <ProjectsTable
                projects={projects}
                count={pageConfig.total}
                page={pageConfig.pageIndex}
                onChangePage={handlePageChange}
                rowsPerPage={pageConfig.rowsPerPage}
                onChangeRowsPerPage={handleRowPerPageChange}
                rowActions={[
                  {
                    id: 'reserve',
                    label: 'Reserve',
                    action: handleReserveProject,
                  },
                ]}
              />
            ) : (
              <EmptyStateContainer>
                <div>
                  <ChatIcon />
                </div>
                <p>No project found. Please change filters</p>
              </EmptyStateContainer>
            )}
            {projectFormModalOpen
            && university
            && university.departments.length
            && university.departments[0].cathedrals.length
            && stateData.promoters.length
            && (
              <Popup
                header="Create own topic"
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
                    tag: stateData.tags[0].id,
                    department: university.departments[0].id,
                    university: university.id,
                    cathedral: university.departments[0].cathedrals[0].id,
                    promoter: stateData.promoters[0].id,
                    degree: ProjectDegree.ASSOCIATE_DEGREE,
                  }}
                  tagsOptions={stateData.tags
                    .map((tag: Tag):SelectOption => ({ label: tag.labelPL, value: tag.id }))}
                  departmentsOptions={university.departments
                    .map((department): SelectOption => ({ label: department.namePL.full, value: department.id }))}
                  universitiesOptions={[{ label: university.namePL.full, value: university.id }]}
                  promoters={stateData.promoters
                    .map((promoter: SimplifiedUser): SelectOption => ({ label: `${promoter.firstName} ${promoter.lastName}`, value: promoter.id }))}
                  degreeOptions={projectDegreeOptions}
                  typeOptions={projectTypeOptions}
                  onSubmit={handleSubmitProjectForm}
                  handleClose={() => setProjectFormModalOpen((prev) => !prev)}
                  submitBtnRef={projectSubmitBtnRef}
                  departments={university.departments}
                />
              </Popup>
            )}
          </ContentContainer>
        </ContentWrapper>
      )}
    </>
  );
};
