import { StateModel } from './state.model';

const initialState: StateModel = {
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
    actualUniversities: [],
    highestTitle: {
      fullTitle: '',
      shortTitle: '',
    },
  },
  projects: [],
  loading: false,
  success: false,
  error: '',
};

export default initialState;
