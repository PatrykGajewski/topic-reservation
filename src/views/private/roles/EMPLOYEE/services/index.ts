import { Project } from '../../../../../models/project';
import { APISecured } from '../../../../../API';

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
