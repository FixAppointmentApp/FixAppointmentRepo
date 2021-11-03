import React, { useEffect, useState } from "react";
// import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Form from "../component/common/form";
import NavBar from "../component/common/navBar";
import "./style.css"

const CreateEvent: React.FunctionComponent = (props) => {
  return (
    <div>
      <NavBar />
      <div className="container">
      <Form />
      </div>
    </div>
  );
};

export default CreateEvent;
