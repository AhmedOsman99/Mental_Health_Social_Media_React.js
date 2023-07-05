// ModalDialog.jsx
import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form, Image, Card } from "react-bootstrap";
import { BsCheck, BsX, BsPencilSquare, BsTrash } from "react-icons/bs";
import AuthContext from "../context/AuthContext";

import "../CSS/style.css";
import { NavLink } from "react-router-dom";
{
  /* Modal for editing the About content */
}

export function EditModal({
  show,
  handleClose,
  handleSaveAbout,
  aboutContent,
  setAboutContent,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#83c5be" }}>
        <Modal.Title>Edit About</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveAbout}>
          <Form.Group controlId="aboutContent">
            <Form.Label>About Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
{
  /* Modal for viewing all photos */
}

export function PhotosModal({ show, handleClose, photos }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#83c5be" }}>
        <Modal.Title>All Photos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {photos.map((photo, index) => (
          <Image
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="mb-3"
            fluid
          />
        ))}
      </Modal.Body>
    </Modal>
  );
}
{
  /* Modal for friend requests */
}

export function FriendRequestModalDialog({
  showModal,
  handleClose,
  friendRequests,
  handleAcceptRequest,
  handleRejectRequest,
}) {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#83c5be" }}>
        <Modal.Title>Friend Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <div
              key={request.id}
              className="friend-request d-flex justify-content-between"
            >
              <span className="my-3 fw-bold">{request.name}</span>
              <div className="friend-request-buttons">
                <Button
                  className="accept mx-3 my-2"
                  variant="outline-success"
                  onClick={() => handleAcceptRequest(request.id)}
                >
                  <BsCheck />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRejectRequest(request.id)}
                >
                  <BsX />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No friend requests.</p>
        )}
      </Modal.Body>
    </Modal>
  );
}

{
  /* Modal for comments list and add */
}

export function CommentModal({
  show,
  handleClose,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  commentText,
  handleCommentTextChange,
  comments,
}) {
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  const reversedComments = comments.slice().reverse();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const handleEditButtonClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const handleSaveEditButtonClick = (postId) => {
    if (editingCommentId && editedComment) {
      handleEditComment(editingCommentId, postId, editedComment);
      setEditingCommentId(null);
      setEditedComment("");
    }
  };

  const handleCancelEditButtonClick = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#83c5be" }}>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          rows={2}
          onChange={handleCommentTextChange}
          value={commentText}
          placeholder="Enter comment text"
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddComment}>
          Add
        </Button>
      </Modal.Footer>
      <div>
        {reversedComments.length > 0 ? (
          reversedComments.map((comment) => (
            <Card key={comment.id} className="m-2 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <NavLink
                      to={`/profile/${comment.author_id}`}
                      className="fs-5 fw-semibold nav-link"
                    >
                      <Card.Title>{comment.author}</Card.Title>
                    </NavLink>
                    {editingCommentId === comment.id ? (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                      />
                    ) : (
                      <Card.Text>{comment.content}</Card.Text>
                    )}
                  </div>
                  <div>
                    {userInfo.user.id === comment.author_id && (
                      // Show edit and trash buttons only if the user ID matches the comment's author ID
                      <>
                        {editingCommentId === comment.id ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none"
                              onClick={() =>
                                handleSaveEditButtonClick(comment.post)
                              }
                            >
                              <BsCheck />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none"
                              onClick={handleCancelEditButtonClick}
                            >
                              <BsX />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() =>
                              handleEditButtonClick(comment.id, comment.content)
                            }
                          >
                            <BsPencilSquare />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-link text-decoration-none"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <BsTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="no-comments">No comments yet.</div>
        )}
      </div>
    </Modal>
  );
}
