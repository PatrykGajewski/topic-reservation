import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ViewState } from '../../../../../../../models/other';
import { AppState } from '../../../../../../../store/appState';
import { ContentWrapper } from '../../../../../../components';
import { createStatisticData } from './utils';

interface ViewData {

}

export const StatisticsPage = () => {
  const stateData = useSelector((state: AppState) => ({
    user: state.user,
    projects: state.userProjects,
  }));
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);

  const [viewData, setViewData] = useState<ViewData>({});

  const updateStatistics = () => {
    setViewState(ViewState.LOADING);
    setViewData(createStatisticData(stateData.projects, stateData.user));
    setViewState(ViewState.OK);
  };

  useEffect(() => {
    updateStatistics();
  }, []);

  return (
    <>
      {viewState === ViewState.LOADING && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} // 3 secs
        />
      )}
      {viewState === ViewState.OK && (
        <ContentWrapper>
          <span>Statistics over here</span>
        </ContentWrapper>
      )}
    </>
  );
};
