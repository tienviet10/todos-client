import React, { useEffect, useState } from "react";

import axios from "axios";
import { API } from "../../components/config";
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
          const response = await axios.get(requestUrl, {
            headers: {
              authorization: `Bearer ${token}`,
              contentType: "application/json",
            },
          });

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

      if (token) fetchData(`${API}/v1/user-auth`, token);
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
