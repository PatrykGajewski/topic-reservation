import { SimplifiedUser } from '../../../../../STUDENT/services';
import { APISecured, MultiResponse } from '../../../../../../../../API';

export enum Order {
  ASCENDING= 'ASCENDING',
  DESCENDING = 'DESCENDING'
}

interface PromotersRankingParams {
  limit: number,
  skip: number,
  order: Order,
}

export interface SimplifiedUserWithOpinions extends SimplifiedUser {
  opinions: any[],
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
