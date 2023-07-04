// ModalDialog.jsx
import React from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { BsCheck, BsX } from "react-icons/bs";

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
