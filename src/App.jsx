import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';

function App() {
    const admin = useSelector((state) => state.user.currentUser?.isAdmin);

    return (
        <>
            {admin && <Topbar />}
            <div className="container">
                {admin && <Sidebar />}
                <Routes>
                    <Route path="*" element={admin ? <Home /> : <Login />} />
                    <Route path="/login" element={admin ? <Home /> : <Login />} />
                    {admin && (
                        <>
                            <Route key="home" path="/home" element={<Home />} />
                            <Route key="userList" path="/users" element={<UserList />} />
                            <Route key="user" path="/user/:userId" element={<User />} />
                            <Route key="newUser" path="/newUser" element={<NewUser />} />
                            <Route key="productList" path="/products" element={<ProductList />} />
                            <Route key="product" path="/product/:productId" element={<Product />} />
                            <Route key="newProduct" path="/newproduct" element={<NewProduct />} />
                        </>
                    )}
                </Routes>
            </div>
        </>
    );
}

export default App;
