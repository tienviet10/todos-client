import { GetLocalStorageType, RemoveLocalStorageType, SetLocalStorageType, StoreAuthenticationType } from "../../shared/types/service/Authentication";

export const setLocalStorage: SetLocalStorageType = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage: RemoveLocalStorageType = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorage: GetLocalStorageType = (token) => {
  if (localStorage.getItem(token)) {
    return JSON.parse(localStorage.getItem(token) || "");
  } else {
    return "";
  }
};

export const storeAuthentication: StoreAuthenticationType = (token, accessToken) => {
  setLocalStorage(token, accessToken);
};

// export const updateUser = (user, next) => {
//   if (localStorage.getItem("user")) {
//     let auth = JSON.parse(localStorage.getItem("user"));
//     auth = user;
//     localStorage.setItem("user", JSON.stringify(auth));
//     next();
//   }
// };
