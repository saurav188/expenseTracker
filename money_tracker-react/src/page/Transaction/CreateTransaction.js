import { useEffect, useState } from "react";
import axios from "axios";
import getToken from "../../hooks/GetToken";
import Button from "react-bootstrap/esm/Button";


const CreateTransaction = ({refreshTableData}) => {
  const token = getToken();
  const [show, setShow] = useState(false);

  // Form state
  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Dropdown options
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Error states
  const [errors, setErrors] = useState({
    accountId: "",
    categoryId: "",
    amount: "",
    note: "",
  });

  useEffect(() => {
    getAccountAndCategoryDetails();
  }, []);

  // Fetch accounts and categories
  const getAccountAndCategoryDetails = async () => {
    try {
      const accountResponse = await axios.get(`http://localhost:8000/api/acc/account`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAccounts(accountResponse.data.data);

      const categoryResponse = await axios.get(`http://localhost:8000/api/acc/category`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setCategories(categoryResponse.data.data);
    } catch (error) {
      console.error("Error fetching account or category details:", error);
    }
  };

  // Handle form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!accountId) validationErrors.accountId = "Account is required.";
    if (!categoryId) validationErrors.categoryId = "Category is required.";
    if (!amount || isNaN(amount) || amount <= 0) validationErrors.amount = "Amount should be a valid number greater than zero.";
    if (!note) validationErrors.note = "Note is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      account_id: accountId,
      category_id: categoryId,
      amount,
      note,
    };
    try {
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


      refreshTableData();

      // Reset form and hide modal
      setShow(false);
      setAccountId("");
      setCategoryId("");
      setCategoryName("");
      setCategoryName("");
      setAmount("");
      setNote("");
      setSearchTerm("");
      setCategorySearchTerm("");
      setErrors({});
      setSearchTerm("");
      setCategorySearchTerm("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle account search
  const handleAccountSearch = async (name) => {
  try {
    const accountResponse = await axios.get(`http://localhost:8000/api/acc/account`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { name }
    });

    // Update filtered accounts with the API response data
    setFilteredAccounts(accountResponse.data.data);
  } catch (error) {
    console.error("Error fetching account data", error);
  }
};
// Handle category search
const handleCategorySearch = async (name) => {
  try {
    const response = await axios.get('http://localhost:8000/api/acc/category', {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { name },
    });
    setFilteredCategories(response.data.data);
    console.log(response.data.data, "hello");
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

  // Handle note change and filter category
  const handleNotesChange = async (noteValue) => {
    setNote(noteValue);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/acc/expense-classification/`,
        { remarks: noteValue },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setCategoryName(response.data.data);
    } catch (error) {
      console.error("Error fetching note classifications:", error);
    }
  };

  // Transaction form component
  const TransactionForm = () => (
    <form id="transactionForm" onSubmit={handleSubmit}>
      <div className="mb-4">
  <label htmlFor="accountId" className="block text-gray-700 font-medium mb-2">
    Bank Account
  </label>
  <div className="relative">
    <input
      type="text"
      id="accountId"
      value={searchTerm}  
      onChange={(e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue); 
        handleAccountSearch(inputValue); 
      }}
      placeholder="Search Account"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {errors.accountId && <p className="text-red-500 text-sm">{errors.accountId}</p>}

    {filteredAccounts.length > 0 && (
      <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white absolute z-10 w-full">
        {filteredAccounts.map((account) => (
          <li
            key={account.id}
            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            onClick={() => {
              setSearchTerm(account.name); 
              setAccountId(account.id);  
              setFilteredAccounts([]);  
            }}
          >
            {account.name}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

     <div className="mb-4">
  <label htmlFor="categoryId" className="block text-gray-700 font-medium mb-2">
    Category
  </label>
  <div className="relative">
    <input
      type="text"
      id="categoryId"
      value={categoryName }  // Set to categorySearchTerm directly
      onChange={(e) => {
        const searchValue = e.target.value;
        setCategoryName(searchValue);  // Set category name for controlled input
        setCategorySearchTerm(searchValue);  // Update search term
        handleCategorySearch(searchValue);  // Fetch filtered categories
      }}
      placeholder="Search Category"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}

    {filteredCategories.length > 0 && (
      <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white absolute z-10 w-full">
        {filteredCategories.map((category) => (
          <li
            key={category.id}
            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            onClick={() => {
              setCategorySearchTerm(category.name);  // Set selected category name in input
              setCategoryId(category.id);
              setCategoryName(category.name)  // Set selected category ID
              setFilteredCategories([]);  // Clear the dropdown list after selection
            }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="note" className="block text-gray-700 font-medium mb-2">
          Note
        </label>
        <input
          type="text"
          id="note"
          value={note}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Note..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.note && <p className="text-red-500 text-sm">{errors.note}</p>}
      </div>
    </form>
  );

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        className="px-4 py-2 my-2 text-white rounded-md  focus:outline-none "
      >
        New
      </Button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Transaction</h2>
              <button
                onClick={() => setShow(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                X
              </button>
            </div>
            {TransactionForm()}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShow(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Close
              </button>
              <Button
                type="submit"
                form="transactionForm"
                className="px-4 py-2  text-white rounded-md focus:outline-none focus:ring-2 f"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTransaction;
