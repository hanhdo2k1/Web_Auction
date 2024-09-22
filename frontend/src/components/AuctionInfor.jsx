import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import '../style/auctioninfor.scss';
// import { ShoppingCartOutlined } from '@ant-design/icons';
import TableAuction from './TableAuction';
import InforProduct from './InforProduct';
import Countdown from './Countdown';
import { formatCurrency } from '../untils/utils.js';
import axios from 'axios';

const AuctionInfor = (props) => {
  const [mainImage, setMainImage] = useState('');
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(props.product);
  const [price, setPrice] = useState();

  useEffect(() => {
    setProduct(props.product);
    if (props.product && props.product.thumbnail) {
      setMainImage(`http://localhost:8111/image/${props.product.thumbnail}`);
      if (props.product.vsdetails && props.product.vsdetails.length > 0) {
        setPrice(props.product.vsdetails[0].price);
      } else {
        setPrice(props.product.price);
      }
    }
  }, [props.product]);

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  // Tăng tiền
  const handleIncrease = () => {
    setPrice(price + 50000000);
  };

  // Giảm tiền
  const handleDecrease = () => {
    if (props.product.vsdetails && props.product.vsdetails.length > 0) {
      const firstVsDetailPrice = props.product?.vsdetails?.[0]?.price;
      if (price > firstVsDetailPrice) {
        setPrice(price - 50000000)
      }
      else {
        alert("Không thể giảm được nữa")
      }
    } else {
      setPrice(props.product.price);
      const firstVsDetailPrice = props.product.price;
      if (price > firstVsDetailPrice) {
        setPrice(price - 50000000)
      }
      else {
        alert("Không thể giảm được nữa")
      }
    }
  };

  // Xem ảnh
  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  // Post đấu giá
  const handleBid = async (e) => {
    e.preventDefault();

    // Lấy ID sản phẩm
    const productId = product && product.id;
    // Lấy username từ session
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null) {
      alert("Vui lòng đăng nhập")
    } else {
      const username = user.username;
      try {
        const response = await axios.post('http://localhost:8111/vsdetail/product', {
          username,
          price,
          productId,
        }, { withCredentials: true });

        if (response.data.status === 200) {
          alert('Đấu giá thành công');
          window.location.reload();
          setError(null);
          // Cập nhật lại thông tin sản phẩm và lịch sử đấu giá
          const updatedProduct = { ...product };
          updatedProduct.vsdetails = response.data.updatedVsDetails;
          setProduct(updatedProduct);
        } else {
          setError('Đấu giá thất bại');
        }
      } catch (error) {
        alert('Error:', error);
        setError('An error occurred during the bid');
      }
    }

  };


  return (
    <div className='auction-infor'>
      <Row>
        <Col span={12} className='img-product'>
          <img className='img-show' src={mainImage} alt="" />
          <div className="list-img">
            {product && product.images.map((image) => (
              <img
                onClick={() => handleImageClick(`http://localhost:8111/image/${image.imageName}`)}
                key={image.id}
                src={`http://localhost:8111/image/${image.imageName}`}
                alt={image.imageName}
              />
            ))}
          </div>
        </Col>
        <Col span={12} className='auction'>
          {error === null ? <></> : <p>console.error();</p>}
          <h4>{product && product.productName}</h4>
          <div className="price">
            <p>Giá khởi điểm: {product && formatCurrency(product.price)}</p>
          </div>
          <div className="action-auction">
            <span>Note: Một lần tăng giá từ 50.000.000 VNĐ trở lên</span>
            <div className="action">
              <button onClick={handleDecrease}>-</button>
              <span>{formatCurrency(price != null ? price : 0)}</span>
              <button onClick={handleIncrease}>+</button>
            </div>

            <div className="submit">
              <button type='submit' onClick={handleBid}>Đấu giá</button>
              {/* <button>
                <ShoppingCartOutlined style={{ fontSize: '20px', color: 'black' }} />
              </button> */}
            </div>
            <b>Cọc 5% giá trị sản phẩm</b>
          </div>
          <div className="time-auction">
            <Countdown countdown={product && product.startDate} />
          </div>
        </Col>
      </Row>
      <TableAuction historyAc={product && product.vsdetails} />
      <InforProduct infoProduct={product && product.description} />
    </div>
  );
};

export default AuctionInfor;
