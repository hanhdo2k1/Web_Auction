import React, { useEffect, useState } from 'react'
import HearderNaviga from '../components/HearderNaviga';
import Footer from '../components/Footer'
import '../style/detail.scss'
import { Breadcrumb } from 'antd';
import AuctionInfor from '../components/AuctionInfor'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const Detail = () => {
  const idProduct = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {

        const response = await axios.get(`http://localhost:8111/product/detail/${idProduct.id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProductDetail();
  }, [idProduct]);
  return (
    <div className='detail'>
      <HearderNaviga />
      <div className="detail-content">
        <Breadcrumb
          items={[
            {
              title: <a href="/#">Trang chủ</a>,
            },
            {
              title: <a href="/#">Đấu giá</a>,
            },
            {
              title: 'Datejust',
            },
          ]}
        />
        {error != null ? <p>Lỗi</p> : <AuctionInfor product={product} />}
      </div>
      {/* <ListProduct /> */}
      <Footer />
    </div>
  )
}

export default Detail