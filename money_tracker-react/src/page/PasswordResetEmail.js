import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../components/NavbarHeader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function PasswordResetEmail() {
  const [email, setEmail] = useState('')
  const [Error, setError] = useState('')
  const navigate = useNavigate();

  const SubmitFunction = (e) => {
    let data= {
      email:email,
    }
    let url = 'http://localhost:8000/api/auth/user/password_reset/';
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
        setError(<p className="text-success">Mail sent successfully</p>)
        navigate("/");
      }
      else{
        setError(<p className="text-danger">Invalid Email</p>)
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
              Password Reset
            </h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Enter your email" />
              {/* <Form.Text className="text-muted">
                Your username here...
              </Form.Text> */}
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

export default PasswordResetEmail;