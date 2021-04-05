import React from 'react';
import { Container, EditButton, Header } from './styles';
import { Props } from './models/props.model';

export const SectionWithHeader = (props: Props) => (
  <Container
    smallPadding={props.smallPadding || false}
    lightBorder={props.lightBorder || false}
    fitContent={props.fitContent || false}
    noMargin={props.noMargin || false}
  >
    <Header
      lightBorder={props.lightBorder || false}
    >
      {props.header}
    </Header>
    {props.editable && (
      <EditButton
        onClick={props.handleEdit}
      >
        Edit
      </EditButton>
    )}
    {props.children}
  </Container>
);
