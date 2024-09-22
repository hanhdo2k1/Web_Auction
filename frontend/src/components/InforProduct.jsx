import React from 'react'
import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};



function InforProduct(props) {
  const items = [
    {
      key: '1',
      label: 'Nguồn gốc',
      children: props.infoProduct,
    },
    {
      key: '2',
      label: 'Giới thiệu',
      children: 'Rolex Datejust 36mm 126231-0017',
    },
    {
      key: '3',
      label: 'Bảo hành',
      children: '15 tháng',
    },
  ];
  return (
    <div className='infor-product'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{ fontSize: '20px' }} />
    </div>
  )
}

export default InforProduct