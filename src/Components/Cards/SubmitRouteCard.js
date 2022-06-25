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
          You may clear all saved routes, and cancel or submit your drawn route
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
