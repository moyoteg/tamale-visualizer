import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import strings from '../../Helpers/Strings';

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

export default function FilterSelectDropDown(props) {

    const { handleFilterChange, filterByOptions, selectedOption = strings.noFilter } = props
    const classes = useStyles();

    return (
        <form className={classes.root} autoComplete="off">
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filter-by-simple">{strings.filterBy}</InputLabel>
                    <Select
                        native
                        value={selectedOption}
                        onChange={handleFilterChange}
                        inputProps={{
                            name: 'filter by',
                            id: 'filter-by-simple',
                        }}
                    >
                        {filterByOptions.map((filterOption) => (
                            <MenuItem
                                key={filterOption}
                                value={filterOption}
                            >{filterOption}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </form>
    );
}
