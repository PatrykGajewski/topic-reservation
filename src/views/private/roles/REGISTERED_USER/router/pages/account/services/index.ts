import { APISecured } from '../../../../../../../../API';
import { Image } from '../../../../../../../../models/image';
import { UserModel } from '../../../../../../../../models/user';

const _fetchUserPhoto = async (avatarId: string): Promise<Image> => (
  APISecured.get(`/static/avatars/${avatarId}`)
    .then((res) => Promise.resolve(res.data as Image))
    .catch((err) => {
      console.error(err);
      return Promise.reject();
    })
);

const _updateUserPersonalData = async (personalData: any, userId: string): Promise<UserModel> => {
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

export interface UploadedImage extends Image {
  imageId: string,
}

const _uploadUserPhoto = (form: any): Promise<UploadedImage> => (
  APISecured.post('/static/avatars', form)
    .then((res: any) => {
      return Promise.resolve(res.data as UploadedImage);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject();
    })
);

export {
  _fetchUserPhoto,
  _updateUserPersonalData,
  _uploadUserPhoto,
};
