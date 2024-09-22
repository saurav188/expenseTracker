import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import getToken from "../../hooks/GetToken";
import NavBar from "../../components/NavbarHeader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ButtonGroup from "antd/es/button/button-group";
import CreateTransaction from "./CreateTransaction";

const Transaction = () => {
  const token = getToken(); // Assumed that getToken() provides the token
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    try {
      const response = await axios.get(
        "http://localhost:8000/api/acc/transaction/",
        {
          headers: header,
          params: {
            account_id: 16,
            category: 6,
          },
        }
      );

      // Assuming response.data is an array of transaction objects
      setTransactionData(response.data);

      // Logging the data for debugging
      console.log(response.data);
    } catch (err) {
      setError("Error fetching transaction data");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);

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
              <th>Account ID</th>
              <th>Category ID</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.account_id}</td>
                <td>{transaction.category_id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.note || "No Note"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="pagination-btns">
          <div
            className="btn btn-secondary btn-sm pagination-btn"
            // onClick={prevPage}
          >
            <FaArrowLeft />
          </div>
          <div className="curr-page">{/* {Page} */}1</div>
          <div
            className="btn btn-secondary btn-sm pagination-btn"
            // onClick={nextPage}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
