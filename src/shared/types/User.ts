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

export interface DataRespond {
  data: UserData;
  status: number;
  statusText: string;
  request: {
    status: number;
    statusText: string;
  };
}
