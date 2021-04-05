import styled, { css } from 'styled-components';
import { ImageOrientation } from '../ImageBox';

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #bebebe;
`;

const HorizontalStyles = css`
  width: 100%;
  height: auto;
`;

const VerticalStyles = css`
  height: 100%;
  width: auto;
`;

const StyledImage = styled.img<{orientation: ImageOrientation}>`
  ${(props) => (props.orientation === ImageOrientation.VERTICAL ? VerticalStyles : HorizontalStyles)}
`;

export {
  StyledImageWrapper,
  StyledImage,
};
