import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    margin: 'dense',
    paddingLeft: 24
  },
}));

export default function CartFilter() {
  const classes = useStyles();
  const [value, setValue] = React.useState('First Name');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Filter Cart by:</FormLabel>
        <RadioGroup aria-label="filter-by" name="filter" value={value} onChange={handleChange}>
          <FormControlLabel value="First Name" control={<Radio />} label="First Name" />
          <FormControlLabel value="Last Name" control={<Radio />} label="Last Name" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
