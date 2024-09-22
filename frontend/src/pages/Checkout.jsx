import React, { useEffect, useState } from 'react'
import HearderNaviga from '../components/HearderNaviga';
import InforCheckout from '../components/InforCheckout'
import { Col, Row } from 'antd';
import '../style/checkout.scss'
import Footer from '../components/Footer';
import axios from 'axios';
import { formatCurrency } from '../untils/utils';


function Checkout() {

  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user.username;

  //lấy cart
  const fetchCarts = async () => {
    try {
      const response = await axios.post('http://localhost:8111/cart/user', {
        username,
      });
      setCart(response.data.data);
      setTotalPrice(response.data.data.totalPrice)
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HearderNaviga />
      <div className='check-out'>
        <h3>Thông tin thanh toán</h3>
        <Row>
          <Col span={12} style={{ width: '40%' }}>
            <InforCheckout />
          </Col>
          <Col span={12} style={{ width: '40%' }}>
            <div className="card">
              <div className="title">
                <p>Tổng số đơn đặt hàng {cart && cart.cartDetails.length}</p>
              </div>
              {error != null ? <p>Đang xử lý</p> : cart && cart.cartDetails.map((cardtail, index) => (
                <div className="infor" key={index}>
                  <img src="https://empireluxury.vn/wp-content/uploads/2022/04/dong-ho-rolex-datejust-36-126231-0017-mat-so-trang-day-deo-jubilee-thep-vang-hong-1.jpg" alt="" />
                  <span>{cardtail.product.productName}</span>
                  <span>{formatCurrency(cardtail.price)}</span>
                </div>
              ))}
              <div className="total">
                <span>Tổng</span>
                <span>{formatCurrency(totalPrice != null && totalPrice + 1300000)}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>

  )
}

export default Checkout