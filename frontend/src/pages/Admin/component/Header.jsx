import React from 'react'
import '../style/header.scss'
import { useNavigate, Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Đăng xuất thành công !")
    sessionStorage.removeItem('user');
    navigate('/dangnhap');
  };
  return (
    <header className="header-admin">
      <Link to="/trangchu" >
        < HomeOutlined style={{ width: "80px" }} />
      </Link>
      <li onClick={handleLogout}>Đăng xuất</li>
    </header>
  )
}

export default Header