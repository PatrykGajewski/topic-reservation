import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Loader from 'react-loader-spinner';
import {ResponsiveBar} from '@nivo/bar';
import {ViewState} from '../../../../../../../models/other';
import {AppState} from '../../../../../../../store/appState';
import {ContentWrapper} from '../../../../../../components';
import {createStatisticData} from './utils';
import {ProjectType} from '../../../../../../../models/project';
import {mapProjectTypeToText} from "../../../../../../../utils/mappers";

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

  // TODO move to separate module
  const overviewType: string = mapProjectTypeToText(ProjectType.OVERVIEW_WORK);
  const researchType: string = mapProjectTypeToText(ProjectType.RESEARCH_WORK);
  const technologicalType: string = mapProjectTypeToText(ProjectType.TECHNOLOGICAL_WORK);
  const constructionType: string = mapProjectTypeToText(ProjectType.CONSTRUCTION_WORK);

  const data = [
    {
      year: '2015',
      [researchType]: 5,
      [`${researchType}Color`]: 'hsl(187, 70%, 50%)',
      [technologicalType]: 3,
      [`${technologicalType}Color`]: 'hsl(69, 70%, 50%)',
      [overviewType]: 2,
      [`${overviewType}Color`]: 'hsl(273, 70%, 50%)',
      [constructionType]: 4,
      [`${constructionType}Color`]: 'hsl(349, 70%, 50%)',
    },
    {
      year: '2016',
      [researchType]: 8,
      [`${researchType}Color`]: 'hsl(187, 70%, 50%)',
      [technologicalType]: 2,
      [`${technologicalType}Color`]: 'hsl(69, 70%, 50%)',
      [overviewType]: 1,
      [`${overviewType}Color`]: 'hsl(273, 70%, 50%)',
      [constructionType]: 3,
      [`${constructionType}Color`]: 'hsl(349, 70%, 50%)',
    },
    {
      year: '2017',
      [researchType]: 1,
      [`${researchType}Color`]: 'hsl(187, 70%, 50%)',
      [technologicalType]: 7,
      [`${technologicalType}Color`]: 'hsl(69, 70%, 50%)',
      [overviewType]: 4,
      [`${overviewType}Color`]: 'hsl(273, 70%, 50%)',
      [constructionType]: 1,
      [`${constructionType}Color`]: 'hsl(349, 70%, 50%)',
    },
  ];

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
          <span>Number of projects over years divided into types</span>
          <ResponsiveBar
            data={data}
            keys={[researchType, technologicalType, overviewType, constructionType]}
            indexBy="year"
            margin={{
              top: 50, right: 160, bottom: 50, left: 60,
            }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: overviewType,
                },
                id: 'dots',
              },
              {
                match: {
                  id: technologicalType,
                },
                id: 'lines',
              },
            ]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Year',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Number of projects',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 150,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 130,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate
            motionStiffness={90}
            motionDamping={15}
          />
        </ContentWrapper>
      )}
    </>
  );
};
