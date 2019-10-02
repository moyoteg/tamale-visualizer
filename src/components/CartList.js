import React, { Component, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CartVisualizer from './CartVisualizer.js'
import CartFilter from './CartFilter.js'

import data from '../data-samples/carts.json'

const CartList = () => {

    const [carts, setCarts] = useState([]);
    const [filteredCarts, setFilteredCarts] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filterBy, setFilterBy] = useState('none');

    useEffect(() => {
        getCarts(searchString)
    }, [])

    const getCarts = (searchString) => {
        // mock data
        if (carts.length === 0) {
            // this.state["carts"] = data
            // this.state["cartsToDisplay"] = data
            setCarts(data)
        }

        // filter carts
        var filteredCarts = []
        if (shouldFilter()) {
            filteredCarts = this.state.carts.filter(cart => {
                return filter(cart, searchString)
            })
            debugger
            setFilteredCarts(filteredCarts)
        } else {
            debugger
            setFilteredCarts([])
        }
    }

    const shouldFilter = () => {
        return searchString && searchString.length > 0
    }

    const filter = (cart, searchString) => {
        // filter by:...
        var condition = false
        debugger
        switch (filterBy) {
            default:
                condition = false
                break
            case "First Name":
                condition = cart.driver.firstName.includes(searchString)
                break
            case "Last Name":
                condition = cart.driver.lastName.includes(searchString)
                break
        }
        return condition
    }

    const onSearchInputChange = (event) => {
        if (event.target.value) {
            setSearchString(event.target.value)
        } else {
            setSearchString('')
        }
        getCarts(event.target.value)
    }

    const onFilterChange = (event) => {
        debugger
        if (event.target.value) {
            setFilterBy(event.target.value)
        } else {
            setFilterBy('First Name')
        }
    }

    let cartsToDisplay = []
    if (shouldFilter()) {
        cartsToDisplay = filteredCarts
    } else {
        cartsToDisplay = carts
    }

    return (
        <div>
            <TextField
                style={{ padding: 24 }}
                id="searchInput"
                placeholder="Search for Carts"
                margin="normal"
                onChange={onSearchInputChange}
            />
            <CartFilter
                style={{ padding: 24 }}
                margin="normal"
                onChange={onFilterChange}
            />
            <div>
                {cartsToDisplay > 0 ? (
                    <div>
                        <Grid container spacing={4} style={{ padding: 24 }}>
                            {cartsToDisplay.map((currentCart, index) => (
                                <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                                    <CartVisualizer cart={currentCart} ></CartVisualizer>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 'No carts found'}
            </div>
        </div>
    )
}


export default CartList;