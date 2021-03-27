import React, { useEffect } from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import ChatIcon from '@material-ui/icons/Chat';
import CachedIcon from '@material-ui/icons/Cached';
import { TopBar } from '../../components';
import { LogoutPage } from '../logoutPage';
import { AccountPage } from '../account';
import { OwnedProjectsPage } from '../ownedProjectList/OwnedProjectsPage';
import { ProjectListPage } from '../projectList/ProjectListPage';
import { PageContent } from '../../public';
import { Tag, Project } from '../../../models/project';
import {
  _fetchProjectTags, _fetchPromoters, _fetchUniversities, _fetchUserProjects, SimplifiedUser,
} from './services';
import { University } from '../../../models/university';

import {
  InitialDataFetched,
  InitialDataFetching,
  InitialDataFetchingError, UpdatePromotersList,
  UpdateTagsList, UpdateUniversitiesList, UpdateUserProjectsList,
} from '../../../store/actions';
import { AppState } from '../../../store/appState';
import { StyledContainer } from '../ownedProjectList';
import { EmptyStateContainer } from '../projectList/styles';

interface State {
  loading: boolean,
  success: boolean,
  error: boolean,
}

const AuthenticatedMainPage = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const stateData: State = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
  }));

  const fetchInitialData = () => {
    dispatch({ ...new InitialDataFetching() });
    Promise.all<Tag[], University[], SimplifiedUser[], Project[]>([
      _fetchProjectTags(),
      _fetchUniversities(),
      _fetchPromoters(),
      _fetchUserProjects(),
    ]).then((res) => {
      dispatch({ ...new UpdateTagsList(res[0]) });
      dispatch({ ...new UpdateUniversitiesList(res[1]) });
      dispatch({ ...new UpdatePromotersList(res[2]) });
      dispatch({ ...new UpdateUserProjectsList(res[3]) });

      dispatch({ ...new InitialDataFetched() });
    }).catch(() => {
      dispatch(({ ...new InitialDataFetchingError() }));
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <PageContent>
      <TopBar isAuthenticated />
      <div style={{
        height: 'calc(100% - 120px)',
      }}
      >
        {stateData.loading && (
          <StyledContainer>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} // 3 secs
            />
          </StyledContainer>
        )}
        {stateData.error && (
          <div>
            <EmptyStateContainer>
              <ChatIcon />
              <p> Can't fetch Tags, Universities, Promoters or user projects</p>
              <button onClick={() => fetchInitialData()}>
                <CachedIcon />
              </button>
            </EmptyStateContainer>
          </div>
        )}
        {stateData.success && (
          <Switch>
            <Route path="/logout" render={() => <LogoutPage />} />
            <Route
              path="/owned"
              render={() => (
                <OwnedProjectsPage />
              )}
            />
            <Route
              path="/list"
              render={() => (
                <ProjectListPage />
              )}
            />
            <Route path="/promoters" render={() => <div />} />
            <Route
              exact
              path="/"
              render={() => (
                <AccountPage />
              )}
            />
          </Switch>
        )}
      </div>
    </PageContent>
  );
};

export { AuthenticatedMainPage };
