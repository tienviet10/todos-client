// set in localstoarge
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// remove from localstorage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// get from localstorage
export const getLocalStorage = () => {
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return "";
  }
};

// authenticate user by passing data to localstorage during signin
export const storeAuthentication = (response) => {
  setLocalStorage("token", response.token);
};

export const updateUser = (user, next) => {
  if (localStorage.getItem("user")) {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = user;
    localStorage.setItem("user", JSON.stringify(auth));
    next();
  }
};
