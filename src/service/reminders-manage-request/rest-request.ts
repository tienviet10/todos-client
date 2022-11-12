import axios, { AxiosInstance } from "axios";
import { useMutation, useQuery } from "react-query";
import { API } from "../../shared/constant/config";
import { Reminder, SharedReminder } from "../../shared/types/Reminder";
import { getLocalStorage } from "../auth/auth";

interface NewData {
  url: string;
  data?:
    | {
        searchUser: string;
      }
    | Reminder
    | SharedReminder;
  from?: string;
}

interface NewDataAPI extends NewData {
  method: "get" | "post" | "put" | "delete";
}

interface SuccessfulDataResponse {
  data: string;
  status: number;
  statusText: string;
  request: {
    status: number;
  };
}

interface ErrorHandling {
  error: string;
}

const client: AxiosInstance = axios.create({ baseURL: `${API}` });

const request = ({ ...options }: NewDataAPI) => {
  const token = getLocalStorage("token");
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  client.defaults.headers.post["Content-Type"] = "application/json";
  const onSuccess = (response: any) => response;
  const onError = (error: ErrorHandling) => error;
  return client(options).then(onSuccess).catch(onError);
};

// function createARecordWithTokenFunction(newData: NewData) {
//   return request({
//     url: newData.url,
//     method: newData.method,
//     data: newData.data,
//   });
// }

// function getRecordsWithTokenFunction(newData: NewData) {
//   return request({ url: newData.url, method: newData.method });
// }

// function updatedARecordWithTokenFunction(newData: NewData) {
//   return request({
//     url: newData.url,
//     method: newData.method,
//     data: newData.data,
//   });
// }

// function deleteARecordWithTokenFunction(newData: NewData) {
//   return request({
//     url: newData.url,
//     method: newData.method,
//   });
// }

//Create a record or records
export const useRQPostARecord = (
  onSuccess: (data?: any) => void,
  onError: (err?: ErrorHandling, context?: any) => void,
  onMutate: (data?: NewData) => void,
  onSettled: () => void
) => {
  return useMutation(
    (newData: NewData) => request({ ...newData, method: "post" }),
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
  onError: (err?: ErrorHandling) => void
) => {
  return useQuery(cacheVar, () => request({ url: urlLink, method: "get" }), {
    onSuccess,
    onError,
    enabled: typeDefault,
  });
};

//Update a record
export const useRQUpdateARecord = (
  onSuccess: (data?: any) => void,
  onError: (err?: ErrorHandling, context?: any) => void,
  onMutate: (data?: NewData) => void,
  onSettled: () => void
) => {
  return useMutation(
    (newData: NewData) => request({ ...newData, method: "put" }),
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
  onSuccess: (data?: SuccessfulDataResponse) => void,
  onError: (err?: ErrorHandling, context?: any) => void,
  onMutate: (data: string) => unknown,
  onSettled: () => void
) => {
  return useMutation(
    (deleteId: string) => request({ url: deleteId, method: "delete" }),
    {
      onSuccess,
      onError,
      onMutate,
      onSettled,
    }
  );
};
