import React, { useContext, useState } from "react";
import logo from "../images/logo.jpg";
import {
  BsHouse,
  BsPersonPlus,
  BsChatDots,
  BsBoxArrowRight,
  BsPersonCircle,
} from "react-icons/bs";
import { Navbar, Nav } from "react-bootstrap";
import "../CSS/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FriendRequestModalDialog } from "./ModalDialog";
import AuthContext from "../context/AuthContext";
import { getFriendRequests, respondToFriendRequest } from "../APIs/utils";

export function NavBar() {
  let { contextData } = useContext(AuthContext);
  let { userInfo, authTokens } = contextData;
  let { logOut } = contextData;
  let [friendRequests, setfriendRequests] = useState("");
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();

  const fetchFriendRequests = async () => {
    let response = await getFriendRequests();
    console.log(response.data);
    setfriendRequests(response.data);
    return response.data;
  };

  const handlePersonPlusClick = () => {
    fetchFriendRequests();

    setShowModal(true);
  };

  const handleAcceptRequest = async (requestId) => {
    let response = await respondToFriendRequest(requestId, "accept");
    setfriendRequests(
      friendRequests.filter((friend) => friend.id !== requestId)
    );
    console.log("Accepted friend request with ID:", requestId);
  };

  const handleRejectRequest = async (requestId) => {
    let response = await respondToFriendRequest(requestId, "decline");
    setfriendRequests(
      friendRequests.filter((friend) => friend.id !== requestId)
    );

    console.log("Rejected friend request with ID:", requestId);
  };

  const goToChats = () => {
    navigate("/chats/");
  };

  return (
    <>
      {authTokens && (
        <Navbar
          expand="lg"
          variant="light"
          style={{ backgroundColor: "#83c5be" }}
        >
          <Navbar.Brand href="/home" className="logo mx-4 mb-2">
            <img src={logo} alt="Logo" className="circle-icon" />
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
              <NavLink className="nav-link" to="/chats">
                <div className="circle-icon">
                  <BsChatDots size={20} />
                </div>
              </NavLink>

              <NavLink className="nav-link" to={`/profile/${userInfo.user.id}`}>
                <div className="circle-icon">
                  <BsPersonCircle size={30} />
                </div>
              </NavLink>
            </Nav>

            <NavLink className="nav-link" onClick={logOut}>
              <div className="circle-icon">
                <BsBoxArrowRight size={20} />
              </div>
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      )}

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
