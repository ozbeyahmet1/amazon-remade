import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Navbar__resp from '../../components/Navbar/navbar__resp'
import CategoriesBar from '../../components/CategoriesBar/categories'
import UseWindowSize from "../../hooks/useWindowSize";
import Product from '../../components/ProductPage/SingleProduct';
import styles from './products.module.scss';
import Sidebar from '../../components//ProductPage/Sidebar';
import {useRouter} from 'next/router';
function index({products}) {
    const size = UseWindowSize();
    const router = useRouter();
    const { url } = router.query;
console.log(url);
    return (
        <div products={products}>
            {size.width > 768 ? <Navbar /> : <Navbar__resp />}
            < CategoriesBar/>
            <div className={styles.body}>
                <div className={styles.imageBlock}>
                    <Product products={products}/>
                </div>
                <div className={styles.information}>
                    <h4 className={styles.headline}>{products?.title}</h4>
                    <div className={styles.ratings}> 
                        <h5>⭐⭐⭐⭐⭐</h5>
                        <h4> 824 ratings | 101 Answered questions</h4>
                    </div>
                    <div className={styles.price}>
                    
                        <h5>Price:</h5>
                        <h4>$ {products?.price}</h4>
                        <h6>+$11.40 shipping</h6>
                    </div>
                    <div className={styles.category}>
                        <h4>Category</h4>
                        <h5>{products?.category}</h5>
                    </div>
                    <div className={styles.description}>
                        <h4>About this item</h4>
                        <h5>{products?.description}</h5> 
                    </div>
                </div>
                <div className={styles.sidebar}>
                    <Sidebar url={url} products={products}/>
                </div>
               
            </div>
        </div>
    )
}

export default index

export async function getServerSideProps({params}) {

    const products = await fetch(`https://fakestoreapi.com/products/${params.url}`).then(
      (res) => res.json()
    );
    return {
      props: {
        products,
      },
    };
  }

  