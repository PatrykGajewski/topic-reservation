import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';

import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  UserAddress, UserGender, UserModel, UserRole,
} from 'models/user';
import { AppState } from 'store/appState';
import { toast } from 'react-toastify';
import { ButtonType, Popup } from '../../components';
import { ErrorWrapper, LoginFormContainer } from '../../public';
import { PersonalSectionValues, UserPersonalForm } from './forms';

import {
  ContentWrapper, StyledPhotoWrapper, PopupContentWrapper, StyledPhotoForm, StyledIconButton,
  StyledImagePreviewContainer,
} from './styles';
import { ImageBox } from '../components';

import {
  createAccountData,
  createPersonalData,
  createPersonalDataEditValues,
  updatePersonalData,
} from './helpers';

import {
  AccountDataSection, AccountSectionData, PersonalDataSection, PersonalSectionData,
} from './components';

import { ViewState } from '../models';
import { APISecured } from '../../../API';
import LoginForm from '../../public/components/loginForm';
import { UpdateUserData } from '../../../store/actions';

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
  const [accountConfirmationError, setAccountConfirmationError] = useState<boolean>(false);
  const [photoSelectionModalOpen, setPhotoSelectionModalOpen] = useState<boolean>(false);

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<{data: string, contentType: string} | null>(null);
  const personalSubmitBtnRef = useRef<HTMLButtonElement | null>(null);

  const fetchProfilePhoto = () => {
    APISecured.get(`/static/avatars/${stateData.accountData.profilePhotoId}`)
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
  }, [stateData.accountData.profilePhotoId]);

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
      gender: values.gender,
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
      .then((user: UserModel) => {
        dispatch({ ...new UpdateUserData(user) });
        toast.success('User personal data updated');
        setPersonalEditing(false);
      }).catch((err) => {
        toast.error('Error during personal data update');
      });
  };

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileExtension: string | null = (e.target.files && e.target.files.length && e.target.files[0].type.split('/')[1]) || null;
    if (fileExtension && properImageFileExtensions.includes(fileExtension as ImagesFileExtension) && e.target.files) {
      setPhotoToUpload(e.target.files[0]);
    } else {
      console.log('wrong file type');
    }
  };

  const handleFileUpload = () => {
    if (photoToUpload) {
      // NOTE this is required step because multer pck take field name with image
      const form = new FormData();
      form.append('image', photoToUpload);
      form.append('name', photoToUpload.name);
      form.append('size', photoToUpload.size.toString());
      form.append('type', photoToUpload.type);

      APISecured.post('/static/avatars', form)
        .then((res: {data: { data: string, contentType: string, imageId: string} }) => {
          dispatch({
            ...new UpdateUserData({
              ...stateData.user,
              profilePhotoId: res.data.imageId,
            }),
          });
          setProfilePhoto({ data: res.data.data, contentType: res.data.contentType });
          setPhotoSelectionModalOpen((prev) => !prev);
          toast.success('Cover photo update success');
        })
        .catch((e: any) => {
          setPhotoSelectionModalOpen((prev) => !prev);
          toast.error('Cover photo update failure');
        });
    }
  };

  const cancelFileUpload = () => {
    setPhotoToUpload(null);
    setPhotoSelectionModalOpen(false);
  };

  const handleAccountConfirmation = () => {
    new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    }).then(() => {
      setAccountConfirmationError(false);
      setAccountConfirmModalOpen(false);

      dispatch({
        ...new UpdateUserData(
          {
            ...stateData.user,
            roles: [...stateData.user.roles, UserRole.STUDENT],
          },
        ),
      });
      toast.success('Account has been confirmed');
    }).catch((error: any) => {
      setAccountConfirmationError(true);
      toast.error('Cannot confirm account');
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
              <StyledPhotoWrapper>
                {profilePhoto !== null ? (
                  <ImageBox
                    src={`data:${profilePhoto.contentType};base64,${profilePhoto.data}`}
                    alt="User icon"
                  />
                ) : (
                  <FaceIcon />
                )}
                <StyledIconButton onClick={() => setPhotoSelectionModalOpen((prev) => !prev)} positioned>
                  <SettingsIcon />
                </StyledIconButton>
              </StyledPhotoWrapper>
            </Grid>
            <Grid item sm={9}>
              <div style={{
                margin: '30px 50px',
              }}>
                <PersonalDataSection
                  handleEdit={handlePersonalEditOpen}
                  data={viewData.personalData}
                />
                <AccountDataSection
                  data={viewData.accountData}
                  handleConfirmUser={() => setAccountConfirmModalOpen((prev) => !prev)}
                />
              </div>
            </Grid>
          </Grid>
          {photoSelectionModalOpen && (
            <Popup
              header="Upload cover photo"
              handleClose={cancelFileUpload}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: cancelFileUpload,
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Upload',
                  disabled: photoToUpload === null,
                  onClick: handleFileUpload,
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <StyledPhotoForm>
                {photoToUpload && (
                  <StyledImagePreviewContainer>
                    <ImageBox
                      src={URL.createObjectURL(photoToUpload)}
                      alt="cover photo preview"
                    />
                  </StyledImagePreviewContainer>
                )}
                <input
                  name="photoInput"
                  type="file"
                  onChange={onFileUploadChange}
                  accept=".jpg, .jpeg, .png, .bmp"
                />
              </StyledPhotoForm>
            </Popup>
          )}
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
                  onClick: () => {
                    if (personalSubmitBtnRef.current !== null) {
                      personalSubmitBtnRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <UserPersonalForm
                initialValues={createPersonalDataEditValues(stateData.personalData)}
                onSubmit={handlePersonalSubmit}
                handleClose={handlePersonalEditClose}
                submitBtnRef={personalSubmitBtnRef}
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
                },
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
