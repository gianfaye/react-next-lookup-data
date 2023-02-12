"use client"
import type { NextPage } from 'next'
import styles from './page.module.css'

/*
* CONTROLLED = useState, `value` prop on input
* UNCONTROLLED = useRef, `defaultValue` prop on input
* */

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Product Lookup</h1>
        <div className={styles.card}>
          <a href="/controlled">Controlled</a>
        </div>
        <div className={styles.card}>
          <a href="/uncontrolled">Uncontrolled</a>
        </div>
      </div>
    </main>
  )
}

export default Home
