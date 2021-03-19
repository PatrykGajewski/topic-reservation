import { ACTION_TYPES, ActionTypes, UpdateProjectsList } from './actions';
import { AppState } from './appState';
import initialState from './initialState';

const rootReducer = (state = initialState, action: ActionTypes): AppState => {
  switch (action.type) {
  case ACTION_TYPES.PROJECTS_DATA_UPDATE:
    return {
      ...state,
      // @ts-ignore
      projects: action.payload,
    };
  case ACTION_TYPES.USER_DATA_FETCHING:
  case ACTION_TYPES.PROJECTS_DATA_FETCHING:
    return {
      ...state,
      loading: true,
      error: null,
      success: false,
    };
  case ACTION_TYPES.USER_DATA_FETCHING_ERROR:
  case ACTION_TYPES.PROJECTS_DATA_FETCHING_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
      success: false,
    };
  case ACTION_TYPES.USER_DATA_FETCHED:
    return {
      ...state,
      loading: false,
      error: '',
      success: true,
      user: action.payload,
    };

  case ACTION_TYPES.USER_DATA_UPDATE:
    return {
      ...state,
      user: action.payload,
    };
  case ACTION_TYPES.PROJECTS_DATA_FETCHED:
    return {
      ...state,
      loading: false,
      error: '',
      success: true,
      // @ts-ignore
      projects: action.payload,
    };
  default:
    return state;
  }
};

export default rootReducer;
