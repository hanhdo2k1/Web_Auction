import React from 'react'
import { Link } from 'react-router-dom';
import '../style/sidebar.scss'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src="https://png.pngtree.com/png-vector/20200629/ourlarge/pngtree-cartoon-male-with-gradient-circle-profile-frame-for-live-streaming-on-png-image_2268987.jpg" alt="profile" />
        <p>Hello, Admin</p>
      </div>
      <nav>
        <ul>
          <li><Link to="/admin/thongke">Thống kê</Link></li>
          <li><Link to="/admin/donhang">Đơn hàng</Link></li>
          <li><Link to="/admin/danhmuc">Danh mục</Link></li>
          <li><Link to="/admin/taikhoan">Tài khoản</Link></li>
          <li><Link to="/admin/sanpham">Sản phẩm</Link></li>
          {/* <li><Link to="/products">Products</Link></li>
          <li><Link to="/orders">Orders</Link></li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar