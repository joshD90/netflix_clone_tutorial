import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./newList.css";
import { createList } from "../../context/listContext/listApiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/movieApiCalls";

function NewList() {
  const [list, setList] = useState();
  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createList(list, dispatch);
      console.log(list);
      navigate(`/lists`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form action="" className="addProductForm">
        <div className="formLeft">
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
            <label htmlFor="">Genre</label>
            <input
              type="text"
              palceholder="Add Genre Here"
              name="genre"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label htmlFor="">Type</label>
            <select id="isSeries" name="type" onChange={handleChange}>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label htmlFor="content">Content</label>
            <select
              multiple
              name="content"
              id=""
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option value={movie._id} key={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewList;
