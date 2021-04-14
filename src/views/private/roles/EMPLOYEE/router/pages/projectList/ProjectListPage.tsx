import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ChatIcon from '@material-ui/icons/Chat';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ViewState } from 'models/other';
import {
  BarContainer, ContentContainer, ContentWrapper, BarElement,
} from 'views/components/contentWithBar';
import { AppState } from '../../../../../../../store/appState';

import {
  Project, Tag, ProjectType, ProjectDegree, ProjectStatus,
} from '../../../../../../../models/project';
import { SelectOption } from '../../../../../../../models/forms';
import { StyledErrorItem, StyledErrorList } from './styles';
import {
  _createProject, _fetchAvailableProjects, _reserveProject,
} from './services';
import { UpdateAvailableProjectsTable, UpdateUserProjectsList } from '../../../../../../../store/actions';
import { SimpleSelect } from '../../../../../../components/forms';
import { StyledIconButton } from '../../../../REGISTERED_USER/router/pages/account/styles';
import { ButtonType, Popup } from '../../../../../../components';
import { ProjectForm, ProjectFormValues } from './forms';
import { University } from '../../../../../../../models/university';
import { mapProjectStatusToOptions, mapProjectTypeToOptions } from '../../../../../../../utils/mappers';
import { mapProjectDegreeToOptions } from '../../../../../../../utils/mappers/map-project-degree-to-options';
import { EmptyStateContainer } from '../../../../../components/initialDataError/styles';
import { AvailableProjectsTable } from '../../../../STUDENT/router/pages/ownedProjectList/components';
import { StyledContainer } from '../../../../STUDENT/router/pages/ownedProjectList';
import { SimplifiedUser } from '../../../../STUDENT/services';
import { APISecured, MultiResponse } from '../../../../../../../API';

const projectTypeOptions: SelectOption[] = mapProjectTypeToOptions();
const projectDegreeOptions: SelectOption[] = mapProjectDegreeToOptions();
const projectStatusOptions: SelectOption[] = mapProjectStatusToOptions();

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
  const [projectType, setProjectType] = useState<ProjectType>(stateData.tableConfig.projectType);
  const [projectDegree, setProjectDegree] = useState<ProjectDegree>(stateData.tableConfig.projectDegree);
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(stateData.tableConfig.projectStatus);
  const [pageConfig, setPageConfig] = useState<{ pageIndex: number, lastPageIndex: number}>({
    pageIndex: stateData.tableConfig.pageIndex,
    lastPageIndex: stateData.tableConfig.lastPageIndex,
  });

  const [projectFormModalOpen, setProjectFormModalOpen] = useState<boolean>(false);
  const projectSubmitBtnRef = useRef<HTMLButtonElement | null>(null);

  const [templateUploadModal, setTemplateUploadModal] = useState<boolean>(false);
  const [templateToUpload, setTemplateToUpload] = useState<File | null>(null);
  const [templateErrors, setTemplateErrors] = useState<string[]>([]);
  const [invalidTemplate, setInvalidTemplate] = useState<boolean>(false);

  const fetchAvailableProjects = () => {
    setViewState(ViewState.LOADING);
    _fetchAvailableProjects({
      projectType,
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
      });
  };

  useEffect(() => {
    fetchAvailableProjects();
  }, []);

  const handleFiltersSubmit = () => {
    fetchAvailableProjects();
    dispatch({
      ...new UpdateAvailableProjectsTable({
        lastPageIndex: pageConfig.lastPageIndex,
        pageIndex: pageConfig.pageIndex,
        searchString,
        projectType,
        projectDegree,
        projectStatus,
      }),
    });
  };

  const handleRemoveFilters = () => {
    setSearchString(stateData.tableConfig.searchString);
    setProjectType(stateData.tableConfig.projectType);
    setPageConfig({
      pageIndex: stateData.tableConfig.pageIndex,
      lastPageIndex: stateData.tableConfig.lastPageIndex,
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
          setTemplateErrors(e.response.data.message);
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

  const filtersNotSubmitted = stateData.tableConfig.searchString !== searchString
  || stateData.tableConfig.projectType !== projectType;

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
                <SimpleSelect
                  id="projectType"
                  labelId="projectTypeLabel"
                  label="Select project type"
                  selectedOption={projectTypeOptions.find((option: SelectOption) => option.value === projectType) as SelectOption}
                  handleChange={(value: string) => {
                    setProjectType(value as ProjectType);
                  }}
                  options={projectTypeOptions}
                />
              </BarElement>
              <BarElement item xs={12}>
                <SimpleSelect
                  id="projectDegree"
                  labelId="projectDegreeLabel"
                  label="Select project degree"
                  selectedOption={projectDegreeOptions.find((option: SelectOption) => option.value === projectDegree) as SelectOption}
                  handleChange={(value: string) => {
                    setProjectDegree(value as ProjectDegree);
                  }}
                  options={projectDegreeOptions}
                />
              </BarElement>
              <BarElement item xs={12}>
                <SimpleSelect
                  id="projectStatus"
                  labelId="projectStatusLabel"
                  label="Select project status"
                  selectedOption={projectStatusOptions.find((option: SelectOption) => option.value === projectStatus) as SelectOption}
                  handleChange={(value: string) => {
                    setProjectStatus(value as ProjectStatus);
                  }}
                  options={projectStatusOptions}
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
                >Submit filters
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
              <AvailableProjectsTable
                projects={projects}
                actions={{
                  handleReserveProject,
                }}
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
        </ContentWrapper>
      )}
    </>
  );
};

export {
  ProjectListPage,
};
