import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Project } from '../../../../../../../../../models/project';
import { Props } from './models';
import { TableContainer, TagWrapper } from '../../styles';
import { DotsMenu } from '../../../../../../../../components/dotsMenu';
import styled from 'styled-components';

const StyledTable = styled.table`
  display: block;
  position: relative;
  border-spacing: 0;
  height: 100%;
  overflow: hidden;
  background-color: #0b3b66;
`;

const StyledTableHead = styled.thead`
  display: block;
  width: calc(100% - 15px);
  
  tr {
    background-color: #0b3b66;
    color: white;
    & > th:last-child {
      border-right: 1px solid #0b3b66;
    }
  }
`;

const StyledTh = styled.th<{ width: string }>`
  line-height: 40px;
  text-align: center;
  border-right: 1px solid white;
  box-sizing: border-box;
  width: ${(props) => props.width};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledTableBody = styled.tbody`
  display: block;
  height: calc(100% - 92px);
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  margin-bottom: 52px;
  background-color: white;
`;

const StyledTr = styled.tr`
  display: flex;
`;

const StyledTd = styled.td<{ width: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  padding: 0 4px;
  border: 1px solid #0b3b66;
  box-sizing: border-box;
  width: ${(props) => props.width};
/*  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;*/
  background: white;
`;

const StyledTableFoot = styled.tfoot`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #0b3b66;
  width: 100%;
  height: 52px;
`;

enum ColumnWidth {
  Topic = '25%',
  Description = '10%',
  Tags = '10%',
  Promoter = '20%',
  Department = '15%',
  Cathedral = '15%',
  Actions = '5%'
}

export const AvailableProjectsTable = (props: Props) => (
  <TableContainer>
    <StyledTable>
      <StyledTableHead>
        <StyledTr>
          <StyledTh width={ColumnWidth.Topic}>Topic</StyledTh>
          <StyledTh width={ColumnWidth.Description}>Description</StyledTh>
          <StyledTh width={ColumnWidth.Tags}>Tags</StyledTh>
          <StyledTh width={ColumnWidth.Promoter}>Promoter</StyledTh>
          <StyledTh width={ColumnWidth.Department}>Department</StyledTh>
          <StyledTh width={ColumnWidth.Cathedral}>Cathedral</StyledTh>
          <StyledTh width={ColumnWidth.Actions}>Actions</StyledTh>
        </StyledTr>
      </StyledTableHead>
      <StyledTableFoot>
        <StyledTr>
          <td colSpan={7}>
            <TablePagination
              component="div"
              count={props.count}
              page={props.page}
              onChangePage={props.onChangePage}
              rowsPerPage={props.rowsPerPage}
              onChangeRowsPerPage={props.onChangeRowsPerPage}
            />
          </td>
        </StyledTr>
      </StyledTableFoot>
      <StyledTableBody>
        {props.projects.map((project: Project) => (
          <StyledTr key={project.id}>
            <StyledTd width={ColumnWidth.Topic}>{project.topic}</StyledTd>
            <StyledTd width={ColumnWidth.Description}>{project.description}</StyledTd>
            <StyledTd width={ColumnWidth.Tags}>{project.tags
              .map((tag) => (
                <TagWrapper>{tag.labelPL}</TagWrapper>
              ))}
            </StyledTd>
            <StyledTd width={ColumnWidth.Promoter}>{`${project.promoter.firstName} ${project.promoter.lastName}`}</StyledTd>
            <StyledTd width={ColumnWidth.Department}>{project.department.namePL.full}</StyledTd>
            <StyledTd width={ColumnWidth.Cathedral}>{project.cathedral.namePL}</StyledTd>
            <StyledTd width={ColumnWidth.Actions}>
              <DotsMenu actions={props.rowActions} element={project} />
            </StyledTd>
          </StyledTr>
        ))}
      </StyledTableBody>
    </StyledTable>
  </TableContainer>
);
