import axios, { AxiosInstance } from "axios";
import { useMutation, useQuery } from "react-query";
import { API } from "../../shared/constant/config";
import {
  ErrorHandling,
  FriendRequest,
  JSONStringResponse,
  NewDataAPI,
} from "../../shared/types/RESTResponse";
import { getLocalStorage } from "../auth/auth";

const client: AxiosInstance = axios.create({ baseURL: `${API}` });

const request = ({ ...options }: NewDataAPI) => {
  const token = getLocalStorage("token");
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  client.defaults.headers.post["Content-Type"] = "application/json";
  const onSuccess = (response: any) => response;
  const onError = (error: ErrorHandling) => error;
  return client(options).then(onSuccess).catch(onError);
};

//Create a record or records
export const useRQPostARecord = (
  onSuccess: (data?: FriendRequest) => void,
  onError: (err?: ErrorHandling, context?: any) => void,
  onMutate: (data?: any) => void,
  onSettled: () => void
) => {
  return useMutation(
    (newData: any) => request({ ...newData, method: "post" }),
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
  cacheVar: string | string[],
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
  onSuccess: (data?: JSONStringResponse) => void,
  onError: (err?: ErrorHandling, context?: any) => void,
  onMutate: (data?: any) => void,
  onSettled: () => void
) => {
  return useMutation((newData: any) => request({ ...newData, method: "put" }), {
    onSuccess,
    onError,
    onMutate,
    onSettled,
  });
};

//Delete a record
export const useRQDeleteARecord = (
  onSuccess: (data?: JSONStringResponse) => void,
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
