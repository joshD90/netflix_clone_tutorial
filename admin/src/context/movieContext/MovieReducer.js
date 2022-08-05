const MovieReducer = (state, action) => {
  switch (action.type) {
    //GET MOVIES ACTION
    case "GET_MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };
    //DELETE MOVIE ACTIONS
    case "DELETE_MOVIE_START":
      return { ...state, isFetching: true, error: false };

    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((mov) => mov._id !== action.payload),
        isFetching: false,
        error: false,
      };

    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    //Create Movie Actions
    case "CREATE_MOVIE_START": {
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    }
    case "CREATE_MOVIE_SUCCESS": {
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: true,
      };
    }
    case "CREATE_MOVIE_FAILURE": {
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    }

    default:
      return { ...state };
  }
};

export default MovieReducer;
