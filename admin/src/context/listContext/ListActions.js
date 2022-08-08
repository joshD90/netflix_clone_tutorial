//Get Movies Action

export const getListsStart = () => ({
  type: "GET_LISTS_START",
});

export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});

export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

// //Movie Delete Actions

// export const deleteMovieStart = () => ({ type: "DELETE_MOVIE_START" });

// export const deleteMovieSuccess = (id) => ({
//   type: "DELETE_MOVIE_SUCCESS",
//   payload: id,
// });

// export const deleteMovieFailure = () => ({ type: "DELETE_MOVIE_FAILURE" });

// //Create Movie Actions
// export const createMovieStart = () => ({
//   type: "CREATE_MOVIE_START",
// });

// export const createMovieSuccess = (movie) => ({
//   type: "CREATE_MOVIE_SUCCESS",
//   paload: movie,
// });

// export const createMovieFailure = () => ({
//   type: "CREATE_MOVIE_FAILURE",
// });

// //Update Movie Actions
// export const updateMovieStart = () => ({
//   type: "UPDATE_MOVIE_START",
// });

// export const updateMovieSuccess = (movie) => ({
//   type: "UPDATE_MOVIE_SUCCESS",
//   payload: movie,
// });

// export const updateMovieFailure = () => ({
//   type: "UPDATE_MOVIE_FAILURE",
// });
