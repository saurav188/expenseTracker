/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegTrashAlt
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import NavbarHeader from "../../components/NavbarHeader";
import getToken from "../../hooks/GetToken";
import useRunOnce from "../../hooks/useRunOnce";

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
      category_type: "EXP",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      category_type: Yup.string().required("Category type is required"),
    }),
    onSubmit: async (values) => {
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
          formik.resetForm();
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
        formik.setFieldValue("category_type", data["data"]["category_type"]);
        setFormId(data["data"]["id"]);
      })
      .catch((error) => console.log("Error: " + error.message));
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
                } else {
                  toast.error("Error deleting category");
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
    setUrl(`http://localhost:8000/api/acc/category/?page=${Page}`);
  }, [Page]);

  useEffect(() => {
    getData();
  }, [url]);

  return (
    <>
      <NavbarHeader />
      <div className="mx-24 my-10">
        <Modal show={FormOpen} onHide={() => setFormOpen(false)}>
          <Modal.Header closeButton>
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
                <Form.Control as="select" {...formik.getFieldProps("category_type")}>
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
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setFormOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        <div>
          <h1>Categories</h1>
          <div className="d-flex justify-content-between">
            <Button variant="primary" className="rounded-lg py-2 my-4" onClick={() => {
              setFormOpen(true);
              setFormId(0);
              formik.resetForm();
            }}>
              New
            </Button>
          </div>
          <Table striped bordered hover>
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
                  <td width="5px">
                    <FaRegTrashAlt onClick={() => deleteRecord(category.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination-btns">
            <div
              className="btn btn-secondary btn-sm pagination-btn"
              onClick={() => setPage(Page - 1)}
              disabled={Page === 1}
            >
              <FaArrowLeft />
            </div>
            <div className="curr-page">{Page}</div>
            <div
              className="btn btn-secondary btn-sm pagination-btn"
              onClick={() => setPage(Page + 1)}
              disabled={Page >= MaxPage}
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
