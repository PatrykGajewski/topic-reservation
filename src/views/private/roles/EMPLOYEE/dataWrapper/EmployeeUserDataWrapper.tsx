import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/appState';
import {
  InitialDataFetched,
  InitialDataFetching, InitialDataFetchingError, UpdateDegreesList,
  UpdatePromotersList, UpdateStudentsList,
  UpdateTagsList,
  UpdateUniversitiesList,
  UpdateUserProjectsList,
} from '../../../../../store/actions';
import { Props, State } from './models';
import { PageLoader } from '../../../components/pageLoader';
import { PageContainer, PageContent } from '../../../../components/styles';
import { EmployeeUserRouter } from '../router';
import { Footer } from '../../../../components/footer';
import { InitialDataError } from '../../../components/initialDataError/InitialDataError';
import { EmployeeTopBar } from './components';
import {
  _fetchDegrees,
  _fetchProjectTags,
  _fetchPromoters,
  _fetchUniversities,

} from '../../STUDENT/services';
import { Tag } from '../../../../../models/tags';
import { University } from '../../../../../models/university';
import { Project } from '../../../../../models/project';
import { _fetchEmployeeProjects, _fetchStudents } from '../services';
import {SimplifiedUser, UserDegree} from "../../../../../models/user";

export const EmployeeUserDataWrapper = (props: Props) => {
  const dispatch = useDispatch();
  const stateData: State = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
  }));

  const fetchInitialData = () => {
    dispatch({ ...new InitialDataFetching() });
    Promise.all<Tag[], University[], SimplifiedUser[], Project[], SimplifiedUser[], UserDegree[]>([
      _fetchProjectTags(),
      _fetchUniversities(),
      _fetchPromoters(),
      _fetchEmployeeProjects(),
      _fetchStudents(),
      _fetchDegrees(),
    ]).then((res) => {
      dispatch({ ...new UpdateTagsList(res[0]) });
      dispatch({ ...new UpdateUniversitiesList(res[1]) });
      dispatch({ ...new UpdatePromotersList(res[2]) });
      dispatch({ ...new UpdateUserProjectsList(res[3]) });
      dispatch({ ...new UpdateStudentsList(res[4]) });
      dispatch({ ...new UpdateDegreesList(res[5])});

      dispatch({ ...new InitialDataFetched() });
    }).catch(() => {
      dispatch(({ ...new InitialDataFetchingError() }));
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <PageContainer>
      <EmployeeTopBar />
      <PageContent>
        {stateData.loading && (
          <PageLoader />
        )}
        {stateData.error && (
          <InitialDataError fetchInitialData={fetchInitialData} text="Cannot fetch initial data" />
        )}
        {stateData.success && (
          <EmployeeUserRouter logoutUser={props.logoutUser} />
        )}
      </PageContent>
      <Footer />
    </PageContainer>
  );
};
