import {Project, ProjectDegree, ProjectStatus, ProjectType} from '../../../../../models/project';
import {APISecured} from '../../../../../API';
import {RoleInProject} from "../router/pages";

export const _fetchEmployeeProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await APISecured.get('/projects/employeeProjects');
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(data.data as Project[]);
  } catch (e) {
    return Promise.reject(e);
  }
};


interface Params {
  projectsTypes: ProjectType[],
  projectsDegrees: ProjectDegree[],
  projectsStatuses: ProjectStatus[],
  roleInProjects: RoleInProject,
  searchString: string,
  skip: number,
  limit: number,
}

export interface FetchProjectsResponse {
  projects: Project[]
  total: number,
}

export const _fetchProjects = async (params: Params): Promise<FetchProjectsResponse> => {
  try {
    const { data, error } = await APISecured.post('/projects', {
      projectsTypes: params.projectsTypes.length === 0 ? Object.keys(ProjectType) : params.projectsTypes,
      projectsDegrees: params.projectsDegrees.length === 0 ? Object.keys(ProjectDegree) : params.projectsDegrees,
      projectsStatuses: params.projectsStatuses.length === 0 ? Object.keys(ProjectStatus) : params.projectsStatuses,
      roleInProjects: params.roleInProjects,
      searchString: params.searchString,
      skip: params.skip,
      limit: params.limit,
    });
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve({
      projects: data.entries as Project[],
      total: data.total,
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
