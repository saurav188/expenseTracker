import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import getToken from "../../hooks/GetToken";

const CreateTransaction = () => {
  let token = getToken();
  const [show, setShow] = useState(false);

  // Create state for each form input
  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleFormClose = () => setShow(false);
  const handleFormOpen = () => setShow(true);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    const formData = {
      account_id: accountId,
      category_id: categoryId,
      amount,
      note,
    };

    try {
      // Send form data to the API
      const response = await axios.post(
        `http://localhost:8000/api/acc/transaction/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Form submitted successfully:", response.data);

      // Close the modal on successful submission
      handleFormClose();

      // Optionally, reset form fields
      setAccountId("");
      setCategoryId("");
      setAmount("");
      setNote("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  function TransactionForm() {
    return (
      <Form id="transactionForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Account Id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)} // Update state on change
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category Id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Category Id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            placeholder="Note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
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
          <Button
            variant="primary"
            type="submit"
            form="transactionForm" // This links the button to the form
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTransaction;
