import React, { Component, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CartVisualizer from './CartVisualizer.js'
import CartFilter from './CartFilter.js'
import FilterSelecDropDown from './FilterSelectDropDown';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LocalizedStrings from '../LocalizationStrings';

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

const CartList = () => {

    const classes = useStyles();

    const [carts, setCarts] = useState([]);
    const [filteredCarts, setFilteredCarts] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filterBy, setFilterBy] = useState('all');

    useEffect(() => {
        setCarts(sampleCartData)
    }, [])

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
                break
            case "first name":
                return cart.driver.firstName.toLowerCase().includes(searchString.toLowerCase())
                break
            case "last name":
                return cart.driver.lastName.toLowerCase().includes(searchString.toLowerCase())
                break
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
        return (shouldFilter() ? filteredCarts : carts)
    }

    const showFilteredCount = () => {
        if (shouldFilter()) {
            return (
                <Typography variant="h4" gutterBottom>
                    filtered carts count: {filteredCarts.length}
                </Typography>
            )
        }
    }

    return (
        <div
            style={{ padding: 24 }}
        >
            <Grid container spacing={4}
                style={{ padding: 24 }}
            >
                <TextField
                    id="searchInput"
                    placeholder={`${LocalizedStrings.search} ${LocalizedStrings.cart}s`}
                    onChange={onSearchInputChange}
                    margin="normal"
                />
                <FilterSelecDropDown
                    className={classes.dropDown}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    handleFilterChange={handleFilterChange}
                    filterBy={filterBy}
                />
                <Grid>
                    <Typography variant="h4" gutterBottom>
                        {`${LocalizedStrings.cart}s: ${carts.length}`}
                    </Typography>
                    {showFilteredCount()}
                </Grid>
            </Grid>
            <div>
                {cartsToDisplay().length > 0 ? (
                    <div>
                        <Grid container spacing={4}>
                            {cartsToDisplay().map((currentCart, index) => (
                                <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                                    <CartVisualizer cart={currentCart} ></CartVisualizer>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) :
                    <div
                        style={{ padding: 24 }}>
                            {LocalizedStrings.noCartsFound}.
                </div>}
            </div>
        </div>
    )
}

export default CartList;