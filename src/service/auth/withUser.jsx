import React, { useEffect, useState } from "react";
import { getRequestWithToken } from "../reminders/rest-request";
import { getLocalStorage, removeLocalStorage } from "./auth";

function withUser(WrappedComponent) {
  const WithFetch = (props) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const token = getLocalStorage();

    useEffect(() => {
      const fetchData = async (requestUrl, token) => {
        setIsLoading(true);
        setIsError(false);

        try {
          const response = await getRequestWithToken(requestUrl, token);

          if (response.status) {
            const data = response.data.user;
            setIsLoading(false);
            setUserData(data);
          } else {
            throw new Error("Fetch request error");
          }
        } catch (err) {
          if (err.response.status === 401) removeLocalStorage("token");
          setIsLoading(false);
          setIsError(err);
        }
      };

      if (token) fetchData(`/v1/user-auth`, token);
    }, [token]);

    return (
      <WrappedComponent
        user={userData}
        isLoading={isLoading}
        isError={isError}
        {...props}
      />
    );
  };

  return WithFetch;
}

export default withUser;
