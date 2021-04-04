import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChatIcon from '@material-ui/icons/Chat';
import CachedIcon from '@material-ui/icons/Cached';
import { TopBar } from '../../../../components';
import { LogoutPage } from '../../REGISTERED_USER/pages/logout/logoutPage';
import { AccountPage } from '../../REGISTERED_USER/pages/account';
import { OwnedProjectsPage } from '../pages/ownedProjectList/OwnedProjectsPage';
import { ProjectListPage } from '../pages/projectList/ProjectListPage';
import { Project, Tag } from '../../../../../models/project';
import {
  _fetchProjectTags, _fetchPromoters, _fetchUniversities, _fetchUserProjects, SimplifiedUser,
} from '../services';
import { University } from '../../../../../models/university';

import {
  InitialDataFetched,
  InitialDataFetching,
  InitialDataFetchingError,
  UpdatePromotersList,
  UpdateTagsList,
  UpdateUniversitiesList,
  UpdateUserProjectsList,
} from '../../../../../store/actions';
import { AppState } from '../../../../../store/appState';

import { EmptyStateContainer } from '../pages/projectList/styles';
import { Props } from './models/props-model';
import { State } from './models/state-model';
import {PageLoader} from "../../../components/pageLoader";
import {PageContainer, PageContent} from "../../../../components/styles";
import {Footer} from "../../../../components/footer";

const StudentRouter = (props: Props) => {
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
    <PageContainer>
      <TopBar isAuthenticated />
      <PageContent>
        {stateData.loading && (
          <PageLoader />
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
            <Route path="/logout" render={() => <LogoutPage logoutUser={props.logoutUser} />} />
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
        <Footer />
      </PageContent>
    </PageContainer>
  );
};

export { StudentRouter };
