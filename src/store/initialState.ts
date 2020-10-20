import { AppState } from './appState';

const initialState: AppState = {
  user: {
    id: '',
    email: '',
    roles: [],
    firstName: '',
    lastName: null,
    birthDate: null,
    accountCreationDate: '',
    accountExpirationDate: '',
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
  universities: [],
  loading: false,
  success: false,
  error: '',
};

export default initialState;
