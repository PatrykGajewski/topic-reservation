import { StateModel } from "./state.model";

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
  },
};

export default initialState;
