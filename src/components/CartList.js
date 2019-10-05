import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CartVisualizer from './CartVisualizer'
// import CartFilter from './CartFilter.js'
import FilterSelecDropDown from './FilterSelectDropDown'
import { fade, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LocalizedStrings from '../LocalizationStrings'
import FirebaseDataProvider from '../Helpers/DataProviders/FirebaseDataProvider'
import LinearIndeterminateProgress from './LinearIndeterminateProgress'
import FakerDataProvider from '../Helpers/DataProviders/FakerDataProvider'
// import Icon from '@material-ui/core/Icon';
// import FilterListIcon from '@material-ui/icons/FilterList'
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Paper from '@material-ui/core/Paper';

// import sampleCartData from '../data-samples/carts.json'

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

var useMockData = true

export default function CartList() {

    const classes = useStyles();

    const [carts, setCarts] = useState(null);
    const [filter, setFilter] = useState({
        filterBy: 'no filter',
        searchString: null,
        filteredCarts: null
    })
    // const [filteredCarts, setFilteredCarts] = useState(null);
    // const [searchString, setSearchString] = useState(null);
    // const [filterBy, setFilterBy] = useState('no filter');
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        setShowProgress(true)
        if (useMockData) {
            loadMockData()
        } else {
            FirebaseDataProvider
                .getCarts()
                .then((carts) => {
                    setCarts(carts)
                    setShowProgress(false)
                    console.log(carts)
                })
        }
    }, [])

    function loadMockData() {
        // from local json
        // setCarts(sampleCartData)
        // from Faker.js
        setCarts(FakerDataProvider.getCarts())
        setShowProgress(false)
    }

    function updateFilter(
        searchString = filter.searchString,
        filterBy = filter.filterBy) {
        // filter carts?
        if (shouldFilter(searchString)) {
            console.log("will filter by: " + filterBy)
            setFilter({
                filteredCarts: carts.filter(cart => {
                    let shouldFilter = filterCartsBy(cart, searchString, filterBy)
                    if (shouldFilter) {
                        console.log("cart: " + cart)
                    }
                    return shouldFilter
                }),
                searchString: searchString,
                filterBy: filterBy
            })
        } else {
            setFilter({
                filteredCarts: null,
                searchString: searchString,
                filterBy: filterBy
            })
        }
    }

    const shouldFilter = (searchString) => {
        return searchString && searchString.length > 0
    }

    function filterCartsBy(cart, searchString, filterBy) {
        // filter by:...
        console.log("filter by: " + filterBy)
        switch (filterBy) {
            default:
                return cart.driver.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
                    cart.driver.lastName.toLowerCase().includes(searchString.toLowerCase())
            case "first name":
                return cart.driver.firstName.toLowerCase().includes(searchString.toLowerCase())
            case "last name":
                return cart.driver.lastName.toLowerCase().includes(searchString.toLowerCase())
        }
    }

    const handleSearchInputChange = (event) => {
        updateFilter(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log("changed filter to: " + event.target.value)
        updateFilter(undefined, event.target.value)
    }

    const cartsToDisplay = () => {
        return (filter.filteredCarts ? filter.filteredCarts : carts)
    }

    const showCartsCount = () => {
        if (carts) {
            return (
                <Paper style={{ display: 'inline-block' }}>
                    <Typography variant="body1">
                        {`${LocalizedStrings.cart}s: ${carts.length}`}
                    </Typography>
                </Paper>
            )
        }
    }

    const showFilteredCartsCount = () => {
        if (filter.filteredCarts) {
            return (
                <Paper style={{ display: 'inline-block' }}>
                    <Typography variant="body1">
                        {`${LocalizedStrings.filtered}: ${filter.filteredCarts.length}`}
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
                    <Paper style={{ padding: 16, margin: 4, border: 8 }}>
                        <Grid container spacing={4}
                            justifyContent='flex-start'
                            alignItems='center'
                        >
                            <Grid item xs={0}
                            style={{padding: 0, marginTop: 22, paddingLeft: 4}}
                            >
                                <SearchRoundedIcon />
                            </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 16, paddingLeft: 4}}
                            >
                                <TextField
                                    id="searchInput"
                                    placeholder={`${LocalizedStrings.search} ${LocalizedStrings.cart}s`}
                                    onChange={handleSearchInputChange}
                                />
                            </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, paddingLeft: 0}}>
                                <FilterSelecDropDown
                                    className={classes.dropDown}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    handleFilterChange={handleFilterChange}
                                    filterBy={filter.filterBy}
                                />
                            </Grid>
                            {/* <FilterListIcon style={{ padding: 4, margin: 4, border: 4 }} /> */}
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 18, paddingLeft: 4 }}
                            > : {showCartsCount()} </Grid>
                            <Grid item xs={0}
                                style={{ padding: 0, marginTop: 18, paddingLeft: 4 }}
                            > : {showFilteredCartsCount()} </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div style={{ padding: 24 }} >
                    {cartsToDisplay() && cartsToDisplay().length > 0 ? (
                        <div>
                            <Grid container spacing={4}>
                                {cartsToDisplay().map((currentCart, index) => (
                                    <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                                        <CartVisualizer cart={currentCart} ></CartVisualizer>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ) : <div style={{ padding: 24 }}>{LocalizedStrings.noCartsFound}.
                </div>}
                </div>
            </div>
        </div>
    )
}