import styled, { css } from 'styled-components';
import { ReactComponent as MaleIcon } from '../../../../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../../../../icons/female.svg';

export const IconContainer = styled.div<{ size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  box-shadow: inset 0 0 2px 0 #0000008c;
  border-radius: 50%;
  margin: 5px;
  overflow: hidden;
`;

const genderIconStyles = css`
  width: 25px;
  height: 25px;
`;

export const StyledFemaleIcon = styled(FemaleIcon)`
  ${genderIconStyles}
`;

export const StyledMaleIcon = styled(MaleIcon)`
  ${genderIconStyles}
`;
