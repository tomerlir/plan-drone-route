import React, { Fragment, useState, useEffect } from "react";
import {
  FormGroup,
  Form,
  Label,
  Button,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  FormText,
} from "reactstrap";
import ConfirmationModal from "./Modals/ConfirmationModal";

// check if any new markers have been added or removed 
const getDifference = (loadedMarkers, markers) => {
  return loadedMarkers?.length !== markers?.length;
};

const SubmitActions = ({
  buttonClicked,
  submitRouteName,
  markerData,
  loadRoute,
}) => {
  const [nameValue, setNameValue] = useState("");
  const [submitButtonAction, setSubmitButtonAction] = useState("Submit");
  const [dataUpdated, setDataUpdated] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  // pass action to parent
  const handleButtonClick = (action) => {
    buttonClicked(action);
    if (action === "clear") {
      setNameValue("");
      setOpenModal(!openModal);
    }
  };

  // toggle the modal
  const handleOpenModal = (action) => {
    setOpenModal(!openModal);
    setModalAction(action);
  };

  // check if user is going through update or submit workflow
  useEffect(() => {
    if (loadRoute) {
      setNameValue(loadRoute.label);
      setSubmitButtonAction("Update");
    } else {
      setDataUpdated(true);
      setSubmitButtonAction("Submit");
      setNameValue("");
    }
  }, [loadRoute, setNameValue, setSubmitButtonAction]);

  // check if data is updated or same
  useEffect(() => {
    if (loadRoute && markerData) {
      setDataUpdated(getDifference(loadRoute?.value, markerData));
    }
  }, [setDataUpdated, loadRoute, markerData]);

  // pass the submit with the route name to the parent
  const handleSubmit = (e) => {
    handleButtonClick("submit");
    submitRouteName(nameValue);
    setNameValue("");
    setDataUpdated(false);
    e.preventDefault();
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup className="d-flex justify-content-between">
            <Label for="name" sm={4}>
              Route Name
              <span className="text-danger">*</span>
            </Label>
            <Col sm={8}>
              <Input
                id="name"
                name="name"
                maxLength={55}
                placeholder="Insert a name"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
                readOnly={submitButtonAction === "Update"}
              />
              {submitButtonAction === "Update" && (
                <FormText>Update name will be available soon</FormText>
              )}
            </Col>
          </FormGroup>
        </Row>
        <Row className="text-center">
          <Col sm={4} className="p-2">
            <Button
              className="clear-btn"
              color="danger"
              onClick={() => handleOpenModal("Clear")}
              disabled={markerData.length < 1}
            >
              Clear
            </Button>
          </Col>
          <Col sm={4} className="p-2">
            <Button
              className="cancel-btn"
              color="warning"
              onClick={() => handleButtonClick("cancel")}
              disabled={markerData.length < 1}
            >
              Cancel
            </Button>
          </Col>
          <Col sm={4} className="p-2">
            <span id="ActionTooltip">
              <Button
                className="submit-btn"
                color="primary"
                type="submit"
                disabled={!nameValue || markerData.length < 2 || !dataUpdated}
              >
                {submitButtonAction}
              </Button>
            </span>

            {(!nameValue || markerData.length < 2) && (
              <UncontrolledTooltip
                placement="bottom"
                target="ActionTooltip"
                fade={true}
              >
                At least 2 points and a name are required to submit
              </UncontrolledTooltip>
            )}
            {submitButtonAction === "Update" && !dataUpdated && (
              <UncontrolledTooltip
                placement="bottom"
                target="ActionTooltip"
                fade={true}
              >
                A change is required to update
              </UncontrolledTooltip>
            )}
          </Col>
        </Row>
      </Form>
      <ConfirmationModal
        openModal={openModal}
        modalAction={modalAction}
        handleConfirmClick={() => handleButtonClick("clear")}
      ></ConfirmationModal>
    </Fragment>
  );
};

export default SubmitActions;
