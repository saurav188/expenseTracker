import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import getToken from "../../hooks/GetToken";
import NavBar from "../../components/NavbarHeader";
import { FaArrowLeft, FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import CreateTransaction from "./CreateTransaction";
import { confirmAlert } from "react-confirm-alert";

const Transaction = () => {
  const token = getToken(); // Assumed that getToken() provides the token
  const [transactionData, setTransactionData] = useState([]);
  const [Page, setPage] = useState(1);
  const [MaxPage, setMaxPage] = useState(1);
  const [error, setError] = useState(null);


   let prevPage = () => {
    if (Page > 1) setPage(Page - 1);
  };

  let nextPage = () => {
    if (Page < MaxPage) setPage(Page + 1);
  };


  const getTransactionData = async () => {
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    try {
      const response = await axios.get(
        `http://localhost:8000/api/acc/transaction/?page=${Page}`,
        {
          headers: header,
        }
      );
      console.log(response.data.num_pages,"consolePage")
        setTransactionData(response.data.data); 
      setMaxPage(response.data.num_pages);
    } catch (err) {
      setError("Error fetching transaction data");
      console.error(err);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, [Page]); 

  // Delete
  let DeleteRecord = (id) => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure you want to delete this Transaction?",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let temp = `http://localhost:8000/api/acc/transaction/?id=${id}`;
            let header = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            };

            fetch(temp, {
              method: "DELETE",
              headers: header,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data["status"]) {
                  getTransactionData();
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

  return (
    <div>
      <NavBar />
      <div className="p-5 gap-4">
        <div className="title-container">
          <h1>Transaction</h1>
        </div>
        <CreateTransaction />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Account</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.account_name}</td>
                <td>{transaction.category_name}</td>
                <td>Rs. {transaction.amount}</td>
                {/* <td>{transaction.trn_date}</td> */}

                <td>{transaction.note || "No Note"}</td>
                <td onClick={(ev) => DeleteRecord(transaction.id)} width="5px">
                  <FaRegTrashAlt />
                </td>
              </tr>
            ))}
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
                onClick={()=>{
                  console.log(Page)
                  nextPage()}}
              >
                <FaArrowRight />
              </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
