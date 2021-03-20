import {AppState} from './appState';
import {UserGender} from '../models/user';
import {ProjectType} from "../models/project";

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
  userProjects: [],
  availableProjects: {
    table: {
      pageIndex: 0,
      lastPageIndex: 0,
      searchString: '',
      projectType: ProjectType.RESEARCH_WORK,
    },
  },
  degrees: [],
  universities: [],
  loading: false,
  success: false,
  error: '',
};

export default initialState;
