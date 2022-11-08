import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NAV_TABS } from "../../shared/constant/config";
import { postRegisterLink } from "../../shared/service-link/url-link";

export function useManageRegistrationState(user) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    reconfirmedPassword: "",
    error: "",
    success: "",
    buttonText: t("sign_up"),
  });

  const {
    username,
    email,
    password,
    reconfirmedPassword,
    error,
    success,
    buttonText,
  } = state;

  const handleChange = (name) => (e) => {
    setState((item) => ({
      ...item,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: t("sign_up"),
    }));
  };

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    setState((item) => ({ ...item, buttonText: t("sign_up_ing") }));
    const newUser = {
      username,
      email,
      password,
    };

    if (password === reconfirmedPassword) {
      try {
        const response = await axios.post(postRegisterLink(), newUser);

        if (response.status) {
          const data = response.data;
          setState((item) => ({
            ...item,
            success: data.message,
          }));

          setLoading(false);
          navigate(NAV_TABS[6].href);
        } else {
          throw new Error("Fetch request error");
        }
      } catch (err) {
        setState((item) => ({
          ...item,
          error: err.response.data.error,
          buttonText: t("sign_up"),
        }));

        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    success,
    register,
    username,
    handleChange,
    email,
    password,
    reconfirmedPassword,
    buttonText,
    navigate,
    t,
  };
}
