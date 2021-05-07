import React from 'react';
import { Form, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Rating } from '@material-ui/lab';
import { FieldsRow } from '../../../../../../../../public/router/pages/register/components';
import { Props } from './models';
import {
  mapRatingToText,
  StyledRatingContainer,
} from '../../../../../../EMPLOYEE/router/pages/promotersRanking/components';
import { PromoterOpinionValidation } from './validation';
import { UserDegree } from '../../../../../../../../../models/user';
import {
  mapDegreesIdsToDegrees,
  mapGenderToText,
  mapProjectDegreeToText, mapProjectStatusToText, mapProjectTypeToText
} from '../../../../../../../../../utils/mappers';
import { getHighestDegree } from '../../../../../../../../../utils/getters';
import { AvatarBox, AvatarBoxSize } from '../../../../../../../../components/AvatarBox';
import {SectionRow, SectionWithHeader} from "../../../../../../../components";
import { Grid } from "@material-ui/core";
import { StyledInfoContainer } from "../../../../../../EMPLOYEE/router/pages/promotersRanking/components/details";
import styled from "styled-components";
import { FieldWrapper } from "../../../../../../../../public/router/pages/register/components";

const StyleFormContainer = styled.div`
  & > div + div {
    margin-top: 30px
  }
`;

export const PromoterOpinionForm = (props: Props) => {
  const promoterDegrees: UserDegree[] = mapDegreesIdsToDegrees(props.project.promoter.degrees, props.degrees);
  const highestDegree: UserDegree | null = getHighestDegree(promoterDegrees);

  return (
    <StyleFormContainer>
      <SectionWithHeader header="Opinion target" noMargin>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <AvatarBox
              avatarId={props.project.promoter.profilePhotoId}
              gender={props.project.promoter.gender}
              size={AvatarBoxSize.MEDIUM}
            />
          </Grid>
          <StyledInfoContainer container item xs={12} sm={8}>
            {highestDegree && (
              <SectionRow header="Highest degree" content={highestDegree.pl.full} />
            )}
            <SectionRow header="Name & Surname" content={`${props.project.promoter.firstName} ${props.project.promoter.lastName}`} />
            <SectionRow header="Gender" content={mapGenderToText(props.project.promoter.gender)} />
            <SectionRow header="Email" content={props.project.promoter.email} />
          </StyledInfoContainer>
        </Grid>
      </SectionWithHeader>
      <SectionWithHeader header="Opinion subject" noMargin>
        <StyledInfoContainer>
          <SectionRow header="Topic" content={props.project.topic} />
          <SectionRow header="Description" content={props.project.description} />
          <SectionRow header="Degree" content={mapProjectDegreeToText(props.project.degree)} />
          <SectionRow header="Type" content={mapProjectTypeToText(props.project.type)} />
          <SectionRow header="Is group project" content={props.project.groupProject ? 'Tak' : 'Nie'} />
          <SectionRow header="Status" content={mapProjectStatusToText(props.project.status)} />
        </StyledInfoContainer>
      </SectionWithHeader>
      <div>
        <Formik
          initialValues={props.initialValues}
          onSubmit={props.onSubmit}
          validationSchema={PromoterOpinionValidation}
        >
          {({
              values, errors, setFieldValue, touched,
            }) => (
            <Form>
              <FieldsRow>
                <FieldWrapper>
                  <TextField
                    variant="outlined"
                    name="content"
                    label="Opinion content"
                    fullWidth
                    helperText={touched.content ? errors.content : ''}
                    error={touched.content && Boolean(errors.content)}
                    value={values.content}
                    onChange={(e) => setFieldValue('content', e.currentTarget.value)}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <StyledRatingContainer>
                    <Rating
                      name="simple-controlled"
                      value={values.grade}
                      onChange={(event, newValue) => {
                        setFieldValue('grade', newValue);
                      }}
                    />
                    <p>{mapRatingToText(values.grade)}</p>
                  </StyledRatingContainer>
                </FieldWrapper>
              </FieldsRow>
              <button
                type="submit"
                ref={props.submitBtnRef}
                style={{
                  opacity: 0,
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </StyleFormContainer>
  );
};
