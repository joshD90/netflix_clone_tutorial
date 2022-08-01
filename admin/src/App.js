import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./app.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="user/:id" element={<User />} />
            <Route path="users" element={<UserList />} />
            <Route path="newuser" element={<NewUser />} />
            <Route path="movies/:id" element={<Product />} />
            <Route path="movies" element={<ProductList />} />
            <Route path="newmovie" element={<NewProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
