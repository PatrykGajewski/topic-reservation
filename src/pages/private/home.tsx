import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';

import { TopBar } from '../components';
import { LogoutPage } from './logoutPage';
import { AccountPage } from './account';
import { OwnedProjectsPage } from './owned';
import { ProjectListPage } from './list';
import { AccountPageWrapper } from './dataFetchers';

const HomePageAuth = (props: RouteComponentProps) => (
  <div>
    <TopBar isAuthenticated />
    <Switch>
      <Route path="/logout" render={() => <LogoutPage />} />
      <Route
        path="/owned"
        render={() => (
          <OwnedProjectsPage
            projects={[
              {
                topic: 'Zagrożenia epidemiologiczne w dobie XXI wieku',
                promoter: {
                  id: '1',
                  firstName: 'Dominik',
                  lastName: 'Żmijewski',
                  highestTitle: {
                    id: '1',
                    fullTitle: 'Doctor',
                    shortcut: 'Dr.',
                  },
                },
                university: {
                  id: '1',
                  full: 'Politechnika Krakowska im. Taduesza Kościuszki',
                  shortcut: 'PK',
                },
                tags: [
                  {
                    id: '1',
                    desc: 'research',
                  },
                  {
                    id: '2',
                    desc: 'diseases',
                  },
                  {
                    id: '3',
                    desc: 'health',
                  },
                  {
                    id: '4',
                    desc: 'viruses',
                  },
                  {
                    id: '5',
                    desc: 'health care',
                  },
                ],
                startDate: '10-04-2018',
                endDate: '12-07-2018',
                projectRating: {
                  id: '1',
                  total: 25,
                  value: 4.3,
                },
                projectType: {
                  degree: 'Bachelor of philosophy',
                },
              },
              {
                topic: 'Choroby cywilizacyjne w XXI wieku',
                promoter: {
                  id: '1',
                  firstName: 'Tadusz',
                  lastName: 'Kuśnierewicz',
                  highestTitle: {
                    id: '1',
                    fullTitle: 'Doctor',
                    shortcut: 'Dr.',
                  },
                },
                university: {
                  id: '1',
                  full: 'Akademia Górniczo Hutnicza w Krakowie',
                  shortcut: 'AGH',
                },
                tags: [
                  {
                    id: '1',
                    desc: 'research',
                  },
                  {
                    id: '2',
                    desc: 'diseases',
                  },
                  {
                    id: '3',
                    desc: 'health',
                  },
                  {
                    id: '4',
                    desc: 'healt research',
                  },
                  {
                    id: '5',
                    desc: 'health care',
                  },
                ],
                startDate: '10-04-2020',
                endDate: '12-06-2020',
                projectRating: {
                  id: '1',
                  total: 7,
                  value: 5,
                },
                projectType: {
                  degree: 'Master of philosophy',
                },
              },
            ]}
          />
        )}
      />
      <Route
        path="/list"
        render={() => (
          <ProjectListPage />
        )}
      />
      <Route path="/promoters" render={() => <div />} />
      <Route
        exact
        path="/"
        render={() => (
          <AccountPageWrapper />
        )}
      />
    </Switch>
  </div>

);

export { HomePageAuth };
