import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SelectOption } from 'models/forms';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
}

export const SimpleSelect = (props: Props) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    props.handleChange(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id={props.labelId}>{props.label}</InputLabel>
        <Select
          labelId={props.labelId}
          id={props.id}
          value={props.selectedOption.value}
          onChange={handleChange}
        >
          {props.options.map((option: SelectOption) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
