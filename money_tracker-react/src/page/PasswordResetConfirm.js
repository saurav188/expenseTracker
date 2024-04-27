import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../components/NavbarHeader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function PasswordResetConfirm() {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [Error, setError] = useState('')
  const navigate = useNavigate();


  const SubmitFunction = (e) => {
    let data= {
      password:password,
      password2:password2,
      token:token,
    }
    let url = `http://localhost:8000/api/auth/user/password_reset/confirm/?token=${token}`;
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
        setError(<p className="text-success">Password Changed Successfully</p>)
        navigate("/login");
      }
      else{
        setError(<p className="text-danger">Password Mismatch</p>)
      }
    })
    .catch(error => console.log('Error: ' + error.message));
  }


  return ( 
    <>
      <NavbarHeader/>
      <div className="main-container">
        <div className="form-container w-50">
          <Form>
            <h1 className="form-title">
              Enter Your New Password
            </h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control autocomplete="new-password" onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control autocomplete="new-password" onChange={(ev) => setPassword2(ev.target.value)} type="password" placeholder="Enter password" />
            </Form.Group>
            {Error}
            <Button onClick={SubmitFunction} variant="primary">
              Submit
            </Button>
          </Form>

        </div>
      </div>
    </>
  );
}

export default PasswordResetConfirm;