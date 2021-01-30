import {UserDataFetched, UserDataFetching, UserDataFetchingError} from "../../../../store/actions";
import {API} from "../../../../API";

export const getUserData = (userId: string) => async (dispatch: any) => {
  try {
    dispatch({...new UserDataFetching()});
    // @ts-ignore
    const {data, error} = await API.get(`/users/${userId}`);
    if (error) {
      console.error(error);
      dispatch({...new UserDataFetchingError(error.message)});
    } else {
      console.log(data);
      dispatch({...new UserDataFetched(data)});
    }
  } catch (err) {
    console.error(err);
    dispatch({...new UserDataFetchingError(err.message)});
  }
};
