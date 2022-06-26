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

  // store the marker coordinates
  const handleMarkerData = (data) => {
    setMarkerData(data);
  };

  // check which action has been done in submit child component
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

  // check if user wants to save marker coordinates
  useEffect(() => {
    if (saveClicked) {
      localStorage.setItem(routeName, JSON.stringify(markerData));
      // since using local storage and not an actual server, will do a simple check if name alreeady exists
      const index = routeNames.findIndex(
        (element) => element.label === routeName
      );

      // and update that key with the new data
      if (index !== -1) {
        const updatedRouteNames = [...routeNames];
        updatedRouteNames[index].value = markerData;
        setRouteNames(updatedRouteNames);
      } else {
        // or if doesn't already exist add a new object to local storage
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

  // check for changes in local storage and if a route has been deleted to update loadable routes
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

  // check if user click to remove a route
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
        <Row className="text-center mt-3">
          <h1>Drone Route Planner</h1>
        </Row>
        <Row className="p-3">
          <Col sm={8} className="mb-3">
            <MyMap
              handleMarkerData={handleMarkerData}
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
