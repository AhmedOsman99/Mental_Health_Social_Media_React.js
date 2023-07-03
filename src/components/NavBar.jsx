import React from "react";
import {
  BsHouse,
  BsPersonPlus,
  BsChatDots,
  BsBell,
  BsPersonCircle,
} from "react-icons/bs";
import { Navbar, Nav, FormControl, Form } from "react-bootstrap";
import "../css/style.css";
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <Navbar expand="lg" variant="light" style={{ backgroundColor: "#83c5be" }}>
      <Navbar.Brand href="#" className="logo mx-4 mb-2">
        <img src="../assets/logo.png" alt="Logo" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          style={{ borderRadius: "20px" }}
        />
      </Form>
      <Navbar.Collapse
        id="navbarSupportedContent"
        className="icons justify-content-end mx-5"
      >
        <Nav className="mr-auto">
          <NavLink className="nav-link" href="#">
            <div className="circle-icon">
              <BsHouse size={20} />
            </div>
          </NavLink>
          <NavLink className="nav-link" href="#">
            <div className="circle-icon">
              <BsPersonPlus size={20} />
            </div>
          </NavLink>
          <NavLink className="nav-link" href="#">
            <div className="circle-icon">
              <BsChatDots size={20} />
            </div>
          </NavLink>
          <NavLink className="nav-link" href="#">
            <div className="circle-icon">
              <BsBell size={20} />
            </div>
          </NavLink>
        </Nav>
        <NavLink className="nav-link" href="#">
          <div className="circle-icon">
            <BsPersonCircle size={30} />
          </div>
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
