import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CreateTransaction = () => {
  const [show, setShow] = useState(false);
  const handleFormClose = () => setShow(false);
  const handleFormOpen = () => setShow(true);

  function TransactionForm() {
    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Account Id</Form.Label>
          <Form.Control type="number" placeholder="Enter Account ID" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category Id</Form.Label>
          <Form.Control type="number" placeholder="Enter Category Id" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter Amount" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control type="text" placeholder="Note..." />
        </Form.Group>
      </Form>
    );
  }

  return (
    <>
      <Button variant="primary" onClick={handleFormOpen}>
        New
      </Button>

      <Modal show={show} onHide={handleFormClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>{TransactionForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateTransaction;
