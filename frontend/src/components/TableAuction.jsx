import React from 'react'
import { Table } from 'antd';
import { formatDateTime, formatCurrency } from '../untils/utils.js';
const columns = [
  // {
  //   title: 'STT',
  //   dataIndex: 'stt',
  //   key: 'stt',
  // },
  {
    title: 'Tên người đấu giá',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text) => <a href='/#'>{text}</a>,
  },
  {
    title: 'Ngày đấu giá',
    dataIndex: 'vsdate',
    key: 'vsdate',
    render: (text) => formatDateTime(text),
  },
  {
    title: 'Số tiền',
    dataIndex: 'price',
    key: 'price',
    render: (text) => formatCurrency(text),
  },
];
function TableAuction(props) {

  const data = props.historyAc && props.historyAc
    .sort((a, b) => new Date(b.vsdate) - new Date(a.vsdate))
    .map((item, index) => ({
      ...item,
      key: item.id || index
    }));
  return (
    <div className='table-auction'>
      <h4 style={{ textAlign: 'center', fontSize: '20px' }}>Lịch sử đấu giá</h4>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TableAuction