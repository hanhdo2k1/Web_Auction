import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import ListProduct from '../components/ListProduct'
import Footer from '../components/Footer'
import axios from 'axios';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Khai báo biến categories ở đây

  const fetchProducts = async (txtSearch = '', categoryId = '') => {
    try {
      const response = await axios.get('http://localhost:8111/product/all', {
        params: {
          txtSearch,
          category: categoryId
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch all products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      <Header
        onSearch={fetchProducts}
        categories={categories}
        setCategory={setCategories}
      />
      <Banner />
      <ListProduct products={products} />
      <Footer />
    </>
  )
}

export default Index