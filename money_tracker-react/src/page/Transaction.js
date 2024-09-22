import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavbarHeader";
import getToken from "../hooks/GetToken";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { FaRegTrashAlt } from "react-icons/fa";

const Transaction = () => {
  const token = getToken();
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("CategoryId is not defined");
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    setLoading(true);
    setError(null);
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    try {
      const response = await axios.get(
        "http://localhost:8000/api/acc/transaction/",
        {
          headers: header,
        },
        {
          params: {
            account_id: 16,
            category: 6,
          },
        }
      );

      // setTransactionData(response.data);
      setCategoryId(response.data.category_id);
    } catch (err) {
      setError("Error fetching transaction data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(())

  return (
    <div>
      <NavBar />
      <Button onClick={fetchTransaction}>Fetch Transaction</Button>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      <ul>
        {transactionData.map((transaction) => (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th width="5px"></th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((category) => {
                return (
                  <tr key={transaction.id}>
                    <td
                    // onClick={(ev) => OpenEditModal(ev, transaction.id)}
                    >
                      {transaction.name}
                    </td>
                    <td
                    // onClick={(ev) => OpenEditModal(ev, transaction.id)}
                    >
                      {transaction.description}
                    </td>
                    <td
                      // onClick={(ev) => DeleteRecord(transaction.id)}
                      width="5px"
                    >
                      <FaRegTrashAlt />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          // <li key={transaction.id}>
          //   AccountId:{transaction.account_id}
          //   ID: {transaction.id}, Amount: {transaction.amount}, Note:{" "}
          //   {transaction.note}
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default Transaction;
