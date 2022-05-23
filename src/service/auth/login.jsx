import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../shared/constant/config";
import { AuthContext } from "../context/AuthServiceContext";
import { storeAuthentication } from "./auth";

export function useLogIn() {
  const { login: signInAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Sign In",
  });

  const { email, password, error, success, buttonText } = state;

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  const handleChange = (name) => (e) => {
    setState((item) => ({
      ...item,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Sign In",
    }));
  };

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setState((item) => ({
      ...item,
      error: "",
      success: "",
      buttonText: "Signing In...",
    }));
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API}/v1/login`, user);

      if (response.status) {
        const data = response.data;
        setState((item) => ({
          ...item,
          email: "",
          password: "",
          error: "",
          success: data.message,
          buttonText: "Sign In",
        }));
        storeAuthentication(data);
        signInAuth();
        setLoading(false);
        navigate("/dashboard");
      } else {
        throw new Error("Fetch request error");
      }
    } catch (err) {
      setState((item) => ({
        ...item,
        password: "",
        success: "",
        error: err.response.data.error,
        buttonText: "Sign In",
      }));

      setLoading(false);
    }

    // axios
    //   .post(`${API}/v1/login`, user)
    //   .then((res) => {
    //     setState((item) => ({
    //       ...item,
    //       email: "",
    //       password: "",
    //       error: "",
    //       success: res.data.message,
    //       buttonText: "Sign In",
    //     }));
    //     storeAuthentication(res.data);
    //     signInAuth();
    //     setLoading(false);
    //     navigate("/dashboard");
    //   })
    //   .catch((err) => {
    //     setState((item) => ({
    //       ...item,
    //       password: "",
    //       success: "",
    //       error: err.response.data.error,
    //       buttonText: "Sign In",
    //     }));

    //     setLoading(false);
    //   });
  }

  return {
    login,
    open,
    loading,
    error,
    success,
    email,
    password,
    buttonText,
    toggle,
    handleChange,
    navigate,
  };
}
