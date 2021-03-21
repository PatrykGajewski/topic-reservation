import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SelectOption } from 'models/forms';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  options: SelectOption[]
  selectedOption: SelectOption,
  handleChange: (value: string) => void,
  id: string
  label: string,
  labelId: string,
  multiple?: boolean
}

const StyledInputLabel = styled(InputLabel)`
  background: white;
  border-radius: 4px;
`;

export const SimpleSelect = (props: Props) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    props.handleChange(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <StyledInputLabel variant="outlined" id={props.labelId}>{props.label}</StyledInputLabel>
        <Select
          labelId={props.labelId}
          id={props.id}
          value={props.selectedOption.value}
          onChange={handleChange}
          multiple={props.multiple}
        >
          {props.options.map((option: SelectOption) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
