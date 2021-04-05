import React, {
  SyntheticEvent, useState,
} from 'react';
import { Props } from './models';
import { StyledImage, StyledImageWrapper } from './styles';

export enum ImageOrientation {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export const ImageBox = (props: Props) => {
  const [orientation, setOrientation] = useState<ImageOrientation>(ImageOrientation.HORIZONTAL);

  const onImageOnload = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (event.currentTarget) setOrientation(event.currentTarget.height > event.currentTarget.width ? ImageOrientation.VERTICAL : ImageOrientation.HORIZONTAL);
  };

  return (
    <StyledImageWrapper>
      <StyledImage
        orientation={orientation}
        alt={props.alt}
        src={props.src}
        onLoad={onImageOnload}
      />
    </StyledImageWrapper>
  );
};
