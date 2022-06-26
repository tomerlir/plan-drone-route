import { Fragment, useEffect, useState } from "react";
import "./App.css";
import MyMap from "./Components/Views/MyMap";
import { Row, Col, Container } from "reactstrap";
import SubmitRouteCard from "./Components/Cards/SubmitRouteCard";
import LoadRouteCard from "./Components/Cards/LoadRouteCard";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [markerData, setMarkerData] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(false);
  const [routeDeleted, setRouteDeleted] = useState(false);
  const [routeName, setRouteName] = useState(null);
  const [loadRoute, setLoadRoute] = useState(null);
  const [routeNames, setRouteNames] = useState([]);
  const [cleanUpMap, setCleanUpMap] = useState(false);
  const [removeLastPoint, setRemoveLastPoint] = useState(false);

  const childToParent = (data) => {
    setMarkerData(data);
  };

  const buttonClicked = (action) => {
    if (action === "submit") {
      setSaveClicked(true);

      toast.success(`Route saved successfully`, {
        autoClose: 3000,
      });
    } else if (action === "cancel") {
      setRemoveLastPoint(true);
      toast.success("Point cancellled successfully", {
        autoClose: 3000,
      });
    } else if (action === "clear") {
      setCleanUpMap(true);
      setLoadRoute(null);
      toast.success("Map cleared successfully", {
        autoClose: 3000,
      });
    }
  };

  const deleteButtonClicked = (route) => {
    setDeleteRoute(route.label);
    toast.success(`${route.label} deleted successfully`, {
      autoClose: 3000,
    });
  };

  const cancelButtonClicked = () => {
    setRemoveLastPoint(false);
  };

  const clearButtonClicked = () => {
    setCleanUpMap(false);
  };

  const submitRouteName = (name) => {
    setLoadRoute(null);
    setRouteName(name);
  };

  const loadRouteName = (name) => {
    setLoadRoute(name);
    toast.success(`${name.label} loaded successfully`, {
      autoClose: 3000,
    });
  };

  useEffect(() => {
    if (saveClicked) {
      localStorage.setItem(routeName, JSON.stringify(markerData));
      const index = routeNames.findIndex(
        (element) => element.label === routeName
      );

      if (index !== -1) {
        const updatedRouteNames = [...routeNames];
        updatedRouteNames[index].value = markerData;
        setRouteNames(updatedRouteNames);
      } else {
        setRouteNames((prevState) => [
          ...prevState,
          { label: routeName, value: markerData },
        ]);
      }

      setSaveClicked(false);
      setCleanUpMap(true);
    }
  }, [
    saveClicked,
    setSaveClicked,
    markerData,
    setCleanUpMap,
    routeName,
    setRouteNames,
    routeNames,
  ]);

  useEffect(() => {
    if (localStorage.length || routeDeleted) {
      let ls = [];
      for (let i = 0; i < localStorage.length; i++) {
        ls.push({
          label: localStorage.key(i),
          value: JSON.parse(localStorage.getItem(localStorage.key(i))),
        });
      }
      setRouteNames(ls);
      setLoadRoute(null);
      setRouteDeleted(false);
    }
  }, [setRouteNames, routeDeleted]);

  useEffect(() => {
    if (deleteRoute) {
      localStorage.removeItem(deleteRoute);
      setRouteDeleted(true);
      setDeleteRoute(null);
      setCleanUpMap(true);
    }
  }, [deleteRoute, setRouteDeleted]);

  return (
    <Fragment>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Container fluid>
        <Row className="text-center">
          <h1>Drone Route Planner</h1>
        </Row>
        <Row className="p-3">
          <Col sm={8} className="mb-3">
            <MyMap
              childToParent={childToParent}
              cleanUpMap={cleanUpMap}
              clearButtonClicked={clearButtonClicked}
              removeLastPoint={removeLastPoint}
              cancelButtonClicked={cancelButtonClicked}
              loadRoute={loadRoute}
            ></MyMap>
          </Col>
          <Col sm={4}>
            <Row className="mb-3">
              <SubmitRouteCard
                buttonClicked={buttonClicked}
                submitRouteName={submitRouteName}
                markerData={markerData}
                loadRoute={loadRoute}
              ></SubmitRouteCard>
            </Row>
            <Row className="mb-3">
              <LoadRouteCard
                loadRouteName={loadRouteName}
                routeNames={routeNames}
                deleteButtonClicked={deleteButtonClicked}
              ></LoadRouteCard>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
