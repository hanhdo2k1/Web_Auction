import React, { useCallback, useEffect, useState } from 'react'
import HearderNaviga from '../components/HearderNaviga';
import Footer from '../components/Footer';
import '../style/order.scss'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency, formatDateTime } from '../untils/utils';

function Order() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user.username;

  //lấy lịch sử order
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8111/order/user/${username}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  console.log(orders)
  return (
    <>
      <HearderNaviga />
      <div className="order-history">
        <div className="order-history__header">
          Lịch sử đơn hàng
        </div>
        <table className="order-history__table">
          <thead>
            <tr>
              <th>Ngày Đặt</th>
              <th>Tổng tiền</th>
              <th>Tên người nhận</th>
              <th>Trạng thái đơn hàng</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{formatDateTime(order.orderDate)}</td>
                <td>{formatCurrency(Math.round(order.totalPrice))}</td>
                <td>{order.fullName}</td>
                <td>{(order.status === 0 ? "Đang chờ xác nhận" : (order.status === 1 ? "Đang vận chuyển" : (order.status === 2 ? "Đang giao hàng" : (order.status === 3 ? "Đã hoàn thành" : ""))))}</td>
                <td>
                  <Button variant="success" className="edit-btn">
                    <Link to={`/dathang/${order.orderId}`} style={{ color: "white", textDecoration: "none" }}>Xem chi tiết
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>

  );
}

export default Order