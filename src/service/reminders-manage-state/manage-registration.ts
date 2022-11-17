import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NAV_TABS } from "../../shared/constant/config";
import { postRegisterLink } from "../../shared/service-link/url-link";
import { ManageRegistrationStateType } from "../../shared/types/ManageStateType";
import { UserInfoRegistration } from "../../shared/types/User";

export function useManageRegistrationState(): ManageRegistrationStateType {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [userRegisterInfo, setUserRegisterInfo] =
    useState<UserInfoRegistration>({
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
  } = userRegisterInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegisterInfo((item) => ({
      ...item,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
      buttonText: t("sign_up"),
    }));
  };

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setUserRegisterInfo((item) => ({ ...item, buttonText: t("sign_up_ing") }));
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
          setUserRegisterInfo((item) => ({
            ...item,
            success: data.message,
          }));

          setLoading(false);
          navigate(NAV_TABS[6].href);
        } else {
          throw new Error("Fetch request error");
        }
      } catch (err: any) {
        setUserRegisterInfo((item) => ({
          ...item,
          error: err?.response?.data?.error,
          buttonText: t("sign_up"),
        }));

        setLoading(false);
      }
    } else {
      setUserRegisterInfo((item) => ({
        ...item,
        error: "Passwords are not matching",
        buttonText: t("sign_up"),
      }));
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
