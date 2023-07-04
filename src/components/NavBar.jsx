import React, { useState } from "react";
import {
  BsHouse,
  BsPersonPlus,
  BsChatDots,
  BsBoxArrowRight,
  BsPersonCircle,
} from "react-icons/bs";
import { Navbar, Nav } from "react-bootstrap";
import "../CSS/style.css";
import { NavLink } from "react-router-dom";
import { FriendRequestModalDialog } from "./ModalDialog";
import { getFriendRequests } from "../APIs/utils";


export function NavBar() {
  const [showModal, setShowModal] = useState(false);

  const friendRequests = getFriendRequests();

  const handlePersonPlusClick = () => {
    setShowModal(true);
  };

  const handleAcceptRequest = (requestId) => {
    // Handle accepting friend request
    console.log("Accepted friend request with ID:", requestId);
  };

  const handleRejectRequest = (requestId) => {
    // Handle rejecting friend request
    console.log("Rejected friend request with ID:", requestId);
  };

  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        style={{ backgroundColor: "#83c5be" }}
      >
        <Navbar.Brand href="#" className="logo mx-4 mb-2">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />

        <Navbar.Collapse
          id="navbarSupportedContent"
          className="icons justify-content-end mx-5"
        >
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/home">
              <div className="circle-icon">
                <BsHouse size={20} />
              </div>
            </NavLink>
            <NavLink className="nav-link" href="#">
              <div className="circle-icon " onClick={handlePersonPlusClick}>
                <BsPersonPlus size={20} />
              </div>
            </NavLink>
            <NavLink className="nav-link" href="#">
              <div className="circle-icon">
                <BsChatDots size={20} />
              </div>
            </NavLink>
            <NavLink className="nav-link" to="/profile">
            <div className="circle-icon">
              <BsPersonCircle size={30} />
            </div>
          </NavLink>

          <NavLink className="nav-link" >
              <div className="circle-icon">
                <BsBoxArrowRight size={20} />
              </div>
            </NavLink>
          </Nav>
         
        </Navbar.Collapse>
      </Navbar>

      <FriendRequestModalDialog
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        friendRequests={friendRequests}
        handleAcceptRequest={handleAcceptRequest}
        handleRejectRequest={handleRejectRequest}
      />
    </>
  );
}
