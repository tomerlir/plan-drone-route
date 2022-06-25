import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import LoadActions from "../Actions/LoadActions";

const LoadRouteCard = ({ loadRouteName, routeNames }) => {
  return (
    <Card className="g-0">
      <CardHeader>Load Route Plan</CardHeader>
      <CardBody>
        <CardTitle tag="h5" className="mb-3">
          You may load any of your saved routes
        </CardTitle>
        <LoadActions
          loadRouteName={loadRouteName}
          routeNames={routeNames}
        ></LoadActions>
      </CardBody>
    </Card>
  );
};

export default LoadRouteCard;
