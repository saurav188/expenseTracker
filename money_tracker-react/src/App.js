import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./page/Dashboard";
// import Account from "./page/Account";
// import Category from "./page/Category";
import Login from "./page/Auth/Login";
import Registration from "./page/Auth/Registration";
import UserDetail from "./page/userDetail/UserDetail";
import PasswordResetEmail from "./page/Auth/PasswordResetEmail";
import PasswordResetConfirm from "./page/Auth/PasswordResetConfirm";
import Error from "./page/Error";
import Transaction from "./page/Transaction/Transaction";
import Dashboard from "./page/dashboard/Dashboard";
import Category from "./page/category/Category";
import Account from "./page/account/Account";

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
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/category" element={<Category />} />
            <Route exact path="/transaction" element={<Transaction />} />
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
