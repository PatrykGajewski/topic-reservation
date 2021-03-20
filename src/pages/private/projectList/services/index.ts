import { APISecured } from '../../../../API';
import {ProjectModel, ProjectStatus, ProjectType} from '../../../../models/project';

export const fetchUniversitiesList = async () => {
  try {
    const { data, error } = await APISecured.get('/universities');

    if (error) {
      return Promise.reject(error.message);
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.resolve(data);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
};

export const _reserveProject = async (projectId: string): Promise<ProjectModel> => {
  try {
    const { data, error } = await APISecured.patch(`/projects/reserve/${projectId}`, {});
    if (error) {
      console.error(error);
      return Promise.reject();
    }
    return Promise.resolve(data.data);
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};

interface GetAvailableProjectsParams {
  projectType: ProjectType,
  searchString: string | null,
  skip: number,
  limit: number,
}

export const _fetchAvailableProjects = async (params: GetAvailableProjectsParams): Promise<ProjectModel[]> => {
  try {
    const { data, error } = await APISecured.post('/projects', {
      type: params.projectType,
      searchString: params.searchString,
      status: ProjectStatus.AVAILABLE,
      skip: params.skip,
      limit: params.limit,
    });
    if (error) {
      console.log(error);
      return Promise.reject(new Error('Cannot get userProjects'));
    }
    return Promise.resolve(data.data as ProjectModel[]);
  } catch (err) {
    console.log(err);
    return Promise.reject(new Error('API error - userProjects route'));
  }
};
