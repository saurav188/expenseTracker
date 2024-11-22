import { React, useState, useEffect } from "react";
import NavbarHeader from "../components/NavbarHeader";
import Table from "react-bootstrap/Table";
import getToken from "../hooks/GetToken";
import useRunOnce from "../hooks/useRunOnce";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFilter,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";

function Account() {
  let token = getToken();
  const [Error, setError] = useState({
    name: "",
    description: "",
    balance: "",
    account_type: "",
  });

  //form states
  const [FormId, setFormId] = useState(0);
  const [FormName, setFormName] = useState("");
  const [FormDescription, setFormDescription] = useState("");
  const [FormBalance, setFormBalance] = useState(0);
  const [FormAccountType, setFormAccountType] = useState("SVG");
  const [Accounts, setAccounts] = useState([]);
  const [Page, setPage] = useState(1);
  const [FormOpen, setFormOpen] = useState(false);
  const [ModalTitle, setModalTitle] = useState("New Account");
  const [MaxPage, setMaxPage] = useState(1);
  const [Name, setName] = useState("");
  const [url, setUrl] = useState(
    `http://localhost:8000/api/acc/account/?page=${Page}`
  );
  const [filterClicked, setFilterClicked] = useState(false);

  const account_type = {
    Savings: "SVG",
    Checking: "CHK",
    Investment: "INV",
  };
const saveClick = async () => {
  try {
    setFormOpen(true);
    const header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const data = {
      id: FormId,
      name: FormName,
      description: FormDescription,
      balance: FormBalance,
      account_type: FormAccountType,
    };

    let temp = `http://localhost:8000/api/acc/account/`;

    let response;

    if (FormId === 0) {
      // Send POST request using axios
      response = await axios.post(temp, data, { headers: header });
    } else {
      // Send PATCH request using axios
      response = await axios.patch(temp, data, { headers: header });
    }

    if (response.data.status) {
      getData();
      setFormOpen(false);
      resetModalForm();
    } else {
      handleError(response.data.message);
    }
  } catch (error) {
    console.log("Error: " + error.message);
  }
};

const handleError = (message) => {
  let temp = Error;
  for (let key in temp) {
    if (key in message) {
      temp[key] = <p className="text-danger">{message[key][0]}</p>;
    } else {
      temp[key] = "";
    }
  }
  setError((prevState) => {
    return temp;
  });
  console.log(Error);
};

  let gettFilterUrl = (ev) => {
    ev.preventDefault();
    setUrl(
      `http://localhost:8000/api/acc/account/?page=${Page}&name=${Name}`
    );
  };

  let prevPage = () => {
    if (Page > 1) setPage(Page - 1);
  };

  let nextPage = () => {
    if (Page < MaxPage) setPage(Page + 1);
  };

  let NewFunction = () => {
    setFormOpen(true);
  };

  let getData = () => {
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: header,
   
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        setAccounts(data["data"]);
        setMaxPage(data["num_pages"]);
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  let filterToggle = (ev) => {
    document.getElementById("account_filters").classList.toggle("d-none");
    Array.from(document.getElementById("account_filter_btn").children).forEach(
      (e) => {
        e.classList.toggle("d-none");
      }
    );
  };

  let OpenEditModal = (ev, id) => {
    setFormOpen(true);
    let temp = `http://localhost:8000/api/acc/account/?id=${id}`;
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    fetch(temp, {
      method: "GET",
      headers: header,
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        setFormId(data["data"]["id"]);
        setFormName(data["data"]["name"]);
        setFormDescription(data["data"]["description"]);
        setFormBalance(data["data"]["balance"]);
        setFormAccountType(data["data"]["account_type"]);
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  let resetModalForm = () => {
    setFormId(0);
    setFormName("");
    setFormDescription("");
    setFormBalance(0);
    setFormAccountType("CHK");
    setError((prevState) => {
      return {
        name: "",
        description: "",
        balance: "",
        account_type: "",
      };
    });
  };

  let renderModalForm = () => {
    return (
      <Modal.Dialog className="mh-75 overflow-auto">
        <Modal.Header>
          <Modal.Title>{ModalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="account-create-form">
            <Form.Group className="mb-3">
              <Form.Control hidden disabled value={FormId} type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                value={FormName}
                onChange={(ev) => setFormName(ev.target.value)}
                type="text"
                placeholder="Enter Name"
              />
              {Error["name"]}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Type:</Form.Label>
              <Form.Control
                as="select"
                value={FormAccountType}
                onChange={(ev) => setFormAccountType(ev.target.value)}
              >
                <option></option>
                {Object.keys(account_type).map((k) => (
                  <option key={account_type[k]} value={account_type[k]}>
                    {k}
                  </option>
                ))}
              </Form.Control>
              {Error["name"]}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Balance</Form.Label>
              Rs.
              <Form.Control
                value={FormBalance}
                onChange={(ev) => setFormBalance(ev.target.value)}
                type="number"
              />
              {Error["balance"]}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={FormDescription}
                onChange={(ev) => setFormDescription(ev.target.value)}
                type="text"
                placeholder="Enter Name"
              />
              {Error["description"]}
            </Form.Group>
           
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(ev) => {
              setFormOpen(false);
              resetModalForm();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={(ev) => saveClick()}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };

  let DeleteRecord = (id) => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure to want to delete the account.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let temp = `http://localhost:8000/api/acc/account/?id=${id}`;
            let header = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            };

            fetch(temp, {
              method: "DELETE",
              headers: header,
            })
              .then((reponse) => reponse.json())
              .then((data) => {
                if (data["status"]) {
                  getData();
                }
              })
              .catch((error) => console.log("Error: " + error.message));
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  useRunOnce({
    fn: getData,
  });

  useEffect(() => {
    if (filterClicked)
      setUrl(
        `http://localhost:8000/api/acc/account/?page=${Page}&name=${Name}`
      );
    else setUrl(`http://localhost:8000/api/acc/account/?page=${Page}`);

    getData();
  }, [Page, url]);

  return (
    <>
      <NavbarHeader />
      <div className="main-container">
        <div
          id="account-modal-container"
          className={`modal ${FormOpen ? "" : "d-none"}`}
          style={{
            display: "block",
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {renderModalForm()}
        </div>
        <div className="w-100">
          <div>
            <div>
              <div className="title-container">
                <h1>Accounts</h1>
              </div>
              <div className="btn-container d-flex justify-content-between">
                <Button type="submit" variant="primary" onClick={NewFunction}>
                  New
                </Button>
                <Button
                  id="account_filter_btn"
                  type="submit"
                  variant="secondary"
                  onClick={filterToggle}
                >
                  <FaFilter />
                  <MdClose className="d-none" />
                </Button>
              </div>
              <div
                id="account_filters"
                className="filter-container d-none p-3 border-top"
              >
                <Form
                  onSubmit={(ev) => {
                    setFilterClicked(true);
                    setPage(1);
                    gettFilterUrl(ev);
                  }}
                  onReset={(ev) => {
                    setFilterClicked(false);
                    setUrl(
                      `http://localhost:8000/api/acc/account/?page=${Page}`
                    );
                  }}
                >
                  <Row>
                    <Col>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={(ev) => setName(ev.target.value)}
                        type="text"
                        placeholder="Enter name to search"
                      />
                    </Col>
                   
                  </Row>
                  <Button type="submit" variant="primary">
                    Filter
                  </Button>
                  <Button type="reset" variant="secondary">
                    Reset
                  </Button>
                </Form>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Balance</th>
                  <th>Description</th>
                  <th width="5px"></th>
                </tr>
              </thead>
              <tbody>
                {Accounts.map((account) => {
                  return (
                    <tr key={account.id}>
                      <td onClick={(ev) => OpenEditModal(ev, account.id)}>
                        {account.name}
                      </td>
                      <td onClick={(ev) => OpenEditModal(ev, account.id)}>
                        {account.balance}
                      </td>
                      <td onClick={(ev) => OpenEditModal(ev, account.id)}>
                        {account.description}
                      </td>
                      <td
                        onClick={(ev) => DeleteRecord(account.id)}
                        width="5px"
                      >
                        <FaRegTrashAlt />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="pagination-btns">
              <div
                className="btn btn-secondary btn-sm pagination-btn"
                onClick={prevPage}
              >
                <FaArrowLeft />
              </div>
              <div className="curr-page">{Page}</div>
              <div
                className="btn btn-secondary btn-sm pagination-btn"
                onClick={nextPage}
              >
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
