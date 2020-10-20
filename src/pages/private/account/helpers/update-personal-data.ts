import { API } from 'API';

export const updatePersonalData = async (personalData: any, userId: string) => {
  try {
    const { data, error } = await API.patch(`/users/${userId}`, personalData);

    if (error) {
      console.error(error);
      return Promise.reject();
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.resolve();
    }
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
