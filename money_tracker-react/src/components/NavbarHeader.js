import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MenuBar from "../components/MenuBar";
import getToken from "../hooks/GetToken";

import { useEffect, useState } from "react";
import Logout from "../hooks/Logout";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import axios from "axios";

function NavBar(props) {
  const token = getToken();
  const navigate = useNavigate();
  const [user, setUser] = useState("User");
  useEffect(() => {
    userDetails();
  });

  const userDetails = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/auth/user/detail/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    setUser(response.data.data.username);
  };

  const items = [
    {
      key: "1",
      label: (
        <button onClick={() => navigate("/user-detail")}>My Profile</button>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={() => Logout(navigate, sessionStorage)}>Logout</button>
      ),
    },
  ];

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
