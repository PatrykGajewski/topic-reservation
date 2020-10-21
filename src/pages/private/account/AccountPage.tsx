import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { UserAddress, UserGender, UserRole } from 'models/user';
import { CurrentUniversity, FinishedUniversity } from 'models/university';
import { Popup } from '../../components';
import { ScalableImg } from '../../public';
import {
  CurrentUniversityForm, FinishedUniversityForm, UserPersonalForm, PersonalSectionValues,
} from './forms';

import { ContentWrapper, PhotoWrapper } from './css';
import { CurrentUniversityValues, FinishedUniversityValues } from './models';
import {
  createAccountData,
  createEducationData,
  createPersonalData,
  createPersonalDataEditValues,
  getUserData,
  updatePersonalData,
} from './helpers';
import {
  AccountDataSection,
  AccountSectionData,
  EducationDataSection,
  EducationSectionData,
  PersonalDataSection,
  PersonalSectionData,
} from './components';

import { ViewState } from '../models';
import { AppState } from 'store/appState';

interface ViewData {
  personalData: PersonalSectionData,
  accountData: AccountSectionData,
  educationData: EducationSectionData
}

export interface PersonalStateData {
  firstName: string,
  lastName: string | null,
  birthDate: string | null,
  address: UserAddress | null,
  phoneNumber: string | null,
  gender: UserGender,
}

export interface AccountStateData {
  accountId: string,
  email: string,
  roles: UserRole[],
  creationDate: string,
  icon: {
    link: string,
    added: boolean,
  }
}

export interface EducationStateData {
  finishedUniversities: FinishedUniversity[],
  currentUniversities: CurrentUniversity[],
}

export interface PageStateData {
  success: boolean,
  loading: boolean,
  error: any,
}

interface StateData {
  personalData: PersonalStateData,
  accountData: AccountStateData,
  educationData: EducationStateData,
  pageData: PageStateData,
}

const AccountPage = () => {
  const dispatch = useDispatch();
  const stateData: StateData = useSelector((state: AppState):StateData => ({
    personalData: {
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      birthDate: state.user.birthDate,
      address: state.user.address,
      phoneNumber: state.user.phoneNumber,
      gender: state.user.gender,
    },
    accountData: {
      accountId: state.user.id,
      email: state.user.email,
      creationDate: state.user.accountCreationDate,
      icon: state.user.icon,
      roles: state.user.roles,
    },
    educationData: {
      finishedUniversities: state.user.finishedUniversities,
      currentUniversities: state.user.currentUniversities,
    },
    pageData: {
      success: state.success,
      error: state.error,
      loading: state.loading,
    },
  }));
  const [viewData, setViewData] = useState<ViewData>({
    personalData: createPersonalData(stateData.personalData),
    accountData: createAccountData(stateData.accountData),
    educationData: createEducationData(stateData.educationData),
  });
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [personalEditing, setPersonalEditing] = useState<boolean>(false);
  const [finishedUniversityEditing, setFinishedUniversityEditing] = useState<boolean>(false);
  const [currentUniversityEditing, setCurrentUniversityEditing] = useState<boolean>(false);
  const [finishedUniversityValues, setFinishedUniversityValues] = useState<FinishedUniversityValues>({
    universityId: '',
    departmentId: '',
    startDate: '',
    endDate: '',
    degreeId: '',
  });

  const [currentUniversityValues, setCurrentUniversityValues] = useState<CurrentUniversityValues>({
    universityId: '',
    departmentId: '',
    startDate: '',
  });

  useEffect(() => {
    setViewState(ViewState.OK);
  }, []);

  // TODO verify what is wrong with below effect
/*
  useEffect(() => {
    setViewData({
      accountData: createAccountData(stateData.accountData),
      personalData: createPersonalData(stateData.personalData),
      educationData: createEducationData(stateData.educationData),
    });
  }, [stateData.personalData, stateData.accountData, stateData.educationData]);
*/

  const handlePersonalEditOpen = () => {
    setPersonalEditing(true);
  };

  const handlePersonalEditClose = () => {
    setPersonalEditing(false);
  };

  const handlePersonalSubmit = (values: PersonalSectionValues) => {
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
    updatePersonalData(dataShape, stateData.accountData.accountId).then(() => {
      getUserData(stateData.accountData.accountId)(dispatch);
    });
    setPersonalEditing(false);
  };

  const handleFinishedUniversityEditOpen = (values: FinishedUniversityValues) => {
    setFinishedUniversityValues(values);
    setFinishedUniversityEditing(true);
  };

  const handleFinishedUniversityEditClose = () => {
    setFinishedUniversityEditing(false);
  };

  const handleFinishedUniversitySubmit = () => {
    // API request
    setFinishedUniversityEditing(false);
  };

  const handleCurrentUniversityEditOpen = (values: CurrentUniversityValues) => {
    setCurrentUniversityValues(values);
    setCurrentUniversityEditing(true);
  };

  const handleCurrentUniversityEditClose = () => {
    setCurrentUniversityEditing(false);
  };

  const handleCurrentUniversitySubmit = () => {
    // API request
    setCurrentUniversityEditing(false);
  };

  return (
    <>
      {viewState === ViewState.ERROR && (
        <div>Error occured</div>
      )}
      {viewState === ViewState.LOADING && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} // 3 secs
        />
      )}
      {viewState === ViewState.OK && (
        <ContentWrapper>
          <Grid container>
            <Grid item sm={3}>
              <PhotoWrapper>
                {stateData.accountData.icon.added ? (
                  <ScalableImg
                    src={stateData.accountData.icon.link}
                    alt="User icon"
                  />
                ) : (
                  <FaceIcon />
                )}
              </PhotoWrapper>
            </Grid>
            <Grid item sm={9}>

              <PersonalDataSection
                handleEdit={handlePersonalEditOpen}
                data={viewData.personalData}
              />

              <AccountDataSection
                data={viewData.accountData}
              />

              <EducationDataSection
                data={viewData.educationData}
                onFinishedUniversityEditOpen={handleFinishedUniversityEditOpen}
                onCurrentUniversityEditOpen={handleCurrentUniversityEditOpen}
              />

            </Grid>
          </Grid>
          {personalEditing && (
            <Popup
              handleClose={handlePersonalEditClose}
              header="Personal data"
            >
              <div>
                <UserPersonalForm
                  initialValues={createPersonalDataEditValues(stateData.personalData)}
                  onSubmit={handlePersonalSubmit}
                  handleClose={handlePersonalEditClose}
                />
              </div>
            </Popup>

          )}
          {finishedUniversityEditing && (
            <Popup
              handleClose={handleFinishedUniversityEditClose}
              header="Finished study editing"
            >
              <FinishedUniversityForm
                initialValues={finishedUniversityValues}
                onSubmit={handleFinishedUniversitySubmit}
                handleClose={handleFinishedUniversityEditClose}
              />
            </Popup>
          )}
          {currentUniversityEditing && (
            <Popup
              handleClose={handleCurrentUniversityEditClose}
              header="Current study editing"
            >
              <CurrentUniversityForm
                initialValues={currentUniversityValues}
                onSubmit={handleCurrentUniversitySubmit}
                handleClose={handleCurrentUniversityEditClose}
              />
            </Popup>
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export { AccountPage };
