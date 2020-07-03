import { ActionTypes, ACTION_TYPES } from './actions';
import { StateModel } from './state.model';
import initialState from './initialState';

const rootReducer = (state = initialState, action: ActionTypes): StateModel => {
  switch (action.type) {
  case ACTION_TYPES.FETCH_USER_DATA:
    console.log(action.payload);
    return {
      ...state,
      user: action.payload,
    };
  default:
    return state;
  }
};

export default rootReducer;
