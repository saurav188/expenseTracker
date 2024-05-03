import {React,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../components/NavbarHeader";
import Table from 'react-bootstrap/Table';
import getToken  from "../hooks/GetToken";
import useRunOnce from "../hooks/useRunOnce";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/esm/Button";
import { FaArrowLeft, FaArrowRight, FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';


function Account() {
  const [Error, setError] = useState({})

  //form states
  const [FormName, setFormName] = useState('')
  const [FormDescription, setFormDescription] = useState('')
  const [FormBalance, setFormBalance] = useState(0)
  const [FormShowCard, setFormShowCard] = useState(0)
  const [FormShowPie, setFormShowPie] = useState(0)
  const [FormShowLine, setFormShowLine] = useState(0)
  const [FormThemeColor, setFormThemeColor] = useState('')
  const [FormThemeIcon, setFormThemeIcon] = useState('')




  const navigate = useNavigate();
  let token = getToken();
  const [Accounts, setAccounts] = useState([])
  const [Page, setPage] = useState(1)
  const [FormOpen, setFormOpen] = useState(false)
  const [ModalTitle, setModalTitle] = useState('New Account')
  const [MaxPage, setMaxPage] = useState(1)
  const [Name, setName] = useState('')
  const [ShowCard, setShowCard] = useState(0)
  const [ShowPie, setShowPie] = useState(0)
  const [ShowLine, setShowLine] = useState(0)
  const [url, setUrl] = useState(`http://localhost:8000/api/acc/account/?page=${Page}`)
  


  let gettFilterUrl = (ev) => {
    ev.preventDefault()
    setUrl(`http://localhost:8000/api/acc/account/?page=${Page}&name=${Name}&show_card=${ShowCard}&show_pie=${ShowPie}&show_line=${ShowLine}`);
  }

  let resetFilter = (ev) => {
    setName('');
    setShowCard(0);
    setShowPie(0);
    setShowLine(0);
  }

  let prevPage = () => {
    if(Page > 1)
      setPage(Page-1);
  }

  let nextPage = () => {
    if(Page < MaxPage)
      setPage(Page+1);
  }

  let NewFunction = () => {
    setFormOpen(true)
    console.log("new button")
  }

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

  let filterToggle = (ev) =>{
    document.getElementById("account_filters").classList.toggle("d-none")
    Array.from(document.getElementById('account_filter_btn').children).forEach(e=>{
      e.classList.toggle('d-none');
    })
  }

  useRunOnce({
    fn: getData 
  })

  useEffect(() => { 
    setUrl(`http://localhost:8000/api/acc/account/?page=${Page}&name=${Name}&show_card=${ShowCard}&show_pie=${ShowPie}&show_line=${ShowLine}`);
    getData()
 }, [Page,url])

  return ( 
    <>
      <NavbarHeader/>
      <div className="main-container">
        <div
        className={`modal ${FormOpen?"":"d-none"}`}
        style={{ display: 'block', position: 'absolute', backgroundColor:"rgba(255, 255, 255, 0.8)"}}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{ModalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Form id="account-create-form">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={FormName} onChange={(ev) => setFormName(ev.target.value)} type="text" placeholder="Enter Name" />
              {Error['name']}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Balance</Form.Label>
              <Form.Control disabled className="disabled" value={FormBalance} type="number" placeholder="0.00" />
              {Error['balance']}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Theme Color</Form.Label>
              <Form.Control value={FormThemeColor} onChange={(ev) => setFormThemeColor(ev.target.value)} type="text" placeholder="Enter theme color" />
              {Error['theme_color']}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Theme Icon fa class </Form.Label>
              <Form.Control value={FormThemeIcon} onChange={(ev) => setFormThemeIcon(ev.target.value)} type="text" placeholder="Enter theme icon" />
              {Error['theme_icon']}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={FormDescription} onChange={(ev) => setFormDescription(ev.target.value)} type="text" placeholder="Enter Name" />
              {Error['description']}
            </Form.Group>
            <Row>
              <Col>
                  <Form.Check label="Show Card" value={FormShowCard?true:false} onChange={(ev) => setFormShowCard(ev.target.checked?1:0)} type="switch" />
              </Col>
              <Col>
                  <Form.Check label="Show Pie" value={FormShowPie?true:false} onChange={(ev) => setFormShowPie(ev.target.checked?1:0)} type="switch" />
              </Col>
              <Col>
                  <Form.Check label="Show In Line" value={FormShowLine?true:false} onChange={(ev) => setFormShowLine(ev.target.checked?1:0)} type="switch" id="custom-switch" />
              </Col>
            </Row>
          </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={(ev)=>setFormOpen(false)}>Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
        <div className="w-100">
          <div>
            <div>
              <div className="title-container">
                <h1>
                  Accounts
                </h1>
              </div>
              <div className="btn-container d-flex justify-content-between">
                <Button type="submit" variant="primary" onClick={NewFunction}>
                  New
                </Button>
                <Button id = "account_filter_btn" type="submit" variant="secondary" onClick={filterToggle}>
                  <FaFilter />
                  <MdClose className="d-none" />
                </Button>
              </div>
              <div id = "account_filters" className="filter-container d-none p-3 border-top">
              <Form onSubmit={(ev)=>gettFilterUrl(ev)} onReset={(ev)=>resetFilter(ev)}>
                <Row>
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(ev) => setName(ev.target.value)} type="text" placeholder="Enter name to search" />
                  </Col>
                  <Row>
                    <Col>
                      <Form.Label>Show<br/> Card</Form.Label>
                      <Form.Control className="btn" value={ShowCard} onChange={(ev) =>{setShowCard(ev.target.checked?1:0);}} type="checkbox" />
                    </Col>
                    <Col>
                      <Form.Label>Show Pie</Form.Label>
                      <Form.Control value={ShowPie} onChange={(ev) =>{setShowPie(ev.target.checked?1:0);}} type="checkbox" />
                    </Col>
                    <Col>
                      <Form.Label>Show Line</Form.Label>
                      <Form.Control value={ShowLine} onChange={(ev) =>{setShowLine(ev.target.checked?1:0);}} type="checkbox" />
                    </Col>
                  </Row>
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