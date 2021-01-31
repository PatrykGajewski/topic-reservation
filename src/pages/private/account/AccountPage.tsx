import React, {ChangeEvent, useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import {useDispatch, useSelector} from 'react-redux';
import Loader from 'react-loader-spinner';
import {UserAddress, UserGender, UserModel, UserRole,} from 'models/user';
import {AppState} from 'store/appState';
import {ButtonType, Popup} from '../../components';
import {ErrorWrapper, LoginFormContainer, ScalableImg} from '../../public';
import {PersonalSectionValues, UserPersonalForm} from './forms';

import {ContentWrapper, PhotoWrapper, PopupContentWrapper} from './css';

import {
  createAccountData,
  createPersonalData,
  createPersonalDataEditValues,
  getUserData,
  updatePersonalData,
} from './helpers';

import {AccountDataSection, AccountSectionData, PersonalDataSection, PersonalSectionData,} from './components';

import {ViewState} from '../models';
import {API} from '../../../API';
import LoginForm from '../../public/components/loginForm';
import {UserDataFetched} from '../../../store/actions';

interface ViewData {
  personalData: PersonalSectionData,
  accountData: AccountSectionData,
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
  userId: string,
  email: string,
  roles: UserRole[],
  creationDate: string,
  updateDate: string,
  profilePhotoId: string | null
}

export interface PageStateData {
  success: boolean,
  loading: boolean,
  error: any,
}

interface StateData {
  personalData: PersonalStateData,
  accountData: AccountStateData,
  pageData: PageStateData,
  user: UserModel,
}

enum ImagesFileExtension {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  BMP = 'bmp',
}

const properImageFileExtensions: ImagesFileExtension[] = [ImagesFileExtension.BMP, ImagesFileExtension.JPG, ImagesFileExtension.JPEG, ImagesFileExtension.PNG];

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
      userId: state.user.id,
      email: state.user.email,
      creationDate: state.user.createdAt,
      updateDate: state.user.updatedAt,
      profilePhotoId: state.user.profilePhotoId,
      roles: state.user.roles,
    },
    pageData: {
      success: state.success,
      error: state.error,
      loading: state.loading,
    },
    user: state.user,
  }));
  const [viewData, setViewData] = useState<ViewData>({
    personalData: createPersonalData(stateData.personalData),
    accountData: createAccountData(stateData.accountData),
  });
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [personalEditing, setPersonalEditing] = useState<boolean>(false);
  const [accountConfirmModalOpen, setAccountConfirmModalOpen] = useState<boolean>(false);
  const [accountConfirmationError, setAccountConfirmationError] = useState(false);
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);

  const [profilePhoto, setProfilePhoto] = useState<{data: string, contentType: string} | null>(null);

  const fetchProfilePhoto = () => {
    API.get(`/images/${stateData.accountData.profilePhotoId}`)
      .then((res) => {
        setProfilePhoto(res.data);
      })
      .catch((e) => {
        setProfilePhoto(null);
      });
  };

  useEffect(() => {
    setViewState(ViewState.OK);
    fetchProfilePhoto();
  }, []);

  useEffect(() => {
    setViewData({
      personalData: createPersonalData(stateData.personalData),
      accountData: createAccountData(stateData.accountData),
    });
  }, [stateData.user]);

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
        city: values.city,
        zip: values.zip,
        streetName: values.streetName,
        buildingNumber: values.buildingNumber,
        flatNumber: values.flatNumber,
      },
    };
    updatePersonalData(dataShape, stateData.accountData.userId)
      .then(() => {
        getUserData(stateData.accountData.userId)(dispatch);
      });
    setPersonalEditing(false);
  };

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileExtension: string | null = (e.target.files && e.target.files.length && e.target.files[0].type.split('/')[1]) || null;
    if (fileExtension && properImageFileExtensions.includes(fileExtension as ImagesFileExtension) && e.target.files) {
      setPhotoToUpload(e.target.files[0]);
    } else {
      console.log('wrong file type');
    }
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();

    if (photoToUpload) {
      // NOTE this is required step because multer pck take field name with image
      const form = new FormData();
      form.append('image', photoToUpload);
      form.append('name', photoToUpload.name);
      form.append('size', photoToUpload.size.toString());
      form.append('type', photoToUpload.type);

      API.post('/images/uploadImage', form)
        .then((res: any) => {
        })
        .catch((e: any) => {
          console.error(e);
        });
    }
  };

  const handleAccountConfirmation = () => {
    new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    }).then(() => {
      setAccountConfirmationError(false);
      setAccountConfirmModalOpen(false);

      dispatch({
        ...new UserDataFetched(
          {
            ...stateData.user,
            roles: [...stateData.user.roles, UserRole.STUDENT],
          },
        ),
      });
    }).catch((error: any) => {
      setAccountConfirmationError(true);
    });
  };

  return (
    <>
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
                {profilePhoto !== null ? (
                  <ScalableImg
                    src={`data:${profilePhoto.contentType};base64,${profilePhoto.data}`}
                    alt="User icon"
                  />
                ) : (
                  <>
                    <FaceIcon />
                    <form>
                      <label htmlFor="photoInput">Upload image</label>
                      <input
                        name="photoInput"
                        type="file"
                        onChange={onFileUploadChange}
                        accept=".jpg, .jpeg, .png, .bmp"
                      />
                      <button type="submit" onClick={handleFileUpload}>Submit</button>
                    </form>
                  </>
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
                handleConfirmUser={() => setAccountConfirmModalOpen((prev) => !prev)}
              />
            </Grid>
          </Grid>
          {personalEditing && (
            <Popup
              handleClose={handlePersonalEditClose}
              header="Personal data"
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: handlePersonalEditClose,
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Submit',
                  disabled: false,
                  onClick: () => {},
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <UserPersonalForm
                initialValues={createPersonalDataEditValues(stateData.personalData)}
                onSubmit={handlePersonalSubmit}
                handleClose={handlePersonalEditClose}
              />
            </Popup>
          )}
          {accountConfirmModalOpen && (
            <Popup
              header="Log into your university email account"
              handleClose={() => setAccountConfirmModalOpen((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: handlePersonalEditClose,
                  buttonType: ButtonType.SECONDARY,
                }
              ]}
            >
              <PopupContentWrapper>
                <LoginFormContainer>
                  <LoginForm
                    onSubmit={handleAccountConfirmation}
                  />
                  {accountConfirmationError && (
                    <ErrorWrapper> It seems that login or password is incorrect </ErrorWrapper>
                  )}
                </LoginFormContainer>
              </PopupContentWrapper>
            </Popup>
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export { AccountPage };
