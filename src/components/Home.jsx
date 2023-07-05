import React, { useEffect, useState, useContext } from "react";
import "../CSS/home.css";
import axios from "axios";
import profileImage from "../images/profile.jpg";
import { Post } from "./Post";
import { postContext } from "./contexts/PostContext";
import AuthContext from "../context/AuthContext";
import { addNewPost, fetchPosts } from "../APIs/utils";

export function Home() {
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  let { posts, setPosts } = useContext(postContext);

  let [newPost, setNewPost] = useState({
    content: "",
  });

  let operationHandler = (event) => {
    setNewPost({ content: event.target.value });
  };

let addPost = async () => {
  let response = await addNewPost(newPost);
  setPosts([...posts, response.data]);
  setNewPost({ content: "" }); 
};


  let fetchAllPosts = async () => {
    let response = await fetchPosts();
    setPosts(response.data);
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    // <div>
    <div className="container-fluid mt-4 ">
      <div className="row justify-content-center">
        <div className="col-md-3 col-lg-3 grey-bg">
          {/* Left column */}
          {/* Add content for the left column */}
          <div className="row px-4">
            <div className="col-auto">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle ellipse-2"
              />
            </div>
            <div className="col-auto fs-5 fw-semibold">
              {userInfo.user.first_name}
            </div>
          </div>
          <div className="row px-5 pt-4">
            <div className="col-auto">
              <i className="bi bi-people-fill fs-4"></i>
            </div>
            <div className="col-auto fs-6 fw-semibold p-2">Followers</div>
          </div>
          <div className="row px-5 pt-3">
            <div className="col-auto">
              <i className="bi bi-bookmark-fill fs-4"></i>
            </div>
            <div className="col-auto fs-6 fw-semibold p-2">Saved</div>
          </div>
          {/* <div className="row px-5 pt-3">
              <div className="col-auto">
                <i className="bi bi-play-btn fs-4"></i>
              </div>
              <div className="col-auto fs-6 fw-semibold p-2">Watch</div>
            </div> */}
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
                src={profileImage}
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
              <div className="col text-start">
                <input
                  type="text"
                  className="grey-input"
                  placeholder="Write a post"
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
              {/* <div className="row justify-content-center align-items-center mt-4">
              <div className="col-lg-4 d-flex align-items-center px-5">
                <i className="bi bi-images px-3 fs-5"></i>
                Photo
              </div>
            </div> */}
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
                src={profileImage}
                alt="Profile"
                className="rounded-circle ellipse-2"
              />{" "}
              {/* user_profile_image */}
            </div>
            <div className="col-auto fw-semibold"></div> {/* chat part  */}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
