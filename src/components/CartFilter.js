import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    paddingLeft: 24
  },
}));

const CartFilter = ({ handleFilterChange, filterBy }) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl component="filter-fieldset" className={classes.formControl}>
        <FormLabel component="legend">Filter Cart by:</FormLabel>
        <RadioGroup aria-label="filter-by" name="filter" value={filterBy} onChange={handleFilterChange}>
          <FormControlLabel value="all" control={<Radio />} label="all" />
          <FormControlLabel value="first name" control={<Radio />} label="first name" />
          <FormControlLabel value="last name" control={<Radio />} label="last name" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default CartFilter