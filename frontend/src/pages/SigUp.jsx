import React, { useState } from 'react'
import { Col, Row } from 'antd';
import '../style/sigup.scss'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function SigUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  // const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // format ngày sinh
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedNgaySinh = formatDate(ngaySinh);
    try {
      const response = await axios.post('http://localhost:8111/user/signup', {
        username,
        password,
        bankAccount,
        fullname,
        email,
        phoneNumber,
        ngaySinh: formattedNgaySinh,
      });
      console.log('Response:', response.data);
      if (response.data.status === 200) {
        alert("Đã đăng ký thành công ^^ - Xin vui lòng đăng nhập");
        navigate("/dangnhap");
      }
      if (response.data.status === 400) {
        setError(response.data.message);
        alert("Đăng ký không thành công");
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="register-form">
      <form onSubmit={handleSubmit} action='post'>
        <h1>Đăng ký</h1>
        <Row>
          <Col span={12} style={{ paddingLeft: '20px' }}>
            <div className="input-group">
              <label htmlFor="username">Tên đăng nhập:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="accountNumber">Số tài khoản:</label>
              <input
                type="text"
                id="accountNumber"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
          </Col>
          <Col span={12} style={{ paddingLeft: '20px' }}>
            <div className="input-group">
              <label htmlFor="fullName">Họ và tên:</label>
              <input
                type="text"
                id="fullName"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Số điện thoại:</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthday">Ngày sinh:</label>
              <input
                type="date"
                id="birthday"
                value={ngaySinh}
                onChange={(e) => setNgaySinh(e.target.value)}
              />
            </div>
          </Col>
          {/* <div className="input-group address">
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div> */}
        </Row>

        <button type="submit">Đăng ký</button>
        {error != null &&
          <p>{error}</p>
        }
        <p>Bạn đã có tài khoản?
          <Link to="/dangnhap" className='sigup'> Đăng nhập</Link>
        </p>
      </form>
    </div>
  )
}

export default SigUp