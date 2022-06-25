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
} from "reactstrap";

const SubmitActions = ({
  buttonClicked,
  submitRouteName,
  markerData,
  loadRoute,
}) => {
  const [nameValue, setNameValue] = useState("");

  const handleButtonClick = (action) => {
    buttonClicked(action);
    if(action === "clear"){
      setNameValue("");
    }
  };

  useEffect(() => {
    if (loadRoute) {
      setNameValue(loadRoute.label);
    }
  }, [loadRoute, setNameValue]);

  const handleSubmit = (e) => {
    handleButtonClick("submit");
    submitRouteName(nameValue);
    setNameValue("");
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
                placeholder="Insert a name for the route"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />
              {/* <FormText>
              </FormText> */}
            </Col>
          </FormGroup>
        </Row>
        <Row className="text-center">
          <Col sm={4} className="p-2">
            <Button
              className="clear-btn"
              color="danger"
              onClick={() => handleButtonClick("clear")}
            >
              Clear Map
            </Button>
          </Col>
          <Col sm={4} className="p-2">
            <Button
              className="cancel-btn"
              color="warning"
              onClick={() => handleButtonClick("cancel")}
            >
              Cancel
            </Button>
          </Col>
          <Col sm={4} className="p-2">
            <span id="UncontrolledTooltipExample">
              <Button
                className="submit-btn"
                color="primary"
                type="submit"
                disabled={!nameValue || markerData.length < 2}
              >
                Submit
              </Button>
            </span>

            {(!nameValue || markerData.length < 2) && (
              <UncontrolledTooltip
                placement="bottom"
                target="UncontrolledTooltipExample"
                fade={true}
              >
                A name and at least 2 points for the route are required to
                submit
              </UncontrolledTooltip>
            )}
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default SubmitActions;
