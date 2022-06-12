export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (token) => {
  if (localStorage.getItem(token)) {
    return JSON.parse(localStorage.getItem(token));
  } else {
    return "";
  }
};

export const storeAuthentication = (token, accessToken) => {
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
