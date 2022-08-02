import React, { useState, useEffect, useContext } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import {
  getMovies,
  deleteMovie,
} from "../../context/movieContext/movieApiCalls";

function ProductList() {
  const [data, setData] = useState(productRows);
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
    console.log(movies, "in my useeffect product list");
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 50 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img
              src={params.row.img}
              alt="Movie Image"
              className="productListImg"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Age Limit", width: 120 },
    { field: "isSeries", headerName: "Is Series?", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movies/" + params.row._id} state={params.row}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  function handleDelete(id) {
    deleteMovie(id, dispatch);
  }

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        rowsPerPageOptions={[10]}
        getRowId={(r) => r._id}
      />
    </div>
  );
}

export default ProductList;
