import { useContext, useState } from "react";
import { getUserAuthenticationLink } from "../../shared/service-link/url-link";
import { AuthContext } from "../context/AuthServiceContext";
import { useRQGetRecords } from "../reminders-manage-request/rest-request";

function withUser(WrappedComponent) {
  const WithFetch = (props) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { isAuth, logout } = useContext(AuthContext);

    useRQGetRecords(
      "userDetail",
      getUserAuthenticationLink(),
      isAuth,
      (data) => {
        setIsLoading(true);
        // data.response !== undefined &&
        //   data.response.status === 404 &&
        //   setIsError(true);
        if (
          data.response !== undefined &&
          (data.response.status === 404 || data.response.status === 401)
        ) {
          setIsError(true);
          logout();
        }
        if (data.data !== undefined) {
          setUserData(data.data);
        }
        setIsLoading(false);
      },
      (data) => setIsError(true)
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
