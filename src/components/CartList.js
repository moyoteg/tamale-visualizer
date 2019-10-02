import React, { Component, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CartVisualizer from './CartVisualizer.js'
import CartFilter from './CartFilter.js'

import sampleCartData from '../data-samples/carts.json'

const CartList = () => {

    const [carts, setCarts] = useState(sampleCartData);
    const [filteredCarts, setFilteredCarts] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filterBy, setFilterBy] = useState('no filter');

    useEffect(() => {
        getCarts(searchString)
    }, [])

    const getCarts = (searchString) => {
        // filter carts?
        if (shouldFilter()) {
            setFilteredCarts(this.state.carts.filter(cart => {
                return filter(cart, searchString)
            }))
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

    const cartsToDisplay = () => {
        return (shouldFilter()?carts:filteredCarts)
        // let cartsToDisplay = []
        // if (shouldFilter()) {
        //     debugger
        //     return filteredCarts
        // } else {
        //     debugger
        //     return carts
        // }
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
                {cartsToDisplay().length > 0 ? (
                    <div>
                        <Grid container spacing={4} style={{ padding: 24 }}>
                            {cartsToDisplay().map((currentCart, index) => (
                                <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                                    <CartVisualizer cart={currentCart} ></CartVisualizer>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : 
                <div 
                style={{ padding: 24}}>
                    No carts found. carts count {carts.length}
                </div>}
            </div>
        </div>
    )
}

export default CartList;