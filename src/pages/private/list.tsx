import React, { useEffect, useState } from 'react';
import {
  Grid, Table, TableBody, TableHead, TableCell, TableRow,
  Button, TextField,
} from '@material-ui/core';
import { CountryDropdown } from 'react-country-region-selector';
import Select, { ValueType } from 'react-select';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../API';
import {
  ProjectsDataFetching,
  ProjectsDataFetchingError,
  ProjectsDataFetched,
} from '../../store/actions';
import { StateModel } from '../../store/state.model';
import { ProjectModel, ProjectOwnerModel } from '../../models';

const ContentContainer = styled.div`
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

interface SelectOption {
  label: string,
  value: string,
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

    const { data, error } = await API.get(pathCreator(country, university, searchString));

    if (error) {
      dispatch({ ...new ProjectsDataFetchingError(error.message) });
    } else {
      dispatch({ ...new ProjectsDataFetched(data) });
    }
  } catch (err) {
    console.error(err);
    dispatch({ ...new ProjectsDataFetchingError(err.message) });
  }
};

const reserveProject = async (projectId: string, owner: ProjectOwnerModel) => {
  try {
    // NOTE ownerId is duplicated but it is necessary to use (projects?ownerId=) path
    const { data, error } = await API.patch(`/projects/${projectId}`, {
      owner,
      status: {
        selected: true,
        completed: false,
      },
      ownerId: owner.id,
    });

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
  const stateData = useSelector((state: StateModel) => ({
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
    reserveProject(projectId, {
      id: stateData.user.id,
      firstName: stateData.user.firstName,
      lastName: stateData.user.lastName ? stateData.user.lastName : '',
      highestTitle: stateData.user.highestTitle,
    })
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
              <FilterWrapper>
                <label htmlFor="country">
                  Select country
                </label>
                <CountryDropdown
                  name="country"
                  value={country}
                  onChange={(val: string) => setCountry(val)}
                />
              </FilterWrapper>
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
                <TableCell>Owner</TableCell>
                <TableCell>Add date</TableCell>
                <TableCell>Country</TableCell>
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
                  ${project.promoter.highestTitle.name.short}
                  ${project.promoter.firstName}
                  ${project.promoter.lastName}
                  `}
                    </TableCell>
                    <TableCell>{project.university.name.short}</TableCell>
                    <TableCell>{statusSelector(project.status.selected, project.status.completed)}</TableCell>
                    <TableCell>{project.status.selected ? ` ${project.owner.highestTitle.name.short} ${project.owner.firstName} ${project.owner.lastName}` : '-'}</TableCell>
                    <TableCell>{project.addedDate}</TableCell>
                    <TableCell>{project.country}</TableCell>
                    <TableCell>{
                      project.owner.id === '' && (
                        <Button
                          onClick={() => handleReserveProject(project.id)}
                          variant="outlined"
                          color="primary"
                        >Reserve
                        </Button>
                      )
                    }
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
