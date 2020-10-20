import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Popup } from '../../components';
import { ScalableImg } from '../../public';
import {
  CurrentUniversityForm, FinishedUniversityForm, UserPersonalForm, UserPersonalValues,
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
import { AccountDataSection, EducationDataSection, PersonalDataSection } from './components';

import { ViewState } from '../models';
import { StateModel } from '/store/appState';

const AccountPage = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: StateModel) => ({
    personalData: {
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      birthDate: state.user.birthDate,
      address: state.user.address,
      phoneNumber: state.user.phoneNumber,
    },
    accountData: {
      email: state.user.email,
      creationDate: state.user.accountCreationDate,
      iconAdded: state.user.icon.uploaded,
      iconLink: state.user.icon.link,
    },
    educationData: {
      finishedUniversities: state.user.finishedUniversities,
      currentUniversities: state.user.currentUniversities,
    },
    id: state.user.id,
    success: state.success,
    error: state.error,
    loading: state.loading,
  }));
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

  const handlePersonalEditOpen = () => {
    setPersonalEditing(true);
  };

  const handlePersonalEditClose = () => {
    setPersonalEditing(false);
  };

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
    updatePersonalData(dataShape, stateData.id).then(() => {
      getUserData(stateData.id)(dispatch);
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
                {stateData.accountData.iconAdded ? (
                  <ScalableImg
                    src={stateData.accountData.iconLink}
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
                data={createPersonalData()}
              />

              <AccountDataSection
                data={createAccountData()}
              />

              <EducationDataSection
                data={createEducationData()}
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
                  initialValues={createPersonalDataEditValues()}
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
