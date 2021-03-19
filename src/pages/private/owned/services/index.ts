import { APISecured } from '../../../../API';
import { ProjectModel } from '../../../../models/project';

export const _fetchProjects = async (): Promise<ProjectModel[]> => {
  try {
    const { data, error } = await APISecured.get('/projects/userProjects');
    if (error) {
      console.error(error);
      return Promise.reject(error);
    }
    return Promise.resolve(data.data as ProjectModel[]);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const _updateProject = async (projectId: string, updates: any): Promise<ProjectModel> => {
  try {
    const { data, error } = await APISecured.post(`/projects/${projectId}`, updates);
    if (error) {
      console.log(error);
      return Promise.reject(error);
    }
    return Promise.resolve(data as ProjectModel);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
