import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

import "./app.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          {user && user.isAdmin ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="user/:id" element={<User />} />
              <Route path="users" element={<UserList />} />
              <Route path="newuser" element={<NewUser />} />
              <Route path="movies/:id" element={<Product />} />
              <Route path="movies" element={<ProductList />} />
              <Route path="newmovie" element={<NewProduct />} />
              <Route path="lists" element={<ListList />} />
              <Route path="lists/:listId" element={<List />} />
              <Route path="newlist" element={<NewList />} />
            </Route>
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
