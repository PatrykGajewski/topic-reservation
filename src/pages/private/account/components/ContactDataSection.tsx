import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';
import { UserAddress, UserGender } from 'models/user';

export interface ContactDataSection {
  contactEmail: string,
  phoneNumber: string,
}

interface Props {
  handleEdit: () => void,
  data: ContactDataSection
}

export const ContactDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Contact data"
    editable
    handleEdit={props.handleEdit}
  >
    <ContainerWithHeaderRow header="Contact email" content={props.data.contactEmail} />
    <ContainerWithHeaderRow header="Phone number" content={props.data.phoneNumber} />
  </ContainerWithHeader>
);
