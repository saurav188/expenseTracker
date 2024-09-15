import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MenuBar from "../components/MenuBar";
import getToken from "../hooks/GetToken";

import { useState } from "react";
import Logout from "../hooks/Logout";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";

function NavBar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState("Rodish");

  const userButtonHandle = () => {
    return <></>;
  };

  const items = [
    {
      key: "1",
      label: (
        <button onClick={() => Logout(navigate, sessionStorage)}>Logout</button>

        //       <Nav.Link href="#" onClick={() => Logout(navigate, sessionStorage)}>
        // //           Logout
        // //         </Nav.Link>
        //         <MenuBar path={"/user-detail"} name="My Profile" />
        //       </>
        // <a
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   href="https://www.antgroup.com"
        // >
        //   1st menu item
        // </a>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={() => navigate("/user-detail")}>My Profile</button>
      ),
    },
  ];

  // let profileComp = () => {
  //   if (getToken()) {
  //     return (
  //       <>
  //         <Nav.Link href="#" onClick={() => Logout(navigate, sessionStorage)}>
  //           Logout
  //         </Nav.Link>
  //         <MenuBar path={"/user-detail"} name="My Profile" />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <MenuBar path={"/login"} name="Login" />
  //         <MenuBar path={"/registration"} name="Sign Up" />
  //       </>
  //     );
  //   }
  // };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-zinc-500">
      <Container>
        <Navbar.Brand href="/dashboard" className="text-white">
          MoneyTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto text-white">
            <MenuBar path={"/dashboard"} name="Dashboard" />
            <MenuBar path={"/account"} name="Account" className="text-white" />
            <MenuBar path={"/category"} name="Category" />
            <MenuBar path={"/transaction"} name="Transaction" />
          </Nav>
          <Nav className="flex justify-center items-center">
            {/* {profileComp()}
             */}

            <Dropdown
              menu={{
                items,
              }}
            >
              <button onClick={(e) => e.preventDefault()}>
                <Space>{user}</Space>
              </button>
            </Dropdown>
            {/* <Nav.Link eventKey={2} href="#memes">
            my profile
          </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
