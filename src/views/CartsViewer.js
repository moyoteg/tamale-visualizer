import React, {
} from 'react'
import CollectionListVisualizer from './CollectionListVisualizer'
import CartVisualizer from './CartVisualizer'
import FakerDataProvider from '../Helpers/DataProviders/FakerDataProvider'
import FirebaseDataProvider from '../Helpers/DataProviders/FirebaseDataProvider'
import strings from '../Helpers/Strings'

export default function ProvidersViewer() {

    const filterCollectionByFunction = (cart, searchString, filterBy) => {
      if (cart && searchString) {
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
      } else {
        return true
      }
    }
  
    const getCollectionDataFunction = async (useMockData = false) => {
      if (useMockData) {
        // from local json
        // setProviders(sampleProviderData)
        // from Faker.js
        return await FakerDataProvider.getCarts(100)
      } else {
        return await FirebaseDataProvider.getCarts()
      }
    }
  
    // TODO: figure out why using an array like this does not give strings
    const cartsFilterByOptions =
      [strings.firstName,
      strings.lastName]
  
    const collectionName = strings.Carts
  
    const visualizer = (cart) => {
      return (<CartVisualizer cart={cart} ></CartVisualizer>)
    }
  
    return (
      <CollectionListVisualizer
        collectionName={collectionName}
        filterCollectionByFunction={filterCollectionByFunction}
        filterByOptionsProp={cartsFilterByOptions}
        getCollectionDataFunction={getCollectionDataFunction}
        useMockData={true}
        visualizer={visualizer}
      />
    )
  }