import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ViewState } from '../../../../../../../models/other';
import { AppState } from '../../../../../../../store/appState';
import { ContentWrapper } from '../../../../../../components';
import { ViewData } from './models';
import {
  mapProjectsToProjectsTypeDataDividedByYears,
} from './utils';

import { DegreeTypeWidget, ProjectTypeWidget } from './widgets';
import { mapProjectsToProjectsDegreeData } from './utils/map-projects-to-projects-degree-data';
import { ProjectDegree } from '../../../../../../../models/project';

export const StatisticsPage = () => {
  const stateData = useSelector((state: AppState) => ({
    user: state.user,
    projects: state.userProjects,
  }));
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);

  const [viewData, setViewData] = useState<ViewData>({
    projectTypeData: [],
    degreeTypeData: {
      [ProjectDegree.ASSOCIATE_DEGREE]: 0,
      [ProjectDegree.MASTER_DEGREE]: 0,
      [ProjectDegree.DOCTORAL_DEGREE]: 0,
      [ProjectDegree.BACHELOR_DEGREE]: 0,
    },
  });

  const updateStatistics = () => {
    setViewState(ViewState.LOADING);
    setViewData({
      projectTypeData: mapProjectsToProjectsTypeDataDividedByYears(3, stateData.projects),
      degreeTypeData: mapProjectsToProjectsDegreeData(stateData.projects),
    });
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
        <ContentWrapper paddingChild>
          <ProjectTypeWidget data={viewData.projectTypeData} />
          <DegreeTypeWidget data={viewData.degreeTypeData} />
        </ContentWrapper>
      )}
    </>
  );
};
