import {AppState} from './appState';
import {UserGender} from '../models/user';
import {RoleInProject} from "../views/private/roles/EMPLOYEE/router/pages";

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
      total: 0,
      rowsPerPage: 10,
      searchString: '',
      projectsTypes: [],
      projectsDegrees: [],
      projectsStatuses: [],
      roleInProjects: RoleInProject.ANY,
    },
  },
  degrees: [],
  universities: [],
  promoters: [],
  students: [],
  tags: [],
  loading: true,
  success: false,
  error: false,
};

export default initialState;
