import React, { useState } from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

function ListItem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  return (
    <div
      className="listItem"
      onMouseEnter={() => {
        setIsHovered(true);
        console.log(index);
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: index * 225 - 50 + 2.5 * index }}
    >
      <img src="http://macrobertartscentre.org/docs/095_546__thematrixlandscape_1562940515_standard.jpg" />
      {isHovered && (
        <>
          <video autoPlay loop>
            <source src={trailer} type="video/mp4"></source>
          </video>
          <div className="info">
            <div className="icons">
              <PlayArrow />
              <Add />
              <ThumbUpAltOutlined />
              <ThumbDownOutlined />
            </div>
            <div className="itemInfoTop">
              <span>1 Hour 14 mins</span>
              <span className="limit">+16</span>
              <span>1999</span>
            </div>
            <div className="description">
              What is The Matrix? That question leads computer hacker Neo down a
              rabbit hole — and to the mind-blowing truth about the world as he
              knows it.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListItem;
