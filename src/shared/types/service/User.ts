export interface UserData {
  token: string;
  user: {
    email: string;
    givenName?: string;
    name?: string;
    picture?: string;
    refreshToken: number;
    role: string;
    username: string;
    _id: string;
  };
}

export interface UserDataType { user: UserData }

export interface UserNewPassword {
  email: string;
  username: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface UserInfoRegistration {
  username: string;
  email: string;
  password: string;
  reconfirmedPassword: string;
  error: string;
  success: string;
  buttonText: string;
}

export interface EmailUserPicId {
  email: string;
  username: string;
  picture?: string;
  _id: string;
}

export interface UserEmailUsernamePicture {
  email: string;
  username: string;
  picture?: string;
}

export interface UserFriendsList {
  acceptedFriends: UserEmailUsernamePicture[];
  pendingFriendsRequest: UserEmailUsernamePicture[];
  sentFriendRequests: UserEmailUsernamePicture[];
}

export interface GreetingImageType {
  statement: string;
  image: string;
}

