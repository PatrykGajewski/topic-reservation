import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const StyledErrorList = styled.ul``;
const StyledErrorItem = styled.li`
 color: #fd1313;
`;

const BarRow = styled(Grid)`
  margin: 10px;
`;

const StyledFileSelectionContainer = styled.div`
  & > span {
    display: block;
    margin: 8px 0;
  }

`;

const StyledInput = styled.input`
  display: none;
`;

export {
  StyledErrorItem,
  StyledErrorList,
  BarRow,
  StyledInput,
  StyledFileSelectionContainer
};
