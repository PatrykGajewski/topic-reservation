import React from 'react';
import { SectionWithHeader, SectionRow } from 'views/private/components';
import { UserAddress, UserGender } from 'models/user';

export interface PersonalSectionData {
  firstName: string,
  lastName: string,
  birthDate: Date | null,
  address: UserAddress,
  gender: UserGender,
}

interface Props {
  handleEdit: () => void,
  data: PersonalSectionData
}

export const PersonalDataSection = (props: Props) => (
  <SectionWithHeader
    header="Personal data"
    editable
    noMargin
    handleEdit={props.handleEdit}
  >
    <SectionRow header="Firstname" content={props.data.firstName} />
    <SectionRow header="Lastname" content={props.data.lastName} />

    <SectionRow header="Gender" content={props.data.gender.toLocaleLowerCase()} />

    <SectionRow header="Date of birth" content={props.data.birthDate ? props.data.birthDate.toLocaleDateString() : ''} />

    <SectionRow header="Country" content={props.data.address.country} />
    <SectionRow header="City" content={props.data.address.city} />
    <SectionRow header="Post code" content={props.data.address.zip} />
    <SectionRow header="Street name" content={props.data.address.streetName} />
    <SectionRow header="Flat number" content={props.data.address.flatNumber} />
    <SectionRow header="Building number" content={props.data.address.buildingNumber} />
  </SectionWithHeader>
);