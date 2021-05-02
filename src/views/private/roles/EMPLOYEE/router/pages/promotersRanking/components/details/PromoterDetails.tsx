import React from 'react';
import {Grid} from '@material-ui/core';
import {Props} from './models';
import {SectionRow} from '../../../../../../../components';
import {AvatarBox, AvatarBoxSize} from '../../../../../../../../components/AvatarBox';
import {UserDegree} from '../../../../../../../../../models/user';
import {mapDegreesIdsToDegrees, mapGenderToText} from '../../../../../../../../../utils/mappers';
import {getHighestDegree} from '../../../../../../../../../utils/getters';
import {OpinionsTable} from './components/table';
import {StyledInfoContainer, TableContainer} from "./styles";

export const PromoterDetails = (props: Props) => {
  const promoterDegrees: UserDegree[] = mapDegreesIdsToDegrees(props.promoter.degrees, props.degrees);
  const highestDegree: UserDegree | null = getHighestDegree(promoterDegrees);

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <AvatarBox
          avatarId={props.promoter.profilePhotoId}
          gender={props.promoter.gender}
          size={AvatarBoxSize.MEDIUM}
        />
      </Grid>
      <StyledInfoContainer container item xs={12} sm={8}>
        {highestDegree
          ? (<SectionRow header="Highest degree" content={highestDegree.pl.full} />)
          : null}
        <SectionRow header="Firstname" content={props.promoter.firstName} />
        <SectionRow header="Lastname" content={props.promoter.lastName} />
        <SectionRow header="Gender" content={mapGenderToText(props.promoter.gender)} />
        <SectionRow header="Email" content={props.promoter.email} />
      </StyledInfoContainer>
      <TableContainer item container xs={12}>
        {props.promoter.opinions.length > 0 ? (
          <OpinionsTable
            opinions={props.promoter.opinions}
            degrees={props.degrees}
          />
        ) : (
          <p>Promoter don&apos;t have any opinion</p>
        )}
      </TableContainer>
    </Grid>
  );
};
