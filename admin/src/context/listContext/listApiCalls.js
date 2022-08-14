import {
  getListsFailure,
  getListsStart,
  getListsSuccess,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
  createListStart,
  createListSuccess,
  createListFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./ListActions";
import axios from "axios";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get("/list/", {
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

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));

  try {
    await axios.delete(`/list/${id}`, {
      headers: { token: `Bearer ${parsedLocalStorage.accessToken}` },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};

export const createList = (list, dispatch) => {
  return new Promise(async function (resolve, reject) {
    const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));
    dispatch(createListStart());
    try {
      const res = await axios.post("/list/", list, {
        headers: { token: "Bearer " + parsedLocalStorage.accessToken },
      });
      console.log(res.data, "response from createList");
      resolve(dispatch(createListSuccess(res.data)));
    } catch (error) {
      reject(dispatch(createListFailure()));
    }
  });
};

export const updateList = async (id, list, dispatch) => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem("user"));
  dispatch(updateListStart());
  try {
    const res = await axios.put(`/list/${id}`, list, {
      headers: { token: "Bearer " + parsedLocalStorage.accessToken },
    });
    dispatch(updateListSuccess(res.data));
  } catch (error) {
    dispatch(updateListFailure());
  }
};
