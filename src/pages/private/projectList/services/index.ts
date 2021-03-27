import {APISecured} from '../../../../API';
import {Project} from '../../../../models/project';
import { ProjectStatus, ProjectType } from "../../../../models/project/models";


export const _reserveProject = async (projectId: string): Promise<Project> => {
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

export const _fetchAvailableProjects = async (params: GetAvailableProjectsParams): Promise<Project[]> => {
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
    return Promise.resolve(data.data as Project[]);
  } catch (err) {
    console.log(err);
    return Promise.reject(new Error('API error - userProjects route'));
  }
};

interface CreateProjectParams {
  topic: string,
  description: string,
  type: ProjectType,
  tag: string,
  userId: string
}

export const _createProject = async (params: CreateProjectParams): Promise<Project> => {
  try {
    const { data, error } = await APISecured.post('/projects/add/project', {
      topic: params.topic,
      description: params.description,
      type: params.type,
      languagesIds: [],
      groupProject: false,
      ownersIds: [params.userId],
      promoterId: '',
      reviewersIds: [],
      universityId: '',
      departmentId: '',
      cathedralId: '',
      status: ProjectStatus.RESERVED,
      rating: {
        votes: [],
        value: 0,
      }
    });
    if (error) {
      console.log(error);
      return Promise.reject();
    }
    return Promise.resolve(data.data as Project);
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
};
