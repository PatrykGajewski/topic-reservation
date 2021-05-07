import { Project, Tag } from '../../../../../models/project';
import { API, APISecured } from '../../../../../API';
import { University } from '../../../../../models/university';
import { SimplifiedUser, UserDegree } from '../../../../../models/user';
import { Opinion } from '../../EMPLOYEE/router/pages/promotersRanking/services';

export const _fetchUniversities = async (): Promise<University[]> => {
  try {
    const { data, error } = await APISecured.get('/universities');

    if (error) {
      return Promise.reject(error.message);
    }
    return Promise.resolve(data.entries as University[]);
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
};

export const _fetchProjectTags = async (): Promise<Tag[]> => {
  try {
    const { data, error } = await APISecured.get('/tags');
    if (error) {
      console.error(error);
      return Promise.reject(new Error('Cannot get project tags'));
    }
    return Promise.resolve(data.entries as Tag[]);
  } catch (e) {
    console.error(e);
    return Promise.reject();
  }
};

export const _fetchPromoters = async (): Promise<SimplifiedUser[]> => {
  try {
    const { data, error } = await APISecured.get('/users/promoters/list');
    if (error) {
      return Promise.reject();
    }
    return Promise.resolve(data.entries as SimplifiedUser[]);
  } catch (e) {
    return Promise.reject();
  }
};

export const _fetchStudentProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await APISecured.get('/projects/studentProjects');
    if (error) {
      console.error(error);
      return Promise.reject(error);
    }
    return Promise.resolve(data.data as Project[]);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const _fetchDegrees = async (): Promise<UserDegree[]> => {
  try {
    const { data, error } = await APISecured.get('/degrees/list');
    if (error) {
      console.error(error);
      return Promise.reject();
    }
    return Promise.resolve(data.entries as UserDegree[]);
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

interface CreateOpinionParams {
  targetId: string,
  content: string,
  projectId: string,
  grade: number,
}

export const _createOpinion = async (params: CreateOpinionParams): Promise<Opinion> => {
  try {
    const { data, error } = await APISecured.post('/users/add/opinion', params);
    if (error) {
      return Promise.reject();
    }
    return Promise.resolve(data.entry as Opinion);
  } catch (e) {
    return Promise.reject();
  }
};

interface UpdateOpinionParams {
  opinionId: string,
  content: string,
  grade: number,
}

export const _updateOpinion = async (params: UpdateOpinionParams): Promise<Opinion> => {
  try {
    const { data, error } = await APISecured.put('/users/modify/opinion', params);
    if (error) {
      return Promise.reject();
    }
    return Promise.resolve(data.entry as Opinion);
  } catch (e) {
    return Promise.reject();
  }
};
