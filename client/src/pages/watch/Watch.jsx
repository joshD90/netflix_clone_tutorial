import { ArrowBackOutlined } from "@mui/icons-material";
import React from "react";
import "./watch.scss";
import { useLocation, Link } from "react-router-dom";

function Watch() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="watch">
      <Link to="/" className="link">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>

      <video
        className="video"
        autoPlay
        progress="true"
        controls
        // should be src={location.state.}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      ></video>
    </div>
  );
}

export default Watch;
