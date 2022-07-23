import "./featured.scss";

import React from "react";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";

function Featured({ type }) {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movie" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        width="100%"
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
      ></img>
      <div className="info">
        <img
          src="https://www.seekpng.com/png/full/210-2107842_the-matrix-logo-matrix-movie-logo-png.png"
          alt="title"
        ></img>
        <span className="description">
          fdsaljfdsa;lkjfdslakjfdslakjfdsl;akj fdlskajfdl ;sajfldsjaf;l
          djsal;fkjdsaljfldsjafljdsalj fdsalkj fldkjsa l;fdjsa lkjfd slajf dlsaj
          fldkjsa lj fdlsja
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more-info">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
