import {
  ACTION_TYPES,
  ActionTypes,
  UpdateAvailableProjectsTable, UpdateDegreesList,
  UpdatePromotersList, UpdatePromotersListView, UpdateStudentsList,
  UpdateTagsList,
  UpdateUniversitiesList,
  UpdateUserData,
  UpdateUserProjectsList,
} from './actions';
import { AppState } from './appState';
import initialState from './initialState';

const rootReducer = (state = initialState, action: ActionTypes): AppState => {
  switch (action.type) {
  case ACTION_TYPES.INITIAL_DATA_FETCHING:
    return {
      ...state,
      loading: true,
    };
  case ACTION_TYPES.INITIAL_DATA_FETCHING_ERROR:
    return {
      ...state,
      loading: false,
      error: true,
    };
  case ACTION_TYPES.INITIAL_DATA_FETCHED:
    return {
      ...state,
      loading: false,
      success: true,
    };
  case ACTION_TYPES.UPDATE_UNIVERSITIES_LIST:
    return {
      ...state,
      universities: (action as UpdateUniversitiesList).payload,
    };
  case ACTION_TYPES.UPDATE_TAGS_LIST:
    return {
      ...state,
      tags: (action as UpdateTagsList).payload,
    };
  case ACTION_TYPES.UPDATE_PROMOTERS_LIST:
    return {
      ...state,
      promoters: (action as UpdatePromotersList).payload,
    };
  case ACTION_TYPES.UPDATE_USER_PROJECTS_LIST:
    return {
      ...state,
      userProjects: (action as UpdateUserProjectsList).payload,
    };
  case ACTION_TYPES.USER_DATA_UPDATE:
    return {
      ...state,
      user: (action as UpdateUserData).payload,
    };
  case ACTION_TYPES.UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG:
    return {
      ...state,
      projectsListView: {
        ...state.projectsListView,
        table: (action as UpdateAvailableProjectsTable).payload,
      },
    };
  case ACTION_TYPES.UPDATE_STUDENTS_LIST:
    return {
      ...state,
      students: (action as UpdateStudentsList).payload,
    };
  case ACTION_TYPES.UPDATE_PROMOTERS_LIST_CONFIG:
    return {
      ...state,
      promotersListView: (action as UpdatePromotersListView).payload,
    };
  case ACTION_TYPES.UPDATE_DEGREES_LIST:
    return {
      ...state,
      degrees: (action as UpdateDegreesList).payload,
    };
  default:
    return state;
  }
};

export default rootReducer;
