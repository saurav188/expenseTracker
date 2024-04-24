import {React, useState} from "react";
import NavbarHeader from "../components/NavbarHeader";
import getToken  from "../hooks/GetToken";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import useRunOnce from "../hooks/useRunOnce";

function UserDetail() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Error, setError] = useState({
      "username": "",
      "password": "",
      "password2": "",
      "email": "",
      "first_name": "",
      "last_name": ""
  });
  const navigate = useNavigate();
  let token = getToken();
  useRunOnce({
    fn: () => {
      let url = "http://localhost:8000/api/auth/user/detail/";
      let header = {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
      fetch(url, {
        method: "GET", 
        headers: header,
      })
      .then(reponse =>{
        return reponse.json();
      })
      .then(data=>{
        if(data['status']){
          console.log(data['data'])
          setUsername(data['data']['username']);
          setEmail(data['data']['email']);
          setFirstname(data['data']['first_name']);
          setLastname(data['data']['last_name']);
        }
        else{
          navigate("/login");
        }
      })
    }
  })


  let Update = (ev)=>{
    ev.preventDefault()
    let data;
    if(password!=''){
      data= {
        username:username,
        password:password,
        password2:password2,
        email:email,
        first_name:firstname,
        last_name:lastname,
      }
    }
    else{
      data= {
        username:username,
        email:email,
        first_name:firstname,
        last_name:lastname,
      }
    }
    let url = "http://localhost:8000/api/auth/user/detail/";
    let header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    }
    fetch(url, {
      method: "PATCH", 
      headers: header,
      // mode: "no-cors",
      body: JSON.stringify(data),
    })
    .then(reponse =>{
      return reponse.json();
    })
    .then(data=>{
      if(!data['status']){
        let temp = Error;
        for(var key in temp){
          if(key in data['message'])
            temp[key] = <p className="text-danger"> {data['message'][key][0]}</p>
          else
            temp[key] = ''
        }
        setError(temp)
      }
    })
    .catch(error => console.log('Error: ' + error.message));
  }


  return ( 
    <>
      <NavbarHeader/>
      <div className="main-container">
        <div className="form-container w-75">
          <Form onSubmit={Update} autocomplete="off">
            <h1 className="form-title">
              My Profile
            </h1>
            <Form.Group className="mb-3" controlId="reg-usernme">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(ev) => setUsername(ev.target.value)} value={username} type="text" placeholder="Enter Username" />
              {/* <Form.Text className="text-muted">
                Your username here...
              </Form.Text> */}
              {Error['username']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(ev) => setEmail(ev.target.value)} value={email} type="text" placeholder="Enter Email" />
              {Error['email']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={(ev) => setFirstname(ev.target.value)} value={firstname} type="text" placeholder="Enter First Name" />
              {Error['first_name']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-lastname">
              <Form.Label>Last Nmae</Form.Label>
              <Form.Control onChange={(ev) => setLastname(ev.target.value)} value={lastname} type="text" placeholder="Enter Lastname" />
              {Error['last_name']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-password">
              <Form.Label>New Password</Form.Label>
              <Form.Control autocomplete="new-password" onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Password" />
              {Error['password']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-password2">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control autocomplete="new-password" onChange={(ev) => setPassword2(ev.target.value)} type="password" placeholder="Password" />
              {Error['password2']}
            </Form.Group>
            <br></br>
            <Button type="submit" variant="primary">
              Update
            </Button>
            
          </Form>

        </div>
      </div>
    </>
  );
}

export default UserDetail;