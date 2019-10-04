import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import LocalizedStrings from '../LocalizationStrings';

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

export default function FilterSelectDropDown({ handleFilterChange, filterBy }) {
    const classes = useStyles();

    return (
        <form className={classes.root} autoComplete="off">
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filter-by-simple">{LocalizedStrings.filterBy}</InputLabel>
                    <Select
                        // native
                        value={filterBy}
                        onChange={handleFilterChange}
                        inputProps={{
                            name: 'filter by',
                            id: 'filter-by-simple',
                        }}
                    >
                        <MenuItem value={"no filter"}>{LocalizedStrings.noFilter}</MenuItem>
                        <MenuItem value={"first name"}>{LocalizedStrings.firstName}</MenuItem>
                        <MenuItem value={"last name"}>{LocalizedStrings.lastName}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </form>
    );
}
