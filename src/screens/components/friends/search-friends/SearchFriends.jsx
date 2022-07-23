import React from "react";

export const SearchFriends = ({
  searchTerm,
  setSearchTerm,
  searchNewFriend,
}) => {
  return (
    <>
      <label className="text-gray-600 font-medium">Find a friend!</label>
      <div className="flex mt-2">
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mr-2"
          name="searchTerm"
          value={searchTerm}
          placeholder="Username or email"
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          //disabled={loading}
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-application-color hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => searchNewFriend()}
        >
          Search
        </button>
      </div>
    </>
  );
};
