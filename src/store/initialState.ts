import { AppState } from './appState';
import { UserGender } from '../models/user';

const initialState: AppState = {
  user: {
    id: '',
    email: '',
    roles: [],
    firstName: '',
    lastName: null,
    birthDate: null,
    accountCreationDate: '',
    gender: UserGender.MALE,
    icon: {
      link: '',
      added: false,
    },
    address: null,
    phoneNumber: null,
    finishedUniversities: [],
    currentUniversities: [],
    highestTitle: {
      id: '',
      name: {
        short: '',
        full: '',
      },
    },
  },
  projects: [],
  degrees: [],
  universities: [],
  loading: false,
  success: false,
  error: '',
};

export default initialState;
