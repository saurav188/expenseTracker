import React from "react";
import { useState } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // const navigate = useNavigate()

  function setToken(userToken) {
    sessionStorage.setItem("moneyTrackertoken", JSON.stringify(userToken));
  }

  const LoginFunction = (e) => {
    setLoginError("sent successfully");
    let data = {
      username: username,
      password: password,
    };
    let url = "http://localhost:8000/api/auth/user/login/";
    let header = {
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: header,
      // mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        if (data["status"]) {
          setToken(data["token"]);
          setLoggedIn(true);
          navigate("/dashboard");
        } else sessionStorage.removeItem("itemName");
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  return (
    <>
      <div className="main-container">
        <div className="form-container w-50">
          <Form>
            <h1 className="form-title">Login</h1> <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(ev) => setUsername(ev.target.value)}
                type="text"
                placeholder="Enter username"
              />
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(ev) => setPassword(ev.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button onClick={LoginFunction} variant="primary">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
