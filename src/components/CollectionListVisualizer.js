import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import {
    TextField,
    Zoom,
    Button,
    Paper,
    Container
} from '@material-ui/core'
import CartVisualizer from './CartVisualizer'
import FilterSelecDropDown from './FilterSelectDropDown'
import {
    fade,
    makeStyles
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import strings from '../LocalizationStrings'
import LinearIndeterminateProgress from './LinearIndeterminateProgress'
import {
    Refresh as RefreshIcon
} from '@material-ui/icons';

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
    noItems: {
        margin: 24
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
        // padding: 4, paddingLeft: 16
    },
    paperTag: {
        display: 'inline-block',
        padding: 4,
    },
    paperFilterBar: {
        margin: 4, border: 4, padding: 4
    },
    searchInput: {
        padding: 4, marginTop: 16, paddingLeft: 8
    },
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        border: theme.spacing(1),
    },
    LinearIndeterminateProgress: {
        margin: theme.spacing,
        padding: theme.padding,
        border: theme.padding,
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
        // padding: theme.spacing(1, 1, 1, 7),
        // transition: theme.transitions.create('width'),
        // width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: 120,
        //     '&:focus': {
        //         width: 200,
        //     },
        // },
        fullWidth: true
    },
    collectionView: {
        margin: 4,
        padding: 4,
        border: 4,
    },
    tagGrid: {
        spacing: 1,
        justify: 'center',
    }
}));

export default function CollectionList(props) {

    const { collectionName = 'item',
        filterCollectionByFunction = true,
        filterByOptions = ["no filter"],
        getCollectionDataFunction,
        useMockData = false } = props

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
        handleRefresh(useMockData)
        setFilters()
    }, [])

    function setFilters() {

    }

    function handleGetCollection() {
        setShowProgress(true)
        setCollection(null)
        getCollectionDataFunction(useMockData)
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

    const shouldInsertTag = (text, condition) => {
        if (condition) {
            return (
                <Grid item xs="auto">
                    <Paper className={classes.paperTag}>
                        <Typography variant="body1">
                            {text()}
                        </Typography>
                    </Paper>
                </Grid>
            )
        }
    }

    const handleRefresh = () => {
        handleGetCollection(useMockData)
    }

    return (
        <div className={classes.root} >
            {showProgress && <LinearIndeterminateProgress className={classes.LinearIndeterminateProgress} />}
            <div>
                <Paper className={classes.paperFilterBar}>
                    <Grid container spacing={1}
                        justifyContent='flex-start'
                        alignItems='center'
                    >
                        <Grid item xs="auto">
                            <TextField
                                label={strings.search}
                                style={{ margin: 8 }}
                                helperText=""
                                fullWidth
                                margin="normal"
                                id="searchInput"
                                placeholder={`${strings.search} ${viewCollectionName}s`}
                                onChange={handleSearchInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs="auto">
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
                        <Grid item xs="auto">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                // startIcon={<Icon>refresh</Icon>}
                                startIcon={<RefreshIcon />}
                                onClick={handleRefresh}
                            >refresh
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Container>
                    <Grid container className={classes.tagGrid}
                            spacing= {1}
                            justify= 'center'
                            >
                        {shouldInsertTag(() => { return ` ${strings.cart}s: ${collection.length} ` }, collection)}
                        {shouldInsertTag(() => { return ` ${strings.filtered}: ${filter.filteredCollection.length} ` }, filter.filteredCollection)}
                    </Grid>
                </Container>
            </div>
            <div className={classes.collectionView}>
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
                ) : <div className={classes.noItems}>
                        {strings.formatString(strings.noItemsFound, viewCollectionName)}.
                </div>}
            </div>
        </div>
    )
}