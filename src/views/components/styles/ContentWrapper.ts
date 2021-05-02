import styled, { css } from 'styled-components';
import background from 'img/birdsBg.png';
import { boolean } from 'yup';

export const contentContainerStyles = css`
  background-image: url(${background});
  background-repeat: repeat;
  position: static;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export const paddingChildStyles = css`
  div + div {
    margin-top: 30px;
  }
`;

export const ContentWrapper = styled.div<{paddingChild?: boolean}>`
  ${contentContainerStyles}
  ${({ paddingChild }) => (paddingChild ? paddingChildStyles : null)}
`;
