import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ContainerWithHeader, ContainerWithHeaderRow, Popup } from '../components';
import { ScalableImg } from '../public';
import BirdsBg from '../../img/birdsBg.png';
import { UserAddress } from '../../models';
import { UserPersonalForm, UserPersonalValues } from './forms';
import { API } from '../../API';
import { UserDataFetched, UserDataFetching, UserDataFetchingError } from '../../store/actions';

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

export interface PersonalData {
  firstName: string,
  lastName: string,
  birthDate: string,
  address: UserAddress | null,
  phoneNumber: string,
}
interface AccountPageProps {
  error: string,
  loading: boolean,
  success: boolean,
  id: string,
  personalData: PersonalData,
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

const emptyUserAddress: UserAddress = {
  country: '',
  region: '',
  city: '',
  zip: '',
  streetName: '',
  buildingNumber: '',
  flatNumber: '',
};

const createAddressData = (address: UserAddress | null): UserAddress => {
  if (address) {
    return address;
  }
  return emptyUserAddress;
};

// TODO move update function to one place
const updatePersonalData = async (personalData: any, userId: string) => {
  try {
    const { data, error } = await API.patch(`/users/${userId}`, personalData);

    if (error) {
      console.error(error);
      return Promise.reject();
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.resolve();
    }
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

const refresh = (userId: string) => async (dispatch: any) => {
  try {
    dispatch({ ...new UserDataFetching() });
    // @ts-ignore
    const { data, error } = await API.get(`/users/${userId}`);
    if (error) {
      console.error(error);
      dispatch({ ...new UserDataFetchingError(error.message) });
    } else {
      console.log(data);
      dispatch({ ...new UserDataFetched(data) });
    }
  } catch (err) {
    console.error(err);
    dispatch({ ...new UserDataFetchingError(err.message) });
  }
};

const AccountPage = (props: AccountPageProps) => {
  const dispatch = useDispatch();
  const [personalEditing, setPersonalEditing] = useState(false);
  const [accountEditing, setAccountEditing] = useState(false);
  const [educationEditing, setEducationEditing] = useState(false);

  const handlePersonalSubmit = (values: UserPersonalValues) => {
    const dataShape = {
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate,
      address: {
        country: values.country,
        region: values.region,
        city: values.city,
        zip: values.zip,
        streetName: values.streetName,
        buildingNumber: values.buildingNumber,
        flatNumber: values.flatNumber,
      },
    };
    updatePersonalData(dataShape, props.id).then(() => {
      refresh(props.id)(dispatch);
    });
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
    <>
      {props.error && (
        <div>Error message: {props.error}</div>
      )}
      {props.loading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} // 3 secs
        />
      )}
      {props.success && (
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
                <ContainerWithHeaderRow header="Date of birth" content={new Date(birthDate).toLocaleDateString() || '-'} />
                {address !== null && (
                  <>
                    <ContainerWithHeaderRow header="Country" content={address.country ? address.country : '-'} />
                    <ContainerWithHeaderRow header="Region" content={address.region ? address.region : '-'} />
                    <ContainerWithHeaderRow header="City" content={address.city ? address.city : '-'} />
                    <ContainerWithHeaderRow header="Post code" content={address.zip ? address.zip : '-'} />
                    <ContainerWithHeaderRow header="Street number" content={address.streetName ? address.streetName : '-'} />
                    <ContainerWithHeaderRow header="Flat number" content={address.flatNumber ? address.flatNumber : '-'} />
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
              handleClose={() => setPersonalEditing(false)}
              header="Personal data"
            >
              <div>
                <UserPersonalForm
                  values={{
                    firstName,
                    lastName,
                    birthDate,
                    ...createAddressData(address),
                  }}
                  onSubmit={handlePersonalSubmit}
                  handleClose={() => setPersonalEditing(false)}
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
      )}
    </>
  );
};

export { AccountPage };
