import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ViewState } from '../../../../../../../../../models/other';
import { StyledWidgetContainer } from '../../styles';
import {
  constructionType,
  mapProjectsTypeDataToPresentation,
  overviewType,
  researchType,
  technologicalType,
} from './utils';
import { Props } from './models';
import { PageLoader } from '../../../../../../../components';

export const ProjectTypeWidget = (props: Props) => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [data, setData] = useState<any[]>([]);

  const prepareData = () => {
    setViewState(ViewState.LOADING);
    const preparedData: any[] = mapProjectsTypeDataToPresentation(props.data);
    if (preparedData.length > 0) {
      setData(preparedData);
      setViewState(ViewState.OK);
    } else {
      setViewState(ViewState.EMPTY);
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  useEffect(() => {
    prepareData();
  }, [props.data]);

  return (
    <>
      {viewState === ViewState.EMPTY && (
        <div> No data delivered </div>
      )}
      {viewState === ViewState.LOADING && (
        <PageLoader />
      )}
      {viewState === ViewState.OK && (
        <StyledWidgetContainer>
          <span>{`Number of projects over ${props.data.map((data) => data.year).join(', ')} divided into types`}</span>
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
              axis: 'x',
              scale: 'linear',
              length: 100,
              ticksPosition: 'after',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Year',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              axis: 'y',
              scale: 'linear',
              length: 100,
              ticksPosition: 'after',
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
        </StyledWidgetContainer>
      )}
    </>
  );
};
