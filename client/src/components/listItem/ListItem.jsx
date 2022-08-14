import React, { useState, useEffect, useContext } from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";

function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [movieDetails, setMovieDetails] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`/movie/find/${item}`, {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        });
        setMovieDetails(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to="/watch" state={movieDetails}>
      <div
        className="listItem"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: index * 225 - 50 + 2.5 * index }}
      >
        <img src={movieDetails && movieDetails.img} />
        {isHovered && (
          <>
            <video autoPlay loop>
              <source
                src={
                  movieDetails && movieDetails.trailer
                    ? movieDetails.trailer
                    : trailer
                }
                type="video/mp4"
              ></source>
            </video>
            <div className="info">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 Hour 14 mins</span>
                <span className="limit">
                  {movieDetails && movieDetails.limit}
                </span>
                <span>{movieDetails && movieDetails.year}</span>
              </div>
              <div className="description">
                {movieDetails && movieDetails.desc}
              </div>
              <div className="genre">
                {movieDetails && movieDetails.genre.toUpperCase()}
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default ListItem;
