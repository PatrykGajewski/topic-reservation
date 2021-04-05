import React from 'react';
import { Props } from './models/props.model';
import { Row } from './styles';

export const SectionRow = (props: Props) => (
  <Row>
    <span>{`${props.header}: `}</span> {props.content}
  </Row>
);
