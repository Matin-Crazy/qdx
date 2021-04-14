import axios from "axios";
import setAutherizationToken from "../utils/setAutherizationToken";
import {
  startSetRegisterError,
  clearAllErrors,
  setLoginSuccessMsg,
  setRegisterSuccess,
  clearRegisterMsg,
} from "./errors";

//USER_LOGOUT
//USER_LOGIN
//USER_GET_ALL
//USER_DELETE
//SET_REGISTER_ERROR

//USER_REGISTER
export const userRegister = (payload) => ({
  type: "USER_REGISTER",
  payload,
});

//START_USER_REGISTER
export const starUserRegister = (payload) => (dispatch) => {
  const { name, lastname, number, email, password } = payload;

  return axios
    .post("/users/singup", { name, lastname, number, email, password })

    .then(
      (response) => {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setAutherizationToken(token);
        dispatch(userRegister({ name, lastname, number, email, token }));
        const successTxt = "ثبت نام موفق";
        dispatch(setRegisterSuccess(successTxt));
        setTimeout(() => {
          dispatch(clearRegisterMsg());
        }, 5000);
        return successTxt;
      },
      (error) => {
        dispatch(startSetRegisterError(error.response.data.errors));
        console.log("console from starUserRegister", error.response.data);
      }
    );
};

//USER_LOGOUT
export const userLogOut = () => ({
  type: "USER_LOG_OUT",
});

//StartUSERLOGOUT
export const startUserLogOut = (token) => (dispatch) => {
  const axiosAuth = axios.create({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  dispatch(userLogOut());
  dispatch(clearAllErrors());
  axios.post("/users/logout");
  setAutherizationToken();
  localStorage.removeItem("jwtToken");

  return axiosAuth.post("/users/logout").then(
    () => console.log("user logged out"),
    (e) => console.log("there was a error logging out")
  );
};

//USER_LOGIN
export const userLogIn = ({ name, lastname, number, email, token }) => ({
  type: "USER_LOG_IN",
  name,
  lastname,
  number,
  email,
  token,
});

//startUserLogin
export const startUserLogIn = ({ email, password }) => (dispatch) => {
  return axios.post("/users/login", { email, password }).then(
    (resp) => {
      const token = resp.data.token;
      setAutherizationToken(token);
      localStorage.setItem("jwtToken", token);

      const user = resp.data.user;
      dispatch(userLogIn({ token, ...user }));
      dispatch(setLoginSuccessMsg());

      return "signIn Successful";
    },
    (error) => {
      return "  ایمیل و یا رمز عبور وارد شده صحیح نمی باشد";
    }
  );
};

export const SetCurrentUser = ({ name, lastname, number, email }) => ({
  type: "SET_CURRENT_USER",
  name,
  lastname,
  number,
  email,
});

export const startSetCurrentUser = () => (dispatch) => {
  axios.get("/users/me").then(
    (resp) => {
      dispatch(SetCurrentUser(resp.data));
    },
    (error) => console.log("there was a error in setting current user", error)
  );
};
