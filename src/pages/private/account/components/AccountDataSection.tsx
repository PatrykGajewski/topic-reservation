import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';
import { UserRole } from 'models/user';

export interface AccountSectionData {
  email: string,
  creationDate: string;
  userRoles: UserRole[]
}

interface Props {
  data: AccountSectionData
}

export const AccountDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Account"
  >
    <ContainerWithHeaderRow header="Email" content={props.data.email} />
    <ContainerWithHeaderRow header="Creation date" content={props.data.creationDate} />
    {/* TODO create account type based on userRoles*/}
  </ContainerWithHeader>
);
