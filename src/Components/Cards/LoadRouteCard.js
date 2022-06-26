import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import LoadActions from "../Actions/LoadActions";

const LoadRouteCard = ({ loadRouteName, routeNames, deleteButtonClicked }) => {
  return (
    <Card className="g-0">
      <CardHeader>Load Route Plan</CardHeader>
      <CardBody>
        <CardTitle tag="h5" className="mb-3">
          Load your route
        </CardTitle>
        <LoadActions
          loadRouteName={loadRouteName}
          routeNames={routeNames}
          deleteButtonClicked={deleteButtonClicked}
        ></LoadActions>
      </CardBody>
    </Card>
  );
};

export default LoadRouteCard;
