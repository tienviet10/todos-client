import { useState, useContext } from "react";
import { API } from "../../components/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import axios from "axios";
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
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Sign In",
    });
  };

  function login(e) {
    e.preventDefault();
    setLoading(true);
    setState({ ...state, error: "", success: "", buttonText: "Signing In..." });
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`${API}/login`, user)
      .then((res) => {
        setState({
          ...state,
          email: "",
          password: "",
          error: "",
          success: res.data.message,
          buttonText: "Sign In",
        });
        storeAuthentication(res.data);
        signInAuth();
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setState({
          ...state,
          password: "",
          success: "",
          error: err.response.data.error,
          buttonText: "Sign In",
        });

        setLoading(false);
      });
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
