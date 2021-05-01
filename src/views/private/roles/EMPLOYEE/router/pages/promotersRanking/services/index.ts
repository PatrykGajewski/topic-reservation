import { SimplifiedUser } from '../../../../../STUDENT/services';
import { APISecured, MultiResponse } from '../../../../../../../../API';
import {ProjectDegree, ProjectStatus, ProjectType} from "../../../../../../../../models/project";

export enum Order {
  ASCENDING= 'ASCENDING',
  DESCENDING = 'DESCENDING'
}

interface PromotersRankingParams {
  limit: number,
  skip: number,
  order: Order,
}

export interface SimplifiedProject {
  id: string,
  topic: string,
  degree: ProjectDegree,
  status: ProjectStatus,
  type: ProjectType,
}

export interface Opinion {
  id: string,
  createdAt: string,
  updatedAt: string,
  content: string,
  grade: number,
  author: SimplifiedUser,
  subject: SimplifiedProject,
}

export interface SimplifiedUserWithOpinions extends SimplifiedUser {
  opinions: Opinion[],
  rank: number,
}

export interface PromotersRankingResponse {
  entries: SimplifiedUserWithOpinions[],
  total: number
}

export const _fetPromotersRanking = async (
  params: PromotersRankingParams,
): Promise<PromotersRankingResponse> => (
  APISecured.post('/users/promoters/ranking', params)
    .then((res: MultiResponse<SimplifiedUserWithOpinions>) => (Promise.resolve({
      entries: res.data.entries,
      total: res.data.embedded.total,
    })))
    .catch((err) => Promise.reject(err))
);
