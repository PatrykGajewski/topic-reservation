import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Rating from '@material-ui/lab/Rating';
import {TableContainer} from '../../../../../../STUDENT/router/pages/ownedProjectList';
import {Props} from './model';

import {
  StyledTable,
  StyledTableBody,
  StyledTableFoot,
  StyledTableHead,
  StyledTd,
  StyledTh,
  StyledTr,
} from '../../../../../../STUDENT/router/pages/ownedProjectList/components';
import {Opinion, SimplifiedUserWithOpinions} from '../../services';
import {AvatarBox, AvatarBoxSize} from '../../../../../../../../components/AvatarBox';
import styled from "styled-components";
import {getHighestDegree} from "utils/getters";
import {mapDegreesIdsToDegrees} from "../../../../../../../../../utils/mappers/map-degreesIds-to-degrees";
import {UserDegree} from "../../../../../../../../../models/user";

const StyledRatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 4px;

  p {
    margin-block-start: 5px;
    margin-block-end: 8px;
  }
`;

enum ColumnWidth {
  Photo = '10%',
  Title = '15%',
  NameSurname = '25%',
  Email = '15%',
  Ranking = '10%',
  Rating = '25%',
}

const mapRatingToText = (rating: number): string => {
  switch (rating) {
  case 0:
    return 'Nie oceniono';
  case 1:
    return 'Nieodpowiedni';
  case 2:
    return 'Średni';
  case 3:
    return 'Dobry';
  case 4:
    return 'Bardzo dobry';
  case 5:
    return 'Fantastyczny';
  default:
    return '';
  }
};

export const PromotersTable = (props: Props) => (
  <TableContainer>
    <StyledTable>
      <StyledTableHead>
        <StyledTr>
          <StyledTh width={ColumnWidth.Photo}>Photo</StyledTh>
          <StyledTh width={ColumnWidth.Title}>Degree</StyledTh>
          <StyledTh width={ColumnWidth.NameSurname}>Name & Surname</StyledTh>
          <StyledTh width={ColumnWidth.Email}>Email</StyledTh>
          <StyledTh width={ColumnWidth.Ranking}>Rank</StyledTh>
          <StyledTh width={ColumnWidth.Rating}>Rating</StyledTh>
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
        {props.promoters.map((promoter: SimplifiedUserWithOpinions, index: number) => {
          const rating: number = promoter.opinions.length
            ? promoter.opinions
              .map((opinion: Opinion) => opinion.grade)
              .reduce((current: number, acc: number) => acc += current, 0) / promoter.opinions.length
            : 0;

          const promoterDegrees: UserDegree[] = mapDegreesIdsToDegrees(promoter.degrees, props.degrees);
          const highestDegree: UserDegree | null = getHighestDegree(promoterDegrees);

          return (
            <StyledTr key={promoter.id} clickable onClick={() => props.onRowClick(promoter)}>
              <StyledTd width={ColumnWidth.Photo}>
                <AvatarBox
                  avatarId={promoter.profilePhotoId}
                  gender={promoter.gender}
                  size={AvatarBoxSize.MINI}
                />
              </StyledTd>
              <StyledTd width={ColumnWidth.Title}>{highestDegree ? highestDegree.pl.full : '-'}</StyledTd>
              <StyledTd width={ColumnWidth.NameSurname}>{`${promoter.firstName} ${promoter.lastName}`}</StyledTd>
              <StyledTd width={ColumnWidth.Email}>{promoter.email}</StyledTd>
              <StyledTd width={ColumnWidth.Ranking}>{promoter.rank}</StyledTd>
              <StyledTd width={ColumnWidth.Rating}>
                <StyledRatingContainer>
                  <Rating name="read-only" value={rating} readOnly />
                  <p>{mapRatingToText(rating)}</p>
                </StyledRatingContainer>
              </StyledTd>
            </StyledTr>
          );
        })}
      </StyledTableBody>
    </StyledTable>
  </TableContainer>
);
