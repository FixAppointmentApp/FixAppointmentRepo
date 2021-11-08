import React from "react";
import CreateEventBtn from "../component/createEventBtn";
import NavBar from "../component/common/navBar";
import "./style.css";

const HomePage: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <div className="homePageContainer">
        <p>This is the HOME page!</p>
        <CreateEventBtn />
      </div>
    </div>
  );
};

export default HomePage;
