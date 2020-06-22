import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';

import { TopBar } from '../components';
import { LogoutPage } from './logoutPage';
import { AccountPage } from './account';

const HomePageAuth = (props: RouteComponentProps) => (
  <div>
    <TopBar isAuthenticated />
    <Switch>
      <Route path="/logout" render={() => <LogoutPage />} />
      <Route path="/owned" render={() => <div />} />
      <Route path="/list" render={() => <div />} />
      <Route path="/promoters" render={() => <div />} />
      <Route
        exact
        path="/"
        render={() => (
          <AccountPage
            personalData={{
              firstName: 'Patryk',
              lastName: 'Gajewski',
              birthDate: '10-08-2020',
              address: 'Lipnica Dolna 154',
              phoneNumber: '567-647-908',
            }}
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
        )}
      />
    </Switch>
  </div>

);

export { HomePageAuth };
