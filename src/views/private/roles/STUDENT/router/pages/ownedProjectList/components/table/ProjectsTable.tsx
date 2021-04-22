import {
  Button, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import {
  withStyles, Theme, createStyles,
} from '@material-ui/core/styles';
import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Project } from '../../../../../../../../../models/project';
import { Props } from './models';
import { TableContainer, TagWrapper } from '../../styles';
import { SectionWithHeader } from '../../../../../../../../components';
import { mapProjectTypeToText } from '../../../../../../../../../utils/mappers';
import { DotsMenu } from '../../../../../../../../components/dotsMenu';

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: '#0a4f8a78',
    fontSize: '1.1rem',
    lineHeight: '1.2rem',
    textAlign: 'center',
    border: '1px solid grey',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const AvailableProjectsTable = (props: Props) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Topic</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>Tags</StyledTableCell>
          <StyledTableCell>Promoter</StyledTableCell>
          <StyledTableCell>Department</StyledTableCell>
          <StyledTableCell>Cathedral</StyledTableCell>
          <StyledTableCell>Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <tfoot>
        <tr>
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
        </tr>
      </tfoot>
      <TableBody>
        {props.projects.map((project: Project) => (
          <TableRow key={project.id}>
            <StyledTableCell>{project.topic}</StyledTableCell>
            <StyledTableCell>{project.description}</StyledTableCell>
            <StyledTableCell>{project.tags
              .map((tag) => (
                <TagWrapper>{tag.labelPL}</TagWrapper>
              ))}
            </StyledTableCell>
            <StyledTableCell>{`${project.promoter.firstName} ${project.promoter.lastName}`}</StyledTableCell>
            <StyledTableCell>{project.department.namePL.full}</StyledTableCell>
            <StyledTableCell>{project.cathedral.namePL}</StyledTableCell>
            <StyledTableCell>
              <DotsMenu actions={props.rowActions} element={project} />
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
