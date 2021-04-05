import {Project, Tag} from '../../../../../models/project';
import {APISecured} from '../../../../../API';
import {University} from '../../../../../models/university';
import {UserGender} from '../../../../../models/user';

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

export interface SimplifiedUser {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: UserGender,
  profilePhotoId: string,
}

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

export const _fetchUserProjects = async (): Promise<Project[]> => {
  try {
    const {data, error} = await APISecured.get('/projects/userProjects');
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
