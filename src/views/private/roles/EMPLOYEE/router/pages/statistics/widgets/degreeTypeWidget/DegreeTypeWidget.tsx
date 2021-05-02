import React, { useState } from 'react';

import { StyledWidgetContainer } from '../../styles';
import { Props } from './models';

export const DegreeTypeWidget = (props: Props) => {
  const [data, setData] = useState<any[]>([]);

  return (
    <StyledWidgetContainer>
      <span>Total project types divided by degree</span>
    </StyledWidgetContainer>

  );
};
