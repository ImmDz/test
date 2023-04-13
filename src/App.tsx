import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, CategoryPage, ProductPage, CartPage, GoodsPage, LoginPage, RegistrationPage } from "./Pages";
import { getIsAuthValue } from './store';
import { Header, Footer } from "src/components";
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

export const App = () => {
  const isAuth = useSelector(getIsAuthValue);
  return (
    <Layout className="wrapper">
      <Header />
      <Layout className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:ids" element={<CategoryPage />} />
          <Route path="/product/:ids" element={<ProductPage />}></Route>
          <Route path="/cart" element={isAuth ? <CartPage /> : <Navigate to="/login" />} />
          <Route path="/goods" element={<GoodsPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Layout>
      <Footer />
    </Layout>
  );
}
