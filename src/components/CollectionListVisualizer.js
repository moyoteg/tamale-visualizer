import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import {
    TextField,
    Zoom, 
    Button,
    Paper
} from '@material-ui/core'
import CartVisualizer from './CartVisualizer'
import FilterSelecDropDown from './FilterSelectDropDown'
import { 
    fade, 
    makeStyles 
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LocalizedStrings from '../LocalizationStrings'
import LinearIndeterminateProgress from './LinearIndeterminateProgress'
import Icon from '@material-ui/core/Icon';
import {
    // FilterListIcon,
    // SearchRounded
} from '@material-ui/icons/FilterList'
import { 
    // faHome,
    // FontAwesomeIcon 
} from "@fortawesome/free-solid-svg-icons";
// import sampleCartData from '../data-samples/collection.json'

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

export default function CollectionList(props) {

    const { collectionName = 'collection',
        filterCollectionByFunction = true,
        filterByOptions = ["no filter"],
        getCollectionDataFunction } = props

    const classes = useStyles();

    const [viewCollectionName] = useState(collectionName)

    const [collection, setCollection] = useState(null);
    const [filter, setFilter] = useState({
        filterBy: filterByOptions[0],
        filterByOptions: filterByOptions,
        searchString: null,
        filteredCollection: null
    })
    const [readyToShowList, setReadyToShowList] = useState(false)
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        getCollectionDataFunction()
        setFilters()
    }, [getCollectionDataFunction])

    function setFilters() {

    }

    function handleGetCollection() {
        getCollectionDataFunction(true)
            .then((collection) => {
                setCollection(collection)
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
                filteredCollection: collection.filter(element => {
                    let shouldFilter = handlefilterCollectionBy(element, searchString, filterBy)
                    if (shouldFilter) {
                        console.log("element: " + element)
                    }
                    return shouldFilter
                }),
                searchString: searchString,
                filterBy: filterBy
            })
        } else {
            setFilter({
                filteredCollection: null,
                searchString: searchString,
                filterBy: filterBy
            })
        }
    }

    const shouldFilter = (searchString) => {
        return searchString && searchString.length > 0
    }

    function handlefilterCollectionBy(element, searchString, filterBy) {
        console.log(element)
        if (filterCollectionByFunction) {
            return filterCollectionByFunction(element, searchString, filterBy)
        } else {
            return filterCollectionByFunction
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
        return (filter.filteredCollection ? filter.filteredCollection : collection)
    }

    const showCollectionCount = () => {
        if (collection) {
            return (
                <Paper style={{ display: 'inline-block', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body1">
                        {` ${LocalizedStrings.cart}s: ${collection.length} `}
                    </Typography>
                </Paper>
            )
        }
    }

    const showFilteredCollectionCount = () => {
        if (filter.filteredCollection) {
            return (
                <Paper style={{ display: 'inline-block', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body1">
                        {` ${LocalizedStrings.filtered}: ${filter.filteredCollection.length} `}
                    </Typography>
                </Paper>
            )
        }
    }

    const handleRefresh = () => {
        handleGetCollection()
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
                                style={{ padding: 0, marginTop: 16, paddingLeft: 24 }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<Icon>refresh</Icon>}
                                    onClick={handleRefresh}
                                >
                                    Refresh
                                </Button>
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
                                    filterByOptions={filter.filterByOptions}
                                    filterBy={filter.filterBy}
                                />
                            </Grid>
                            <Grid item xs="auto"
                                style={{ padding: 0, marginTop: 18, paddingLeft: 24, paddingRight: 24, paddingBottom: 6 }}
                            >{showCollectionCount()} </Grid>
                            <Grid item xs="auto"
                                style={{ padding: 0, marginTop: 18, paddingLeft: 24, paddingRight: 24, paddingBottom: 6 }}
                            >{showFilteredCollectionCount()} </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div style={{ margin: 24 }} >
                    {collectionToDisplay() && collectionToDisplay().length > 0 ? (
                        <div>
                            <Grid container spacing={4}>
                                {collectionToDisplay().map((currentCart, index) => (
                                    <Zoom key={index} in={readyToShowList}>
                                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                                            <CartVisualizer cart={currentCart} ></CartVisualizer>
                                        </Grid>
                                    </Zoom>
                                ))}
                            </Grid>
                        </div>
                    ) : <div style={{ margin: 24 }}>{LocalizedStrings.noCollectionFound}.
                </div>}
                </div>
            </div>
        </div>
    )
}