import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CollectionVisualizer from './CollectionVisualizer'
// import CollectionFilter from './CollectionFilter.js'
import FilterSelecDropDown from './FilterSelectDropDown'
import { fade, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LocalizedStrings from '../LocalizationStrings'
import FirebaseDataCollection from '../Helpers/DataCollections/FirebaseDataCollection'
import LinearIndeterminateProgress from './LinearIndeterminateProgress'
import FakerDataCollection from '../Helpers/DataCollections/FakerDataCollection'
// import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList'
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Paper from '@material-ui/core/Paper';
import { Zoom } from '@material-ui/core'

// import sampleCollectionData from '../data-samples/collection.json'

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

export default function CollectionVisualizer( collectionGetter) {

    const classes = useStyles();

    const filterByOptions =
        [LocalizedStrings.noFilter,
        ]

    const viewCollectionName = LocalizedStrings.collection

    const [collection, setCollections] = useState(null);
    const [filter, setFilter] = useState({
        filterBy: filterByOptions[0],
        searchString: null,
        filteredCollections: null
    })
    const [readyToShowList, setReadyToShowList] = useState(false)
    const [showProgress, setShowProgress] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const useMockData = true

    useEffect(() => {
        setShowProgress(isLoading)
        if (useMockData) {
            loadMockData()
        } else {
            FirebaseDataCollection
                .getCollections()
                .then((collection) => {
                    setCollections(collection)
                    setIsLoading(false)
                    setReadyToShowList(true)
                    console.log(collection)
                })
        }
    }, [isLoading])

    function loadMockData() {
        setIsLoading(true)
        // from local json
        // setCollections(sampleCollectionData)
        // from Faker.js
        FakerDataCollection.getCollections(100)
            .then((collection) => {
                setCollections(collection)
                setShowProgress(false)        
                setReadyToShowList(true)
            })
    }

    function updateFilter(
        searchString = filter.searchString,
        filterBy = filter.filterBy) {
        // filter collection?
        if (shouldFilter(searchString)) {
            console.log("will filter by: " + filterBy)
            setFilter({
                filteredCollections: collection.filter(collection => {
                    let shouldFilter = filterCollectionsBy(collection, searchString, filterBy)
                    if (shouldFilter) {
                        console.log("collection: " + collection)
                    }
                    return shouldFilter
                }),
                searchString: searchString,
                filterBy: filterBy
            })
        } else {
            setFilter({
                filteredCollections: null,
                searchString: searchString,
                filterBy: filterBy
            })
        }
    }

    const shouldFilter = (searchString) => {
        return searchString && searchString.length > 0
    }

    function filterCollectionsBy(collection, searchString, filterBy) {
        // filter by:...
        console.log("filter by: " + filterBy)
        switch (filterBy) {
            default:
                return collection.name.toLowerCase().includes(searchString.toLowerCase()) ||
                    collection.description.toLowerCase().includes(searchString.toLowerCase())
        }
    }

    const handleSearchInputChange = (event) => {
        updateFilter(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log("changed filter to: " + event.target.value)
        updateFilter(undefined, event.target.value)
    }

    const collectionToDisplay = () => {
        return (filter.filteredCollections ? filter.filteredCollections : collection)
    }

    const showCollectionsCount = () => {
        if (collection) {
            return (
                <Paper style={{ display: 'inline-block', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body1">
                        {` ${LocalizedStrings.collection}s: ${collection.length} `}
                    </Typography>
                </Paper>
            )
        }
    }

    const showFilteredCollectionsCount = () => {
        if (filter.filteredCollections) {
            return (
                <Paper style={{ display: 'inline-block', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body1">
                        {` ${LocalizedStrings.filtered}: ${filter.filteredCollections.length} `}
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
                            <Grid item xs="auto"
                                style={{ padding: 0, marginTop: 16, paddingLeft: 24 }}
                            >
                                <TextField
                                    id="searchInput"
                                    placeholder={`${LocalizedStrings.search} ${viewCollectionName}s`}
                                    onChange={handleSearchInputChange}
                                />
                            </Grid>
                            <Grid item xs="auto"
                                style={{ padding: 0, paddingLeft: 16 }}>
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
                            <Grid item xs="auto"
                                style={{ padding: 0, marginTop: 18, paddingLeft: 24, paddingRight: 24, paddingBottom: 6 }}
                            >{showCollectionsCount()} </Grid>
                            <Grid item xs="auto"
                                style={{ padding: 0, marginTop: 18, paddingLeft: 24, paddingRight: 24, paddingBottom: 6 }}
                            >{showFilteredCollectionsCount()} </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div style={{ margin: 24 }} >
                    {collectionToDisplay() && collectionToDisplay().length > 0 ? (
                        <div>
                            <Grid container spacing={4}>
                                {collectionToDisplay().map((currentCollection, index) => (
                                    <Zoom key={index} in={readyToShowList}>
                                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                                            <CollectionVisualizer collection={currentCollection} ></CollectionVisualizer>
                                        </Grid>
                                    </Zoom>
                                ))}
                            </Grid>
                        </div>
                    ) : <div style={{ margin: 24 }}>{LocalizedStrings.noCollectionsFound}.
                </div>}
                </div>
            </div>
        </div>
    )
}