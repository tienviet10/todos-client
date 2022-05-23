import axios from "axios";

function returnHeader(token) {
  return {
    authorization: `Bearer ${token}`,
    contentType: "application/json",
  };
}

export async function getReminders(inputURL, token) {
  const headers = returnHeader(token);
  return await axios.get(inputURL, {
    headers,
  });
}

export async function discardAReminder(inputURL, token) {
  const headers = returnHeader(token);
  return await axios.delete(inputURL, {
    headers,
  });
}

export async function updateAReminder(inputURL, updatedData, token) {
  const headers = returnHeader(token);
  return await axios.put(inputURL, updatedData, {
    headers,
  });
}

export async function createAReminder(inputURL, newReminder, token) {
  const headers = returnHeader(token);
  return await axios.post(inputURL, newReminder, {
    headers,
  });
}
