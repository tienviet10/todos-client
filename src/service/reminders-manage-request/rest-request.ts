import axios, { AxiosInstance } from "axios";
import { useMutation, useQuery } from "react-query";
import { API } from "../../shared/constant/config";
import { Reminder, SharedReminder } from "../../shared/types/Reminder";
import { getLocalStorage } from "../auth/auth";

interface NewData {
  url: string;
  data:
    | {
        searchUser: string;
      }
    | Reminder
    | SharedReminder;
}

const client: AxiosInstance = axios.create({ baseURL: `${API}` });

const request = ({ ...options }) => {
  const token = getLocalStorage("token");
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  client.defaults.headers.post["Content-Type"] = "application/json";
  const onSuccess = (response: any) => response;
  const onError = (error: any) => error;
  return client(options).then(onSuccess).catch(onError);
};

function createARecordWithTokenFunction(newData: NewData) {
  return request({
    url: newData.url,
    method: "post",
    data: newData.data,
  });
}

function getRecordsWithTokenFunction(urlLink: string) {
  return request({ url: urlLink, method: "get" });
}

function updatedARecordWithTokenFunction(newData: NewData) {
  return request({
    url: newData.url,
    method: "put",
    data: newData.data,
  });
}

function deleteARecordWithTokenFunction(urlLink: string) {
  return request({
    url: urlLink,
    method: "delete",
  });
}

//Create a record or records
export const useRQPostARecord = (
  onSuccess: (data?: any) => void,
  onError: (err?: any, context?: any) => void,
  onMutate: (data?: any) => void,
  onSettled: () => void
) => {
  return useMutation(
    (newData: NewData) => createARecordWithTokenFunction(newData),
    {
      onSuccess,
      onError,
      onMutate,
      onSettled,
    }
  );
};

//Get a record or records
export const useRQGetRecords = (
  cacheVar: string,
  urlLink: string,
  typeDefault: boolean,
  onSuccess: (data: any) => void,
  onError: (err?: any) => void
) => {
  return useQuery(cacheVar, () => getRecordsWithTokenFunction(urlLink), {
    onSuccess,
    onError,
    enabled: typeDefault,
  });
};

//Update a record
export const useRQUpdateARecord = (
  onSuccess: (data?: any) => void,
  onError: (err?: any, context?: any) => void,
  onMutate: (data?: any) => void,
  onSettled: () => void
) => {
  return useMutation(
    (newData: NewData) => updatedARecordWithTokenFunction(newData),
    {
      onSuccess,
      onError,
      onMutate,
      onSettled,
    }
  );
};

//Delete a record
export const useRQDeleteARecord = (
  onSuccess: (data?: any) => void,
  onError: (err?: any, context?: any) => void,
  onMutate: any,
  onSettled: () => void
) => {
  return useMutation(
    (deleteData: string) => deleteARecordWithTokenFunction(deleteData),
    {
      onSuccess,
      onError,
      onMutate,
      onSettled,
    }
  );
};
