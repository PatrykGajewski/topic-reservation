import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';
import { UserAddress, UserGender } from 'models/user';

export interface PersonalSectionData {
  firstName: string,
  lastName: string,
  birthDate: string,
  address: UserAddress,
  phoneNumber: string
  gender: UserGender,
}

interface Props {
  handleEdit: () => void,
  data: PersonalSectionData
}

export const PersonalDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Personal"
    editable
    handleEdit={props.handleEdit}
  >
    <ContainerWithHeaderRow header="Firstname" content={props.data.firstName} />
    <ContainerWithHeaderRow header="Lastname" content={props.data.lastName} />

    <ContainerWithHeaderRow header="Gender" content={props.data.gender} />

    <ContainerWithHeaderRow header="Date of birth" content={props.data.birthDate} />

    <ContainerWithHeaderRow header="Country" content={props.data.address.country} />
    <ContainerWithHeaderRow header="Region" content={props.data.address.region} />
    <ContainerWithHeaderRow header="City" content={props.data.address.city} />
    <ContainerWithHeaderRow header="Post code" content={props.data.address.zip} />
    <ContainerWithHeaderRow header="Street number" content={props.data.address.streetName} />
    <ContainerWithHeaderRow header="Flat number" content={props.data.address.flatNumber} />
    <ContainerWithHeaderRow header="Building number" content={props.data.address.buildingNumber} />

    <ContainerWithHeaderRow header="Phone number" content={props.data.phoneNumber} />
  </ContainerWithHeader>
);
