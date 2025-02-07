/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavbarHeader from "../../components/NavbarHeader";
import axios from "axios";
import getToken from "../../hooks/GetToken";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
// import AddBalance from "../components/AddBalanceToAccount";
import LineGraph from "../../components/Charts/lineGraph";
import DonutChart from "../../components/Charts/donutGraph";

function Dashboard() {
  const token = getToken();
  const navigate = useNavigate();

  // Bank Account states
  const [isAccount, setIsAccount] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    getAccount();
    getTransactionData();
  }, [token]);

  const getAccount = async () => {
    try {
      const accountResponse = await axios.get(
        `http://localhost:8000/api/acc/account/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setIsAccount(accountResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  const getTransactionData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/acc/transaction/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          params: {
            account_id: 16,
            category: 6,
          },
        }
      );
      setTransactionData(response.data.data || []);
      console.log(response.data.data,"transaction")
    } catch (err) {
      console.error("Error fetching transaction data:", err);
    }
  };

  return (
    <>
      <NavbarHeader />
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold mt-8 mb-6 ">Dashboard</h1>
          <div className="flex flex-row gap-5">
            <Button
            className="rounded-md"
            onClick={()=>{
              navigate("/transaction")
            }
            }>Add Transaction</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Account Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Linked Bank Accounts</h2>
              <Button
                className=" text-white px-4 py-2 rounded-lg hover:bg-zinc-600"
                onClick={() => navigate("/account")}
              >
                Link New Account
              </Button>
            </div>

            <ul className="max-h-80 overflow-auto border-2 border-gray-300 rounded-lg p-4">
              {isAccount.length > 0 ? (
                isAccount.map((account) => (
                  <li
                    key={account.id}
                    className="p-4 mb-4 bg-gray-100 rounded-lg flex justify-between items-center shadow"
                  >
                    <div>
                      <p className="text-lg font-bold">{account.name}</p>
                    </div>
                     {account.balance>=0?(   <div className="text-green-600 font-bold">
                      Rs{account.balance}
                    </div>):
                    (   <div className="text-red-600 font-bold">
                      Rs{Math.abs(account.balance)}
                    </div>)}
                 
                  </li>
                ))
              ) : (
                <li>No accounts available</li>
              )}
            </ul>
          </div>

          {/* Recent Transaction Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="max-h-80 overflow-auto border-2 border-gray-300 rounded-lg p-4">
              {transactionData.length > 0 ? (
                <ul>
                  {transactionData.map((transaction) => (
                    <li
                      key={transaction.id}
                      className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div className="flex flex-row justify-between">
                       <div className="text-gray-700">
                        <span className="font-semibold">Transaction Type:</span>{" "}
                       <span className="font-semibold"> {transaction.category_name}</span>
                      </div>
                      <div className="text-gray-500">
                        Rs.
                        {transaction.amount.toFixed(2)}
                      </div>
                      </div>
                      <div className="text-gray-500">
                        <span className="font-semibold">Note:</span>{" "}
                       {transaction.note ? (
                          <span className="font-semibold">{transaction.note}</span>
                            ) : (
                            <span>Empty</span>
                            )}
                      
                      </div>
                     
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions available</p>
              )}
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 text-center">
          <h2 className="text-xl font-semibold">Show Graph</h2>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-9">
          <LineGraph/>
          </div>
          <div className="col-span-3">
            <DonutChart/>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
