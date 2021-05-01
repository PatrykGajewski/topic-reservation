import { UserAddress } from './user-addres.model';
import { UserRole } from './user-role.model';
import {UserGender} from "./user-gender.model";

enum ImageExtensions {
  PNG = '.png',
  JPG = '.jpg',
  JPEG = '.jpeg',
  BMP = '.bmp'
}
export interface ImageModel {
  name: String,
  extension: ImageExtensions,
  img: {
    data: String[],
    contentType: String,
  }
}

export interface UserModel {
  id: string,
  email: string,
  contactEmail: string,
  roles: UserRole[],
  degrees: string[],
  firstName: string,
  lastName: string,
  profilePhotoId: string | null,
  gender: UserGender,
  birthDate: string | null,
  createdAt: string,
  updatedAt: string,
  address: UserAddress | null,
  phoneNumber: string | null
}
