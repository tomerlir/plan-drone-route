import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Col,
  Row,
  Label,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";

const LoadActions = ({ loadRouteName, routeNames }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeOptions, setRouteOptions] = useState(null);

  const handleRouteSelect = (name) => {
    setSelectedRoute(name);
  };

  const handleSubmit = (e) => {
    loadRouteName(selectedRoute);
    setSelectedRoute(null);

    e.preventDefault();
  };

  useEffect(() => {
    console.log("routeNames", routeNames);
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
          </Label>
          <Col sm={8}>
            <Select
              id="selectedRoute"
              name="selectedRoute"
              placeholder="Select route to load"
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
        <Row>
          <Col sm={4}>
            <span id="loadBtnTooltip">
              <Button
                className="load-btn"
                color="primary"
                type="submit"
                disabled={!selectedRoute}
              >
                Load Route
              </Button>
            </span>

            {!selectedRoute && (
              <UncontrolledTooltip
                placement="bottom"
                target="loadBtnTooltip"
                fade={true}
              >
                Please select a route to proceed
              </UncontrolledTooltip>
            )}
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default LoadActions;
