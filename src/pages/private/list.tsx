import React, { useEffect, useState } from 'react';
import {
  Grid, Table, TableBody, TableHead, TableCell, TableRow,
} from '@material-ui/core';
import { CountryDropdown } from 'react-country-region-selector';
import axios from 'axios';
import Select from 'react-select';
import styled from 'styled-components';
import { BACKEND_API_URL } from '../../authentication/constants';

const FiltersContainer = styled.div`
  padding: 30px;
`;

interface Project {
  id: string,
  topic: string,
  status: {
    selected: boolean,
    completed: boolean
  },
  owner: {
    id: string,
    firstName: string,
    lastName: string,
  },
  promoter: {
    firstName: string,
    lastName: string,
    highestTitle: string
  },
  university: {
    id: string,
    name: {
      full: string,
      shortcut: string
    }
  },
  addedToPlatformDate: string
}

interface Filter {

}

interface ProjectListPageProps {
  projects: Project[],
  filters: Filter[]
  searchString: string,
}

interface University {
  id: string,
  name: {
    full: string,
    shortcut: string
  }
}

const ProjectListPage = (props: ProjectListPageProps) => {
  const [country, setCountry] = useState();
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState();

  useEffect(() => {
    axios.get(`${BACKEND_API_URL}/universities`)
      .then((res) => {
        if (res.data.length) {
          const preparedUniversities = res.data.map((item: University) => ({
            value: item.id,
            label: item.name.full,
          }));

          setUniversities(preparedUniversities);
        } else {
          setUniversities([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setUniversities([]);
      });
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <FiltersContainer>
          <p>Filters</p>
          <CountryDropdown value={country} onChange={(val: string) => setCountry(val)} />
          {universities.length > 0 && (
            <Select
              value={university}
              onChange={setUniversity}
              options={universities}
            />
          )}
        </FiltersContainer>
      </Grid>
      <Grid item xs={8}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Topic</TableCell>
              <TableCell>Promoter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Add date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.projects.map((project: Project) => (
                <TableRow>
                  <TableCell>{project.topic}</TableCell>
                  <TableCell>{`
                  ${project.promoter.highestTitle}
                  ${project.promoter.firstName}
                  ${project.promoter.lastName}
                  `}
                  </TableCell>
                  <TableCell>{project.status.selected ? 'Free' : 'Occupied'}</TableCell>
                  <TableCell>{project.status.selected ? `${project.owner.firstName} ${project.owner.lastName}` : "-"}</TableCell>
                  <TableCell>{project.addedToPlatformDate}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </Grid>
    </Grid>
  );
};

export {
  ProjectListPage,
};
