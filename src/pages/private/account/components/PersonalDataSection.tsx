import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';
import { UserAddress } from 'models/user';

export interface PersonalSectionDataShape {
  firstName: string,
  lastName: string,
  birthDate: Date | null,
  address: UserAddress,
  phoneNumber: string
}

interface Props {
  handleEdit: () => void,
  data: PersonalSectionDataShape
}

export const PersonalDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Personal"
    editable
    handleEdit={props.handleEdit}
  >
    <ContainerWithHeaderRow header="Firstname" content={props.data.firstName} />
    <ContainerWithHeaderRow header="Lastname" content={props.data.lastName} />

    <ContainerWithHeaderRow
      header="Date of birth"
      content={props.data.birthDate ? props.data.birthDate.toLocaleDateString() : null}
    />

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
