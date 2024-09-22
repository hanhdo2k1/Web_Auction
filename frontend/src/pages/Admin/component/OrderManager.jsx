import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import '../style/category.scss';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDateTime } from '../../../untils/utils.js';

function OrderManager() {
  const [orders, setOrders] = useState([]);
  //lấy lịch sử order
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8111/order/all`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  //Cap nhat trang thai 
  const handleStatusUpdateClick = async (orderId) => {
    console.log(orderId)
    try {
      await axios.patch(`http://localhost:8111/order/status/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  return (
    <div className="category">
      <h2>Quản lý đơn hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ngày Đặt</th>
            <th>Tên người nhận</th>
            <th>Tổng tiền</th>
            <th style={{ textAlign: "center" }}>Trạng thái đơn hàng</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{formatDateTime(order.orderDate)}</td>
              <td>{order.fullName}</td>
              <td>{formatCurrency(Math.round(order.totalPrice))}</td>
              <td style={{ textAlign: "center" }}>{(order.status === 0 ? "Đang chờ xác nhận" : (order.status === 1 ? "Đang vận chuyển" : (order.status === 2 ? "Đang giao hàng" : (order.status === 3 ? "Đã hoàn thành" : ""))))}</td>
              <td style={{ textAlign: "center" }}>
                {order.status !== 3 ? <Button style={{ width: "150px" }} variant="success" className="edit-btn" onClick={() => handleStatusUpdateClick(order.orderId)}>
                  {(order.status === 0 ? "Xác nhận đơn" : (order.status === 1 ? "Đã vận chuyển" : (order.status === 2 ? "Đã giao" : (order.status === 3 ? "Hoàn thành" : ""))))}
                </Button> : ""}
                <Button style={{ width: "80px", backgroundColor: "blue" }} variant="success" className="edit-btn" >
                  <Link style={{ textDecoration: "None", color: "white" }} to={`http://localhost:3000/dathang/${order.orderId}`}>Chi tiết</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default OrderManager