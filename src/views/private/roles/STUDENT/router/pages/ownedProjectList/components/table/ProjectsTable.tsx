import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import styled, { css } from 'styled-components';
import { Project, Tag } from '../../../../../../../../../models/project';
import { Props } from './models';
import { TableContainer, TagWrapper } from '../../styles';
import { DotsMenu } from '../../../../../../../../components/dotsMenu';
import { SimplifiedUser } from '../../../../../../../../../models/user';

export const StyledTable = styled.table<{maxHeight?: string}>`
  display: block;
  position: relative;
  border-spacing: 0;
  height: 100%;
  overflow: hidden;
  background-color: #0b3b66;
  ${({ maxHeight }) => (maxHeight ? `max-height:${maxHeight};` : null)}
`;

export const StyledTableHead = styled.thead`
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

export const StyledTh = styled.th<{ width: string }>`
  line-height: 40px;
  text-align: center;
  border-right: 1px solid white;
  box-sizing: border-box;
  width: ${(props) => props.width};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledTableBody = styled.tbody`
  display: block;
  height: calc(100% - 92px);
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  margin-bottom: 52px;
  background-color: white;
`;

const clickableTrStyles = css`
  &:hover {
    td {
      background: #083b661c;
      cursor: pointer;
    }
  }
`;

export const StyledTr = styled.tr<{clickable?: boolean}>`
  display: flex;
  
   ${({ clickable }) => (clickable ? clickableTrStyles : null)}
`;

export const StyledTd = styled.td<{ width: string}>`
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

export const StyledTableFoot = styled.tfoot`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #0b3b66;
  width: 100%;
  height: 52px;
`;

export const StyledTagsContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
`;

enum ColumnWidth {
  Topic = '25%',
  Description = '10%',
  Owners = '15%',
  Promoter = '15%',
  Tags = '10%',
  Department = '5%',
  Cathedral = '15%',
  Actions = '5%'
}

export const ProjectsTable = (props: Props) => (
  <TableContainer>
    <StyledTable>
      <StyledTableHead>
        <StyledTr>
          <StyledTh width={ColumnWidth.Topic}>Topic</StyledTh>
          <StyledTh width={ColumnWidth.Description}>Description</StyledTh>
          <StyledTh width={ColumnWidth.Promoter}>Promoter</StyledTh>
          <StyledTh width={ColumnWidth.Owners}>Owners</StyledTh>
          <StyledTh width={ColumnWidth.Tags}>Tags</StyledTh>
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
          <StyledTr key={project.id} clickable onClick={() => props.onRowClick(project)}>
            <StyledTd width={ColumnWidth.Topic}>{project.topic}</StyledTd>
            <StyledTd width={ColumnWidth.Description}>{project.description}</StyledTd>
            <StyledTd width={ColumnWidth.Promoter}>{`${project.promoter.firstName} ${project.promoter.lastName}`}</StyledTd>
            <StyledTd width={ColumnWidth.Owners}>{project.owners.map((owner: SimplifiedUser) => `${owner.firstName} ${owner.lastName}`).join(' ,')}</StyledTd>
            <StyledTd width={ColumnWidth.Tags}>
              <StyledTagsContainer>
                {project.tags.map((tag: Tag) => <TagWrapper key={tag.id}>{tag.labelPL}</TagWrapper>)}
              </StyledTagsContainer>
            </StyledTd>
            <StyledTd width={ColumnWidth.Department}>{project.department.namePL.short}</StyledTd>
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
