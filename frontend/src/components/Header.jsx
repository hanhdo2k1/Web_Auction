import React, { useEffect, useState } from 'react';
import '../style/header.scss';
import { EnvironmentOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch, categories: propCategories, setCategory }) => {
  const [user, setUser] = useState(null);
  const [roleCode, setRoleCode] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0); // State để lưu trữ danh mục được chọn
  const [categories, setCategories] = useState([]); // State để lưu danh sách các danh mục
  const navigate = useNavigate();
  const userLogin = sessionStorage.getItem('user');

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.fullname);
      setRoleCode(parsedUser.roleCode);
    }
  }, []);

  // Lấy danh mục từ server khi component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8111/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Đăng xuất
  const handleLogout = () => {
    alert('Đăng xuất thành công !');
    sessionStorage.removeItem('user');
    navigate('/dangnhap');
  };

  // Xử lý khi thay đổi input tìm kiếm
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value, selectedCategory); // Gọi hàm onSearch với từ khóa tìm kiếm và danh mục đã chọn
  };

  // Xử lý khi click vào danh mục
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Lưu danh mục được chọn vào state
    onSearch(searchText, categoryId); // Gọi hàm onSearch với từ khóa tìm kiếm và danh mục đã chọn
  };

  // Xử lý khi click vào nút tìm kiếm
  const handleSearchClick = () => {
    onSearch(searchText, selectedCategory); // Gọi hàm onSearch với từ khóa tìm kiếm và danh mục đã chọn
  };

  return (
    <div className="header">
      <div className="menu">
        <div className="location">
          <EnvironmentOutlined style={{ fontSize: '16px' }} />
          <span>Nui Thanh City</span>
        </div>
        <div className="logo">
          <Link to="/trangchu" className="title-logo">
            Danawatch
          </Link>
        </div>
        <div className="menu-icon">
          {userLogin == null ? (
            <Link to="/dangnhap" className="btn-dangnhap">
              Đăng nhập
            </Link>
          ) : (
            <>
              <Link to="/giohang">
                <ShoppingCartOutlined
                  className="cart-icon"
                  style={{ fontSize: '20px', color: 'black', marginTop: '6px' }}
                />
              </Link>
              <div className="user-menu">
                <UserOutlined style={{ fontSize: '20px' }} />
                <p className="name-user">{user}</p>
                <div className="menu">
                  <ul>
                    <li>
                      <Link to="/trangcanhan">Thông tin cá nhân</Link>
                    </li>
                    <li>
                      <Link to="/dathang">Lịch sử đặt hàng</Link>
                    </li>
                    {roleCode === 'ROLE_ADMIN' ? (
                      <li>
                        <Link to="/admin">Quản lý</Link>
                      </li>
                    ) : (
                      <></>
                    )}
                    <li onClick={handleLogout}>Đăng xuất</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="navigation">
        <nav>
          <span
            className={selectedCategory === 0 ? 'activecategory' : ''}
            onClick={() => handleCategoryClick(0)}
          >
            Tất cả
          </span>
          {categories.map((category) => (
            <span
              className={selectedCategory === category.id ? 'activecategory' : ''}
              key={category.id} onClick={() => handleCategoryClick(category.id)}
            >
              {category.categoryName}
            </span>
          ))}
        </nav>
      </div>
      <div className="search">
        <input placeholder="Search..." type="text" onChange={handleInputChange} />
        <button type="submit" onClick={handleSearchClick}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Header;
