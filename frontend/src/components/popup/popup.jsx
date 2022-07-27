import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ show }) {

    const [newShow, setShow] = useState(show);

    const handleClose = () => setShow(false);


    return (
        <Modal
            show={newShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Hii</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Popup;