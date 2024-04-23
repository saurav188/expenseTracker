import React from "react";
import NavbarHeader from "../components/NavbarHeader";
import { useState } from 'react'
import '../style/login.css'
import { useNavigate } from "react-router-dom";
import getToken  from "../hooks/GetToken";

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate();

  // const navigate = useNavigate()


  function setToken(userToken) {
    sessionStorage.setItem('moneyTrackertoken', JSON.stringify(userToken))
  }


  const LoginFunction = (e) => {
    setLoginError('sent successfully')
    let data= {
      username:username,
      password:password,
    }
    let url = 'http://localhost:8000/api/auth/user/login/';
    let header = {
      "Content-Type": "application/json",
    }

    fetch(url, {
      method: "POST", 
      headers: header,
      // mode: "no-cors",
      body: JSON.stringify(data),
    })
    .then(reponse =>
      reponse.json()
    )
    .then(data=>{
      if(data['status']){
        setToken(data['token']);
        setLoggedIn(true);
        navigate("/");
      }
      else
        setToken(false)
    })
    .catch(error => console.log('Error: ' + error.message));
  }

  return (
    <>
    <NavbarHeader/>
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br /> 
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <label className="errorLabel">{loginError}</label>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={LoginFunction} value={'Log in'} />
      </div>
    </div>
    </>
  )
}

export default Login;