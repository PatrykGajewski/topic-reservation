import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow, Row } from 'pages/components';
import { UserRole } from 'models/user';

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

export const AccountDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Account"
  >
    <ContainerWithHeaderRow header="Email" content={props.data.email} />
    <ContainerWithHeaderRow header="Creation date" content={props.data.creationDate} />
    <ContainerWithHeaderRow header="Update date" content={props.data.updateDate} />
    <Row>
      <span>Account roles:</span>
      <ul>
        {props.data.userRoles.map((role: UserRole, index: number) => {
          if (role === UserRole.REGISTERED_USER) {
            if (props.data.userRoles.length > 1) {
              return (
                <li
                  key={index}
                >{displayUserRole(role)}
                </li>
              );
            }
            return (
              <li
                key={index}
              >{displayUserRole(role)} <button onClick={props.handleConfirmUser}>Confirm your account</button>
              </li>
            );
          }
          return (
            <li
              key={index}
            >{displayUserRole(role)}
            </li>
          );
        })}
      </ul>
    </Row>
  </ContainerWithHeader>
);
