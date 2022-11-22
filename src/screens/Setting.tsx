import i18next from "i18next";
import { useState } from "react";
import withUser from "../service/auth/withUser";
import { GlobeIcon } from "../shared/components/GlobalIcon";
import { languages } from "../shared/constant/config";

const Setting = () => {
  const [expandLanguages, setExpandLanguages] = useState<boolean>(false);
  return (
    <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
      <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-md rounded-lg shadow-sm mx-auto h-[200px]">
        <div className="flex justify-end mt-4 mr-4">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-application-color px-2 py-1.5 text-sm font-medium shadow-sm text-white"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setExpandLanguages((prev) => !prev)}
            >
              <GlobeIcon color="white" />
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              className={
                expandLanguages
                  ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-application-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
                  : "hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-application-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              // tabIndex="-1"
            >
              <div className="py-1" role="none">
                {languages.map(({ code, name, country_code }) => (
                  <div key={country_code} className="px-2 py-2 text-sm w-full">
                    <button
                      className="flex ml-5 w-full"
                      onClick={() => {
                        setExpandLanguages((prev) => !prev);
                        i18next.changeLanguage(code);
                      }}
                    >
                      <img
                        src={`images/${code}.png`}
                        style={{ width: 30 }}
                        alt=""
                      />
                      <p className="ml-4">{name}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUser(Setting);
/////-----------------------------------------------------------------------------------

// import { useEffect, useState } from "react";
// import { AiFillDelete } from "react-icons/ai";
// import withUser from "../service/auth/withUser";

// const Setting = ({ user }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchUsers, setSearchUsers] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [loadingUserBackend, setLoadingUserBackend] = useState(false);

//   useEffect(() => {
//     if (searchUsers !== "") {
//       setLoadingUserBackend(true);
//       const delayDebounceFn = setTimeout(() => {
//         const newFilter = data.filter((value) => {
//           return value.title.toLowerCase().includes(searchUsers.toLowerCase());
//         });

//         setFilteredData(newFilter);

//         setLoadingUserBackend(false);
//       }, 1000);
//       return () => clearTimeout(delayDebounceFn);
//     } else {
//       setFilteredData([]);
//     }
//   }, [searchUsers]);

//   const handleDeleteTags = (removedIndex) => {
//     setSelectedUser([
//       ...selectedUser.filter((_, index) => index !== removedIndex),
//     ]);
//   };

//   const handleSelectUserFromSuggestion = (value) => {
//     setSelectedUser((old) => [...old, value]);
//     setFilteredData([]);
//     setSearchUsers("");
//   };

//   return (
//     <div>
//       <div>
//         <ul className="flex overflow-hidden overflow-x-auto p-0 ml-2 text-xs">
//           {selectedUser.map((value, index) => (
//             <li
//               key={index}
//               className="flex flex-shrink-0 w-auto h-[32px] items-center justify-center text-white rounded-md mt-2 mx-1 bg-application-color"
//             >
//               <div className="px-2">{value.title}</div>
//               <div
//                 className="flex h-[32px] hover:cursor-pointer rounded-r-md bg-red-400 px-1"
//                 onClick={() => handleDeleteTags(index)}
//               >
//                 <AiFillDelete size={17} className="my-auto" />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex mt-4 ml-4">
//         <div className="flex text-center my-auto">Add user(s):</div>
//         <input
//           type="text"
//           placeholder="Username or Email"
//           value={searchUsers}
//           onChange={(e) => setSearchUsers(e.target.value)}
//           className="text-sm h-[30px] w-[300px] ml-2 pl-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-indigo-200"
//         />
//         {loadingUserBackend && (
//           <div className="flex items-center px-2">
//             <svg
//               aria-hidden="true"
//               className="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//               viewBox="0 0 100 101"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                 fill="currentColor"
//               />
//               <path
//                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                 fill="currentFill"
//               />
//             </svg>
//           </div>
//         )}
//       </div>
//       {filteredData.length !== 0 && (
//         <div className="mt-1 bg-white shadow-sm overflow-hidden overflow-y-auto w-[300px] max-h-[200px] outline-none border-none">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <div
//                 key={key}
//                 className="flex text-black items-center hover:bg-gray-100 hover:cursor-pointer"
//                 onClick={() => handleSelectUserFromSuggestion(value)}
//                 //href={value.link}
//               >
//                 <p className="ml-2">{value.title} </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default withUser(Setting);

////------------------------------------------------------------------------------

// const Setting = ({ user }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [wordEntered, setWordEntered] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (wordEntered !== "") {
//       setLoading(true);
//       const delayDebounceFn = setTimeout(() => {
//         const newFilter = data.filter((value) => {
//           return value.title.toLowerCase().includes(wordEntered.toLowerCase());
//         });

//         setFilteredData(newFilter);

//         setLoading(false);
//       }, 1000);
//       return () => clearTimeout(delayDebounceFn);
//     } else {
//       setFilteredData([]);
//     }
//   }, [wordEntered]);

//   // const handleFilter = (event) => {
//   //   const searchWord = event.target.value;
//   //   setWordEntered(searchWord);
//   //   const newFilter = data.filter((value) => {
//   //     return value.title.toLowerCase().includes(searchWord.toLowerCase());
//   //   });

//   //   if (searchWord === "") {
//   //     setFilteredData([]);
//   //   } else {
//   //     setFilteredData(newFilter);
//   //   }
//   // };

//   // const clearInput = () => {
//   //   setFilteredData([]);
//   //   setWordEntered("");
//   // };

//   const handleDeleteTags = (removedIndex) => {
//     setSelectedUser([
//       ...selectedUser.filter((_, index) => index !== removedIndex),
//     ]);
//   };

//   const handleSelectUserFromSuggestion = (value) => {
//     setSelectedUser((old) => [...old, value]);
//     setFilteredData([]);
//     setWordEntered("");
//   };

//   return (
//     <div>
//       <div>
//         <ul className="flex overflow-hidden overflow-x-auto p-0 ml-2 text-xs">
//           {selectedUser.map((value, index) => (
//             <li
//               key={index}
//               className="flex flex-shrink-0 w-auto h-[32px] items-center justify-center text-white rounded-md mt-2 mx-1 bg-application-color"
//             >
//               <div className="px-2">{value.title}</div>
//               <div
//                 className="flex h-[32px] hover:cursor-pointer rounded-r-md bg-red-400 px-1"
//                 onClick={() => handleDeleteTags(index)}
//               >
//                 <AiFillDelete size={17} className="my-auto" />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex mt-4 ml-4">
//         <div className="flex text-center my-auto">Add user(s):</div>
//         <input
//           type="text"
//           placeholder="Username or Email"
//           value={wordEntered}
//           onChange={(e) => setWordEntered(e.target.value)}
//           className="text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-indigo-200 h-[30px] w-[300px] ml-2 pl-3"
//         />
//         {loading && (
//           <div className="flex items-center px-2">
//             <svg
//               aria-hidden="true"
//               className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//               viewBox="0 0 100 101"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                 fill="currentColor"
//               />
//               <path
//                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                 fill="currentFill"
//               />
//             </svg>
//           </div>
//         )}
//         {/* <div className="bg-white- grid items-center">
//           {filteredData.length === 0 ? (
//             <AiOutlineSearch />
//           ) : (
//             <AiFillCloseCircle id="clearBtn" onClick={clearInput} />
//           )}
//         </div> */}
//       </div>
//       {filteredData.length !== 0 && (
//         <div className="mt-1 bg-white shadow-sm overflow-hidden overflow-y-auto w-[300px] max-h-[200px] outline-none border-none">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <div
//                 key={key}
//                 className="flex text-black items-center hover:bg-gray-100 hover:cursor-pointer"
//                 onClick={() => handleSelectUserFromSuggestion(value)}
//                 //href={value.link}
//               >
//                 <p className="ml-2">{value.title} </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default withUser(Setting);

////---------------------------------------------------------------------------------

// import withUser from "../service/auth/withUser";
// const Setting = ({ user }) => {

//   return (
//     <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
//       Settings
//     </div>
//   );
// };

// export default withUser(Setting);
