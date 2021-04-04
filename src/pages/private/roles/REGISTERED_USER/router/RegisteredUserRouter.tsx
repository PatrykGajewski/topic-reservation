import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatIcon from '@material-ui/icons/Chat';
import CachedIcon from '@material-ui/icons/Cached';
import { Route, Switch } from 'react-router-dom';
import { AppState } from '../../../../../store/appState';
import {
  InitialDataFetched,
} from '../../../../../store/actions';
import { TopBar } from '../../../../components';
import { EmptyStateContainer } from '../../STUDENT/pages/projectList/styles';
import { LogoutPage } from '../pages/logout';
import { AccountPage } from '../pages';
import { Props, State } from './models';
import { PageLoader } from '../../../components/pageLoader';
import { PageContainer, PageContent } from '../../../../components/styles';
import { Footer } from "../../../../components/footer";

export const RegisteredUserRouter = (props: Props) => {
  const dispatch = useDispatch();
  const stateData: State = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
  }));

  const fetchInitialData = () => {
    dispatch({ ...new InitialDataFetched() });
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
              <p> Can't fetch Initial data</p>
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
              exact
              path="/"
              render={() => (
                <AccountPage />
              )}
            />
          </Switch>
        )}
      </PageContent>
      <Footer />
    </PageContainer>
  );
};
