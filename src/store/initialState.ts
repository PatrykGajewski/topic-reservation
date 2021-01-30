import { AppState } from './appState';
import { UserGender } from '../models/user';

const initialState: AppState = {
  user: {
    id: '',
    email: '',
    roles: [],
    firstName: '',
    lastName: '',
    birthDate: null,
    createdAt: '',
    updatedAt: '',
    gender: UserGender.FEMALE,
    profilePhotoId: null,
    address: null,
    phoneNumber: null,
  },
  projects: [],
  degrees: [],
  universities: [],
  loading: false,
  success: false,
  error: '',
};

export default initialState;
