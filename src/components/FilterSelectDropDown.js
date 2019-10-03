import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [filterBy, setFilterBy] = React.useState(["all"])

  React.useEffect(() => {
  }, []);

  const handleChange = name => event => {
      switch (name) {
          case "filter by":
                setFilterBy(event.target.value)
              break
        default:
            break
      }
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="filter-by-simple">Filter by</InputLabel>
        <Select
          native
          value={filterBy}
          onChange={handleChange('filter by')}
          inputProps={{
            name: 'filter by',
            id: 'filter-by-simple',
          }}
        >
          <option value="all" />
          <option value={"first name"}>First Name</option>
          <option value={"last name"}>Last Name</option>
        </Select>
      </FormControl>
    </div>
  );
}
