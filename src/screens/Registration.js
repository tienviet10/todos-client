import React, { useState } from "react";
import { AiFillFire } from "react-icons/ai";
import axios from "axios";
import Error from "../components/shared/Error";
import Loader from "../components/shared/Loader";
import Success from "../components/shared/Success";
import { useNavigate } from "react-router-dom";
import { API } from "../components/config";

export const Registration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    reconfimedPassword: "",
    error: "",
    success: "",
    buttonText: "Register Account",
  });

  const {
    username,
    email,
    password,
    reconfimedPassword,
    error,
    success,
    buttonText,
  } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };

  function register(e) {
    e.preventDefault();
    setLoading(true);
    setState({ ...state, buttonText: "Registering..." });
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    if (password === reconfimedPassword) {
      axios
        .post(`${API}/register`, newUser)
        .then((res) => {
          setState({
            ...state,
            success: res.data.message,
          });
          //setSuccess(res.data.message);
          setLoading(false);
          navigate("/login");
        })
        .catch((err) => {
          setState({
            ...state,
            error: err.response.data.error,
            buttonText: "Register",
          });

          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register new account
            </h2>
          </div>
          {loading && <Loader />}
          {error && <Error error={error} />}
          {success && <Success success="Your Registration is successful" />}
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={(e) => register(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="Username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={username}
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={handleChange("username")}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange("email")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange("password")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Re-confimed Password
                </label>
                <input
                  id="reconfimedPassword"
                  name="reconfimedPassword"
                  type="password"
                  value={reconfimedPassword}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Re-entered Password"
                  onChange={handleChange("reconfimedPassword")}
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading ? true : false}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiFillFire
                    className="h-5 w-5 text-red-400 group-hover:text-red-300"
                    aria-hidden="true"
                  />
                </span>
                {buttonText}
              </button>
            </div>
          </form>
          <div
            className="text-center cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            onClick={() => navigate("/login")}
          >
            Return to Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

//------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import { AiFillFire } from "react-icons/ai";
// import axios from "axios";
// import Error from "../components/shared/Error";
// import Loader from "../components/shared/Loader";
// import Success from "../components/shared/Success";

// export const Registration = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();
//   const [success, setSuccess] = useState();
//   const [username, setUsername] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [reconfimedPassword, setReconfimedPassword] = useState("");

//   function register(e) {
//     setLoading(true);
//     e.preventDefault();
//     const newUser = {
//       username: username,
//       email: email,
//       password: password,
//     };

//     if (password === reconfimedPassword) {
//       axios
//         .post("http://localhost:8000/api/register", newUser)
//         .then((res) => {
//           setSuccess(res.data.message);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.response.data.error);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <img
//               className="mx-auto h-12 w-auto"
//               src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//               alt="Workflow"
//             />
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Register new account
//             </h2>
//           </div>
//           {loading && <Loader />}
//           {error && <Error error="Email address is already been used" />}
//           {success && <Success success="Your Registration is successful" />}
//           <form className="mt-8 space-y-6" method="POST">
//             <input type="hidden" name="remember" defaultValue="true" />
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="Username" className="sr-only">
//                   Username
//                 </label>
//                 <input
//                   id="Username"
//                   name="Username"
//                   type="text"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Username"
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                   onChange={(e) => setpassword(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Re-confimed Password
//                 </label>
//                 <input
//                   id="reconfimedPassword"
//                   name="reconfimedPassword"
//                   type="password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Re-entered Password"
//                   onChange={(e) => setReconfimedPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 disabled={loading ? true : false}
//                 type="submit"
//                 onClick={(e) => register(e)}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <AiFillFire
//                     className="h-5 w-5 text-red-400 group-hover:text-red-300"
//                     aria-hidden="true"
//                   />
//                 </span>
//                 Register Account
//               </button>
//             </div>
//           </form>
//           <div className="text-center cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
//             Return to Sign in
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
