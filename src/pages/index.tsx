import styles from '../app/page.module.css'
import Link from 'next/link'

/*
* CONTROLLED = useState, `value` prop on input
* UNCONTROLLED = useRef, `defaultValue` prop on input
* */

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Product Lookup</h1>
        <div className={styles.card}>
          <Link href="/controlled">Controlled</Link>
        </div>
        <div className={styles.card}>
          <Link href="/uncontrolled">Uncontrolled</Link>
        </div>
      </div>
    </main>
  )
}

export default Home
