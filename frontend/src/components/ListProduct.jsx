import React, { useCallback, useEffect, useState } from 'react'
import Product from './Product'
import { ArrowRightOutlined } from '@ant-design/icons';
import '../style/listproduct.scss'
// import axios from 'axios';


// const fetchProducts = async () => {
//   try {
//     const response = await axios.get('http://localhost:8111/product/all');
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching products:', error);
//   }
// };

function ListProduct({ products = [] }) {
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState(null);
  // //Lấy ra list sản phẩm
  // const loadProducts = useCallback(async () => {
  //   setError(null);
  //   try {
  //     const productsData = await fetchProducts();
  //     setProducts(productsData);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }, []);

  // useEffect(() => {
  //   loadProducts();
  // }, [loadProducts]);

  console.log(products)


  return (
    <div className="product-list">
      <div className="title">
        <div className='collection'>
          <p style={{ marginBottom: "2px" }}>Bộ sưu tập</p>
          <ArrowRightOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </div>
      </div>
      <div className="list">
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  )
}

export default ListProduct