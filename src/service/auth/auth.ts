export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (token: string) => {
  if (localStorage.getItem(token)) {
    return JSON.parse(localStorage.getItem(token) || "");
  } else {
    return "";
  }
};

export const storeAuthentication = (token: string, accessToken: string) => {
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
