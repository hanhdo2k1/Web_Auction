import React from 'react'
import '../style/banner.scss'
import { ArrowRightOutlined } from '@ant-design/icons';
import Banner_item1 from '../img/banner_item1.png'
import Banner_item2 from '../img/banner_item2.png'
function Banner() {
  return (
    <div className='banner'>
      <div className="banner-main">
        <p>Bộ sưu tập đồng hồ</p>
        <button>
          Giới thiệu
          <ArrowRightOutlined />
        </button>
        <video autoPlay loop muted playsInline className='banner-video'>
          <source src='../img/banner-video.webm' type='video/mp4' />
        </video>
      </div>
      <div className="banner-product">
        <div className="banner-item">
          <h4>Datejust</h4>
          <p>cho những ngày đáng nhớ</p>
          <a href="/#">Tìm hiểu thêm</a>
          <img src={Banner_item1} alt="" />
        </div>

        <div className="banner-item">
          <h4>Datejust</h4>
          <p>cho những ngày đáng nhớ</p>
          <a href="/#">Tìm hiểu thêm</a>
          <img src={Banner_item2} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Banner