import styles from '../app/page.module.css'
import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Product from "../components/Product";

/*
* CONTROLLED = useState, `value` prop on input
* */

const ControlledPage: NextPage = () => {
  const [productsData, setProductsData] = useState([])
  const [filteredProductsData, setFilteredProductsData] = useState([])
  const [query, setQuery] = useState('')

  const getProductsData = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const jsonResponse = await response.json()
    setProductsData(jsonResponse)
    setFilteredProductsData(jsonResponse)
  }

  useEffect(() => {
    getProductsData()
  }, [])

  const handleResetSearch = () => {
    setQuery('')
    // inputRef.current.value = ''
    setFilteredProductsData(productsData)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const fieldValue = event.target.value
    setQuery(fieldValue)
    if (fieldValue === '') {
      handleResetSearch()
    }
  }

  const handleSearchProduct = () => {
    const currentProductsListData = productsData
    const searchResults = currentProductsListData.filter((product) => {
      const {title} = product
      const titleQuery = title.toLowerCase()
      const queryKeyword = query.toLowerCase()
      const isQueryOnTitle = titleQuery.includes(queryKeyword)
      return isQueryOnTitle
    }) ?? []
    setFilteredProductsData(searchResults)
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      console.log('Pressed ENTER')
      handleSearchProduct()
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Product Lookup (Controlled)</h1>
      </div>
      <div>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            className={styles.searchBar}
            name='search'
            value={query}
            placeholder='product name or category'
            type="text"
            onChange={(event) => handleChange(event)}
            onKeyUp={handleKeyUp}
          />
          <button onClick={handleSearchProduct}>Search</button>
          <button onClick={handleResetSearch}>Reset</button>
        </div>
      </div>
      <div className={styles.grid}>
        {!!filteredProductsData && filteredProductsData.map((data, idx) => {
          return <Product key={idx} product={data}/>
        })}
        {(filteredProductsData.length === 0) && (
          <p>No products found</p>
        )}
      </div>
    </main>
  )
}

export default ControlledPage
