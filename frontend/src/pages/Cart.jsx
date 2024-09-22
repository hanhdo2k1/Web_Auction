import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import Footer from '../components/Footer'
import '../style/cart.scss'
import HearderNaviga from '../components/HearderNaviga';
import { Button, Empty } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../untils/utils';

function Cart() {
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
    <div className='cart'>
      <HearderNaviga />
      <h3>Giỏ hàng của bạn</h3>
      {cart && cart.cartDetails.length === 0 ?
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            minHeight: 160,
          }}
          description={
            <span>
              Giỏ hàng bạn đang trống
            </span>
          }
        >
          <Link to="/trangchu">
            <Button type="primary" >Mua ngay</Button>
          </Link>
        </Empty>
        :
        <>
          <p>Hiện tại có {cart && cart.cartDetails.length} sản phẩm</p>
          <Row style={{ padding: '10px 32px' }}>
            <Col span={12} className='product-card'>
              {error != null ? <p>Đang xử lý</p> : cart && cart.cartDetails.map((cardtail, index) => (
                <div className="product-item" key={index}>
                  <img src={`http://localhost:8111/image/${cardtail.product.thumbnail}`} alt="" />
                  <div className="infor">
                    <p className='name'>{cardtail.product.productName}</p>
                    <p className='quality'>Số lượng: 1</p>
                    <p className='price'>{formatCurrency(cardtail.price)}</p>
                  </div>
                  {/* <CloseCircleOutlined style={{ fontSize: '20px', cursor: 'pointer' }} /> */}
                </div>
              ))}
            </Col>
            <Col span={12} className='bill'>
              <div className="bill-detail">
                <div className="title">Hóa đơn</div>
                <div className="infor">
                  <p>Tổng sản phẩm ({cart && cart.cartDetails.length}): {formatCurrency(totalPrice != null && totalPrice)}</p>
                  <p>Vận chuyển: 300.000 VNĐ</p>
                  <p>Thuế VAT (10%): {formatCurrency(totalPrice != null && Math.round(totalPrice * 0.1))} </p>
                </div>
                <div className="total">
                  <p>Tổng: {formatCurrency(totalPrice != null && Math.round(totalPrice + (totalPrice * 0.1) + 300000))}</p>
                </div>
                <Link to={"/thanhtoan"}>
                  <button>Thanh toán</button>
                </Link>
              </div>
            </Col>
          </Row>
        </>
      }
      <Footer />
    </div>
  )
}

export default Cart