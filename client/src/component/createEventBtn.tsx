import React from "react";
import { Link } from "react-router-dom";

export default function CreateEventBtn() {
  return (
    <div>
      <Link to="/createEvent">Create an event</Link>
    </div>
  );
}
