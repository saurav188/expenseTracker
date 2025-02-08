/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NavbarHeader from "../../components/NavbarHeader";
import Table from "react-bootstrap/Table";
import getToken from "../../hooks/GetToken";
import useRunOnce from "../../hooks/useRunOnce";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [Categories, setCategories] = useState([]);
  const [Page, setPage] = useState(1);
  const [MaxPage, setMaxPage] = useState(1);
  const [Name, setName] = useState("");
  const [url, setUrl] = useState(`http://localhost:8000/api/acc/category/?page=${Page}`);
  const [filterClicked, setFilterClicked] = useState(false);
  const [FormOpen, setFormOpen] = useState(false);
  const [FormId, setFormId] = useState(0);
  
  const category_type = {
    Income: "INC",
    Expense: "EXP",
    Transfer: "TRN",
  };

  let token = getToken();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      theme_color_hash: "",
      category_type: "EXP",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      theme_color_hash: Yup.string().required("Theme color is required"),
      category_type: Yup.string().required("Category type is required"),
    }),
    handleSubmit: async (values) => {
      console.log('**')
      let url = `http://localhost:8000/api/acc/category/`;
      const header = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };

      const data = { ...values, id: FormId };
      const method = FormId === 0 ? "POST" : "PATCH";

      try {
        const response = await fetch(url, {
          method,
          headers: header,
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(FormId === 0 ? "Category added successfully" : "Category updated successfully");
          getData();
          setFormOpen(false);
          resetForm();
        } else {
          Object.keys(result.message || {}).forEach((key) => {
            toast.error(result.message[key][0]);
          });
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    },
  });

  const getData = () => {
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data["data"]);
        setMaxPage(data["num_pages"]);
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  const filterToggle = () => {
    document.getElementById("category_filters").classList.toggle("d-none");
    Array.from(document.getElementById("category_filter_btn").children).forEach((e) => {
      e.classList.toggle("d-none");
    });
  };

  const prevPage = () => {
    if (Page > 1) setPage(Page - 1);
  };

  const nextPage = () => {
    if (Page < MaxPage) setPage(Page + 1);
  };

  const openEditModal = (id) => {
    setFormOpen(true);
    let temp = `http://localhost:8000/api/acc/category/?id=${id}`;
    let header = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    fetch(temp, {
      method: "GET",
      headers: header,
    })
      .then((response) => response.json())
      .then((data) => {
        formik.setFieldValue("name", data["data"]["name"]);
        formik.setFieldValue("description", data["data"]["description"]);
        formik.setFieldValue("theme_color_hash", data["data"]["theme_color_hash"]);
        formik.setFieldValue("category_type", data["data"]["category_type"]);
        setFormId(data["data"]["id"]);
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  const resetForm = () => {
    setFormId(0);
    formik.resetForm();
  };

  const deleteRecord = (id) => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure to want to delete the category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const header = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            };
            const temp = `http://localhost:8000/api/acc/category/?id=${id}`;

            fetch(temp, {
              method: "DELETE",
              headers: header,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data["status"]) {
                  getData();
                  toast.success("Category deleted successfully");
                }
              })
              .catch((error) => console.log("Error: " + error.message));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  useRunOnce({
    fn: getData,
  });

  useEffect(() => {
    if (filterClicked) {
      setUrl(`http://localhost:8000/api/acc/category/?page=${Page}&name=${Name}`);
    } else {
      setUrl(`http://localhost:8000/api/acc/category/?page=${Page}`);
    }
    getData();
  }, [Page, url]);

  return (
    <>
      <NavbarHeader />
      <div className="mx-24 my-10 ">
        <div
          id="category-modal-container"
          className={`modal ${FormOpen ? "" : "d-none"}`}
          style={{
            display: "block",
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Modal.Dialog className="">
            <Modal.Header>
              <Modal.Title>{FormId === 0 ? "New Category" : "Edit Category"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form id="category-create-form" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-danger">{formik.errors.name}</p>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category Type</Form.Label>
                  <Form.Control
                    as="select"
                    {...formik.getFieldProps("category_type")}
                  >
                    {Object.keys(category_type).map((key) => (
                      <option key={category_type[key]} value={category_type[key]}>
                        {key}
                      </option>
                    ))}
                  </Form.Control>
                  {formik.touched.category_type && formik.errors.category_type ? (
                    <p className="text-danger">{formik.errors.category_type}</p>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Description"
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <p className="text-danger">{formik.errors.description}</p>
                  ) : null}
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="rounded-lg"
                onClick={() => {
                  setFormOpen(false);
                  resetForm();
                }}
              >
                Close
              </Button>
              <Button variant="primary" className="rounded-lg"  type="submit">
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>

        <div>
          <div className="title-container">
            <h1>Categories</h1>
          </div>

          <div className="btn-container d-flex justify-content-between">
            <Button variant="primary" className="rounded-lg" onClick={() => setFormOpen(true)}>
              New
            </Button>
            <Button
              id="category_filter_btn"
              variant="secondary"
              onClick={filterToggle}
            >
              <FaFilter />
              <MdClose className="d-none" />
            </Button>
          </div>

          <div id="category_filters" className="filter-container d-none p-3 border-top">
            <Form
              onSubmit={(ev) => {
                setFilterClicked(true);
                setPage(1);
                ev.preventDefault();
                setUrl(`http://localhost:8000/api/acc/category/?page=${Page}&name=${Name}`);
              }}
              onReset={() => {
                setFilterClicked(false);
                setName("");
                setUrl(`http://localhost:8000/api/acc/category/?page=${Page}`);
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
              <Button type="submit" variant="primary">Filter</Button>
              <Button type="reset" variant="secondary">Reset</Button>
            </Form>
          </div>

          <Table striped bordered hover className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th width="5px"></th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((category) => (
                <tr key={category.id}>
                  <td onClick={() => openEditModal(category.id)}>{category.name}</td>
                  <td onClick={() => openEditModal(category.id)}>{category.description}</td>
                  <td width="5px" onClick={() => deleteRecord(category.id)}>
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
              onClick={nextPage}
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Category;
