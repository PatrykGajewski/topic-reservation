import {AppState} from './appState';
import {UserGender} from '../models/user';
import {RoleInProject} from "../views/private/roles/EMPLOYEE/router/pages";
import {Order} from "../views/private/roles/EMPLOYEE/router/pages/promotersRanking/services";

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
  projectsListView: {
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
  promotersListView: {
    pageIndex: 0,
    total: 0,
    rowsPerPage: 10,
    order: Order.DESCENDING,
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
