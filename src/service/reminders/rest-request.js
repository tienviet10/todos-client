import axios from "axios";
import { API } from "../../shared/constant/config";

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

export async function getARecordWithToken(inputCall, token) {
  const headers = returnHeader(token);
  return await axios.get(`${API}` + inputCall, {
    headers,
  });
}
