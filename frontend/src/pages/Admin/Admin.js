import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './component/Header';
import Sidebar from './component/Sidebar';
const Admin = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-content" style={{ display: "flex" }}>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className="content" style={{ width: "100%", padding: "12px" }}>
          Chào mừng đến trang admin
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;