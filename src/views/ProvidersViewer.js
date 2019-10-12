import React, {
} from 'react'
import CollectionListVisualizer from '../views/CollectionListVisualizer'
import ProviderVisualizer from '../views/ProviderVisualizer'
import FakerDataProvider from '../Helpers/DataProviders/FakerDataProvider'
import FirebaseDataProvider from '../Helpers/DataProviders/FirebaseDataProvider'
import strings from '../Strings'

export default function ProvidersViewer() {

    const filterCollectionByFunction = (provider, searchString, filterBy) => {
      if (provider && searchString) {
        // filter by:...
        console.log("filter by: " + filterBy)
        switch (filterBy) {
          default:
            return provider.name.toLowerCase().includes(searchString.toLowerCase()) ||
              provider.description.toLowerCase().includes(searchString.toLowerCase())
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
        return await FakerDataProvider.getProviders(100)
      } else {
        return await FirebaseDataProvider.getProviders()
      }
    }
  
    // TODO: figure out why using an array like this does not give strings
    const filterByOptions = null
  
    const collectionName = strings.provider
  
    const visualizer = (provider) => {
      return (<ProviderVisualizer provider={provider} ></ProviderVisualizer>)
    }
  
    return (
      <CollectionListVisualizer
        collectionName={collectionName}
        filterCollectionByFunction={filterCollectionByFunction}
        filterByOptionsProp={filterByOptions}
        getCollectionDataFunction={getCollectionDataFunction}
        useMockData={true}
        visualizer={visualizer}
      />
    )
  }