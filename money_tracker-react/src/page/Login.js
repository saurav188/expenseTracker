import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function setToken(userToken) {
    sessionStorage.setItem("moneyTrackertoken", JSON.stringify(userToken));
  }

  const LoginFunction = async (e) => {
    e.preventDefault();
    setLoginError("Attempting to log in...");

    let data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/auth/user/login/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        setToken(response.data.token);
        setLoggedIn(true);
        navigate("/dashboard");
      } else {
        sessionStorage.removeItem("moneyTrackertoken");
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Error: " + error.message);
      setLoginError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="form-container w-50">
        <Form onSubmit={LoginFunction}>
          <h1 className="form-title">Login</h1> <br />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(ev) => setUsername(ev.target.value)}
              type="text"
              placeholder="Enter username"
              value={username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              placeholder="Password"
              value={password}
            />
          </Form.Group>
          {loginError && <p className="text-danger">{loginError}</p>}
          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
