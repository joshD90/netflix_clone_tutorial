import {
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
} from "./MovieActions";
import axios from "axios";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get("/movie/", {
      headers: {
        token: `Bearer ${parsedLocalStorage.accessToken}`,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    console.log(error, "there was an error");
    dispatch(getMoviesFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));

  try {
    await axios.delete(`/movie/${id}`, {
      headers: { token: `Bearer ${parsedLocalStorage.accessToken}` },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure());
  }
};