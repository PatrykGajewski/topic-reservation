import React, {useEffect, useState} from 'react';
import {Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField,} from '@material-ui/core';
import Select, {ValueType} from 'react-select';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {API} from '../../API';
import {ProjectsDataFetched, ProjectsDataFetching, ProjectsDataFetchingError,} from '../../store/actions';
import {AppState} from '../../store/appState';

import {ProjectModel} from "../../models/project";
import {SelectOption} from "../../models/forms";
import { ContentWrapper } from "./account/css";

const ContentContainer = styled(ContentWrapper)`
  padding: 20px;
`;

const FiltersContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const FilterWrapper = styled.div`
  min-width: 300px;
  padding-right: 30px;
  
  & > label {
    display: block;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  & > button {
    margin-right: 12px;
  }
`;

interface University {
  id: string,
  name: {
    full: string,
    short: string
  }
}

const fetchUniversitiesList = async () => {
  try {
    const { data, error } = await API.get('/universities');

    if (error) {
      return Promise.reject(error.message);
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.resolve(data);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
};

const pathCreator = (country:string, university: string, searchString: string): string => {
  if (country && university) {
    return `/projects?country=${country}&universityId=${university}&q=${searchString}`;
    // eslint-disable-next-line no-else-return
  } else {
    if (country) {
      return `/projects?country=${country}&q=${searchString}`;
    }
    if (university) {
      return `/projects?universityId=${university}&q=${searchString}`;
    }
    return `/projects?q=${searchString}`;
  }
};

const statusSelector = (selected: boolean, completed: boolean): string => {
  if (completed) {
    return 'Completed';
  }
  return selected ? 'Occupied' : 'Free';
};

const fetchData = (country: string, university: string, searchString: string) => async (dispatch: any) => {
  try {
    dispatch({ ...new ProjectsDataFetching() });

    //const { data, error } = await API.get(pathCreator(country, university, searchString));
    const { data, error } = await API.get('/projects');

    if (error) {
      dispatch({ ...new ProjectsDataFetchingError(error.message) });
    } else {
      dispatch({ ...new ProjectsDataFetched(data.data) });
    }
  } catch (err) {
    console.error(err);
    dispatch({ ...new ProjectsDataFetchingError(err.message) });
  }
};

const reserveProject = async (projectId: string) => {
  try {
    const { data, error } = await API.patch(`/projects/reserve/${projectId}`, {});

    if (error) {
      console.error(error);
      return Promise.reject();
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.resolve();
    }
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};

const initialState = {
  country: '',
  university: {
    value: '',
    label: '',
  },
  searchString: '',
};

const ProjectListPage = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    loading: state.loading,
    success: state.success,
    error: state.error,
    projects: state.projects,
    user: state.user,
  }));
  const [country, setCountry] = useState(initialState.country);
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState(initialState.university);
  const [searchString, setSearchString] = useState(initialState.searchString);

  useEffect(() => {
    fetchUniversitiesList()
      .then((res) => {
        if (res.length) {
          const preparedUniversities = res.map((item: University) => ({
            value: item.id,
            label: item.name.full,
          }));
          setUniversities(preparedUniversities);
        } else {
          setUniversities([]);
        }
      })
      .catch(() => {
        setUniversities([]);
      });

    fetchData('', '', '')(dispatch);
  }, []);

  const handleFiltersSubmit = () => {
    fetchData(country, university.value, searchString)(dispatch);
  };

  const handleRemoveFilters = () => {
    setUniversity(initialState.university);
    setSearchString(initialState.searchString);
    setCountry(initialState.country);
    fetchData('', '', '')(dispatch);
  };

  const handleReserveProject = (projectId: string) => {
    reserveProject(projectId)
      .then(() => {
        fetchData(country, university.value, searchString)(dispatch);
      });
  };

  const filtersApplied = initialState.country !== country
    || initialState.university.value !== university.value
    || initialState.searchString !== searchString;

  return (
    <ContentContainer>
      <Grid container>
        <Grid item xs={12}>
          <FiltersContainer>
            <p>Filters section</p>
            <FiltersWrapper>
              {universities.length > 0 && (
                <FilterWrapper>
                  <label htmlFor="university">
                    Select university
                  </label>
                  <Select
                    name="university"
                    value={universities.filter((uni: SelectOption) => uni.label === university.label)}
                    onChange={(value: ValueType<SelectOption>) => {
                      const valueToSet = (value as SelectOption);
                      setUniversity(valueToSet);
                    }}
                    options={universities}
                  />
                </FilterWrapper>
              )}
              <FilterWrapper>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="search"
                  label="Search"
                  value={searchString}
                  onChange={(e) => setSearchString(e.currentTarget.value)}
                />
              </FilterWrapper>
            </FiltersWrapper>
            <ButtonContainer>
              <Button
                onClick={handleFiltersSubmit}
                variant="outlined"
                color="primary"
              >Submit filters
              </Button>
              {filtersApplied && (
                <Button
                  onClick={handleRemoveFilters}
                  variant="outlined"
                >Remove filters
                </Button>
              )}
            </ButtonContainer>
          </FiltersContainer>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Promoter</TableCell>
                <TableCell>University</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Add date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                stateData.projects.map((project: ProjectModel) => (
                  <TableRow>
                    <TableCell>{project.topic}</TableCell>
                    <TableCell>{project.type}</TableCell>
                    <TableCell>{`
                  ${project.promoter.firstName}
                  ${project.promoter.lastName}
                  `}
                    </TableCell>
                    <TableCell>{project.university.namePL.short}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => handleReserveProject(project.id)}
                        variant="outlined"
                        color="primary"
                      >Reserve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </ContentContainer>
  );
};

export {
  ProjectListPage,
};
