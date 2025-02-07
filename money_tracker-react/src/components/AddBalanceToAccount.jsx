import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Input } from "antd";

const AddBalance = () => {
  const [isBalanceModal, setIsBalanceModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(
    "Please Select Bank Account"
  );

  const handleClose = () => setIsBalanceModal(false);
  const handleShow = () => setIsBalanceModal(true);

  return (
    <>
      <Button
        onClick={() => {
          handleShow();
          setIsBalanceModal(true);
        }}
      >
        Add Balance
      </Button>

      <Modal show={isBalanceModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>Select Bank Account</h1>
            <div className="mt-2">
              <DropdownButton
                id="dropdown-basic-button"
                title={selectedAccount}
                variant="none"
              >
                <Dropdown.Item
                  onClick={() => {
                    setSelectedAccount("Action");
                  }}
                >
                  Action
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedAccount("Action2");
                  }}
                >
                  Another action
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div>
            <h1>Amount</h1>
            <Input type="number" placeholder="Enter Amount" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddBalance;
