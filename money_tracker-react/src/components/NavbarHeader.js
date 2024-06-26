import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MenuBar from '../components/MenuBar'
import getToken  from "../hooks/GetToken";

import { useState } from 'react'
import Logout from '../hooks/Logout';
import { useNavigate } from "react-router-dom";


function NavbarHeader(props) {
  const navigate = useNavigate();

  let profileComp = ()=>{
    if(getToken()){
      return ( 
        <>
          <Nav.Link href="#" onClick={()=>Logout(navigate, sessionStorage)}>Logout</Nav.Link>
          <MenuBar path={'/user-detail'} name='My Profile' />
        </>
      );
    }
    else{
      return (
        <>
          <MenuBar path={'/login'} name='Login' />
          <MenuBar path={'/registration'} name='Sign Up' />
        </>
        )
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MoneyTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <MenuBar path={'/'} name='Dashboard' />
            <MenuBar path={'/account'} name='Account' />
            <MenuBar path={'/category'} name='Category' />
            <MenuBar path={'/transaction'} name='Transaction' />
          </Nav>
          <Nav className="d-flex justify-content-center align-items-center">
            {profileComp()} 
            {/* <Nav.Link eventKey={2} href="#memes">
              my profile
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;

// import React from 'react'
// import MenuBar from '../components/MenuBar'

// const Navbar = () => {
//  return (
//     <div>
//         <nav class="navbar navbar-expand-lg navbar-light bg-light">
//           <a class="navbar-brand" href="#">MoneyTracker</a>
//           <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
//             <ul class="navbar-nav">
//                 <MenuBar path={'/'} name='Dashboard' />
//                 <MenuBar path={'/account'} name='Account' />
//                 <MenuBar path={'/category'} name='Category' />
//                 <MenuBar path={'/transaction'} name='Transaction' />
//             </ul>
//           </div>
//         </nav>
//     </div>
//   )
// }

// export default Navbar