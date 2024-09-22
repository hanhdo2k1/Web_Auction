import Index from "./pages/Index"
import Cart from "./pages/Cart"
import Detail from './pages/Detail'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import SigUp from "./pages/SigUp"
import Profile from "./pages/Profile"
import Admin from "./pages/Admin/Admin"
import Category from "./pages/Admin/component/Category"
import Account from "./pages/Admin/component/Account"
import Products from "./pages/Admin/component/Products"
import OrderManager from "./pages/Admin/component/OrderManager"
import Statistics from "./pages/Admin/component/Statistics"
import Order from "./pages/Order"
import OrderDitail from "./pages/OrderDitail"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/trangchu" element={<Index />} />
        <Route path="/chitietsanpham/:id" element={<Detail />} />
        <Route path="/giohang" element={<Cart />} />
        <Route path="/thanhtoan" element={<Checkout />} />
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/dangky" element={<SigUp />} />
        <Route path="/trangcanhan" element={<Profile />} />
        <Route path="/dathang" element={<Order />} />
        <Route path="/dathang/:id" element={<OrderDitail />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="danhmuc" element={<Category />} />
          <Route path="taikhoan" element={<Account />} />
          <Route path="sanpham" element={<Products />} />
          <Route path="donhang" element={<OrderManager />} />
          <Route path="thongke" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
