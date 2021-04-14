import {AppState} from './appState';
import {UserGender} from '../models/user';
import {ProjectDegree, ProjectStatus, ProjectType} from "../models/project";

const initialState: AppState = {
  user: {
    id: '',
    email: '',
    contactEmail: '',
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
      projectDegree: ProjectDegree.ASSOCIATE_DEGREE,
      projectStatus: ProjectStatus.AVAILABLE,
    },
  },
  degrees: [],
  universities: [],
  promoters: [],
  tags: [],
  loading: true,
  success: false,
  error: false,
};

export default initialState;
