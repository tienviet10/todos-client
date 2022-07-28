import React from "react";

export const SearchFriends = ({
  searchTerm,
  setSearchTerm,
  searchNewFriend,
}) => {
  return (
    <>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute flex inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-indigo-200"
          name="searchTerm"
          value={searchTerm}
          placeholder="Username or email"
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute text-white right-2.5 bottom-2.5 bg-application-color hover:bg-hover-color focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={() => searchNewFriend()}
        >
          Search
        </button>
      </div>
    </>
  );
};

// import React from "react";

// export const SearchFriends = ({
//   searchTerm,
//   setSearchTerm,
//   searchNewFriend,
// }) => {
//   return (
//     <>
//       <label className="text-gray-600 font-medium">Find a friend!</label>
//       <div className="flex mt-2">
//         <input
//           className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mr-2"
//           name="searchTerm"
//           value={searchTerm}
//           placeholder="Username or email"
//           autoFocus
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           //disabled={loading}
//           className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-application-color hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2"
//           onClick={() => searchNewFriend()}
//         >
//           Search
//         </button>
//       </div>
//     </>
//   );
// };
