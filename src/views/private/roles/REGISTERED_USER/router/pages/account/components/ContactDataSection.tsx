import React from 'react';
import { SectionWithHeader } from 'views/components';
import { SectionRow } from 'views/private/components';

export interface ContactDataSection {
  contactEmail: string,
  phoneNumber: string,
}

interface Props {
  handleEdit: () => void,
  data: ContactDataSection
}

export const ContactDataSection = (props: Props) => (
  <SectionWithHeader
    header="Contact data"
    editable
    noMargin
    handleEdit={props.handleEdit}
  >
    <SectionRow header="Contact email" content={props.data.contactEmail} />
    <SectionRow header="Phone number" content={props.data.phoneNumber} />
  </SectionWithHeader>
);
