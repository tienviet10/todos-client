import React from "react";

export const ImageUsernameEmailCard = ({
  username,
  picture,
  email,
  children,
}) => {
  return (
    <div key={username} className="bg-white p-4 shadow-lg rounded-md mt-4">
      <div className="flex items-center">
        <img
          src={
            picture && picture !== ""
              ? picture
              : "images/600_background_image.jpg"
          }
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div className="flex items-start justify-between w-full">
          <div className="pl-3 w-full">
            <p className="text-xl font-medium leading-5 text-gray-800">
              {username}
            </p>
            <p className="text-sm leading-normal pt-2 text-gray-500">{email}</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
