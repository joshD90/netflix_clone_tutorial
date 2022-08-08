import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@mui/icons-material";
import upload from "../../utils/uploadFiles";
import { updateMovie } from "../../context/movieContext/movieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

function Product() {
  const location = useLocation();
  const movie = location.state;
  const [movieInfo, setMovieInfo] = useState(movie);
  const [items, setItems] = useState([]);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext);

  function handleTextChange(e, label) {
    setMovieInfo((prev) => ({ ...prev, [label]: e.target.value }));
    console.log(movieInfo);
  }

  function fileChange(e, label) {
    setItems((prev) => {
      return [...prev, { file: e.target.files[0], label: label }];
    });
  }

  function uploadOrUpdate() {
    if (items.length === 0) return "update";
    if (items.length !== 0 && uploaded !== items.length) return "upload";
    if (items.length !== 0 && uploaded === items.length) return "update";
  }

  //we need to return a promise from upload so we can call it asyncronously
  // and then await its result and then make an axios call.
  //We should add a progress bar as well
  function handleUpload(e) {
    e.preventDefault();
    upload(items, setMovieInfo, setUploaded);
  }

  function handleUpdate(e) {
    console.log(movie);
    e.preventDefault();
    updateMovie(movie._id, movieInfo, dispatch);
    console.log(MovieContext._currentValue, "MovieContext");
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="Product" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Age Limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h3 className="editHeader" onClick={() => console.log(movieInfo)}>
          Update Movie Details
        </h3>
        <form action="" className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              onChange={(e) => {
                handleTextChange(e, "title");
              }}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              onChange={(e) => {
                handleTextChange(e, "year");
              }}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              onChange={(e) => {
                handleTextChange(e, "genre");
              }}
            />
            <label>Age Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              onChange={(e) => {
                handleTextChange(e, "limit");
              }}
            />
            <label>Trailer</label>
            <input
              type="file"
              onChange={(e) => fileChange(e, "trailer")}
              placeholder={
                movie.trailer
                  ? movie.trailer
                  : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
            />
            <label>Video</label>
            <input
              type="file"
              onChange={(e) => fileChange(e, "video")}
              placeholder={
                movie.video
                  ? movie.video
                  : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
            />

            <label>Is Series</label>
            <select
              name="isSeries"
              id="isSeries"
              onChange={(e) => {
                handleTextChange(e, "isSeries");
              }}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {uploadOrUpdate() === "update" ? (
              <button className="productButton" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Product;
