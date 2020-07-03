import React, { useState, useEffect } from 'react';
/* import Loader from 'react-loader-spinner'; */
import { useDispatch, useSelector } from 'react-redux';
import { StateModel } from '../../../store/state.model';

import { AccountPage } from '../account';

const AccountPageWrapper = () => {
  const stateData = useSelector((state: StateModel) => ({
    personalData: {
      firstName: state.user.firstName,
      lastName: state.user.lastName || '-',
      birthDate: state.user.birthDate || '-',
      // TODO complete addressData -> adjust personalDataDisplay component
      address: state.user.address?.streetName || '-',
      phoneNumber: state.user.phoneNumber || '-',
    },
  }));

  return (
    <AccountPage
      personalData={stateData.personalData}
      accountData={{
        email: 'elita564-2000@tlen.pl',
        creationDate: '10-12-2018',
        expirationDate: '10-12-2022',
      }}
      educationData={{
        finishedUniversities: [{
          name: {
            full: 'Politechnika Krakowska im. Tadeusza Kościuszki',
            shortcut: 'PK',
          },
          faculty: {
            full: 'Wydział Inżynierii Lądowej',
            shortcut: 'WIiT',
          },
          direction: {
            full: 'Gospodarka przestrzenna',
            shortcut: null,
          },
          location: {
            city: 'Kraków',
            country: 'Polska',
            province: 'Małopolska',
            zip: '31-155',
            street: 'Warszawska',
            streetNumber: '24',
          },
          startDate: '01-10-2018',
          endDate: '10-08-2022',
        }],
        actualUniversities: [
          {
            name: {
              full: 'Politechnika Krakowska im. Tadeusza Kościuszki',
              shortcut: 'PK',
            },
            faculty: {
              full: 'Wydział Informatyki i Telekomunikacji',
              shortcut: 'WIiT',
            },
            direction: {
              full: 'Informatyka stosowana',
              shortcut: null,
            },
            location: {
              city: 'Kraków',
              country: 'Polska',
              province: 'Małopolska',
              zip: '31-155',
              street: 'Warszawska',
              streetNumber: '24',
            },
            startDate: '01-10-2022',
            endDate: null,
          },
        ],
      }}
      photoData={{
        link: null,
      }}
    />
  );
};

export {
  AccountPageWrapper,
};
