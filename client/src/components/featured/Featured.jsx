import "./featured.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";

function Featured({ type }) {
  const [content, setContent] = useState();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movie/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTEyNGIzMTA2MzM3NzMwMjI4NDYzMyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTg5MjIyMDYsImV4cCI6MTY1OTM1NDIwNn0.mm3LHhFYa1IoHP8sQauS1jq02NrB-eTQr4-M0142RC0",
          },
        });
        setContent(res.data[0]);
        console.log(res.data, "featured");
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movie" : "Series"}</span>
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
      <img width="100%" src={content && content.img}></img>
      <div className="info">
        <img
          src="https://www.seekpng.com/png/full/210-2107842_the-matrix-logo-matrix-movie-logo-png.png"
          alt="title"
        ></img>
        <span className="description">{content && content.desc}</span>
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
