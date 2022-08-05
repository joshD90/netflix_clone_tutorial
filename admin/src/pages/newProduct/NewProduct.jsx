import React, { useState, useContext } from "react";
import storage from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import "./newProduct.css";
import { createMovie } from "../../context/movieContext/movieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

function NewProduct() {
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);

  const [imgTitle, setImageTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  async function checkFilelist() {
    try {
      const fileRef = ref(storage, "items");
      const fileList = await listAll(fileRef);
      console.log(fileList);
    } catch (error) {
      console.log(error);
    }
  }

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const fileRef = ref(storage, `items/${fileName}`);
      const uploadTask = uploadBytesResumable(fileRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done`);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error, "upload was unsuccessful");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });

            setUploaded((prev) => prev + 1);
            console.log("File Available at ", downloadURL);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(img);
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "featureImg" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form action="" className="addProductForm">
        <div className="addProductItem">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            id="img"
            onChange={(e) => {
              console.log(e.target.files[0], "e.target.value");
              return setImg(e.target.files[0]);
            }}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="file">Title Image</label>
          <input
            type="file"
            id="imgTitle"
            onChange={(e) => setImageTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="file">Thumbnail Image</label>
          <input
            type="file"
            id="imgSmall"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Title</label>
          <input
            type="text"
            palceholder="Title Here"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Description</label>
          <input
            type="text"
            palceholder="Add Description Here"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Year</label>
          <input
            type="text"
            palceholder="Enter Year of Release"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Age Limit</label>
          <input
            type="text"
            palceholder="Enter Age Rating Here"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Genre</label>
          <input
            type="text"
            palceholder="Enter Genre Here"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Duration</label>
          <input
            type="text"
            palceholder="Enter Duration Here"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Is Series?</label>
          <select id="isSeries" name="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label htmlFor="">Trailer</label>
          <input
            type="file"
            id="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Full Video</label>
          <input
            type="file"
            id="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default NewProduct;
