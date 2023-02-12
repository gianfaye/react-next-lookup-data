import styles from '../app/page.module.css'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from "react";
import { useDebouncedCallback } from 'use-debounce'
import Product from "../components/Product";

/*
* UNCONTROLLED = useRef, `defaultValue` prop on input
* */

const UncontrolledPage: NextPage = () => {
  const [productsData, setProductsData] = useState([])
  const [filteredProductsData, setFilteredProductsData] = useState([])
  const inputRef = useRef<HTMLInputElement>()

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
    inputRef.current.value = ''
    setFilteredProductsData(productsData)
  }

  const searchProduct = (searchQuery) => {
    const currentProductsListData = productsData
    const searchResults = currentProductsListData.filter((product) => {
      const {title} = product
      const titleQuery = title.toLowerCase()
      const queryKeyword = searchQuery.toLowerCase()
      const isQueryOnTitle = titleQuery.includes(queryKeyword)
      return isQueryOnTitle
    }) ?? []
    console.log('searchQuery', searchQuery)
    setFilteredProductsData(searchResults)
  }

  const searchQuery = useDebouncedCallback((searchQuery) => {
    searchProduct(searchQuery)
  }, 1000)

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Product Lookup (Uncontrolled)</h1>
      </div>
      <div>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            ref={inputRef}
            className={styles.searchBar}
            name='search'
            defaultValue=''
            placeholder='product name or category'
            type="text"
            onChange={(event) => {
              const fieldValue = event.target.value
              searchQuery(fieldValue)
            }}
          />
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

export default UncontrolledPage
