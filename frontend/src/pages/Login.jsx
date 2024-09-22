import React, { useState } from 'react'
import '../style/login.scss'
import { Checkbox } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8111/user/signin', {
        username,
        password,
      }, { withCredentials: true });
      console.log('Response:', response.data);
      if (response.data.status === 200) {
        const userData = response.data.data;
        // Lưu thông tin người dùng vào localStorage
        sessionStorage.setItem('user', JSON.stringify(userData));
        //chuyển trang chủ
        navigate("/trangchu")
      }
      if (response.data.status === 404) {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="login-screen">
      <h2>Danawatch</h2>
      <form onSubmit={handleSubmit} action='post'>
        <h3>Đăng nhập</h3>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password">
          <Checkbox style={{ alignSelf: 'flex-start', marginBottom: '0.7rem' }}>Lưu mật khẩu</Checkbox>
          <Link to="/trangchu" className='forget-password'>Quên mật khẩu</Link>
        </div>
        <button type="submit">Đăng nhập</button>
        {error != null && <p style={{ color: "red" }}>{error}</p>}
        <p>Nếu bạn chưa có tài khoản?
          <Link to="/dangky" className='sigup'> Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  )
}

export default Login