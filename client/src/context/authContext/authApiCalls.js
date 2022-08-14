import axios from "axios";

import { loginStart, loginSuccess, loginFailure } from "./AuthAction";

export const loginCall = (user, dispatch) => {
  dispatch(loginStart);
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post("/auth/login", user);
      resolve(res.data && dispatch(loginSuccess(res.data)));
    } catch (error) {
      reject(dispatch(loginFailure));
    }
  });
};
