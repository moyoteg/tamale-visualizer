import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ProviderVisualizer from './ProviderVisualizer'
// import ProviderFilter from './ProviderFilter.js'
import FilterSelecDropDown from './FilterSelectDropDown'
import { fade, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LocalizedStrings from '../LocalizationStrings'
import FirebaseDataProvider from '../Helpers/DataProviders/FirebaseDataProvider'
import LinearIndeterminateProgress from './LinearIndeterminateProgress'
import FakerDataProvider from '../Helpers/DataProviders/FakerDataProvider'
// import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList'
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Paper from '@material-ui/core/Paper';

// import sampleProviderData from '../data-samples/providers.json'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    dropDown: {

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

export default function ProviderList() {

    const classes = useStyles();

    const filterByOptions =
        [LocalizedStrings.noFilter,
        ]

    const viewCollectionName = LocalizedStrings.provider

    const [providers, setProviders] = useState(null);
    const [filter, setFilter] = useState({
        filterBy: filterByOptions[0],
        searchString: null,
        filteredProviders: null
    })

    const [showProgress, setShowProgress] = useState(false);

    const useMockData = true

    useEffect(() => {
        setShowProgress(true)
        if (useMockData) {
            loadMockData()
        } else {
            FirebaseDataProvider
                .getProviders()
                .then((providers) => {
                    setProviders(providers)
                    setShowProgress(false)
                    console.log(providers)
                })
        }
    }, [])

    function loadMockData() {
        // from local json
        // setProviders(sampleProviderData)
        // from Faker.js
        setProviders(FakerDataProvider.getProviders(100))
        setShowProgress(false)
    }

    function updateFilter(
        searchString = filter.searchString,
        filterBy = filter.filterBy) {
        // filter providers?
        if (shouldFilter(searchString)) {
            console.log("will filter by: " + filterBy)
            setFilter({
                filteredProviders: providers.filter(provider => {
                    let shouldFilter = filterProvidersBy(provider, searchString, filterBy)
                    if (shouldFilter) {
                        console.log("provider: " + provider)
                    }
                    return shouldFilter
                }),
                searchString: searchString,
                filterBy: filterBy
            })
        } else {
            setFilter({
                filteredProviders: null,
                searchString: searchString,
                filterBy: filterBy
            })
        }
    }

    const shouldFilter = (searchString) => {
        return searchString && searchString.length > 0
    }

    function filterProvidersBy(provider, searchString, filterBy) {
        // filter by:...
        console.log("filter by: " + filterBy)
        switch (filterBy) {
            default:
                return provider.name.toLowerCase().includes(searchString.toLowerCase()) ||
                    provider.description.toLowerCase().includes(searchString.toLowerCase())
        }
    }

    const handleSearchInputChange = (event) => {
        updateFilter(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log("changed filter to: " + event.target.value)
        updateFilter(undefined, event.target.value)
    }

    const providersToDisplay = () => {
        return (filter.filteredProviders ? filter.filteredProviders : providers)
    }

    const showProvidersCount = () => {
        if (providers) {
            return (
                <Paper style={{ display: 'inline-block', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body1">
                        {` ${LocalizedStrings.provider}s: ${providers.length} `}
                    </Typography>
                </Paper>
            )
        }
    }

    const showFilteredProvidersCount = () => {
        if (filter.filteredProviders) {
            return (
                <Paper style={{ display: 'inline-block', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body1">
                        {` ${LocalizedStrings.filtered}: ${filter.filteredProviders.length} `}
                    </Typography>
                </Paper>
            )
        }
    }

    return (
        <div>
            {showProgress && <LinearIndeterminateProgress />}
            <div className={classes.root} >
                <div>
                    <Paper style={{ margin: 24, border: 8 }}>
                        <Grid container spacing={4}
                            justifyContent='flex-start'
                            alignItems='center'
                        >
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 22, paddingLeft: 4 }}
                            >
                                <SearchRoundedIcon style={{ marginLeft: 16 }} />
                            </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 16, paddingLeft: 4 }}
                            >
                                <TextField
                                    id="searchInput"
                                    placeholder={`${LocalizedStrings.search} ${viewCollectionName}s`}
                                    onChange={handleSearchInputChange}
                                />
                            </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 22, paddingLeft: 4 }}
                            >
                                <FilterListIcon style={{ marginLeft: 16 }} />
                            </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, paddingLeft: 0 }}>
                                <FilterSelecDropDown
                                    className={classes.dropDown}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    handleFilterChange={handleFilterChange}
                                    filterByOptions={filterByOptions}
                                />
                            </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 18, paddingLeft: 4, paddingBottom: 6 }}
                            >{showProvidersCount()} </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 18, paddingLeft: 4, paddingBottom: 6 }}
                            >{showFilteredProvidersCount()} </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div style={{ margin: 24 }} >
                    {providersToDisplay() && providersToDisplay().length > 0 ? (
                        <div>
                            <Grid container spacing={4}>
                                {providersToDisplay().map((currentProvider, index) => (
                                    <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                                        <ProviderVisualizer provider={currentProvider} ></ProviderVisualizer>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ) : <div style={{ margin: 24 }}>{LocalizedStrings.noProvidersFound}.
                </div>}
                </div>
            </div>
        </div>
    )
}