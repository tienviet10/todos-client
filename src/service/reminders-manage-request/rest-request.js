import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API } from "../../shared/constant/config";
import { getLocalStorage } from "../auth/auth";

const client = axios.create({ baseURL: `${API}` });

const request = ({ ...options }) => {
  const token = getLocalStorage("token");
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
  return request({ url: urlLink, method: "get" });
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
export const useRQGetRecords = (
  cacheVar,
  urlLink,
  typeDefault,
  onSuccess,
  onError
) => {
  return useQuery(cacheVar, () => getRecordsWithTokenFunction(urlLink), {
    onSuccess,
    onError,
    enabled: typeDefault,
  });
};

//Update a record
export const useRQUpdateARecord = (onSuccess, onError, onMutate, onSettled) => {
  return useMutation((newData) => updatedARecordWithTokenFunction(newData), {
    onSuccess,
    onError,
    onMutate,
    onSettled,
  });
};

//Delete a record
export const useRQDeleteARecord = (onSuccess, onError, onMutate, onSettled) => {
  return useMutation(
    (deleteData) => deleteARecordWithTokenFunction(deleteData),
    {
      onSuccess,
      onError,
      onMutate,
      onSettled,
    }
  );
};
