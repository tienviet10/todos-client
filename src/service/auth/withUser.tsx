import React, { ComponentType, useContext, useState } from "react";
import { getUserAuthenticationLink } from "../../shared/service-link/url-link";
import { AuthContext } from "../context/AuthServiceContext";
import { useRQGetRecords } from "../reminders-manage-request/rest-request";

interface UserData {
  token: string;
  user: {
    email: string;
    refreshToken: number;
    role: string;
    username: string;
    _id: string;
  };
}

interface DataRespond {
  data: UserData;
  status: number;
  statusText: string;
  request: {
    status: number;
    statusText: string;
  };
}

function withUser<T>(WrappedComponent: ComponentType<T>) {
  const WithFetch = (props: any) => {
    const [userData, setUserData] = useState<UserData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const { isAuth, logout } = useContext(AuthContext);

    useRQGetRecords(
      "userDetail",
      getUserAuthenticationLink(),
      isAuth,
      (data: DataRespond) => {
        setIsLoading(true);
        if (
          data.request !== undefined &&
          (data.request.status === 404 || data.request.status === 401)
        ) {
          setIsError(true);
          logout();
        }
        if (data.data !== undefined) {
          setUserData(data.data);
        }
        setIsLoading(false);
      },
      () => setIsError(true)
    );
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
