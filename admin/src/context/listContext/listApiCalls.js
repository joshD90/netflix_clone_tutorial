import { getListsFailure, getListsStart, getListsSuccess } from "./listActions";
import axios from "axios";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get("/lists/", {
      headers: {
        token: `Bearer ${parsedLocalStorage.accessToken}`,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    console.log(error, "there was an error");
    dispatch(getListsFailure());
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

export const createMovie = async (movie, dispatch) => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));
  dispatch(createMovieStart());
  try {
    const res = await axios.post("/movie/", movie, {
      headers: { token: "Bearer " + parsedLocalStorage.accessToken },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure());
  }
};

export const updateMovie = async (id, movie, dispatch) => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));
  console.log(parsedLocalStorage, "parsed local storage");
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(`/movie/${id}`, movie, {
      headers: { token: "Bearer " + parsedLocalStorage.accessToken },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieFailure());
  }
};
