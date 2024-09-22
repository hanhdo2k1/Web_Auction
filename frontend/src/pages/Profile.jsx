import React, { useEffect, useState } from 'react'
import '../style/profile.scss'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { formatDateTime, formatCurrency } from '../untils/utils'
import HearderNaviga from '../components/HearderNaviga';


function Profile() {
  //Lấy thông tin cá nhân
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user.username;
  const fullname = user.fullname;
  const email = user.email;
  const phoneNumber = user.phoneNumber;
  const ngaySinh = user.ngaySinh;

  //update user
  const [isEditing, setIsEditing] = useState(false);
  const [userInfor, setUserInfor] = useState({
    username: username,
    fullname: fullname,
    email: email,
    phoneNumber: phoneNumber,
    ngaySinh: ngaySinh
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfor({ ...userInfor, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  //update
  const UpdateUserDetails = async () => {
    try {
      const response = await axios.put('http://localhost:8111/user/admin/update', userInfor, {
        withCredentials: true
      });
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSaveClick = () => {
    UpdateUserDetails();
    setIsEditing(false);
    console.log('User data saved:', userInfor);
  };


  //đăng xuất
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Đăng xuất thành công !")
    sessionStorage.removeItem('user');
    navigate('/dangnhap');
  };

  //lấy user
  const fetchUserDetails = async () => {
    try {
      const response = await axios.post('http://localhost:8111/vsdetail/user', {
        username,
      });
      setUserDetails(response.data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userDetails)
  return (
    <>
      <HearderNaviga />
      <div className="user-profile">
        <div className="breadcrumb">
          <span><Link to="/trangchu" className='title-logo'>Trang chủ</Link></span> /  <span>Trang cá nhân</span>
        </div>
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-card">
              <img className="profile-avatar" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="John Smith" />
              <h2>{fullname}</h2>
              <Link to="/dangnhap" className="btn follow" onClick={handleLogout}>Đăng xuất</Link>
              <button className="btn lock">Khóa tài khoản</button>
            </div>
          </div>
          <div className="profile-main">
            <div className="user-profile">
              <div className="profile-container">
                <div className="profile-info">
                  <div className="profile-field">
                    <label>Họ và tên</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullname"
                        value={userInfor.fullname}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{userInfor.fullname}</p>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userInfor.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{userInfor.email}</p>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Phone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={userInfor.phoneNumber}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{userInfor.phoneNumber}</p>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Ngày sinh</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="ngaySinh"
                        value={userInfor.ngaySinh}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{userInfor.ngaySinh}</p>
                    )}
                  </div>
                  <button
                    className="edit-btn"
                    onClick={isEditing ? handleSaveClick : handleEditClick}
                  >
                    {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                  </button>
                </div>
              </div>
            </div>
            <div className="project-status">
              <h3>Lịch sử đấu giá</h3>
              <div className="user-table">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Ngày đấu giá</th>
                      <th>Giá đấu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error != null ? <tr><td>Đang hiển thị</td></tr> : userDetails && userDetails.map((vsdetail, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{vsdetail.productName}</td>
                        <td>{formatDateTime(vsdetail.vsdate)}</td>
                        <td>{formatCurrency(vsdetail.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile