import {APISecured} from '../../../../API';
import {ProjectModel} from '../../../../models/project';

export const _updateProject = async (projectId: string, updates: any): Promise<ProjectModel> => {
  try {
    const { data, error } = await APISecured.put(`/projects/${projectId}`, updates);
    if (error) {
      console.log(error);
      return Promise.reject(error);
    }
    return Promise.resolve(data.data as ProjectModel);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
