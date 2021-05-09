import {APISecured} from '../../../../../../../../API';
import {Project, ProjectDegree} from '../../../../../../../../models/project';
import { ProjectStatus, ProjectType } from "../../../../../../../../models/project/models";

interface CreateProjectParams {
  topic: string,
  description: string,
  type: ProjectType,
  degree: ProjectDegree,
  tags: string[],
  userId: string,
  promoterId: string,
  universityId: string,
  departmentId: string,
  cathedralId: string,
}

export const _createProject = async (params: CreateProjectParams): Promise<Project> => {
  console.log(params);
  try {
    const { data, error } = await APISecured.post('/projects/add/project', {
      topic: params.topic,
      description: params.description,
      tags: params.tags,
      type: params.type,
      degree: params.degree,
      languagesIds: [],
      groupProject: false,
      ownersIds: [params.userId],
      promoterId: params.promoterId,
      reviewersIds: [],
      universityId: params.universityId,
      departmentId: params.departmentId,
      cathedralId: params.cathedralId,
      status: ProjectStatus.RESERVED,
    });
    if (error) {
      console.log(error);
      return Promise.reject();
    }
    return Promise.resolve(data.entry as Project);
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
};
