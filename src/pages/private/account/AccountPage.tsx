import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { Grid } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { UserModel, UserRole } from 'models/user';
import { AppState } from 'store/appState';
import { ButtonType, Popup } from '../../components';
import { ErrorWrapper, LoginFormContainer } from '../../public';
import {
  ContactDataFormValues, PersonalDataFormValues, UserContactDataForm, UserPersonalDataForm,
} from './forms';
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
  AccountDataSection, AccountSectionData, ContactDataSection, PersonalDataSection, PersonalSectionData,
} from './components';

import { ViewState } from '../models';
import { APISecured } from '../../../API';
import LoginForm from '../../public/components/loginForm';
import { UpdateUserData } from '../../../store/actions';
import { createContactData } from './helpers/create-contact-data';

interface ViewData {
  personalData: PersonalSectionData,
  accountData: AccountSectionData,
  contactData: ContactDataSection,
}

interface StateData {
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
    user: state.user,
  }));

  const [viewData, setViewData] = useState<ViewData>({
    personalData: createPersonalData(stateData.user),
    accountData: createAccountData(stateData.user),
    contactData: createContactData(stateData.user),
  });

  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [personalDataEditModalOpen, setPersonalDataEditModalOpen] = useState<boolean>(false);
  const [accountConfirmModalOpen, setAccountConfirmModalOpen] = useState<boolean>(false);
  const [accountConfirmationError, setAccountConfirmationError] = useState<boolean>(false);
  const [contactDataEditModalOpen, setContactDataEditModalOpen] = useState<boolean>(false);

  const [photoSelectionModalOpen, setPhotoSelectionModalOpen] = useState<boolean>(false);
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<{data: string, contentType: string} | null>(null);
  const personalDataFormSubmitBtnRef = useRef<HTMLButtonElement | null>(null);
  const contactDataFormSubmitBtnRef = useRef<HTMLButtonElement | null>(null);

  const fetchProfilePhoto = () => {
    APISecured.get(`/static/avatars/${stateData.user.profilePhotoId}`)
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
  }, [stateData.user.profilePhotoId]);

  useEffect(() => {
    setViewData({
      personalData: createPersonalData(stateData.user),
      accountData: createAccountData(stateData.user),
      contactData: createContactData(stateData.user),
    });
  }, [stateData.user]);

  const handlePersonalEditOpen = () => {
    setPersonalDataEditModalOpen(true);
  };

  const handlePersonalEditClose = () => {
    setPersonalDataEditModalOpen(false);
  };

  const handlePersonalSubmit = (values: PersonalDataFormValues) => {
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

    updatePersonalData(dataShape, stateData.user.id)
      .then((user: UserModel) => {
        dispatch({ ...new UpdateUserData(user) });
        toast.success('User personal data updated');
        setPersonalDataEditModalOpen(false);
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

  const handleUserContactDataSubmit = (values: ContactDataFormValues) => {
    // TODO finish logic
    console.log(values);
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
              }}
              >
                <PersonalDataSection
                  handleEdit={handlePersonalEditOpen}
                  data={viewData.personalData}
                />
                <ContactDataSection
                  data={viewData.contactData}
                  handleEdit={() => setContactDataEditModalOpen((prev) => !prev)}
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
          {personalDataEditModalOpen && (
            <Popup
              handleClose={handlePersonalEditClose}
              header="Edit personal data"
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: handlePersonalEditClose,
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Save',
                  disabled: false,
                  onClick: () => {
                    if (personalDataFormSubmitBtnRef.current !== null) {
                      personalDataFormSubmitBtnRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <UserPersonalDataForm
                initialValues={createPersonalDataEditValues(viewData.personalData)}
                onSubmit={handlePersonalSubmit}
                handleClose={handlePersonalEditClose}
                submitBtnRef={personalDataFormSubmitBtnRef}
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
          {contactDataEditModalOpen && (
            <Popup
              header="Edit contact data"
              handleClose={() => setContactDataEditModalOpen((prev) => !prev)}
              buttonsConfig={[
                {
                  label: 'Cancel',
                  disabled: false,
                  onClick: () => setContactDataEditModalOpen((prev) => !prev),
                  buttonType: ButtonType.SECONDARY,
                },
                {
                  label: 'Save',
                  disabled: false,
                  onClick: () => {
                    if (contactDataFormSubmitBtnRef.current !== null) {
                      contactDataFormSubmitBtnRef.current.click();
                    }
                  },
                  buttonType: ButtonType.PRIMARY,
                },
              ]}
            >
              <PopupContentWrapper>
                <UserContactDataForm
                  initialValues={viewData.contactData}
                  onSubmit={handleUserContactDataSubmit}
                  handleClose={() => setContactDataEditModalOpen((prev) => !prev)}
                  submitBtnRef={contactDataFormSubmitBtnRef}
                />
              </PopupContentWrapper>
            </Popup>
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export { AccountPage };
