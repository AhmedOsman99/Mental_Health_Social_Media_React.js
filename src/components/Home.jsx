import React, { useEffect, useState, useContext } from "react";
import "../CSS/home.css";
import { Post } from "./Post";
import { postContext } from "./contexts/PostContext";
import AuthContext from "../context/AuthContext";
import { addNewPost, fetchPosts, getFriendList } from "../APIs/utils";
import { Form, Modal } from "react-bootstrap";

export function Home() {
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  let { posts, setPosts } = useContext(postContext);

  let [newPost, setNewPost] = useState({
    content: "",
    image: null,
  });

  let operationHandler = (event) => {
    setNewPost({ ...newPost, content: event.target.value });
  };
  let fileHandler = (event) => {
    setNewPost({ ...newPost, image: event.target.files[0] });
  };

  let addPost = async () => {
    let response = await addNewPost(newPost);
    setPosts([...posts, response.data]);
    setNewPost({ content: "", image: null });
  };
  let fetchAllPosts = async () => {
    let response = await fetchPosts();
    setPosts(response.data);
  };

  let [showFriendsModal, setShowFriendsModal] = useState(false);
  let [friends, setFriends] = useState([]);
  let openFriendsModal = async () => {
    setShowFriendsModal(true);
    let response = await getFriendList();
    setFriends(response.data);
  };

  let closeFriendsModal = () => {
    setShowFriendsModal(false);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    // <div>
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-3 col-lg-3 grey-bg">
          {/* Left column */}
          {/* Add content for the left column */}
          <div className="row px-4">
            <div className="col-auto">
              <img
                // src={profileImage}
                alt="Profile"
                className="rounded-circle ellipse-2"
              />
            </div>
            <div className="col-auto fs-5 fw-semibold">
              {userInfo.user.first_name}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-icon text-decoration-none p-0 pt-1"
            onClick={openFriendsModal}
          >
            <div className="row px-5 pt-4">
              <div className="col-auto">
                <i className="bi bi-people-fill fs-4"></i>
              </div>
              <div className="col-auto fs-6 fw-semibold p-2">Friends</div>
            </div>
          </button>
        </div>
        <div
          className="col-md-6 col-lg-6"
          style={{
            backgroundColor: "#e9ecef",
          }}
        >
          {/* Middle column */}
          {/* Add content for the middle column */}
          {/* ////// start create Post ////// */}
          {userInfo.user_type === "doctor" ? (
            <div className="row mb-3 align-items-center justify-content-center p-4 mt-3 white-bg shadow-lg">
              <div className="col-auto">
                <img
                  // src={profileImage}
                  alt="Profile"
                  className="rounded-circle ellipse-3"
                />
              </div>
              <div className="col text-start">
                <input
                  type="text"
                  className="grey-input"
                  placeholder="Write a post"
                  value={newPost.content}
                  onChange={operationHandler}
                />
              </div>
              <div className="col-lg-2">
                <button
                  type="button"
                  class="btn btn-outline"
                  style={{
                    backgroundColor: "#83c5be",
                    borderRadius: "20px",
                    padding: "9px 15px 9px 15px",
                  }}
                  onClick={addPost}
                >
                  Post
                </button>
              </div>

              <div className="row justify-content-center align-items-center mt-4">
                <div className="col-lg-4 d-flex align-items-center">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                      type="file"
                      className="custom-file-input p-0"
                      onChange={fileHandler}
                      style={{ width: "52%" }}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          ) : null}
          {/* ////// end create Post ////// */}
          {posts.length > 0 ? (
            posts.map((post) => <Post post={post} />)
          ) : (
            <p className="text-center">No posts to show.</p>
          )}
        </div>
        <div className="col-md-3 col-lg-3 grey-bg ">
          {/* Right column */}
          {/* Add content for the right column */}
          <div className="fs-5 fw-semibold  pb-4">Contacts</div>
          {/* {
                contacts mapping to show in HomePage 
            } */}
          <div className="row px-4 pb-3 d-flex justify-content-center">
            <div className="col-auto">
              <img
                // src={profileImage}
                alt="Profile"
                className="rounded-circle ellipse-2"
              />{" "}
              {/* user_profile_image */}
            </div>
            <div className="col-auto fw-semibold"></div> {/* chat part  */}
          </div>
        </div>
      </div>
      <Modal
        show={showFriendsModal}
        onHide={closeFriendsModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {friends !== false ? (
            friends.map((friend) => (
              // <div>{friend.first_name} {friend.last_name}</div>
              <div className="row px-4">
                <div className="col-auto">
                  <img
                    // src={profileImage}
                    alt="Profile"
                    className="rounded-circle ellipse-2"
                  />
                </div>
                <div className="col-auto fs-5 fw-semibold">
                  {friend.first_name} {friend.last_name}
                </div>
              </div>
            ))
          ) : (
            <div>No Friends To Show</div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
