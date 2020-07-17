import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import styled from 'styled-components';

import { ContainerWithHeader, ContainerWithHeaderRow, Popup } from '../components';
import { ScalableImg } from '../public';
import BirdsBg from '../../img/birdsBg.png';
import { UserAddress } from '../../models';
import { UserPersonalForm, UserPersonalValues } from './forms';

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
    address: UserAddress | null,
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
  const [personalEditing, setPersonalEditing] = useState(false);
  const [accountEditing, setAccountEditing] = useState(false);
  const [educationEditing, setEducationEditing] = useState(false);

  const handlePersonalSubmit = (values: UserPersonalValues) => {
    // api call here
    setPersonalEditing(false);
  };
  const handleAccountSubmit = () => {
    setAccountEditing(false);
  };
  const handleEducationEditing = () => {
    setEducationEditing(false);
  };

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

          <ContainerWithHeader
            header="Personal"
            editable
            handleEdit={() => setPersonalEditing(true)}
          >
            <ContainerWithHeaderRow header="Firstname" content={firstName || '-'} />
            <ContainerWithHeaderRow header="Lastname" content={lastName || '-'} />
            <ContainerWithHeaderRow header="Date of birth" content={birthDate || '-'} />
            {address !== null && (
              <>
                <ContainerWithHeaderRow header="Country" content={address.country ? address.country.name : '-'} />
                <ContainerWithHeaderRow header="Region" content={address.state ? address.state.name : '-'} />
                <ContainerWithHeaderRow header="City" content={address.city ? address.city.name : '-'} />
                <ContainerWithHeaderRow header="Post code" content={address.zip ? address.zip : '-'} />
                <ContainerWithHeaderRow header="Street number" content={address.streetName ? address.streetName : '-'} />
                <ContainerWithHeaderRow header="Building number" content={address.buildingNumber ? address.buildingNumber : '-'} />
              </>
            )}
            <ContainerWithHeaderRow header="Phone number" content={phoneNumber || '-'} />
          </ContainerWithHeader>

          <ContainerWithHeader
            header="Account"
            editable
            handleEdit={() => setAccountEditing(true)}
          >
            <ContainerWithHeaderRow header="Email" content={email} />
            <ContainerWithHeaderRow header="Creation date" content={creationDate} />
            <ContainerWithHeaderRow header="Expiration date" content={expirationDate} />
          </ContainerWithHeader>

          <ContainerWithHeader
            header="Education"
            editable
            handleEdit={() => setEducationEditing(true)}
          >
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
      {personalEditing && (
        <Popup
          handleSubmit={() => {}}
          handleClose={() => setPersonalEditing(false)}
          header="Personal data"
        >
          <div>
            <UserPersonalForm
              values={{
                firstName,
                lastName,
                birthDate,
                country: address?.country?.id || null,
                state: address?.state?.id || null,
                city: address?.city?.id || null,
                zip: address?.zip || '',
                streetName: address?.streetName || '',
                buildingNumber: address?.buildingNumber || '',
              }}
              onSubmit={handlePersonalSubmit}
            />
          </div>
        </Popup>

      )}
      {accountEditing && (
        <div>
          Account editing
        </div>
      )}
      {educationEditing && (
        <div>
          Education editing
        </div>
      )}
    </ContentWrapper>
  );
};

export { AccountPage };
