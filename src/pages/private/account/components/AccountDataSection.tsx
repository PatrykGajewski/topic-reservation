import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';

export interface AccountSectionDataShape {
  email: string,
  creationDate: Date | null;
}

interface Props {
  data: AccountSectionDataShape
}

export const AccountDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Account"
  >
    <ContainerWithHeaderRow header="Email" content={props.data.email} />
    <ContainerWithHeaderRow header="Creation date" content={props.data.creationDate ? props.data.creationDate.toLocaleDateString() : null} />
  </ContainerWithHeader>
);
