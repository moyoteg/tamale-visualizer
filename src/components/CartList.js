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
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Paper from '@material-ui/core/Paper';

import sampleCartData from '../data-samples/carts.json'

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

export default function CartList() {

    const classes = useStyles();

    const [carts, setCarts] = useState(null);
    const [filteredCarts, setFilteredCarts] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filterBy, setFilterBy] = useState('no filter');
    const [showProgress, setShowProgress] = useState(false);

    const useMockData = true

    useEffect(() => {
        setShowProgress(true)
        if (useMockData) {
            loadMockData()
        } else {
            let carts = FirebaseDataProvider.getCarts()
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

    const updateFilteredCarts = (searchString) => {
        // filter carts?
        if (shouldFilter()) {
            setFilteredCarts(carts.filter(cart => {
                return filterCartsBy(cart, searchString)
            }))
        } else {
            setFilteredCarts([])
        }
    }

    const shouldFilter = () => {
        return searchString && searchString.length > 0
    }

    const filterCartsBy = (cart, searchString) => {
        // filter by:...
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

    const onSearchInputChange = (event) => {
        if (event.target.value) {
            setSearchString(event.target.value)
        } else {
            setSearchString('')
        }
        updateFilteredCarts(event.target.value)
        // getCarts(event.target.value)
    }

    const handleFilterChange = (event) => {
        if (event.target.value) {
            setFilterBy(event.target.value)
        } else {
            setFilterBy('all')
        }
    }

    const cartsToDisplay = () => {
        return (shouldFilter() && carts ? filteredCarts : carts)
    }

    const showCartsCount = () => {
        if (carts) {
            return (
                <Paper style={{ padding: 4, margin: 4, border: 4 }}>
                    <Typography variant="p">
                        {`${LocalizedStrings.cart}s: ${carts.length}`}
                    </Typography>
                </Paper>
            )
        }
    }

    const showFilteredCartsCount = () => {
        if (shouldFilter()) {
            return (
                <Paper style={{ padding: 4, margin: 4, border: 4 }}>
                    <Typography variant="p"
                        style={{ padding: 4, margin: 4, border: 4 }}
                    >
                        {`${LocalizedStrings.filtered}: ${filteredCarts.length}`}
                    </Typography>
                </Paper>
            )
        }
    }

    return (
        <div>
            {showProgress && <LinearIndeterminateProgress />}
            <div className={classes.root} style={{ padding: 8, margin: 12, border: 2 }}>
                <div>
                    <Paper style={{ padding: 16, margin: 4, border: 8 }}>
                        <Grid container spacing={5} alignItems='baseline'>
                            <SearchRoundedIcon style={{ padding: 4, margin: 4, border: 4 }} />
                            <TextField style={{ padding: 4, margin: 4, border: 4 }}
                                id="searchInput"
                                placeholder={`${LocalizedStrings.search} ${LocalizedStrings.cart}s`}
                                onChange={onSearchInputChange}
                            />
                            {/* <FilterListIcon style={{ padding: 4, margin: 4, border: 4 }} /> */}
                            <FilterSelecDropDown style={{ padding: 4, margin: 4, border: 4 }}
                                className={classes.dropDown}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                handleFilterChange={handleFilterChange}
                                filterBy={filterBy}
                            />
                            :{showCartsCount()}
                            :{showFilteredCartsCount()}
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
                    ) :<div style={{ padding: 24 }}>{LocalizedStrings.noCartsFound}.
                </div>}
                </div>
            </div>
        </div>
    )
}