import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/appState';
import {
  InitialDataFetched,
} from '../../../../../store/actions';
import { Props, State } from './models';
import { PageLoader } from '../../../components/pageLoader';
import { PageContainer, PageContent } from '../../../../components/styles';
import { RegisteredUserRouter } from '../router';
import { Footer } from '../../../../components/footer';
import {InitialDataError} from "../../../components/initialDataError/InitialDataError";
import {RegisteredUserTopBar} from "./components";

export const RegisteredUserDataWrapper = (props: Props) => {
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
      <RegisteredUserTopBar />
      <PageContent>
        {stateData.loading && (
          <PageLoader />
        )}
        {stateData.error && (
          <InitialDataError fetchInitialData={fetchInitialData} text="Cannot fetch initial data" />
        )}
        {stateData.success && (
          <RegisteredUserRouter logoutUser={props.logoutUser} />
        )}
      </PageContent>
      <Footer />
    </PageContainer>
  );
};
