import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import SubmitActions from "../Actions/SubmitActions";

const SubmitRouteCard = ({
  buttonClicked,
  submitRouteName,
  markerData,
  loadRoute,
}) => {
  return (
    <Card className="g-0">
      <CardHeader>Route Planner Actions</CardHeader>
      <CardBody>
        <CardTitle tag="h5" className="mb-3">
          Submit your route
        </CardTitle>
        <SubmitActions
          buttonClicked={buttonClicked}
          submitRouteName={submitRouteName}
          markerData={markerData}
          loadRoute={loadRoute}
        ></SubmitActions>
      </CardBody>
    </Card>
  );
};

export default SubmitRouteCard;
