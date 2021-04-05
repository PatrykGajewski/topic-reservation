import {APISecured} from 'API';
import {UserModel} from "../../../../../../../../models/user";

export const updatePersonalData = async (personalData: any, userId: string): Promise<UserModel> => {
  try {
    const { data, error } = await APISecured.put(`/users/${userId}`, personalData);

    if (error) {
      console.error(error);
      return Promise.reject();
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.resolve(data.user.data);
    }

  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
