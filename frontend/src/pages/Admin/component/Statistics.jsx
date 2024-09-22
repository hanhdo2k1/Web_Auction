import React, { useEffect, useState } from 'react'
import '../style/statistics.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../../../untils/utils';

function Statistics() {
  const [dataStatistic, setDataStatistic] = useState(null);

  //lấy Data Statistic
  useEffect(() => {
    fetchDataStatistic();
  }, []);

  const fetchDataStatistic = async () => {
    try {
      const response = await axios.get('http://localhost:8111/data/');
      setDataStatistic(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Xin chào Admin!</p>
      <div className="dashboard__cards">
        <div className="dashboard__card">
          {/* <FaCoffee className="dashboard__card-icon" /> */}
          <div className="dashboard__card-info">
            <h2>{dataStatistic && dataStatistic.countCategory}</h2>
            <p>Danh mục</p>
          </div>
        </div>
        <div className="dashboard__card">
          {/* <FaDollarSign className="dashboard__card-icon" /> */}
          <div className="dashboard__card-info">
            <h2>{dataStatistic && formatCurrency(dataStatistic.sales)}</h2>
            <p>Doanh thu</p>
          </div>
        </div>
        <div className="dashboard__card">
          {/* <FaClipboard className="dashboard__card-icon" /> */}
          <div className="dashboard__card-info">
            <h2>{dataStatistic && dataStatistic.countUser}</h2>
            <p>Người dùng</p>
          </div>
        </div>
        <div className="dashboard__card">
          {/* <FaUsers className="dashboard__card-icon" /> */}
          <div className="dashboard__card-info">
            <h2>{dataStatistic && dataStatistic.countProduct}</h2>
            <p>Số lượng sản phẩm</p>
          </div>
        </div>
      </div>
      <div className="dashboard__orders">
        <div className="dashboard__orders-header">
          <h2>Tổng số đơn hàng : {dataStatistic && dataStatistic.countOrder}</h2>
          <button><Link to="/admin/donhang">Đơn hàng</Link></button>
        </div>
        <div className="dashboard__orders-statuses">
          <div className="dashboard__orders-status">
            <h3>{dataStatistic && dataStatistic.countOrderConfirm}</h3>
            <p>Đang chờ xác nhận</p>
          </div>
          <div className="dashboard__orders-status">
            <h3>{dataStatistic && dataStatistic.countOrderShipping}</h3>
            <p>Đang giao hàng</p>
          </div>
          <div className="dashboard__orders-status">
            <h3>{dataStatistic && dataStatistic.countOrderSuccess}</h3>
            <p>Đã hoàn thành</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics