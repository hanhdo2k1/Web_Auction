import React from 'react'
import { Col, Row } from 'antd';
import '../style/footer.scss'
import { InstagramOutlined, FacebookOutlined, TikTokOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div className="footer">
      <Row justify="space-evenly">
        <Col span={4} className='infor'>
          <h3>Danawatch</h3>
          <span>Thể hiện sự đẳng cấp</span>
          <div className="social">
            <InstagramOutlined style={{ fontSize: '20px' }} />
            <FacebookOutlined style={{ fontSize: '20px' }} />
            <TikTokOutlined style={{ fontSize: '20px' }} />
          </div>
        </Col>
        <Col span={4}>
          <h3>Đồng hồ Rolex</h3>
          <p>Tìm đồng hồ Rolex của bạn</p>
          <p>Cấu hình Rolex của bạn </p>
          <p>Dồng hồ nam</p>
          <p>Đồng hồ nữ</p>
          <p>Đồng hồ vàng</p>
        </Col>
        <Col span={4}>
          <h3>Rolex và thể thao</h3>
          <p>Bộ môn quần vợt</p>
          <p>Bộ môn golf </p>
          <p>Bộ môn đua thuyền</p>
          <p>Bộ môn đua xe đạp</p>
          <p>Bộ môn cưỡi ngựa</p>
        </Col>
        <Col span={4}>
          <h3>Bộ sưu tập</h3>
          <p>Air-King</p>
          <p>Cosmograph Daytona </p>
          <p>Datejust</p>
          <p>Lady-Datejust</p>
          <p>Day-Date</p>
        </Col>
      </Row>
      <div className="copyright">
        @copyright by Danawatch
      </div>
    </div>
  )
}

export default Footer