import React, {ChangeEvent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SelectOption } from 'models/forms';
import styled from 'styled-components';
import { uniq } from 'lodash';

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
  selectedOptions: string[],
  handleChange: (value: string[]) => void,
  id: string
  label: string,
  labelId: string,
  disabled?: boolean
}

const StyledInputLabel = styled(InputLabel)`
  background: white;
  border-radius: 4px;
`;

export const MultipleSelect = (props: Props) => {
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<any>) => {
    props.handleChange(uniq(e.target.value as string[]));
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <StyledInputLabel variant="outlined" id={props.labelId}>{props.label}</StyledInputLabel>
        <Select
          disabled={props.disabled}
          labelId={props.labelId}
          multiple
          id={props.id}
          value={props.selectedOptions}
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
