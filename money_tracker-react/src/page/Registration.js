import {React, useState} from "react";
import NavbarHeader from "../components/NavbarHeader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from "react-router-dom";


function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [Error, setError] = useState({
      "username": "",
      "password": "",
      "password2": "",
      "email": "",
      "first_name": "",
      "last_name": ""
  });
  const navigate = useNavigate();



  let Register = (ev)=>{
    ev.preventDefault()
    let data= {
      username:username,
      password:password,
      password2:password2,
      email:email,
      first_name:firstname,
      last_name:lastname,
    }
    let url = "http://localhost:8000/api/auth/user/";
    let header = {
      "Content-Type": "application/json",
    }
    fetch(url, {
      method: "POST", 
      headers: header,
      // mode: "no-cors",
      body: JSON.stringify(data),
    })
    .then(reponse =>{
      console.log(reponse)
      return reponse.json();
    })
    .then(data=>{
      console.log(data)
      if(data['status']){
        navigate("/login");
      }
      else{
        let temp = Error;
        for(var key in temp){
          console.log(key)
          console.log(key in data['message'])
          if(key in data['message'])
            temp[key] = <p className="text-danger"> {data['message'][key][0]}</p>
          else
            temp[key] = ''
        }
        setError(temp)
        console.log(Error)
      }
    })
    .catch(error => console.log('Error: ' + error.message));
  }


  return ( 
    <>
      <NavbarHeader/>
      <div className="main-container">
        <div className="form-container w-75">
          <Form onSubmit={Register}>
            <h1 className="form-title">
              Registration
            </h1>
            <Form.Group className="mb-3" controlId="reg-usernme">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder="Enter Username" />
              {/* <Form.Text className="text-muted">
                Your username here...
              </Form.Text> */}
              {Error['username']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(ev) => setEmail(ev.target.value)} type="text" placeholder="Enter Email" />
              {Error['email']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={(ev) => setFirstname(ev.target.value)} type="text" placeholder="Enter First Name" />
              {Error['first_name']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-lastname">
              <Form.Label>Last Nmae</Form.Label>
              <Form.Control onChange={(ev) => setLastname(ev.target.value)} type="text" placeholder="Enter Lastname" />
              {Error['last_name']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Password" />
              {Error['password']}
            </Form.Group>
            <Form.Group className="mb-3" controlId="reg-password2">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control onChange={(ev) => setPassword2(ev.target.value)} type="password" placeholder="Password" />
              {Error['password2']}
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Form.Text className="text-muted">
              Already have an account? <Link type="link" to='/login' className={``}>login</Link> here
            </Form.Text>
            <br></br>
            <Button type="submit" variant="primary">
              Register
            </Button>
            
          </Form>

        </div>
      </div>
    </>
  );
}

export default Registration;