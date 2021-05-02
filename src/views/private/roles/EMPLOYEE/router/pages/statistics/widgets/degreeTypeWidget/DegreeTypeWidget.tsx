import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

import { StyledWidgetContainer } from '../../styles';
import { Props } from './models';
import { ViewState } from '../../../../../../../../../models/other';
import { PageLoader } from '../../../../../../../components';
import { mapProjectsDegreesDataToPresentation } from './utils';
import { ProjectDegree } from '../../../../../../../../../models/project';
import {mapProjectDegreeToText} from "../../../../../../../../../utils/mappers";

export const DegreeTypeWidget = (props: Props) => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [data, setData] = useState<any[]>([]);

  const prepareData = () => {
    setViewState(ViewState.LOADING);
    const preparedData: any[] = mapProjectsDegreesDataToPresentation(props.data);
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
          <span>Total project types divided by degree</span>
          <ResponsivePie
            data={data}
            margin={{
              top: 40, right: 80, bottom: 80, left: 80,
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: mapProjectDegreeToText(ProjectDegree.DOCTORAL_DEGREE),
                },
                id: 'dots',
              },
              {
                match: {
                  id: mapProjectDegreeToText(ProjectDegree.BACHELOR_DEGREE),
                },
                id: 'dots',
              },
              {
                match: {
                  id: mapProjectDegreeToText(ProjectDegree.ASSOCIATE_DEGREE),
                },
                id: 'dots',
              },
              {
                match: {
                  id: mapProjectDegreeToText(ProjectDegree.MASTER_DEGREE),
                },
                id: 'dots',
              },
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 150,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </StyledWidgetContainer>
      )}
    </>
  );
};
