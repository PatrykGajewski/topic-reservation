import {APISecured} from '../../../../../../../API';
import {Project} from '../../../../../../../models/project';

export const _updateProject = async (projectId: string, updates: any): Promise<Project> => {
  try {
    const { data, error } = await APISecured.put(`/projects/${projectId}`, updates);
    if (error) {
      console.log(error);
      return Promise.reject(error);
    }
    return Promise.resolve(data.data as Project);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
