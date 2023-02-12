import styles from "../app/page.module.css";
import Image from "next/image";

interface GenericObject {
  [key: string]: string | number | boolean | GenericObject
}

const Product = (productData: GenericObject) => {
  /*
  * product attributes:
  * category
  * description
  * id
  * image
  * price
  * rating: {rate: dec, count: int}
  * title
  * */

  const product = productData.product
  // @ts-ignore
  const { title, image, price } = product
  return (
    <div className={styles.card}>
      <Image
        src={image as string}
        alt={title as string}
        width={100}
        height={100}
        priority
      />
      <h3>{title}</h3>
      <p>${price}</p>
    </div>
  )
}

export default Product
