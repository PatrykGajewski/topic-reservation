import styled, {css} from 'styled-components';
import background from 'img/birdsBg.png';

export const contentContainerStyles = css`
  background-image: url(${background});
  background-repeat: repeat;
  position: relative;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export const ContentWrapper = styled.div`
  ${contentContainerStyles}
`;


