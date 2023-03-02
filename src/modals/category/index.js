import React, { memo, useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  saveNewCategory,
  updateCategoryById,
} from "../../redux/dashboard/action";

function Index({ show, onHide, category }) {
  const [loader, setLoader] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [error, setError] = React.useState({});
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    if (!newCategory.name || newCategory.name.length < 3) {
      setError({ ...error, category: "category name is required" });
      return;
    }
    setLoader(true);
    if (category) {
      dispatch(updateCategoryById(newCategory, category._id, stopLoader));
      return;
    }
    dispatch(saveNewCategory(newCategory, stopLoader));
  };
  const stopLoader = () => {
    setLoader(false);
    onHide();
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    setError({
      ...error,
      [id]: "",
    });
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };
  useEffect(() => {
    if (category)
      setNewCategory({
        name: category.name,
      });
  }, [category]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {category ? "Edit Category" : "Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>category name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="category"
              value={newCategory?.name}
              onChange={handleChange}
              placeholder="enter a category name"
            />
          </Form.Group>
          {error?.category && (
            <Form.Text className="text-danger">{error?.category}</Form.Text>
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between gap-3 w-100">
          <Button
            onClick={onHide}
            variant="outline-primary"
            className=" d-flex justify-content-between align-items-center "
          >
            cancel
          </Button>
          <Button
            type="submit"
            variant="danger"
            className=" d-flex justify-content-between align-items-center "
          >
            {loader ? (
              <div className=" d-flex justify-content-between  align-items-center ">
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span>waiting...</span>
              </div>
            ) : category ? (
              "update"
            ) : (
              "add"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default memo(Index);
