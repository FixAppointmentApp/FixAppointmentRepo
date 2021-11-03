import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./navBar.css";

export default function NavBar() {
  return (
    <div id="nav">
      <nav className="navContainer">
        <Link to="/">
          <img id="logo" src={logo} alt="logo" />
        </Link>
        <ul className="navFlex">
          <li>
            <Link className="link" to="">
              Sign in
            </Link>
          </li>
          <li>
            <Link to="/signUpPage" className="link" id="singUpBtn">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
