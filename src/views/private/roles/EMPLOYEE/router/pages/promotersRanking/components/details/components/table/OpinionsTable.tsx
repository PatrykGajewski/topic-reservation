import React from 'react';

import { Props } from './models';
import { TableContainer } from '../../../../../../../../STUDENT/router/pages/ownedProjectList';
import {
  StyledTable, StyledTableBody, StyledTableFoot,
  StyledTableHead, StyledTd, StyledTh,
  StyledTr,
} from '../../../../../../../../STUDENT/router/pages/ownedProjectList/components';
import { Opinion } from '../../../../services';
import { UserDegree } from '../../../../../../../../../../../models/user';
import {mapDegreesIdsToDegrees, mapProjectDegreeToText} from '../../../../../../../../../../../utils/mappers';
import { getHighestDegree } from '../../../../../../../../../../../utils/getters';
import { AvatarBox, AvatarBoxSize } from '../../../../../../../../../../components/AvatarBox';

enum ColumnWidth {
  Photo = '10%',
  Author = '20%',
  ProjectDegree = '17%',
  Content = '45%',
  Grade = '8%',
}

export const OpinionsTable = (props: Props) => (
  <TableContainer>
    <StyledTable maxHeight="400px">
      <StyledTableHead>
        <StyledTr>
          <StyledTh width={ColumnWidth.Photo}>Photo</StyledTh>
          <StyledTh width={ColumnWidth.Author}>Author</StyledTh>
          <StyledTh width={ColumnWidth.ProjectDegree}>Project degree</StyledTh>
          <StyledTh width={ColumnWidth.Content}>Content</StyledTh>
          <StyledTh width={ColumnWidth.Grade}>Grade</StyledTh>
        </StyledTr>
      </StyledTableHead>
      <StyledTableFoot />
      <StyledTableBody>
        {props.opinions.map((opinion: Opinion) => {
          const promoterDegrees: UserDegree[] = mapDegreesIdsToDegrees(opinion.author.degrees, props.degrees);
          const highestDegree: UserDegree | null = getHighestDegree(promoterDegrees);

          return (
            <StyledTr key={opinion.id}>
              <StyledTd width={ColumnWidth.Photo}>
                <AvatarBox
                  avatarId={opinion.author.profilePhotoId}
                  gender={opinion.author.gender}
                  size={AvatarBoxSize.MINI}
                />
              </StyledTd>
              <StyledTd width={ColumnWidth.Author}>{highestDegree
                ? `${highestDegree.pl.short} ${opinion.author.firstName} ${opinion.author.lastName}`
                : `${opinion.author.firstName} ${opinion.author.lastName}`}
              </StyledTd>
              <StyledTd width={ColumnWidth.ProjectDegree}>{mapProjectDegreeToText(opinion.subject.degree)}</StyledTd>
              <StyledTd width={ColumnWidth.Content}>{opinion.content}</StyledTd>
              <StyledTd width={ColumnWidth.Grade}>{opinion.grade}</StyledTd>
            </StyledTr>
          );
        })}
      </StyledTableBody>
    </StyledTable>
  </TableContainer>
);
