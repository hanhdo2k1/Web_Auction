import React from 'react'
import '../style/headernaviga.scss'
import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../img/logo1.png'
import { Link } from 'react-router-dom';


function HearderNaviga() {
  return (
    <div className="navbar" style={{ padding: "10px 20px" }}>
      <div className="navbar__menu">
        <span className="navbar__menu-icon"><HomeOutlined /></span>
        <span className="navbar__menu-text"><Link to="/trangchu">Trang chủ</Link></span>
      </div>
      <div className="navbar__logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar__icons">
        <div className="navbar__icon">
          <ShoppingCartOutlined />
          <span> <Link to="/giohang">Giỏ hàng</Link></span>
        </div>
        <div className="navbar__icon" style={{ marginRight: "10px" }}>
          <ShoppingOutlined />
          <span> <Link to="/dathang">Lịch sử đặt hàng</Link></span>
        </div>
        <div className="navbar__icon">
          <UserOutlined />
          <span> <Link to="/trangcanhan">Trang cá nhân</Link></span>
        </div>
      </div>
    </div>
  );
};

export default HearderNaviga