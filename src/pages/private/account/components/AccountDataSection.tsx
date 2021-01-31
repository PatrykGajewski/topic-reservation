import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow, Row } from 'pages/components';
import { UserRole } from 'models/user';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

export interface AccountSectionData {
  email: string,
  creationDate: string;
  updateDate: string;
  userRoles: UserRole[]
}

interface Props {
  data: AccountSectionData
  handleConfirmUser: () => void;
}

const displayUserRole = (userRole: UserRole): string => {
  switch (userRole) {
  case UserRole.ADMIN:
    return 'Admin';
  case UserRole.DEAN:
    return 'Dean';
  case UserRole.REGISTERED_USER:
    return 'Registered user';
  case UserRole.EMPLOYEE:
    return 'Employee';
  case UserRole.STUDENT:
    return 'Student';
  default:
    return '';
  }
};

const StyledStatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AccountDataSection = (props: Props) => {
  const userConfirmed: boolean = props.data.userRoles.length > 1;

  return (
    <ContainerWithHeader
      header="Account"
    >
      {userConfirmed ? (
        <>
          <ContainerWithHeaderRow header="Status" content="Confirmed" />
          <ContainerWithHeaderRow header="Confirmation mail" content={props.data.email} />
        </>
      ) : (
        <StyledStatusContainer>
          <ContainerWithHeaderRow header="Status" content="Unconfirmed" />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={props.handleConfirmUser}
          >Confirm your account
          </Button>
        </StyledStatusContainer>
      )}
      <ContainerWithHeaderRow header="Creation date" content={props.data.creationDate} />
      <ContainerWithHeaderRow header="Update date" content={props.data.updateDate} />
      <Row>
        <span>Account roles:</span>
        <ul>
          {props.data.userRoles.map((role: UserRole, index: number) => (
            <li
              key={index}
            >{displayUserRole(role)}
            </li>
          ))}
        </ul>
      </Row>
    </ContainerWithHeader>
  );
};
