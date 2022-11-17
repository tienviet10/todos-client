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

export interface GreetingImageType {
  statement: string;
  image: string;
}

// export interface DataRespond {
//   data: UserData;
//   status: number;
//   statusText: string;
//   request: {
//     status: number;
//     statusText: string;
//   };
// }
