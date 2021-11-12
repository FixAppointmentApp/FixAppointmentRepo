import React from "react";
import axios from "axios";

export default function logOut() {
  const handleLogOut = () => {
    axios.post("http://localhost:3001/api/logOut", {});
  };
  return <h5 onClick={handleLogOut}>Logout</h5>;
}
