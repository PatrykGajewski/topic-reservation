import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import {ReactComponent as FemaleIcon} from 'icons/female.svg';
import {ReactComponent as MaleIcon} from 'icons/male.svg';
import styled, {css} from 'styled-components';
import {ViewState} from '../../../models/other';
import {APISecured} from '../../../API';
import {ImageBox} from '../ImagesBox';
import {UserGender} from '../../../models/user';

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-shadow: inset 0 0 2px 0 #0000008c;
  border-radius: 50%;
  margin: 5px;
  overflow: hidden;
`;

const genderIconStyles = css`
  width: 25px;
  height: 25px;
`;

const StyledFemaleIcon = styled(FemaleIcon)`
  ${genderIconStyles}
`;

const StyledMaleIcon = styled(MaleIcon)`
  ${genderIconStyles}
`;

interface Props {
  avatarId: string | null,
  gender: UserGender,
}

export const AvatarBox = (props: Props) => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [avatar, setAvatar] = useState<{data: string, contentType: string} | null>(null);

  const fetchAvatar = () => {
    if (props.avatarId) {
      APISecured.get(`/static/avatars/${props.avatarId}`)
        .then((res) => {
          setAvatar(res.data);
          setViewState(ViewState.OK);
        })
        .catch((e) => {
          setAvatar(null);
          setViewState(ViewState.OK);
        });
    } else {
      setAvatar(null);
      setViewState(ViewState.OK);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchAvatar();
  }, [props.avatarId]);

  return (
    <>
      {viewState === ViewState.LOADING && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={40}
          width={40}
        />
      )}
      {viewState === ViewState.OK && (
        <>
          {avatar
            ? (
              <IconContainer>
                <ImageBox src={`data:${avatar.contentType};base64,${avatar.data}`} alt="User image" />
              </IconContainer>
            )
            : (
              props.gender === UserGender.FEMALE
                ? <IconContainer><StyledFemaleIcon /></IconContainer>
                : <IconContainer><StyledMaleIcon /></IconContainer>
            )}
        </>
      )}
    </>
  );
};
