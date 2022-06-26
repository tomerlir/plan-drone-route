import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Col,
  Row,
  Label,
  Button,
} from "reactstrap";
import Select from "react-select";
import ConfirmationModal from "./Modals/ConfirmationModal";

const LoadActions = ({ loadRouteName, routeNames, deleteButtonClicked }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeOptions, setRouteOptions] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleRouteSelect = (name) => {
    setSelectedRoute(name);
  };

  const handleSubmit = (e) => {
    loadRouteName(selectedRoute);
    setSelectedRoute(null);

    e.preventDefault();
  };

  const handleDelete = (confirm) => {
    if (confirm) {
      deleteButtonClicked(selectedRoute);
      setSelectedRoute(null);
    }
    setOpenModal(!openModal);
  };

  const handleOpenModal = (action) => {
    setOpenModal(!openModal);
    setModalAction(action);
  };

  useEffect(() => {
    if (routeNames) {
      setRouteOptions(routeNames);
    } else {
      setSelectedRoute(null);
      setRouteOptions(null);
    }
  }, [setRouteOptions, setSelectedRoute, routeNames]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="d-flex justify-content-between">
          <Label for="name" sm={4} className="mr-2">
            Select Route
            <span className="text-danger">*</span>
          </Label>
          <Col sm={8}>
            <Select
              id="selectedRoute"
              name="selectedRoute"
              placeholder="Select a route"
              value={selectedRoute}
              options={routeOptions}
              isClearable
              isSearchable
              onChange={(name) => {
                handleRouteSelect(name);
              }}
            />
          </Col>
        </FormGroup>
        <Row className="text-center">
          <Col sm={4} className="p-2">
            <span id="loadBtnTooltip">
              <Button
                className="load-btn"
                color="primary"
                type="submit"
                hidden={!selectedRoute}
              >
                Load
              </Button>
            </span>
          </Col>

          <Col sm={4} className="p-2">
            <span id="deleteBtnTooltip">
              <Button
                className="delete-btn"
                color="danger"
                hidden={!selectedRoute}
                onClick={() => handleOpenModal("Delete")}
              >
                Delete
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
      <ConfirmationModal
        openModal={openModal}
        modalAction={modalAction}
        handleConfirmClick={handleDelete}
      ></ConfirmationModal>
    </Fragment>
  );
};

export default LoadActions;
