import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import {ViewState} from '../../../models/other';
import {APISecured} from '../../../API';
import {ImageBox} from '../ImagesBox';
import {UserGender} from '../../../models/user';
import {AvatarBoxSize} from "./models/avatar-box-size.model";
import {Props} from "./models";
import {IconContainer, StyledFemaleIcon, StyledMaleIcon} from "./styles";

export const AvatarBox = (props: Props) => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [avatar, setAvatar] = useState<{data: string, contentType: string} | null>(null);

  const sizeInPx: number = props.size === AvatarBoxSize.MINI ? 40 : 200;

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
          height={sizeInPx}
          width={sizeInPx}
        />
      )}
      {viewState === ViewState.OK && (
        <>
          {avatar
            ? (
              <IconContainer size={sizeInPx}>
                <ImageBox src={`data:${avatar.contentType};base64,${avatar.data}`} alt="User image" />
              </IconContainer>
            )
            : (
              props.gender === UserGender.FEMALE
                ? <IconContainer size={sizeInPx}><StyledFemaleIcon /></IconContainer>
                : <IconContainer size={sizeInPx}><StyledMaleIcon /></IconContainer>
            )}
        </>
      )}
    </>
  );
};
