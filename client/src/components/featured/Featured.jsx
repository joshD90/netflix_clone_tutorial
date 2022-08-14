import "./featured.scss";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext/AuthContext";

function Featured({ type }) {
  const [content, setContent] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movie/random?type=${type}`, {
          headers: {
            token: `Bearer ${user.accessToken}`,
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
          <Link to="/watch" state={content}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
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
