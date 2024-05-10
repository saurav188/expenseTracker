import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/esm/Button";

function DeleteConfirmationModal({deleteName,setDeleteConfirmation,setDeleteOrNot,ShowDeleteConfirmModal,setShowDeleteConfirmModal}) {

  return ( 
    <Modal.Dialog className={`mh-75 overflow-auto ${ShowDeleteConfirmModal?"":"d-none"}`}>
        <Modal.Header>
            <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            Are you sure you want to delete this {deleteName}.
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={(ev)=>{setShowDeleteConfirmModal(false);setDeleteConfirmation(true)}}>Yes</Button>
            <Button variant="primary" onClick={ev=>{setShowDeleteConfirmModal(true);setDeleteConfirmation(false)}}>No</Button>
        </Modal.Footer>
  </Modal.Dialog>
  );
}

export default DeleteConfirmationModal;