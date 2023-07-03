// ModalDialog.jsx
import React from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';

{/* Modal for editing the About content */ }

export function EditModal({ show, handleClose, handleSaveAbout, aboutContent, setAboutContent }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#83c5be' }}>
                <Modal.Title>Edit About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSaveAbout}>
                    <Form.Group controlId="aboutContent">
                        <Form.Label>About Content</Form.Label>
                        <Form.Control as="textarea" rows={4} value={aboutContent} onChange={(e) => setAboutContent(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
{/* Modal for viewing all photos */ }

export function PhotosModal({ show, handleClose, photos }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#83c5be' }}>
                <Modal.Title>All Photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {photos.map((photo, index) => (
                    <Image key={index} src={photo} alt={`Photo ${index + 1}`} className="mb-3" fluid />
                ))}
            </Modal.Body>
        </Modal>
    );
}
