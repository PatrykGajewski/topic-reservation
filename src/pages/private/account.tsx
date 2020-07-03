import React from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import styled from 'styled-components';

import { ContainerWithHeader, ContainerWithHeaderRow } from '../components';
import { ScalableImg } from '../public';
import BirdsBg from '../../img/birdsBg.png';

const ContentWrapper = styled.div`
  background-image: url(${BirdsBg});
  background-repeat: repeat;
`;

const PhotoWrapper = styled.div`
  width: calc(100% - 40px);
  margin: 30px 20px;
  border-radius: 8px;
  border: 1px solid grey;
  text-align: center;
  background: white;
  
  svg {
    font-size: 7.8rem;
  }
`;

interface University {
    name: {
      full: string,
      shortcut: string | null,
    },
    faculty: {
      full: string,
      shortcut: string | null,
    },
    direction: {
      full: string,
      shortcut: string | null,
    },
    location: {
      city: string | null,
      country: string | null,
      province: string | null,
      zip: string | null,
      street: string | null,
      streetNumber: string | null,
    },
    startDate: string,
    endDate: string | null,
}

interface AccountPageProps {
  personalData: {
    firstName: string,
    lastName: string,
    birthDate: string,
    address: string,
    phoneNumber: string,
  },
  accountData: {
    email: string,
    creationDate: string,
    expirationDate: string,
  }
  educationData: {
    finishedUniversities: University[],
    actualUniversities: University[],
  },
  photoData: {
    link: string | null,
  }
}

const AccountPage = (props: AccountPageProps) => {
  const {
    firstName, lastName, birthDate, address, phoneNumber,
  } = props.personalData;

  const {
    email, creationDate, expirationDate,
  } = props.accountData;

  const {
    finishedUniversities, actualUniversities,
  } = props.educationData;

  const { link } = props.photoData;

  return (
    <ContentWrapper>
      <Grid container>
        <Grid item sm={3}>
          <PhotoWrapper>
            {link ? (
              <ScalableImg
                src={link}
                alt="User icon"
              />
            ) : (
              <FaceIcon />
            )}
          </PhotoWrapper>
        </Grid>
        <Grid item sm={9}>

          <ContainerWithHeader header="Personal">
            <ContainerWithHeaderRow header="Firstname" content={firstName || '-'} />
            <ContainerWithHeaderRow header="Lastname" content={lastName || '-'} />
            <ContainerWithHeaderRow header="Date of birth" content={birthDate || '-'} />
            <ContainerWithHeaderRow header="Address" content={address || '-'} />
            <ContainerWithHeaderRow header="Phone number" content={phoneNumber || '-'} />
          </ContainerWithHeader>

          <ContainerWithHeader header="Account">
            <ContainerWithHeaderRow header="Email" content={email} />
            <ContainerWithHeaderRow header="Creation date" content={creationDate} />
            <ContainerWithHeaderRow header="Expiration date" content={expirationDate} />
          </ContainerWithHeader>

          <ContainerWithHeader header="Education">
            {finishedUniversities.map((university: University) => (
              <>
                <ContainerWithHeaderRow header="Name" content={university.name.full} />
                <ContainerWithHeaderRow header="Department" content={university.faculty.full} />
                <ContainerWithHeaderRow header="Country" content={university.location.country || '-'} />
                <ContainerWithHeaderRow header="Final Date" content={university.endDate || '-'} />
              </>
            ))}
            <hr />
            {actualUniversities.map((university: University) => (
              <>
                <ContainerWithHeaderRow header="Name" content={university.name.full} />
                <ContainerWithHeaderRow header="Department" content={university.faculty.full} />
                <ContainerWithHeaderRow header="Country" content={university.location.country || '-'} />
                <ContainerWithHeaderRow header="Start date" content={university.startDate} />
              </>
            ))}
          </ContainerWithHeader>
        </Grid>
      </Grid>
    </ContentWrapper>

  );
};

export { AccountPage };
