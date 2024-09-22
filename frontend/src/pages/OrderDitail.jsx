import React, { useCallback, useEffect, useState } from 'react'
import HearderNaviga from '../components/HearderNaviga';
import Footer from '../components/Footer';
import '../style/cart.scss'
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom'
import axios from 'axios';
// import { CloseSquareFilled } from '@ant-design/icons';
import { formatCurrency, formatDateTime } from '../untils/utils';


function OrderDitail() {
  const idOrder = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  // detail order
  const fetchOrderDetail = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8111/order/detail/${idOrder.id}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order detail:', error);
    }
  }, [idOrder]);

  useEffect(() => {
    if (idOrder) {
      fetchOrderDetail();
    }
  }, [idOrder, fetchOrderDetail]);


  console.log(orderDetails && orderDetails.setOrders[0].product.thumbnail)
  console.log(orderDetails && Array.isArray(orderDetails.setOrders))
  return (
    <div className='cart'>
      <HearderNaviga />
      <h3>Chi tiết đơn hàng</h3>
      <>
        <Row style={{ padding: '10px 32px' }}>
          <Col span={12} className='product-card'>
            {orderDetails && Array.isArray(orderDetails.setOrders) && orderDetails.setOrders.map((setOrder, index) => (
              <div className="product-item" key={index}>
                <img src={`http://localhost:8111/image/${setOrder.product.thumbnail}`} alt="" />
                <div className="infor">
                  <p className='name'>{setOrder.product.productName}</p>
                  <p className='quality'>Số lượng: 1</p>
                  <p className='price'>{formatCurrency(setOrder.price)}</p>
                </div>
                {/* <CloseCircleOutlined style={{ fontSize: '20px', cursor: 'pointer' }} /> */}
              </div>
            ))}
          </Col>
          <Col span={12} className='bill'>
            <div className="bill-detail">
              <div className="title">Thông tin vận chuyển</div>
              <div className="infor">
                <p>Tên người nhận: <b>{orderDetails && orderDetails.fullName}</b></p>
                <p>Số điện thoại: ,<b>{orderDetails && orderDetails.phoneNumber}</b> </p>
                <p>Địa chỉ: <b>{orderDetails && orderDetails.address}</b> </p>
                <p>Ngày đặt: <b>{formatDateTime(orderDetails && orderDetails.orderDate)}</b> </p>
                <p>Phương thức thanh toán: <b>{orderDetails && orderDetails.paymentMethod}</b></p>
                <p>Trạng thái đơn hàng: <b>{orderDetails && (orderDetails.status === 0 ? "Đang chờ xác nhận" : (orderDetails.status === 1 ? "Đang vận chuyển" : (orderDetails.status === 2 ? "Đang giao hàng" : (orderDetails.status === 3 ? "Đã hoàn thành" : ""))))}</b></p>
              </div>
            </div>
            <div className="bill-detail">
              <div className="title">Hóa đơn</div>
              <div className="infor">
                <p>Tiền hàng: {(orderDetails && formatCurrency(((orderDetails.totalPrice - 300000) / 1.1)))}</p>
                <p>Vận chuyển: 300.000 VNĐ</p>
                <p>Thuế VAT (10%): {(orderDetails && formatCurrency(((orderDetails.totalPrice - 300000) / 1.1) * 0.1))} </p>
              </div>
              <div className="total">
                <p>Tổng tiền: {(orderDetails && formatCurrency(orderDetails.totalPrice))}</p>
              </div>
            </div>
          </Col>
        </Row>
      </>
      <Footer />
    </div>
  )
}

export default OrderDitail