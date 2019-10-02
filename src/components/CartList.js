import React, { Component, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CartVisualizer from './CartVisualizer.js'
import CartFilter from './CartFilter.js'

import sampleCartData from '../data-samples/carts.json'

const CartList = () => {

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
                <div
                >
                    filtered carts count: {filteredCarts.length}
                </div>
            )
        }
    }

    return (
        <div
            style={{ padding: 24 }}
        >
            <CartFilter
                handleFilterChange={handleFilterChange}
                filterBy={filterBy}
            />
            <div
            >carts count: {carts.length}</div>
            {showFilteredCount()}
            <TextField
                id="searchInput"
                placeholder="Search for Carts"
                onChange={onSearchInputChange}
                margin="normal"
            />
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
                        No carts found.
                </div>}
            </div>
        </div>
    )
}

export default CartList;