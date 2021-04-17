import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, TextField} from '@material-ui/core';

import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Loader from 'react-loader-spinner';
import ChatIcon from '@material-ui/icons/Chat';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {AppState} from '../../../../../../../store/appState';

import {Project, ProjectDegree, ProjectStatus, ProjectType, Tag,} from '../../../../../../../models/project';
import {SelectOption} from '../../../../../../../models/forms';
import {ContentContainer} from './styles';
import {_createProject, _fetchAvailableProjects, _reserveProject,} from './services';
import {ViewState} from "../../../../../../../models/other";
import {UpdateAvailableProjectsTable, UpdateUserProjectsList} from '../../../../../../../store/actions';
import {StyledContainer} from '../ownedProjectList';
import {AvailableProjectsTable} from '../ownedProjectList/components';
import {SimpleSelect} from '../../../../../../components/forms';
import {StyledIconButton} from '../../../../REGISTERED_USER/router/pages/account/styles';
import {ButtonType, Popup} from '../../../../../../components';
import {ProjectForm, ProjectFormValues} from './forms';
import {University} from '../../../../../../../models/university';
import {SimplifiedUser} from '../../../services';
import {mapProjectTypeToOptions} from '../../../../../../../utils/mappers';
import {mapProjectDegreeToOptions} from '../../../../../../../utils/mappers/map-project-degree-to-options';
import {EmptyStateContainer} from "../../../../../components/initialDataError/styles";
import {RoleInProject } from "../../../../EMPLOYEE/router/pages";

const projectTypeOptions: SelectOption[] = mapProjectTypeToOptions();
const projectDegreeOptions: SelectOption[] = mapProjectDegreeToOptions();

const PROJECTS_PER_PAGE: number = 12;

const ProjectListPage = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    userProjects: state.userProjects,
    tableConfig: state.availableProjects.table,
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
  const [pageConfig, setPageConfig] = useState<{ pageIndex: number, lastPageIndex: number}>({
    pageIndex: stateData.tableConfig.pageIndex,
    lastPageIndex: stateData.tableConfig.total,
  });

  const [projectFormModalOpen, setProjectFormModalOpen] = useState<boolean>(false);
  const projectSubmitBtnRef = useRef<HTMLButtonElement | null>(null);

  const fetchAvailableProjects = () => {
/*    setViewState(ViewState.LOADING);
    _fetchAvailableProjects({
      projectsTypes,
      searchString,
      skip: pageConfig.pageIndex * PROJECTS_PER_PAGE,
      limit: PROJECTS_PER_PAGE,
    })
      .then((fetchedProjects: Project[]) => {
        setProjects(fetchedProjects);
        setViewState(ViewState.OK);
      })
      .catch(() => {
        setViewState(ViewState.ERROR);
      });*/
  };

  useEffect(() => {
    fetchAvailableProjects();
  }, []);

  const handleFiltersSubmit = () => {
    fetchAvailableProjects();
    dispatch({
      ...new UpdateAvailableProjectsTable({
        total: 20,
        pageIndex: pageConfig.pageIndex,
        searchString,
        projectsTypes,
        projectsDegrees,
        projectsStatuses,
        roleInProjects: RoleInProject.OWNER,
        rowsPerPage: 10,
      }),
    });
  };

  const handleRemoveFilters = () => {
    setSearchString(stateData.tableConfig.searchString);
    setProjectsTypes(stateData.tableConfig.projectsTypes);
    setPageConfig({
      pageIndex: stateData.tableConfig.pageIndex,
      lastPageIndex: 20,
    });
  };

  const handleReserveProject = (projectId: string) => {
    setViewState(ViewState.LOADING);
    _reserveProject(projectId)
      .then((reservedProject: Project) => {
        dispatch({ ...new UpdateUserProjectsList([...stateData.userProjects, reservedProject]) });
        setProjects((prev) => prev.filter((project: Project) => project.id !== projectId));
        toast.success('Project has been reserved');
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

  const filtersNotSubmitted = stateData.tableConfig.searchString !== searchString
  || stateData.tableConfig.projectsTypes !== projectsTypes;

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
        <ContentContainer>
          <Grid container>
            <Grid item xs={12}>
              <p>Filters section</p>
            </Grid>
            <Grid container item xs={12} spacing={3}>
{/*              <Grid item xs={4}>
                <SimpleSelect
                  id="projectsType"
                  labelId="projectTypeLabel"
                  label="Select project type"
                  selectedOption={projectTypeOptions.find((option: SelectOption) => option.value === projectsType) as SelectOption}
                  handleChange={(value: string) => {
                    setProjectType(value as ProjectType);
                  }}
                  options={projectTypeOptions}
                />
              </Grid>*/}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="search"
                  label="Search"
                  value={searchString}
                  onChange={(e) => setSearchString(e.currentTarget.value)}
                />
              </Grid>
              <Grid container item xs={4} spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Button
                    onClick={handleFiltersSubmit}
                    variant="outlined"
                    color="primary"
                  >Submit filters
                  </Button>
                </Grid>
                {filtersNotSubmitted && (
                  <Grid item xs={6}>
                    <Button
                      onClick={handleRemoveFilters}
                      variant="outlined"
                    >Remove filters
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {projects.length > 0 ? (
/*                <AvailableProjectsTable
                  projects={projects}
                  actions={{
                    handleReserveProject,
                  }}
                />*/
                <div></div>
              ) : (
                <EmptyStateContainer>
                  <div>
                    <ChatIcon />
                  </div>
                  <p>No project found. Please change filters</p>
                </EmptyStateContainer>
              )}
            </Grid>
          </Grid>
          <StyledIconButton onClick={() => setProjectFormModalOpen((prev) => !prev)}>
            <AddCircleOutlineIcon />
          </StyledIconButton>
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
      )}
    </>
  );
};

export {
  ProjectListPage,
};
