import {React,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../components/NavbarHeader";
import Table from 'react-bootstrap/Table';
import getToken  from "../hooks/GetToken";
import useRunOnce from "../hooks/useRunOnce";
import Button from "react-bootstrap/esm/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Account() {
  const [Error, setError] = useState('')
  const navigate = useNavigate();
  let token = getToken();
  const [Accounts, setAccounts] = useState([])
  const [Page, setPage] = useState(1)
  const [MaxPage, setMaxPage] = useState(1)
  const [Name, setName] = useState('')
  const [ShowCard, setShowCard] = useState(1)
  const [ShowPie, setShowPie] = useState(1)
  const [ShowLine, setShowLine] = useState(1)
  

  let gettFilterUrl = () => {
    return `http://localhost:8000/api/acc/account/?page=${Page}&show_card=${ShowCard}&show_pie=${ShowPie}&show_line=${ShowLine}`;
  }

  let prevPage = () => {
    if(Page > 1)
      setPage(Page-1);
  }

  let nextPage = () => {
    if(Page < MaxPage)
      setPage(Page+1);
  }

  useEffect(() => { 
    getData()
 }, [Page])


  let NewFunction = () => {
    console.log("new button")
  }

  let url = `http://localhost:8000/api/acc/account/?page=${Page}`;

  let getData = () => {
    let header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    }

    fetch(url, {
      method: "GET", 
      headers: header,
      // mode: "no-cors",
      // body: JSON.stringify(data),
    })
    .then(reponse =>
      reponse.json()
    )
    .then(data=>{
      setAccounts(data["data"])
      setMaxPage(data['num_pages'])
    })
    .catch(error => console.log('Error: ' + error.message));
  }

  useRunOnce({
    fn: getData 
  })

  return ( 
    <>
      <NavbarHeader/>
      <div className="main-container">
        <div className="w-100">
          <h1>
            Accounts
          </h1>
          <div>
            <div>
              <div className="btn-container">
              <Button type="submit" variant="primary" onClick={NewFunction}>
                New
              </Button>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Balance</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {
                  Accounts.map(account=>{
                    return (
                      <tr key={account.id}>
                        <td>{account.name}</td>
                        <td>{account.balance}</td>
                        <td>{account.description}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <div className="pagination-btns">
                <div className="btn btn-secondary btn-sm pagination-btn" onClick={prevPage}><FaArrowLeft /></div>
                <div className="curr-page">{Page}</div>
                <div className="btn btn-secondary btn-sm pagination-btn" onClick={nextPage}><FaArrowRight /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;