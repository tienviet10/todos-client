import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API } from "../../shared/constant/config";
import { getLocalStorage } from "../auth/auth";

const client = axios.create({ baseURL: `${API}` });

const request = ({ ...options }) => {
  const token = getLocalStorage();
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  client.defaults.headers.post["Content-Type"] = "application/json";
  const onSuccess = (response) => response;
  const onError = (error) => error;
  return client(options).then(onSuccess).catch(onError);
};

function createARecordWithTokenFunction(newData) {
  return request({
    url: newData.url,
    method: "post",
    data: newData.data,
  });
}

function getRecordsWithTokenFunction(urlLink) {
  return request({ url: urlLink });
}

function updatedARecordWithTokenFunction(newData) {
  return request({
    url: newData.url,
    method: "put",
    data: newData.data,
  });
}

function deleteARecordWithTokenFunction(urlLink) {
  return request({
    url: urlLink,
    method: "delete",
  });
}

//Create a record or records
export const useRQCreateARecord = (onSuccess, onError) => {
  return useMutation((newData) => createARecordWithTokenFunction(newData), {
    onSuccess,
    onError,
  });
};

//Get a record or records
export const useRQGetRecords = (cacheVar, urlLink, onSuccess, onError) => {
  return useQuery(cacheVar, () => getRecordsWithTokenFunction(urlLink), {
    onSuccess,
    onError,
  });
};

//Get a record/ records with pause to refetch
export const useRQGetARecordPause = (cacheVar, urlLink, onSuccess, onError) => {
  return useQuery(cacheVar, () => getRecordsWithTokenFunction(urlLink), {
    onSuccess,
    onError,
    enabled: false,
  });
};

//Update a record
export const useRQUpdateARecord = (onSuccess, onError) => {
  return useMutation((newData) => updatedARecordWithTokenFunction(newData), {
    onSuccess,
    onError,
  });
};

//Delete a record
export const useRQDeleteARecord = (onSuccess, onError) => {
  return useMutation(
    (deleteData) => deleteARecordWithTokenFunction(deleteData),
    {
      onSuccess,
      onError,
    }
  );
};

////-------------------------------------------------------------------
function returnHeader(token) {
  return {
    authorization: `Bearer ${token}`,
    contentType: "application/json",
  };
}

export async function getRequestWithToken(inputCall, token) {
  const headers = returnHeader(token);
  return await axios.get(`${API}` + inputCall, {
    headers,
  });
}

export async function discardARecordWithToken(inputCall, token) {
  const headers = returnHeader(token);
  return await axios.delete(`${API}` + inputCall, {
    headers,
  });
}

export async function updateARecordWithToken(inputCall, updatedData, token) {
  const headers = returnHeader(token);
  return await axios.put(`${API}` + inputCall, updatedData, {
    headers,
  });
}

export async function createARecordWithToken(inputCall, newReminder, token) {
  const headers = returnHeader(token);
  return await axios.post(`${API}` + inputCall, newReminder, {
    headers,
  });
}

///---------------------------------------------------------------------------

// import axios from "axios";
// import { API } from "../../shared/constant/config";

// function returnHeader(token) {
//   return {
//     authorization: `Bearer ${token}`,
//     contentType: "application/json",
//   };
// }

// export async function getRequestWithToken(inputCall, token) {
//   const headers = returnHeader(token);
//   return await axios.get(`${API}` + inputCall, {
//     headers,
//   });
// }

// export async function discardARecordWithToken(inputCall, token) {
//   const headers = returnHeader(token);
//   return await axios.delete(`${API}` + inputCall, {
//     headers,
//   });
// }

// export async function updateARecordWithToken(inputCall, updatedData, token) {
//   const headers = returnHeader(token);
//   return await axios.put(`${API}` + inputCall, updatedData, {
//     headers,
//   });
// }

// export async function createARecordWithToken(inputCall, newReminder, token) {
//   const headers = returnHeader(token);
//   return await axios.post(`${API}` + inputCall, newReminder, {
//     headers,
//   });
// }

// export async function getARecordWithToken(inputCall, token) {
//   const headers = returnHeader(token);
//   return await axios.get(`${API}` + inputCall, {
//     headers,
//   });
// }
