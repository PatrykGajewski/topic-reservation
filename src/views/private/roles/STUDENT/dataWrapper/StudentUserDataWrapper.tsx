import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag } from 'models/tags'
import { Project } from '../../../../../models/project';
import {
  _fetchProjectTags, _fetchPromoters, _fetchUniversities, _fetchStudentProjects, _fetchDegrees,
} from '../services';
import { University } from '../../../../../models/university';
import {
  InitialDataFetched,
  InitialDataFetching,
  InitialDataFetchingError, UpdateDegreesList,
  UpdatePromotersList,
  UpdateTagsList,
  UpdateUniversitiesList,
  UpdateUserProjectsList,
} from '../../../../../store/actions';
import { AppState } from '../../../../../store/appState';
import { Props } from './models/props-model';
import { State } from './models/state-model';
import { PageLoader } from '../../../components/pageLoader';
import { PageContainer, PageContent } from '../../../../components/styles';
import { Footer } from '../../../../components/footer';
import { StudentRouter } from '../router';
import { InitialDataError } from '../../../components/initialDataError/InitialDataError';
import { StudentUserTopBar } from './components';
import {SimplifiedUser, UserDegree} from "../../../../../models/user";

const StudentUserDataWrapper = (props: Props) => {
  const dispatch = useDispatch();
  const stateData: State = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
  }));

  const fetchInitialData = () => {
    dispatch({ ...new InitialDataFetching() });
    Promise.all<Tag[], University[], SimplifiedUser[], Project[], UserDegree[]>([
      _fetchProjectTags(),
      _fetchUniversities(),
      _fetchPromoters(),
      _fetchStudentProjects(),
      _fetchDegrees()
    ]).then((res) => {
      dispatch({ ...new UpdateTagsList(res[0]) });
      dispatch({ ...new UpdateUniversitiesList(res[1]) });
      dispatch({ ...new UpdatePromotersList(res[2]) });
      dispatch({ ...new UpdateUserProjectsList(res[3]) });
      dispatch({ ...new UpdateDegreesList(res[4])});

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
      <StudentUserTopBar />
      <PageContent>
        {stateData.loading && (
          <PageLoader />
        )}
        {stateData.error && (
          <InitialDataError fetchInitialData={fetchInitialData} text="Can't fetch Tags, Universities, Promoters or user projects" />
        )}
        {stateData.success && (
          <StudentRouter logoutUser={props.logoutUser} />
        )}
        <Footer />
      </PageContent>
    </PageContainer>
  );
};

export { StudentUserDataWrapper };
