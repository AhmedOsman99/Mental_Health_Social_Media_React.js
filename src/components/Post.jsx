import React, { useContext, useEffect, useState } from "react";
// import profileImage from "../images/profile.jpg";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { postContext } from "./contexts/PostContext";
import { NavLink } from "react-router-dom";
import { fetchComments, addNewComment } from "../APIs/utils";
import { CommentModal } from "./ModalDialog";
import AuthContext from "../context/AuthContext";

export function Post(props) {
  let post = props.post;
  let { posts, setPosts } = useContext(postContext);
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;

  let [period, setPeriod] = useState("");
  let setDate = () => {
    const currentDate = new Date();
    const postDate = new Date(post.created_at);

    const timeDiff = currentDate.getTime() - postDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      setPeriod(`${seconds}s`);
    } else if (minutes < 60) {
      setPeriod(`${minutes}m`);
    } else if (hours < 24) {
      setPeriod(`${hours}h`);
    } else {
      setPeriod(`${days}d`);
    }
  };

  let [postData, setPostData] = useState({
    content: post.content,
    likes: post.likes,
  });
  
  let [like, setLike] = useState(() => {
    const index = postData.likes.indexOf(userInfo.user.id);
    return index > -1;
  });

  const toggleLike = () => {
    const updatedPostData = { ...postData };
    if (!like) {
      updatedPostData.likes.push(userInfo.user.id);
    } else {
      let index = updatedPostData.likes.indexOf(userInfo.user.id);
      if (index > -1) {
        updatedPostData.likes.splice(index, 1);
      }
    }
    ///////////////////////////////////

    ///////////////////////////////////
    setPostData(updatedPostData);
    setLike(!like);
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    let accessToken = authTokens.access;
    console.log(accessToken);
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .put(`http://localhost:8000/post/${post.id}`, updatedPostData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [showEditModal, setShowEditModal] = useState(false);
  let [editedContent, setEditedContent] = useState(post.content);

  const openEditModal = () => {
    setEditedContent(postData.content);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const saveEditedContent = () => {
    const updatedPostData = { ...postData, content: editedContent };
    setPostData(updatedPostData);
    setShowEditModal(false);
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    let accessToken = authTokens.access;
    console.log(accessToken);
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .put(`http://localhost:8000/post/${post.id}`, updatedPostData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let deletePost = () => {
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    let accessToken = authTokens.access;
    console.log(accessToken);
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios.delete(`http://localhost:8000/post/${post.id}`, config);
    setPosts(posts.filter((posts) => posts.id !== post.id));
  };

  useEffect(() => {
    setDate();
  }, []);

  //////////////////////////////////////////////

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);

  const openCommentModal = () => {
    fetchComments(post.id).then((response) => {
      setComments(response.data);
      setShowCommentModal(true);
    });
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  const handleAddComment = async () => {
    try {
      const response = await addNewComment(post.id, newComment);
      console.log(response.data); // Optionally, you can handle the response data
      const addedComment = response.data; // Get the added comment from the response
      setComments((prevComments) => [...prevComments, addedComment]); // Update the comments array with the added comment
      setNewComment(""); // Clear the new comment text input
    } catch (error) {
      console.log(error); // Handle any errors that occur during the request
    }
  };
  const handleCommentTextChange = (event) => {
    setNewComment(event.target.value);
  };

  useEffect(() => {
    // handleAddComment();
  }, []);

  return (
    <div>
      <div
        className="row mb-3 p-4 mt-4 shadow-lg"
        style={{
          backgroundColor: "white",
          borderRadius: "30px",
        }}
      >
        <div className="col-auto pt-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            
            alt="Profile"
            className="rounded-circle "
            style={{
              height: "50px",
              left: "24px",
              objectFit: "cover",
              top: "24px",
              width: "50px",
            }}
          />
        </div>
        <div className="col-auto pb-2">
          <NavLink
            to={`/profile/${post.creator_id}`}
            className="fs-5 fw-semibold nav-link"
          >
            {post.creator}
          </NavLink>{" "}
          <div className="row">
            <div className="col-auto">
              {period}{" "}
              <i className="bi bi-globe-americas material-symbols px-1"></i>
            </div>
          </div>
        </div>
        {/* {console.log(userInfo.user.id)} */}
        {/* {console.log(post.creator_id)} */}
        {userInfo.user.id === post.creator_id ? (
          <div className="col pb-2 text-end">
            <button
              type="button"
              className="btn btn-icon text-decoration-none p-0 pt-1"
              onClick={openEditModal}
            >
              <i className="bi bi-pencil-square fs-5 mx-3"></i>
            </button>
            <button
              type="button"
              className="btn btn-icon text-decoration-none p-0 pt-1"
              onClick={deletePost}
            >
              <i className="bi bi-x-lg fs-5"></i>
            </button>
          </div>
        ) : null}

        <div className="row pt-3 pb-3">
          <div className="col-auto text-start">{postData.content}</div>
        </div>
        {post.image !== null ? (
        <div className="row pt-3 pb-3 justify-content-center">
          <div className="col-auto text-start">
            <img
              className=""
              src={post.image}
              alt="post_image"
              // className="rounded-circle "
              style={{
                height: "400px",
                // left: "24px",
                objectFit: "contain",
                // top: "24px",
                width: "100%",
              }}
            />
          </div>
        </div>
          ):null
        }
        <div className="row justify-content-between pb-0 pt-2">
          <div className="col-auto ">
            <i className="bi bi-hand-thumbs-up mdi-like px-2"></i>
            {/* <span>{postData.like}</span> */}
            <span>{postData.likes.length}</span>
          </div>
          <div className="col-auto ">
            <i className="bi bi-chat px-2"></i>
            <span>{comments.length}</span>
          </div>
        </div>
        <div className="row justify-content-center pb-0">
          <hr className="row mb-3 mt-3" />
          <div className="col-lg-4">
            <button
              type="button"
              className={`btn btn-icon text-decoration-none ${
                like ? "btn-outline-primary" : ""
              }`}
              onClick={toggleLike}
            >
              <i className="bi bi-hand-thumbs-up mdi-like px-2 fs-5"></i>
              Like
            </button>
          </div>
          <div className="col-lg-4">
            <button
              type="button"
              className="btn btn-icon text-decoration-none"
              onClick={openCommentModal}
            >
              <i className="bi bi-chat px-2 fs-5"></i>
              Comment
            </button>
          </div>
        </div>
      </div>
      <CommentModal
        show={showCommentModal}
        handleClose={closeCommentModal}
        handleAddComment={handleAddComment}
        commentText={newComment}
        handleCommentTextChange={handleCommentTextChange}
        comments={comments}
      />
      <Modal show={showEditModal} onHide={closeEditModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEditedContent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
