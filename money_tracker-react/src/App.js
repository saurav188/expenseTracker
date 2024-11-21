import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Account from "./page/Account";
import Category from "./page/Category";
import Login from "./page/Login";
import Registration from "./page/Registration";
import UserDetail from "./page/UserDetail";
import PasswordResetEmail from "./page/PasswordResetEmail";
import PasswordResetConfirm from "./page/PasswordResetConfirm";
import Error from "./page/Error";
import Transaction from "./page/Transaction/Transaction";

function App() {
  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  const token = getToken();
  // const token="abc"

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/user-detail" element={<UserDetail />} />
        <Route exact path="/password-reset" element={<PasswordResetEmail />} />
        <Route
          exact
          path="/password-reset-confirm"
          element={<PasswordResetConfirm />}
        />
        <Route exact path="/error" element={<Error />} />

        {/* Private routes */}
        {token && (
          <Route element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/category" element={<Category />} />
            <Route exact path="/transaction" element={<Transaction />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ children }) => {
  // const token = sessionStorage.getItem("token");
  const token="abc"

  if (!token) {
    return <Login />;
  }

  return children;
};

export default App;
