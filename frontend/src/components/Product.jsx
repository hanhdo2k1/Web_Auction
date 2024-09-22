import React from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom'
import { formatCurrency, formatDateTime } from '../untils/utils.js';
import CountDownProduct from '../components/CountDownProduct.jsx'

const Product = (props) => {
  return (
    <Link
      to={`/chitietsanpham/${props.product.id}`}
      key={props.product.id}
      style={{ textDecoration: 'none', flex: "1 1 25%", marginTop: "15px", }}
    >
      <Card
        hoverable
        style={{
          width: 322,
        }}
        cover={<img style={{ height: "250px", objectFit: "cover" }} alt="example" src={`http://localhost:8111/image/${props.product.thumbnail}`} />}
      >
        <h4 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '8px' }}>{props.product.productName}</h4>
        <p style={{ fontSize: '16px', color: "#0d6efd" }}><b>Giá khởi điểm:</b> {formatCurrency(props.product.price)}</p>
        <p><b>Ngày bắt đầu:</b> {formatDateTime(props.product.startDate)}</p>
        <CountDownProduct product={props.product} />
      </Card>
    </Link>
  )
}

export default Product