import { useState } from "react";
import NavBar from "../component/common/navBar";
import { useLocation } from "react-router-dom";
// import { readImage } from "../utils/readImage";

type Inputs = {
  title: string;
  host: string;
  date: string;
  location: string;
  image: {};
  content: string;
  coordinates: { lat: number | null; lng: number | null };
};

interface location {
  pathname: string;
  state: {};
  data: Inputs;
}

export default function EventPreviewPage() {
  // const [imageUrl, setImageUrl] = useState<string>("");
  const location = useLocation<location>();
  const data = location.state.data;

  return (
    <div>
      <NavBar />
      <h1>this is event preview page</h1>
      <div style={{ textAlign: "center" }}>
        <h2>{data.title}</h2>
        <h3>{data.host}</h3>
        <h4>{data.date}</h4>
        <h5>{data.location}</h5>
      </div>
    </div>
  );
}
