import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const StyledErrorList = styled.ul``;
const StyledErrorItem = styled.li`
 color: #fd1313;
`;

const BarRow = styled(Grid)`
  margin: 10px;
`;

export {
  StyledErrorItem,
  StyledErrorList,
  BarRow,
};
