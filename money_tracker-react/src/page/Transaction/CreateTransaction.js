import { useEffect, useState } from "react";
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

  // State for dropdown options
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // Get account and category details
  const getAccountAndCategoryDetails = async () => {
    try {
      const accountResponse = await axios.get(`http://localhost:8000/api/acc/account`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setAccounts(accountResponse.data.data);

      const categoryResponse = await axios.get(`http://localhost:8000/api/acc/category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setCategories(categoryResponse.data.data);
    } catch (error) {
      console.log("Error fetching account or category details:", error);
    }
  };

  // Set Category when Change is made in notes
  const handleNotesChange = async (note) => {
    try {
      const noteResponse = await axios.post(`http://localhost:8000/api/acc/expense-classification/`, { remarks: note }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setCategoryId(noteResponse.data.data);
      console.log(noteResponse.data.data);
    } catch (error) {
      console.log("Error fetching note classifications:", error);
    }
  };

  useEffect(() => {
    getAccountAndCategoryDetails();
  }, []);

  // Disable submit button if any field is empty
  const isFormValid = () => {
    return accountId && categoryId && amount && note; // Check if all required fields are filled
  };

  function TransactionForm() {
    return (
      <form id="transactionForm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="accountId" className="block text-gray-700 font-medium mb-2">
            Bank Account
          </label>
          <select
            id="accountId"
            name="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <option value="">Select Category</option>
            {categoryId.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.category_name}
              </option>
            ))}
      
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="note" className="block text-gray-700 font-medium mb-2">
            Note
          </label>
          <input
            type="text"
            id="note"
            name="note"
            placeholder="Note..."
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              handleNotesChange(e.target.value); // Call the notes handler on change
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </form>
    );
  }

  return (
    <>
      <button
        onClick={handleFormOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        New
      </button>

      {/* Modal */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Transaction</h2>
              <button
                onClick={handleFormClose}
                className="text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            <div>{TransactionForm()}</div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleFormClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Close
              </button>
              <button
                type="submit"
                form="transactionForm"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isFormValid()} 
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTransaction;


    // <select
    //         id="categoryId"
    //         name="categoryId"
    //         value={categoryId}
    //         onChange={(e) => setCategoryId(e.target.value)}
    //         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //         required
    //       >
    //         {/* Conditionally render the categoryId as the first option */}
    //         {categoryId && <option value={categoryId}>{categoryId}</option>}

    //         {/* Default option */}
    //         <option value="">Select Category</option>

    //         {/* Render the categories */}
    //         {categories.map((category) => (
    //           <option key={category.id} value={category.id}>
    //             {category.name}
    //           </option>
    //         ))}
    //       </select>