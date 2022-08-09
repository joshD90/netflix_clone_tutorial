import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { Publish } from "@mui/icons-material";
import upload from "../../utils/uploadFiles";
import { updateMovie } from "../../context/movieContext/movieApiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { List, listClasses } from "@mui/material";

function Product() {
  const location = useLocation();
  const list = location.state;
  const [listInfo, setListInfo] = useState(list);
  const [items, setItems] = useState([]);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(ListContext);

  function handleTextChange(e, label) {
    setListInfo((prev) => ({ ...prev, [label]: e.target.value }));
    console.log(listInfo);
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
    upload(items, setListInfo, setUploaded);
  }

  function handleUpdate(e) {
    e.preventDefault();
    updateMovie(list._id, listInfo, dispatch);
    console.log(ListContext._currentValue, "ListContext");
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">
                {list.type === "isSeries" ? "Series" : "Movie"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h3 className="editHeader">Update List Details</h3>
        <form action="" className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={list.title}
              onChange={(e) => {
                handleTextChange(e, "title");
              }}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={list.genre}
              onChange={(e) => {
                handleTextChange(e, "genre");
              }}
            />

            <label>Is Series / Type:</label>
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
              <img
                src={null}
                alt="doesnt belong here"
                className="productUploadImg"
              />
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
